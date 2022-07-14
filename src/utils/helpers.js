export function getBaseName(filepath){
    return filepath.replace(/^.*[\\/]/, '')
}

export function reloadWindow(){
    location.reload();
}