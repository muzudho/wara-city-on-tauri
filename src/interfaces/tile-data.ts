// タイル・データ
//
//      タイルマップ画像上の位置情報等。
//
export interface TileData {
    srcLeft: number;    // 切り抜く矩形のX座標（px）
    srcTop: number;     // 切り抜く矩形のY座標（px）
    srcWidth: number;   // 切り抜く矩形の横幅（px）
    srcHeight: number;  // 切り抜く矩形の縦幅（px）
}
