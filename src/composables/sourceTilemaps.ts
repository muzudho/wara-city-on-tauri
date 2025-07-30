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
        // TODO ローカル関数で生成したい
        "sea" : {
            'sea_0': srcTileRectangles.tileDict.value["sea_0"],   // 海
            'sea_16': srcTileRectangles.tileDict.value["sea_16"],   // 海岸線
            'sea_32': srcTileRectangles.tileDict.value["sea_32"],
            'sea_48': srcTileRectangles.tileDict.value["sea_48"],
            'sea_49': srcTileRectangles.tileDict.value["sea_49"],

            'sea_64': srcTileRectangles.tileDict.value["sea_64"],
            'sea_80': srcTileRectangles.tileDict.value["sea_80"],
            'sea_96': srcTileRectangles.tileDict.value["sea_96"],
            'sea_98': srcTileRectangles.tileDict.value["sea_98"],
            'sea_112': srcTileRectangles.tileDict.value["sea_112"],
            'sea_113': srcTileRectangles.tileDict.value["sea_113"],

            'sea_114': srcTileRectangles.tileDict.value["sea_114"],
            'sea_115': srcTileRectangles.tileDict.value["sea_115"],
            'sea_128': srcTileRectangles.tileDict.value["sea_128"],
            'sea_144': srcTileRectangles.tileDict.value["sea_144"],
            'sea_152': srcTileRectangles.tileDict.value["sea_152"],
            'sea_160': srcTileRectangles.tileDict.value["sea_160"],

            'sea_176': srcTileRectangles.tileDict.value["sea_176"],
            'sea_177': srcTileRectangles.tileDict.value["sea_177"],
            'sea_184': srcTileRectangles.tileDict.value["sea_184"],
            'sea_185': srcTileRectangles.tileDict.value["sea_185"],
            'sea_192': srcTileRectangles.tileDict.value["sea_192"],
            'sea_196': srcTileRectangles.tileDict.value["sea_196"],

            'sea_208': srcTileRectangles.tileDict.value["sea_208"],
            'sea_212': srcTileRectangles.tileDict.value["sea_212"],
            'sea_216': srcTileRectangles.tileDict.value["sea_216"],
            'sea_220': srcTileRectangles.tileDict.value["sea_220"],
            'sea_224': srcTileRectangles.tileDict.value["sea_224"],
            'sea_226': srcTileRectangles.tileDict.value["sea_226"],

            'sea_228': srcTileRectangles.tileDict.value["sea_228"],
            'sea_230': srcTileRectangles.tileDict.value["sea_230"],
            'sea_240': srcTileRectangles.tileDict.value["sea_240"],
            'sea_241': srcTileRectangles.tileDict.value["sea_241"],
            'sea_242': srcTileRectangles.tileDict.value["sea_242"],
            'sea_243': srcTileRectangles.tileDict.value["sea_243"],

            'sea_244': srcTileRectangles.tileDict.value["sea_244"],
            'sea_245': srcTileRectangles.tileDict.value["sea_245"],
            'sea_246': srcTileRectangles.tileDict.value["sea_246"],
            'sea_247': srcTileRectangles.tileDict.value["sea_247"],
            'sea_248': srcTileRectangles.tileDict.value["sea_248"],
            'sea_249': srcTileRectangles.tileDict.value["sea_249"],

            'sea_250': srcTileRectangles.tileDict.value["sea_250"],
            'sea_251': srcTileRectangles.tileDict.value["sea_251"],
            'sea_252': srcTileRectangles.tileDict.value["sea_252"],
            'sea_253': srcTileRectangles.tileDict.value["sea_253"],
            'sea_254': srcTileRectangles.tileDict.value["sea_254"],
            'sea_255': srcTileRectangles.tileDict.value["sea_255"],
        },
        "wastelandRoad" : {
            'wastelandRoad_0': srcTileRectangles.tileDict.value["wastelandRoad_0"],
            'wastelandRoad_16': srcTileRectangles.tileDict.value["wastelandRoad_16"],
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
