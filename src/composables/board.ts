import { ref, computed, Ref, ComputedRef } from 'vue';

// 型、共有データ等
import { SourceTileCollection } from "@/composables/source-tile-collection";

// ボードの設定を管理する型
export interface Board {
    widthCells: Ref<number>;
    heightCells: Ref<number>;
    areaCells: ComputedRef<number>;
    widthPixels: Ref<number>;
    heightPixels: Ref<number>;
    tilepathArray: Ref<Array<string>>;
}

// Tauriコマンドに渡せるよう、Ref の中身を取り出す。
export function toPlainBoard(board: Board) {
    return {
        widthCells: board.widthCells.value, // number
        heightCells: board.heightCells.value, // number
        areaCells: board.areaCells.value, // number
        widthPixels: board.widthPixels.value, // number
        heightPixels: board.heightPixels.value, // number
        tilepathArray: board.tilepathArray.value, // string[]
    };
}

export function createBoard(srcTileCollection: SourceTileCollection): Board {
    // FIXME: マップサイズの初期値どうする？ 128x128 だと、初期化が遅いようだ。
    const widthCells: Ref<number> = ref(96);
    const heightCells: Ref<number> = ref(96);
    const areaCells: ComputedRef<number> = computed(() => widthCells.value * heightCells.value);
    const widthPixels: ComputedRef<number> = computed(() => widthCells.value * srcTileCollection.unitCellWidth.value);
    const heightPixels: ComputedRef<number> = computed(() => heightCells.value * srcTileCollection.unitCellHeight.value);

    // 海で埋め尽くす。
    const rawArray = <Array<string>>[];
    for(let i=0; i<areaCells.value; i+=1){
        rawArray.push('sea_255')    // FIXME: デフォルト画像はどうする？
    }

    const tilepathArray = ref<Array<string>>(rawArray);

    return {
        widthCells,
        heightCells,
        areaCells,
        widthPixels,
        heightPixels,
        tilepathArray,
    };
}
