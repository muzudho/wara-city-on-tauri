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
        },
        "wastelandRoad" : {
            'wastelandRoad_0': srcTileRectangles.tileDict.value["wastelandRoad_0"],   // 海
            'wastelandRoad_16': srcTileRectangles.tileDict.value["wastelandRoad_16"],   // 海岸線
            'wastelandRoad_32': srcTileRectangles.tileDict.value["wastelandRoad_32"],
            'wastelandRoad_48': srcTileRectangles.tileDict.value["wastelandRoad_48"],
            'wastelandRoad_49': srcTileRectangles.tileDict.value["wastelandRoad_49"],

            'wastelandRoad_64': srcTileRectangles.tileDict.value["wastelandRoad_64"],
            'wastelandRoad_80': srcTileRectangles.tileDict.value["wastelandRoad_80"],
            'wastelandRoad_96': srcTileRectangles.tileDict.value["wastelandRoad_96"],
            'wastelandRoad_98': srcTileRectangles.tileDict.value["wastelandRoad_98"],
            'wastelandRoad_112': srcTileRectangles.tileDict.value["wastelandRoad_112"],
            'wastelandRoad_113': srcTileRectangles.tileDict.value["wastelandRoad_113"],

            'wastelandRoad_114': srcTileRectangles.tileDict.value["wastelandRoad_114"],
            'wastelandRoad_115': srcTileRectangles.tileDict.value["wastelandRoad_115"],
            'wastelandRoad_128': srcTileRectangles.tileDict.value["wastelandRoad_128"],
            'wastelandRoad_144': srcTileRectangles.tileDict.value["wastelandRoad_144"],
            'wastelandRoad_152': srcTileRectangles.tileDict.value["wastelandRoad_152"],
            'wastelandRoad_160': srcTileRectangles.tileDict.value["wastelandRoad_160"],

            'wastelandRoad_176': srcTileRectangles.tileDict.value["wastelandRoad_176"],
            'wastelandRoad_177': srcTileRectangles.tileDict.value["wastelandRoad_177"],
            'wastelandRoad_184': srcTileRectangles.tileDict.value["wastelandRoad_184"],
            'wastelandRoad_185': srcTileRectangles.tileDict.value["wastelandRoad_185"],
            'wastelandRoad_192': srcTileRectangles.tileDict.value["wastelandRoad_192"],
            'wastelandRoad_196': srcTileRectangles.tileDict.value["wastelandRoad_196"],

            'wastelandRoad_208': srcTileRectangles.tileDict.value["wastelandRoad_208"],
            'wastelandRoad_212': srcTileRectangles.tileDict.value["wastelandRoad_212"],
            'wastelandRoad_216': srcTileRectangles.tileDict.value["wastelandRoad_216"],
            'wastelandRoad_220': srcTileRectangles.tileDict.value["wastelandRoad_220"],
            'wastelandRoad_224': srcTileRectangles.tileDict.value["wastelandRoad_224"],
            'wastelandRoad_226': srcTileRectangles.tileDict.value["wastelandRoad_226"],

            'wastelandRoad_228': srcTileRectangles.tileDict.value["wastelandRoad_228"],
            'wastelandRoad_230': srcTileRectangles.tileDict.value["wastelandRoad_230"],
            'wastelandRoad_240': srcTileRectangles.tileDict.value["wastelandRoad_240"],
            'wastelandRoad_241': srcTileRectangles.tileDict.value["wastelandRoad_241"],
            'wastelandRoad_242': srcTileRectangles.tileDict.value["wastelandRoad_242"],
            'wastelandRoad_243': srcTileRectangles.tileDict.value["wastelandRoad_243"],

            'wastelandRoad_244': srcTileRectangles.tileDict.value["wastelandRoad_244"],
            'wastelandRoad_245': srcTileRectangles.tileDict.value["wastelandRoad_245"],
            'wastelandRoad_246': srcTileRectangles.tileDict.value["wastelandRoad_246"],
            'wastelandRoad_247': srcTileRectangles.tileDict.value["wastelandRoad_247"],
            'wastelandRoad_248': srcTileRectangles.tileDict.value["wastelandRoad_248"],
            'wastelandRoad_249': srcTileRectangles.tileDict.value["wastelandRoad_249"],

            'wastelandRoad_250': srcTileRectangles.tileDict.value["wastelandRoad_250"],
            'wastelandRoad_251': srcTileRectangles.tileDict.value["wastelandRoad_251"],
            'wastelandRoad_252': srcTileRectangles.tileDict.value["wastelandRoad_252"],
            'wastelandRoad_253': srcTileRectangles.tileDict.value["wastelandRoad_253"],
            'wastelandRoad_254': srcTileRectangles.tileDict.value["wastelandRoad_254"],
            'wastelandRoad_255': srcTileRectangles.tileDict.value["wastelandRoad_255"],
        },
    });

    return {
        tileDictDict,
    };
}
