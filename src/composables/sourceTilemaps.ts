import { ref, Ref } from 'vue';

// 型、共有データ等
import { StringDict } from '@/types/string-dict'; // @はsrcへのエイリアス
import { TileDictDict } from '@/types/tile-dict-dict'; // @はsrcへのエイリアス
import { SourceTileRectangles } from '@/composables/sourceTileRectangles';

// タイルマップの元画像を管理する型
export interface SourceTilemaps {
    tilemapFilepathDict: StringDict;  // 変更がないデータ
    cellWidth: Ref<number>;
    cellHeight: Ref<number>;
    tileDictDict: Ref<TileDictDict>;
}

// モジュールスコープでインスタンスを1つだけ作る（シングルトン）
const tilemapFilepathDict = <StringDict>{
    'sea': '/public/img/tiles/tilemap_sea.png',
    'land': '/public/img/tiles/tilemap_land.png',
};

export function createSourceTilemaps(srcTileRectangles: SourceTileRectangles): SourceTilemaps {
    const cellWidth: Ref<number> = ref(32);
    const cellHeight: Ref<number> = ref(32);

    const tileDictDict = ref<TileDictDict>({
        "land" : {
            // FIXME ダミーデータ
            'sea_0': srcTileRectangles.tileDictDict.value["land"]["sea_0"],   // 海
            'sea_1': srcTileRectangles.tileDictDict.value["land"]["sea_1"],   // 海岸線
            'sea_2': srcTileRectangles.tileDictDict.value["land"]["sea_2"],
            'sea_3': srcTileRectangles.tileDictDict.value["land"]["sea_3"],
            'sea_3_1': srcTileRectangles.tileDictDict.value["land"]["sea_3_1"],

            'sea_4': srcTileRectangles.tileDictDict.value["land"]["sea_4"],
            'sea_5': srcTileRectangles.tileDictDict.value["land"]["sea_5"],
            'sea_6': srcTileRectangles.tileDictDict.value["land"]["sea_6"],
            'sea_6_2': srcTileRectangles.tileDictDict.value["land"]["sea_6_2"],
            'sea_7': srcTileRectangles.tileDictDict.value["land"]["sea_7"],
            'sea_7_1': srcTileRectangles.tileDictDict.value["land"]["sea_7_1"],

            'sea_7_2': srcTileRectangles.tileDictDict.value["land"]["sea_7_2"],
            'sea_7_3': srcTileRectangles.tileDictDict.value["land"]["sea_7_3"],
            'sea_8': srcTileRectangles.tileDictDict.value["land"]["sea_8"],
            'sea_9': srcTileRectangles.tileDictDict.value["land"]["sea_9"],
            'sea_9_8': srcTileRectangles.tileDictDict.value["land"]["sea_9_8"],
            'sea_10': srcTileRectangles.tileDictDict.value["land"]["sea_10"],

            'sea_11': srcTileRectangles.tileDictDict.value["land"]["sea_11"],
            'sea_11_1': srcTileRectangles.tileDictDict.value["land"]["sea_11_1"],
            'sea_11_8': srcTileRectangles.tileDictDict.value["land"]["sea_11_8"],
            'sea_11_9': srcTileRectangles.tileDictDict.value["land"]["sea_11_9"],
            'sea_12': srcTileRectangles.tileDictDict.value["land"]["sea_12"],
            'sea_12_8': srcTileRectangles.tileDictDict.value["land"]["sea_12_8"],

            'sea_13': srcTileRectangles.tileDictDict.value["land"]["sea_13"],
            'sea_13_1': srcTileRectangles.tileDictDict.value["land"]["sea_13_1"],
            'sea_13_8': srcTileRectangles.tileDictDict.value["land"]["sea_13_8"],
            'sea_13_9': srcTileRectangles.tileDictDict.value["land"]["sea_13_9"],
            'sea_14': srcTileRectangles.tileDictDict.value["land"]["sea_14"],
            'sea_14_2': srcTileRectangles.tileDictDict.value["land"]["sea_14_2"],

            'sea_14_4': srcTileRectangles.tileDictDict.value["land"]["sea_14_4"],
            'sea_14_6': srcTileRectangles.tileDictDict.value["land"]["sea_14_6"],
            'sea_15': srcTileRectangles.tileDictDict.value["land"]["sea_15"],
            'sea_15_1': srcTileRectangles.tileDictDict.value["land"]["sea_15_1"],
            'sea_15_2': srcTileRectangles.tileDictDict.value["land"]["sea_15_2"],
            'sea_15_3': srcTileRectangles.tileDictDict.value["land"]["sea_15_3"],

            'sea_15_4': srcTileRectangles.tileDictDict.value["land"]["sea_15_4"],
            'sea_15_5': srcTileRectangles.tileDictDict.value["land"]["sea_15_5"],
            'sea_15_6': srcTileRectangles.tileDictDict.value["land"]["sea_15_6"],
            'sea_15_7': srcTileRectangles.tileDictDict.value["land"]["sea_15_7"],
            'sea_15_8': srcTileRectangles.tileDictDict.value["land"]["sea_15_8"],
            'sea_15_9': srcTileRectangles.tileDictDict.value["land"]["sea_15_9"],

            'sea_15_10': srcTileRectangles.tileDictDict.value["land"]["sea_15_10"],
            'sea_15_11': srcTileRectangles.tileDictDict.value["land"]["sea_15_11"],
            'sea_15_12': srcTileRectangles.tileDictDict.value["land"]["sea_15_12"],
            'sea_15_13': srcTileRectangles.tileDictDict.value["land"]["sea_15_13"],
            'sea_15_14': srcTileRectangles.tileDictDict.value["land"]["sea_15_14"],
            'sea_15_15': srcTileRectangles.tileDictDict.value["land"]["sea_15_15"],

            'vocantLand': srcTileRectangles.tileDictDict.value["land"]["vocantLand"],    // 空き地
        },
        "sea" : {
            'sea_0': srcTileRectangles.tileDictDict.value["sea"]["sea_0"],   // 海
            'sea_1': srcTileRectangles.tileDictDict.value["sea"]["sea_1"],   // 海岸線
            'sea_2': srcTileRectangles.tileDictDict.value["sea"]["sea_2"],
            'sea_3': srcTileRectangles.tileDictDict.value["sea"]["sea_3"],
            'sea_3_1': srcTileRectangles.tileDictDict.value["sea"]["sea_3_1"],

            'sea_4': srcTileRectangles.tileDictDict.value["sea"]["sea_4"],
            'sea_5': srcTileRectangles.tileDictDict.value["sea"]["sea_5"],
            'sea_6': srcTileRectangles.tileDictDict.value["sea"]["sea_6"],
            'sea_6_2': srcTileRectangles.tileDictDict.value["sea"]["sea_6_2"],
            'sea_7': srcTileRectangles.tileDictDict.value["sea"]["sea_7"],
            'sea_7_1': srcTileRectangles.tileDictDict.value["sea"]["sea_7_1"],

            'sea_7_2': srcTileRectangles.tileDictDict.value["sea"]["sea_7_2"],
            'sea_7_3': srcTileRectangles.tileDictDict.value["sea"]["sea_7_3"],
            'sea_8': srcTileRectangles.tileDictDict.value["sea"]["sea_8"],
            'sea_9': srcTileRectangles.tileDictDict.value["sea"]["sea_9"],
            'sea_9_8': srcTileRectangles.tileDictDict.value["sea"]["sea_9_8"],
            'sea_10': srcTileRectangles.tileDictDict.value["sea"]["sea_10"],

            'sea_11': srcTileRectangles.tileDictDict.value["sea"]["sea_11"],
            'sea_11_1': srcTileRectangles.tileDictDict.value["sea"]["sea_11_1"],
            'sea_11_8': srcTileRectangles.tileDictDict.value["sea"]["sea_11_8"],
            'sea_11_9': srcTileRectangles.tileDictDict.value["sea"]["sea_11_9"],
            'sea_12': srcTileRectangles.tileDictDict.value["sea"]["sea_12"],
            'sea_12_8': srcTileRectangles.tileDictDict.value["sea"]["sea_12_8"],

            'sea_13': srcTileRectangles.tileDictDict.value["sea"]["sea_13"],
            'sea_13_1': srcTileRectangles.tileDictDict.value["sea"]["sea_13_1"],
            'sea_13_8': srcTileRectangles.tileDictDict.value["sea"]["sea_13_8"],
            'sea_13_9': srcTileRectangles.tileDictDict.value["sea"]["sea_13_9"],
            'sea_14': srcTileRectangles.tileDictDict.value["sea"]["sea_14"],
            'sea_14_2': srcTileRectangles.tileDictDict.value["sea"]["sea_14_2"],

            'sea_14_4': srcTileRectangles.tileDictDict.value["sea"]["sea_14_4"],
            'sea_14_6': srcTileRectangles.tileDictDict.value["sea"]["sea_14_6"],
            'sea_15': srcTileRectangles.tileDictDict.value["sea"]["sea_15"],
            'sea_15_1': srcTileRectangles.tileDictDict.value["sea"]["sea_15_1"],
            'sea_15_2': srcTileRectangles.tileDictDict.value["sea"]["sea_15_2"],
            'sea_15_3': srcTileRectangles.tileDictDict.value["sea"]["sea_15_3"],

            'sea_15_4': srcTileRectangles.tileDictDict.value["sea"]["sea_15_4"],
            'sea_15_5': srcTileRectangles.tileDictDict.value["sea"]["sea_15_5"],
            'sea_15_6': srcTileRectangles.tileDictDict.value["sea"]["sea_15_6"],
            'sea_15_7': srcTileRectangles.tileDictDict.value["sea"]["sea_15_7"],
            'sea_15_8': srcTileRectangles.tileDictDict.value["sea"]["sea_15_8"],
            'sea_15_9': srcTileRectangles.tileDictDict.value["sea"]["sea_15_9"],

            'sea_15_10': srcTileRectangles.tileDictDict.value["sea"]["sea_15_10"],
            'sea_15_11': srcTileRectangles.tileDictDict.value["sea"]["sea_15_11"],
            'sea_15_12': srcTileRectangles.tileDictDict.value["sea"]["sea_15_12"],
            'sea_15_13': srcTileRectangles.tileDictDict.value["sea"]["sea_15_13"],
            'sea_15_14': srcTileRectangles.tileDictDict.value["sea"]["sea_15_14"],
            'sea_15_15': srcTileRectangles.tileDictDict.value["sea"]["sea_15_15"],

            'wasteland': srcTileRectangles.tileDictDict.value["sea"]["wasteland"],    // 荒地
        }
    });

    return {
        tilemapFilepathDict,
        cellWidth,
        cellHeight,
        tileDictDict,
    };
}
