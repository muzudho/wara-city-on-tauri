import { ref, Ref } from 'vue';

// 型、共有データ等
import { StringDict } from '@/types/string-dict'; // @はsrcへのエイリアス
import { TileDict } from '@/types/tile-dict'; // @はsrcへのエイリアス

// タイルマップの元画像を管理する型
export interface SourceTileRectangles {
    tilemapFilepathDict: StringDict;  // 変更がないデータ
    cellWidth: Ref<number>;
    cellHeight: Ref<number>;
    tileDict: Ref<TileDict>;
}

// モジュールスコープでインスタンスを1つだけ作る（シングルトン）
const tilemapFilepathDict = <StringDict>{
    // "/public" フォルダー下のパス
    'sea': '/img/tiles/tilemap_sea.png',
    'land': '/img/tiles/tilemap_land.png',
    'wastelandRoad': '/img/tiles/tilemap_wastelandRoad.png',
};

export function createSourceTileRectangles(): SourceTileRectangles {
    const cellWidth: Ref<number> = ref(32);
    const cellHeight: Ref<number> = ref(32);

    const tileDict = ref<TileDict>({
        // 海、海岸線
        'sea_0': {srcTop:0*cellHeight.value, srcLeft:1*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},   // 海
        'sea_1': {srcTop:0*cellHeight.value, srcLeft:2*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},   // 海岸線
        'sea_2': {srcTop:0*cellHeight.value, srcLeft:3*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_3': {srcTop:0*cellHeight.value, srcLeft:4*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_3_1': {srcTop:0*cellHeight.value, srcLeft:5*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},

        'sea_4': {srcTop:1*cellHeight.value, srcLeft:0*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_5': {srcTop:1*cellHeight.value, srcLeft:1*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_6': {srcTop:1*cellHeight.value, srcLeft:2*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_6_2': {srcTop:1*cellHeight.value, srcLeft:3*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_7': {srcTop:1*cellHeight.value, srcLeft:4*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_7_1': {srcTop:1*cellHeight.value, srcLeft:5*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},

        'sea_7_2': {srcTop:2*cellHeight.value, srcLeft:0*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_7_3': {srcTop:2*cellHeight.value, srcLeft:1*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_8': {srcTop:2*cellHeight.value, srcLeft:2*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_9': {srcTop:2*cellHeight.value, srcLeft:3*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_9_8': {srcTop:2*cellHeight.value, srcLeft:4*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_10': {srcTop:2*cellHeight.value, srcLeft:5*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},

        'sea_11': {srcTop:3*cellHeight.value, srcLeft:0*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_11_1': {srcTop:3*cellHeight.value, srcLeft:1*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_11_8': {srcTop:3*cellHeight.value, srcLeft:2*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_11_9': {srcTop:3*cellHeight.value, srcLeft:3*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_12': {srcTop:3*cellHeight.value, srcLeft:4*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_12_8': {srcTop:3*cellHeight.value, srcLeft:5*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},

        'sea_13': {srcTop:4*cellHeight.value, srcLeft:0*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_13_1': {srcTop:4*cellHeight.value, srcLeft:1*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_13_8': {srcTop:4*cellHeight.value, srcLeft:2*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_13_9': {srcTop:4*cellHeight.value, srcLeft:3*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_14': {srcTop:4*cellHeight.value, srcLeft:4*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_14_2': {srcTop:4*cellHeight.value, srcLeft:5*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},

        'sea_14_4': {srcTop:5*cellHeight.value, srcLeft:0*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_14_6': {srcTop:5*cellHeight.value, srcLeft:1*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15': {srcTop:5*cellHeight.value, srcLeft:2*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_1': {srcTop:5*cellHeight.value, srcLeft:3*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_2': {srcTop:5*cellHeight.value, srcLeft:4*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_3': {srcTop:5*cellHeight.value, srcLeft:5*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},

        'sea_15_4': {srcTop:6*cellHeight.value, srcLeft:0*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_5': {srcTop:6*cellHeight.value, srcLeft:1*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_6': {srcTop:6*cellHeight.value, srcLeft:2*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_7': {srcTop:6*cellHeight.value, srcLeft:3*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_8': {srcTop:6*cellHeight.value, srcLeft:4*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_9': {srcTop:6*cellHeight.value, srcLeft:5*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},

        'sea_15_10': {srcTop:7*cellHeight.value, srcLeft:0*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_11': {srcTop:7*cellHeight.value, srcLeft:1*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_12': {srcTop:7*cellHeight.value, srcLeft:2*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_13': {srcTop:7*cellHeight.value, srcLeft:3*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_14': {srcTop:7*cellHeight.value, srcLeft:4*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_15': {srcTop:7*cellHeight.value, srcLeft:5*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['sea']},

        'wasteland': {srcTop:0*cellHeight.value, srcLeft:0*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['land']},    // 荒地
        'vocantLand': {srcTop:0*cellHeight.value, srcLeft:1*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['land']},    // 空き地

        // 荒地の道
        'wastelandRoad_0': {srcTop:0*cellHeight.value, srcLeft:1*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},   // 海
        'wastelandRoad_16': {srcTop:0*cellHeight.value, srcLeft:2*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},   // 海岸線
        'wastelandRoad_32': {srcTop:0*cellHeight.value, srcLeft:3*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_48': {srcTop:0*cellHeight.value, srcLeft:4*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_49': {srcTop:0*cellHeight.value, srcLeft:5*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},

        'wastelandRoad_64': {srcTop:1*cellHeight.value, srcLeft:0*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_80': {srcTop:1*cellHeight.value, srcLeft:1*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_96': {srcTop:1*cellHeight.value, srcLeft:2*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_98': {srcTop:1*cellHeight.value, srcLeft:3*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_112': {srcTop:1*cellHeight.value, srcLeft:4*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_113': {srcTop:1*cellHeight.value, srcLeft:5*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},

        'wastelandRoad_114': {srcTop:2*cellHeight.value, srcLeft:0*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_115': {srcTop:2*cellHeight.value, srcLeft:1*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_128': {srcTop:2*cellHeight.value, srcLeft:2*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_144': {srcTop:2*cellHeight.value, srcLeft:3*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_152': {srcTop:2*cellHeight.value, srcLeft:4*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_160': {srcTop:2*cellHeight.value, srcLeft:5*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},

        'wastelandRoad_176': {srcTop:3*cellHeight.value, srcLeft:0*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_177': {srcTop:3*cellHeight.value, srcLeft:1*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_184': {srcTop:3*cellHeight.value, srcLeft:2*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_185': {srcTop:3*cellHeight.value, srcLeft:3*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_192': {srcTop:3*cellHeight.value, srcLeft:4*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_196': {srcTop:3*cellHeight.value, srcLeft:5*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},

        'wastelandRoad_208': {srcTop:4*cellHeight.value, srcLeft:0*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_212': {srcTop:4*cellHeight.value, srcLeft:1*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_216': {srcTop:4*cellHeight.value, srcLeft:2*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_220': {srcTop:4*cellHeight.value, srcLeft:3*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_224': {srcTop:4*cellHeight.value, srcLeft:4*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_226': {srcTop:4*cellHeight.value, srcLeft:5*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},

        'wastelandRoad_228': {srcTop:5*cellHeight.value, srcLeft:0*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_230': {srcTop:5*cellHeight.value, srcLeft:1*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_240': {srcTop:5*cellHeight.value, srcLeft:2*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_241': {srcTop:5*cellHeight.value, srcLeft:3*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_242': {srcTop:5*cellHeight.value, srcLeft:4*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_243': {srcTop:5*cellHeight.value, srcLeft:5*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},

        'wastelandRoad_244': {srcTop:6*cellHeight.value, srcLeft:0*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_245': {srcTop:6*cellHeight.value, srcLeft:1*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_246': {srcTop:6*cellHeight.value, srcLeft:2*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_247': {srcTop:6*cellHeight.value, srcLeft:3*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_248': {srcTop:6*cellHeight.value, srcLeft:4*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_249': {srcTop:6*cellHeight.value, srcLeft:5*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},

        'wastelandRoad_250': {srcTop:7*cellHeight.value, srcLeft:0*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_251': {srcTop:7*cellHeight.value, srcLeft:1*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_252': {srcTop:7*cellHeight.value, srcLeft:2*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_253': {srcTop:7*cellHeight.value, srcLeft:3*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_254': {srcTop:7*cellHeight.value, srcLeft:4*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
        'wastelandRoad_255': {srcTop:7*cellHeight.value, srcLeft:5*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict['wastelandRoad']},
    });

    return {
        tilemapFilepathDict,
        cellWidth,
        cellHeight,
        tileDict,
    };
}
