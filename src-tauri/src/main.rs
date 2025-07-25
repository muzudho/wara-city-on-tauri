// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    csv_cleaning_2_on_tauri_lib::run() // 📄 `src-tauri/src/lib.rs` の中に書いてある `run` 関数を呼び出す。
}
