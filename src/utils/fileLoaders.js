import { dialog, fs, http } from "@tauri-apps/api"
import { forage } from '@tauri-apps/tauri-forage'
import XLSX from 'xlsx'
import basePointRef from '../assets/point_ref.json'

// Load build export file
async function buildFileLoader() {
    const filepath = await dialog.open(
        {
        filters: [{
            name: "Build files",
            extensions: ["csv", "xlsx"]
        }]
    })
    // if no path then cancel
    if(!filepath){ return { data: false, filepath: false } }
    const fileRead = await fs.readBinaryFile(filepath)
    const xlsxRead = XLSX.read(fileRead, { type: 'array', cellText:false, cellDates:true })
    const data = XLSX.utils.sheet_to_json(xlsxRead.Sheets.Sheet1, {header:0, range:1, raw: false})
    // add empty validation column
    for (let row in data){
        data[row]["::Validation::"] = ''
    }
    return { data, filepath }
}

// Load default point-reference
function loadBasePointsReference() {
    return basePointRef
}

// Get latest stores point-reference and return to app
async function loadReferencePoints() {
    // check if store has data
    const data = await forage.getItem({key: 'points-ref'})()
    // if not load from file
    if(data){
        console.log("Using store")
        return data
    } else {
        console.log("Loading from base JSON")
        // load from csv
        const jsonData = loadBasePointsReference()
        // set store
        await forage.setItem({key: 'points-ref', value: jsonData})();
        await forage.setItem({key: 'origin', value: 'local'})();
        return jsonData
    }
}

// fetch point-reference from server
async function fetchBasePointsRef(){
        const resp = await http.fetch("https://building-tagging-guide.web.app/data/latest/point_ref.json")
            .catch((e) => {
                console.log(e)
                return false
            })
        return resp.data
}

// update reference points
async function updateReferencePoints(){
    console.log("Querying server for new points list...")
    const data = await fetchBasePointsRef();
    if(data){
        await forage.setItem({key: 'points-ref', value: data})();
        await forage.setItem({key: 'origin', value: 'server'})();
        await forage.setItem({key: 'last-updated', value: new Date()})();
        console.log("Successfully updated points ref")
        return true
    } else {
        console.log("Error. Failed to update points.")
        return false
    }

}

export { buildFileLoader, loadBasePointsReference, loadReferencePoints, updateReferencePoints, forage }