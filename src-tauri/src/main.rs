#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

// extern crate dotenv;
// use dotenv::dotenv;
use std::env;
use tauri::{CustomMenuItem, Menu, Submenu, MenuItem};

const APP_VERSION: &'static str = env!("APP_VERSION");

fn main() {

  // Define menu
  let version = CustomMenuItem::new("_version_", format!("v{}", APP_VERSION )).disabled();
  let about = CustomMenuItem::new("_about_", "wcrd 2022").disabled();
  let load_ref = CustomMenuItem::new("update_point_ref".to_string(), "Update point reference");
  let reload = CustomMenuItem::new("reload-app", "Reload");
  let points_ref_version = CustomMenuItem::new("points_ref_version", "Points Ref: null").disabled();
  let file_menu = Submenu::new("File", Menu::new().add_item(load_ref).add_item(reload).add_native_item(MenuItem::Quit));
  let about_menu = Submenu::new("About", Menu::new().add_item(points_ref_version).add_item(version).add_item(about));
  let menu = Menu::new()
    .add_submenu(file_menu)
    .add_submenu(about_menu);

  tauri::Builder::default()
    .menu(menu)
    .on_menu_event(|event| {
      match event.menu_item_id() {
        "update_point_ref" => {
          event.window().emit("update-point-ref", {}).unwrap();
        },
        "reload-app" => {
          event.window().emit("reload-app", {}).unwrap();
        },
        _ => {}
      }
    })
    .invoke_handler(tauri::generate_handler![update_menu_ref_version])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

// Function to update the points reference version value in the menu from the VUE app when the points ref is updated.
#[tauri::command]
async fn update_menu_ref_version(window: tauri::Window, version: String) {
  // println!("Window: {}", window.label());
  let main_window = window; //app.get_window("main").unwrap();
  let menu_handle = main_window.menu_handle();
  std::thread::spawn(move || {
    // you can also `set_selected`, `set_enabled` and `set_native_image` (macOS only).
    menu_handle.get_item("points_ref_version").set_title(format!("Points Ref: v{}", version));
  });
}