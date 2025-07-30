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
            'wasteland',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',

            // [1]行目
            'sea_0',
            'wasteland',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',

            // [2]行目
            'sea_0',
            'sea_0',
            'wasteland',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',

            // [3]行目
            'sea_0',
            'sea_0',
            'sea_0',
            'wasteland',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',

            // [4]行目
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'wasteland',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',

            // [5]行目
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'wasteland',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',

            // [6]行目
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'wasteland',
            'sea_0',
            'sea_0',
            'sea_0',

            // [7]行目
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'wasteland',
            'sea_0',
            'sea_0',

            // [8]行目
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'wasteland',
            'sea_0',

            // [9]行目
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'sea_0',
            'wasteland',
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
