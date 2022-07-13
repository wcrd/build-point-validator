extern crate dotenv;

fn main() {
  // load version numbers into process
  dotenv::from_filename(".version").ok();
  let var = match dotenv::var("APP_VERSION"){
    Ok(v) => v,
    Err(_) => "_build_error".to_string() 
  };
  // make variable available at compile time
  println!("cargo:rustc-env=APP_VERSION={}", var);

  tauri_build::build()
}
