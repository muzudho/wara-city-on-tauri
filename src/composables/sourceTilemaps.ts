import { ref, Ref } from 'vue';

// 型、共有データ等
import { StringDict } from '@/types/string-dict'; // @はsrcへのエイリアス
import { TileDict } from '@/types/tile-dict'; // @はsrcへのエイリアス

// タイルマップの元画像を管理する型
export interface SourceTilemaps {
    tilemapFilepathDict: StringDict;  // 変更がないデータ
    cellWidth: Ref<number>;
    cellHeight: Ref<number>;
    tileDict: Ref<TileDict>;
}

// モジュールスコープでインスタンスを1つだけ作る（シングルトン）
const tilemapFilepathDict = <StringDict>{
    'sea': '/public/img/tiles/tilemap_sea.png',
    'land': '/public/img/tiles/tilemap_land.png',
};

export function createSourceTilemaps(): SourceTilemaps {
    const cellWidth: Ref<number> = ref(32);
    const cellHeight: Ref<number> = ref(32);
    const tileDict = ref<TileDict>({
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
    });

    return {
        tilemapFilepathDict,
        cellWidth,
        cellHeight,
        tileDict,
    };
}
