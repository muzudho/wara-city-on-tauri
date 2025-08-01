import { TileDict } from '@/types/tile-dict'; // @はsrcへのエイリアス

// タイルマップ・データ。
export interface TilemapData {
    tileDict: TileDict;             // タイル矩形の位置を示す辞書
    unitCellWidth: number,          // 単位セルの横幅（px）
    unitCellHeight: number,         // 単位セルの縦幅（px）
    horizontalUnitCells: number,    // 水平方向の単位セル数
    verticalUnitCells: number,      // 垂直方向の単位セル数

    // TODO 以下をメソッドかプロパティにしたい。
    getPaletteWidth(): number;      // パレットとして出力したときの横幅（px）
    getPaletteHeight(): number;     // パレットとして出力したときの縦幅（px）
}
