//use std::fs::{self};
//use std::path::Path;

use csv::Reader;
use serde::{Deserialize, Serialize};
use std::fs::File;
//use tauri::command;


#[derive(Serialize, Deserialize)]
struct CsvRow {
    // CSVのヘッダーに合わせてフィールドを定義（例: name, age）
    name: String,
    age: String,
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
#[allow(non_snake_case)]
fn read_csv(file_path: String) -> Result<Vec<CsvRow>, String> {
    let file = File::open(&file_path).map_err(|e| e.to_string())?;
    let mut rdr = Reader::from_reader(file);
    let mut rows = Vec::new();

    for result in rdr.deserialize() {
        let record: CsvRow = result.map_err(|e| e.to_string())?;
        rows.push(record);
    }

    Ok(rows)
}

// ディレクトリー内のファイル名を取得するTauriコマンド。
// 読取成功時はファイル名のリストを、失敗時はエラーメッセージを返す。
// NOTE: 引数にアンダースコア区切りは使えないようだ。
//      (Grok)
//      Rust 側で #[tauri::command] を付けた関数の引数名は、JavaScript 側でそのままキー名として使われる。
//      JavaScript ではスネークケースは一般的じゃないから、Tauri はキャメルケースを前提にシリアライズ/デシリアライズを行う。
//      スネークケースだと、Vue から送ったデータが Rust 側で正しくマッチしないんだ。
//      ついでに、#[tauri::command] の関数名自体もスネークケース推奨だぜ。キャメルケースの関数名でも動くけど、Tauri のドキュメントや慣習ではスネークケースが一般的だから、統一すると読みやすいよ。
#[tauri::command]
#[allow(non_snake_case)]
fn translate(sourceStr:&str, commandName: &str) -> String {
    if commandName == "都道府県スプリット1" {
        let mut s = String::from("");
        let lines: Vec<&str> = sourceStr.lines().collect();
        for &line in lines.iter() {
            let pref = get_pref(line);  // 都道府県名にマッチするものを探す
            if pref != "" {
                let pref_len = pref.len();      // 都道府県名の長さを取得                    
                let rest = &line[pref_len..];   // 都道府県以降の部分を抽出
                s.push_str(&format!("{0},{1}\n",pref,rest));
            }
            else{
                s.push_str(&format!(",{}\n",&line));    // 空列を入れる。
            }
        }

        return s
    }
    sourceStr.to_string()
}

pub fn get_pref(line: &str) -> &'static str {
    // 47都道府県のリスト
    let prefectures = [
        "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
        "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
        "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
        "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
        "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
        "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
        "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
    ];

    for &pref in prefectures.iter() {
        if line.starts_with(pref) {    // 都道府県名にマッチするものを探す
            return pref
        }
    }        

    return ""
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            translate,
            read_csv
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
