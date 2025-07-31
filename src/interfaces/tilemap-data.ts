import { TileDict } from '@/types/tile-dict'; // @はsrcへのエイリアス

// タイルマップ・データ。
export interface TilemapData {
    tileDict: TileDict;     // タイル矩形の位置を示す辞書
    paletteWidth: number;   // パレットとして出力したときの横幅（px）
    paletteHeight: number;  // パレットとして出力したときの縦幅（px）
}
