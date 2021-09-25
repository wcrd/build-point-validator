import { dialog, fs } from "@tauri-apps/api"
import XLSX from 'xlsx'
import basePointRef from '../assets/point_ref.json'

async function buildFileLoader() {
    const filepath = await dialog.open()
    const fileRead = await fs.readBinaryFile(filepath)
    const xlsxRead = XLSX.read(fileRead, { type: 'array' })
    const data = XLSX.utils.sheet_to_json(xlsxRead.Sheets.Sheet1, {header:0, range:1})
    // add empty validation column
    for (let row in data){
        data[row]["::Validation::"] = ''
    }
    return data
}

function loadBasePointsReference() {
    return basePointRef
}

// function loadReferencePoints() {

// }

export { buildFileLoader, loadBasePointsReference }