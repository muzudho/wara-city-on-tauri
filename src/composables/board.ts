import { ref, computed, Ref, ComputedRef } from 'vue';

// 型
import { TileDict } from '@/types/tile-dict'; // @はsrcへのエイリアス

// 共有データ
import { getSourceTilemaps } from '@/composables/sourceTilemaps';

// ボードの設定を管理する型
export interface Board {
    widthCells: Ref<number>;
    heightCells: Ref<number>;
    areaCells: ComputedRef<number>;
    widthPixels: Ref<number>;
    heightPixels: Ref<number>;
    areaPixels: ComputedRef<number>;
    srcTileDict: Ref<TileDict>;
    srcTileKeyList: Ref<Array<string>>;
}

export function createBoard(): Board {
    const srcTilemaps = getSourceTilemaps();
    const widthCells: Ref<number> = ref(10);
    const heightCells: Ref<number> = ref(10);
    const areaCells: ComputedRef<number> = computed(() => widthCells.value * heightCells.value);
    const widthPixels: ComputedRef<number> = computed(() => widthCells.value * srcTilemaps.cellWidth.value);
    const heightPixels: ComputedRef<number> = computed(() => heightCells.value * srcTilemaps.cellHeight.value);
    const areaPixels: ComputedRef<number> = computed(() => (widthCells.value * srcTilemaps.cellWidth.value) * (heightCells.value * srcTilemaps.cellHeight.value));

    const srcTileDict = ref<TileDict>({
        'sea_0': {srcTop:0*srcTilemaps.cellHeight.value, srcLeft:1*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},   // 海
        'sea_1': {srcTop:0*srcTilemaps.cellHeight.value, srcLeft:2*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},   // 海岸線
        'sea_2': {srcTop:0*srcTilemaps.cellHeight.value, srcLeft:3*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_3': {srcTop:0*srcTilemaps.cellHeight.value, srcLeft:4*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_3_1': {srcTop:0*srcTilemaps.cellHeight.value, srcLeft:5*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},

        'sea_4': {srcTop:1*srcTilemaps.cellHeight.value, srcLeft:0*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_5': {srcTop:1*srcTilemaps.cellHeight.value, srcLeft:1*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_6': {srcTop:1*srcTilemaps.cellHeight.value, srcLeft:2*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_6_2': {srcTop:1*srcTilemaps.cellHeight.value, srcLeft:3*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_7': {srcTop:1*srcTilemaps.cellHeight.value, srcLeft:4*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_7_1': {srcTop:1*srcTilemaps.cellHeight.value, srcLeft:5*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},

        'sea_7_2': {srcTop:2*srcTilemaps.cellHeight.value, srcLeft:0*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_7_3': {srcTop:2*srcTilemaps.cellHeight.value, srcLeft:1*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_8': {srcTop:2*srcTilemaps.cellHeight.value, srcLeft:2*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_9': {srcTop:2*srcTilemaps.cellHeight.value, srcLeft:3*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_9_8': {srcTop:2*srcTilemaps.cellHeight.value, srcLeft:4*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_10': {srcTop:2*srcTilemaps.cellHeight.value, srcLeft:5*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},

        'sea_11': {srcTop:3*srcTilemaps.cellHeight.value, srcLeft:0*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_11_1': {srcTop:3*srcTilemaps.cellHeight.value, srcLeft:1*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_11_8': {srcTop:3*srcTilemaps.cellHeight.value, srcLeft:2*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_11_9': {srcTop:3*srcTilemaps.cellHeight.value, srcLeft:3*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_12': {srcTop:3*srcTilemaps.cellHeight.value, srcLeft:4*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_12_8': {srcTop:3*srcTilemaps.cellHeight.value, srcLeft:5*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},

        'sea_13': {srcTop:4*srcTilemaps.cellHeight.value, srcLeft:0*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_13_1': {srcTop:4*srcTilemaps.cellHeight.value, srcLeft:1*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_13_8': {srcTop:4*srcTilemaps.cellHeight.value, srcLeft:2*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_13_9': {srcTop:4*srcTilemaps.cellHeight.value, srcLeft:3*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_14': {srcTop:4*srcTilemaps.cellHeight.value, srcLeft:4*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_14_2': {srcTop:4*srcTilemaps.cellHeight.value, srcLeft:5*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},

        'sea_14_4': {srcTop:5*srcTilemaps.cellHeight.value, srcLeft:0*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_14_6': {srcTop:5*srcTilemaps.cellHeight.value, srcLeft:1*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_15': {srcTop:5*srcTilemaps.cellHeight.value, srcLeft:2*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_15_1': {srcTop:5*srcTilemaps.cellHeight.value, srcLeft:3*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_15_2': {srcTop:5*srcTilemaps.cellHeight.value, srcLeft:4*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_15_3': {srcTop:5*srcTilemaps.cellHeight.value, srcLeft:5*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},

        'sea_15_4': {srcTop:6*srcTilemaps.cellHeight.value, srcLeft:0*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_15_5': {srcTop:6*srcTilemaps.cellHeight.value, srcLeft:1*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_15_6': {srcTop:6*srcTilemaps.cellHeight.value, srcLeft:2*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_15_7': {srcTop:6*srcTilemaps.cellHeight.value, srcLeft:3*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_15_8': {srcTop:6*srcTilemaps.cellHeight.value, srcLeft:4*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_15_9': {srcTop:6*srcTilemaps.cellHeight.value, srcLeft:5*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},

        'sea_15_10': {srcTop:7*srcTilemaps.cellHeight.value, srcLeft:0*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_15_11': {srcTop:7*srcTilemaps.cellHeight.value, srcLeft:1*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_15_12': {srcTop:7*srcTilemaps.cellHeight.value, srcLeft:2*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_15_13': {srcTop:7*srcTilemaps.cellHeight.value, srcLeft:3*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_15_14': {srcTop:7*srcTilemaps.cellHeight.value, srcLeft:4*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},
        'sea_15_15': {srcTop:7*srcTilemaps.cellHeight.value, srcLeft:5*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['sea']},

        'wasteland': {srcTop:0*srcTilemaps.cellHeight.value, srcLeft:0*srcTilemaps.cellWidth.value, srcWidth:srcTilemaps.cellWidth.value, srcHeight:srcTilemaps.cellHeight.value, tilemapUrl:srcTilemaps.tilemapFilepathDict['land']},    // 荒地
    });

    const srcTileKeyList = ref<Array<string>>([
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
    ]);

    return {
        widthCells,
        heightCells,
        areaCells,
        widthPixels,
        heightPixels,
        areaPixels,
        srcTileDict,
        srcTileKeyList,
    };
}
