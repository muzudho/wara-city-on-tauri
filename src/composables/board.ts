import { ref, computed, Ref, ComputedRef } from 'vue';

// 型、共有データ等
import { SourceTileRectangles } from "@/composables/sourceTileRectangles";

// ボードの設定を管理する型
export interface Board {
    widthCells: Ref<number>;
    heightCells: Ref<number>;
    areaCells: ComputedRef<number>;
    widthPixels: Ref<number>;
    heightPixels: Ref<number>;
    tileKeyArray: Ref<Array<string>>;
}

export function createBoard(srcTileRectangles: SourceTileRectangles): Board {
    // FIXME: 初期値どうする？
    const widthCells: Ref<number> = ref(40);
    const heightCells: Ref<number> = ref(40);
    const areaCells: ComputedRef<number> = computed(() => widthCells.value * heightCells.value);
    const widthPixels: ComputedRef<number> = computed(() => widthCells.value * srcTileRectangles.cellWidth.value);
    const heightPixels: ComputedRef<number> = computed(() => heightCells.value * srcTileRectangles.cellHeight.value);

    const rawArray = <Array<string>>[];
    for(let i=0; i<areaCells.value; i+=1){
        rawArray.push('sea_255')
    }

    const tileKeyArray = ref<Array<string>>(rawArray);

    return {
        widthCells,
        heightCells,
        areaCells,
        widthPixels,
        heightPixels,
        tileKeyArray,
    };
}
