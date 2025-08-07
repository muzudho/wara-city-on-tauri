use std::fs;
use serde_json::Value;

/**
 * 例えば、📄 `.exe` と同じディレクトリの 📄 `start-config.json` といったファイルの内容を読み込むTauriコマンド。
 */
#[tauri::command]
fn read_bundle_text_file(file_name: &str) -> Result<Value, String> {
    let exe_path = std::env::current_exe().map_err(|e| e.to_string())?;     // `.exe` と同じディレクトリのパスを取得
    let config_path = exe_path
        .parent()
        .ok_or("Could not get parent directory".to_string())?
        .join(file_name);

    // JSONファイルを読み込む
    let contents = fs::read_to_string(config_path).map_err(|e| e.to_string() + " exe_path:" + exe_path.display().to_string().as_str())?;
    let json: Value = serde_json::from_str(&contents).map_err(|e| e.to_string() + " exe_path:" + exe_path.display().to_string().as_str())?;

    Ok(json)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![   // カンマ区切りで複数のコマンドを指定
            read_bundle_text_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
