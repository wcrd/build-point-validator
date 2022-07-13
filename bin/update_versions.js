const PACKAGE_JSON = "./package.json";
const TAURI_CONF = "./src-tauri/tauri.conf.json";

const fs = require('fs');
require("dotenv").config({ path: './.version' });

function loadJson(path){
    const string = fs.readFileSync(path, "utf8")
    try {
        const jsonData = JSON.parse(string);
        return jsonData
    } catch (err) {
        console.log("Error parsing JSON string:", err);
    }
}

console.log("Updating app version according to .VERSION file")
console.log(`VERSION FILE = ${process.env.APP_VERSION}`)

// Update package.json
const npm_config = loadJson(PACKAGE_JSON)
console.log(`package.json version = ${npm_config.version}`)
if (npm_config.version != process.env.APP_VERSION){
    console.log("Update package.json version.")
    // set new version
    npm_config.version = process.env.APP_VERSION;
    // write file
    const jsonString = JSON.stringify(npm_config, null, 2)
    fs.writeFile(PACKAGE_JSON, jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        }
    });
} else {
    console.log(">> OK")
}

// Update tauri.conf.json
const tauri_config = loadJson(TAURI_CONF);
console.log(`tauri.conf.json version = ${tauri_config.package.version}`)
if (tauri_config.package.version != process.env.APP_VERSION){
    console.log(">> Updated tauri.conf.json version.")
    // set new version
    tauri_config.package.version = process.env.APP_VERSION;
    // write file
    const jsonString = JSON.stringify(tauri_config, null, 2)
    fs.writeFile(TAURI_CONF, jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        }
    });
} else {
    console.log(">> OK")
}