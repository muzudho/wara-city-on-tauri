// タイル・データ
//
//      タイルマップ画像上の位置情報等。
//
export interface TileData {
    left: number;    // 切り抜く矩形のX座標（px）
    top: number;     // 切り抜く矩形のY座標（px）
    width: number;   // 切り抜く矩形の横幅（px）
    height: number;  // 切り抜く矩形の縦幅（px）
}
