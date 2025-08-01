// ##############
// # インポート #
// ##############

// ++++++++++++++++++++++++++++++++++++
// + インポート　＞　インターフェース +
// ++++++++++++++++++++++++++++++++++++
//
// @はsrcへのエイリアス
//

import { TileCursorPosition } from '@/interfaces/tile-cursor-position';

// ++++++++++++++++++++++
// + インポート　＞　型 +
// ++++++++++++++++++++++

import { TileDict } from '@/types/tile-dict';

// タイルマップ・データ
//
//      NOTE: タイルマップ画像と、パレット上のタイル配置は一致させたい。そうでないと、管理が大変になるから。
//
export interface TilemapData {
    tileDict: TileDict;             // タイルパスと、タイル矩形の位置を紐づける辞書

    unitCellWidth: number,          // 単位セルの横幅（px）
    unitCellHeight: number,         // 単位セルの縦幅（px）
    horizontalUnitCells: number,    // 水平方向の単位セル数
    verticalUnitCells: number,      // 垂直方向の単位セル数

    initialTileCursorPosition: TileCursorPosition,     // パレットのタイルカーソル用に初期値を設定する

    getPaletteWidth(): number;      // パレットとして出力したときの横幅（px）
    getPaletteHeight(): number;     // パレットとして出力したときの縦幅（px）
}
