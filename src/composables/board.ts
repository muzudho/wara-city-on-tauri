// ##############
// # インポート #
// ##############

import { computed, ComputedRef, Reactive, reactive } from 'vue';

// ++++++++++++++++++++++++++++++++
// + インポート　＞　コンポーザル +
// ++++++++++++++++++++++++++++++++
//
// @はsrcへのエイリアス
//

import { SourceTileCollection } from "@/composables/source-tile-collection";

// ################
// # エクスポート #
// ################

// ボードの設定を管理する型
export interface Board {
    widthCells: number;
    heightCells: number;
    areaCells: ComputedRef<number>;
    widthPixels: ComputedRef<number>;
    heightPixels: ComputedRef<number>;
    tilepathArray: string[];
}

export function createEmptyBoard(srcTileCollection: Reactive<SourceTileCollection>): Reactive<Board> {
    // FIXME: マップサイズの初期値どうする？ 128x128 だと、初期化が遅いようだ。
    const widthCells: number = 96;
    const heightCells: number = 96;
    const areaCells: ComputedRef<number> = computed(() => widthCells * heightCells);
    const widthPixels: ComputedRef<number> = computed(() => widthCells * srcTileCollection.unitCellWidth);
    const heightPixels: ComputedRef<number> = computed(() => heightCells * srcTileCollection.unitCellHeight);

    // 海で埋め尽くす。
    const tilepathArray: string[] = [];
    for(let i=0; i<areaCells.value; i+=1){
        tilepathArray.push('sea_255')    // FIXME: デフォルト画像はどうする？
    }

    return reactive<Board>({
        widthCells,
        heightCells,
        areaCells,
        widthPixels,
        heightPixels,
        tilepathArray,
    });
}
