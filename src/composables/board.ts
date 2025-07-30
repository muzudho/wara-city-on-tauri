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
    areaPixels: ComputedRef<number>;
    tileKeyArray: Ref<Array<string>>;
}

export function createBoard(srcTileRectangles: SourceTileRectangles): Board {
    const widthCells: Ref<number> = ref(10);
    const heightCells: Ref<number> = ref(10);
    const areaCells: ComputedRef<number> = computed(() => widthCells.value * heightCells.value);
    const widthPixels: ComputedRef<number> = computed(() => widthCells.value * srcTileRectangles.cellWidth.value);
    const heightPixels: ComputedRef<number> = computed(() => heightCells.value * srcTileRectangles.cellHeight.value);
    const areaPixels: ComputedRef<number> = computed(() => (widthCells.value * srcTileRectangles.cellWidth.value) * (heightCells.value * srcTileRectangles.cellHeight.value));

    const tileKeyArray = ref<Array<string>>(
        [
            // [0]行目
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',

            // [1]行目
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',

            // [2]行目
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',

            // [3]行目
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',

            // [4]行目
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',

            // [5]行目
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',

            // [6]行目
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',

            // [7]行目
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',

            // [8]行目
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',

            // [9]行目
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
            'sea_255',
        ]
    );

    return {
        widthCells,
        heightCells,
        areaCells,
        widthPixels,
        heightPixels,
        areaPixels,
        tileKeyArray,
    };
}
