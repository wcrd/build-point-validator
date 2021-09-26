#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Menu, Submenu};


fn main() {
  // Define menu
  let version = CustomMenuItem::new("_version_", "v1.0.0").disabled();
  let about = CustomMenuItem::new("_about_", "wcrd 2021").disabled();
  let load_ref = CustomMenuItem::new("update_point_ref".to_string(), "Update point reference");
  let file_menu = Submenu::new("File", Menu::new().add_item(load_ref));
  let about_menu = Submenu::new("About", Menu::new().add_item(version).add_item(about));
  let menu = Menu::new()
    .add_submenu(file_menu)
    .add_submenu(about_menu);

  tauri::Builder::default()
    .menu(menu)
    .on_menu_event(|event| {
      match event.menu_item_id() {
        "update_point_ref" => {
          event.window().emit("update-point-ref", {}).unwrap();
        }
        _ => {}
      }
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
