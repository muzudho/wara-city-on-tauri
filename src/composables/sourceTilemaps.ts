import { ref, Ref } from 'vue';

// 型、共有データ等
import { TileDictDict } from '@/types/tile-dict-dict'; // @はsrcへのエイリアス
import { SourceTileRectangles } from '@/composables/sourceTileRectangles';

// タイルマップの元画像を管理する型
export interface SourceTilemaps {
    tileDictDict: Ref<TileDictDict>;
}

export function createSourceTilemaps(srcTileRectangles: SourceTileRectangles): SourceTilemaps {
    const tileDictDict = ref<TileDictDict>({
        "land" : {
            'wasteland': srcTileRectangles.tileDict.value["wasteland"],    // 荒地
            'vocantLand': srcTileRectangles.tileDict.value["vocantLand"],    // 空き地
        },
        "sea" : {
            'sea_0': srcTileRectangles.tileDict.value["sea_0"],   // 海
            'sea_1': srcTileRectangles.tileDict.value["sea_1"],   // 海岸線
            'sea_2': srcTileRectangles.tileDict.value["sea_2"],
            'sea_3': srcTileRectangles.tileDict.value["sea_3"],
            'sea_3_1': srcTileRectangles.tileDict.value["sea_3_1"],

            'sea_4': srcTileRectangles.tileDict.value["sea_4"],
            'sea_5': srcTileRectangles.tileDict.value["sea_5"],
            'sea_6': srcTileRectangles.tileDict.value["sea_6"],
            'sea_6_2': srcTileRectangles.tileDict.value["sea_6_2"],
            'sea_7': srcTileRectangles.tileDict.value["sea_7"],
            'sea_7_1': srcTileRectangles.tileDict.value["sea_7_1"],

            'sea_7_2': srcTileRectangles.tileDict.value["sea_7_2"],
            'sea_7_3': srcTileRectangles.tileDict.value["sea_7_3"],
            'sea_8': srcTileRectangles.tileDict.value["sea_8"],
            'sea_9': srcTileRectangles.tileDict.value["sea_9"],
            'sea_9_8': srcTileRectangles.tileDict.value["sea_9_8"],
            'sea_10': srcTileRectangles.tileDict.value["sea_10"],

            'sea_11': srcTileRectangles.tileDict.value["sea_11"],
            'sea_11_1': srcTileRectangles.tileDict.value["sea_11_1"],
            'sea_11_8': srcTileRectangles.tileDict.value["sea_11_8"],
            'sea_11_9': srcTileRectangles.tileDict.value["sea_11_9"],
            'sea_12': srcTileRectangles.tileDict.value["sea_12"],
            'sea_12_8': srcTileRectangles.tileDict.value["sea_12_8"],

            'sea_13': srcTileRectangles.tileDict.value["sea_13"],
            'sea_13_1': srcTileRectangles.tileDict.value["sea_13_1"],
            'sea_13_8': srcTileRectangles.tileDict.value["sea_13_8"],
            'sea_13_9': srcTileRectangles.tileDict.value["sea_13_9"],
            'sea_14': srcTileRectangles.tileDict.value["sea_14"],
            'sea_14_2': srcTileRectangles.tileDict.value["sea_14_2"],

            'sea_14_4': srcTileRectangles.tileDict.value["sea_14_4"],
            'sea_14_6': srcTileRectangles.tileDict.value["sea_14_6"],
            'sea_15': srcTileRectangles.tileDict.value["sea_15"],
            'sea_15_1': srcTileRectangles.tileDict.value["sea_15_1"],
            'sea_15_2': srcTileRectangles.tileDict.value["sea_15_2"],
            'sea_15_3': srcTileRectangles.tileDict.value["sea_15_3"],

            'sea_15_4': srcTileRectangles.tileDict.value["sea_15_4"],
            'sea_15_5': srcTileRectangles.tileDict.value["sea_15_5"],
            'sea_15_6': srcTileRectangles.tileDict.value["sea_15_6"],
            'sea_15_7': srcTileRectangles.tileDict.value["sea_15_7"],
            'sea_15_8': srcTileRectangles.tileDict.value["sea_15_8"],
            'sea_15_9': srcTileRectangles.tileDict.value["sea_15_9"],

            'sea_15_10': srcTileRectangles.tileDict.value["sea_15_10"],
            'sea_15_11': srcTileRectangles.tileDict.value["sea_15_11"],
            'sea_15_12': srcTileRectangles.tileDict.value["sea_15_12"],
            'sea_15_13': srcTileRectangles.tileDict.value["sea_15_13"],
            'sea_15_14': srcTileRectangles.tileDict.value["sea_15_14"],
            'sea_15_15': srcTileRectangles.tileDict.value["sea_15_15"],
        }
    });

    return {
        tileDictDict,
    };
}
