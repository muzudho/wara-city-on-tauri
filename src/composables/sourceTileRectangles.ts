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

    function makeTile(y: number, x: number, tilemap: string) {
        return {srcTop:y*cellHeight.value, srcLeft:x*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict[tilemap]};
    }

    const rawTileDict = <TileDict>{
        // 海、海岸線
        'sea_0': makeTile(0, 1, 'sea'),   // 海
        'sea_1': makeTile(0, 2, 'sea'),   // 海岸線
        'sea_2': makeTile(0, 3, 'sea'),
        'sea_3': makeTile(0, 4, 'sea'),
        'sea_3_1': makeTile(0, 5, 'sea'),

        'sea_4': makeTile(1, 0, 'sea'),
        'sea_5': makeTile(1, 1, 'sea'),
        'sea_6': makeTile(1, 2, 'sea'),
        'sea_6_2': makeTile(1, 3, 'sea'),
        'sea_7': makeTile(1, 4, 'sea'),
        'sea_7_1': makeTile(1, 5, 'sea'),

        'sea_7_2': makeTile(2, 0, 'sea'),
        'sea_7_3': makeTile(2, 1, 'sea'),
        'sea_8': makeTile(2, 2, 'sea'),
        'sea_9': makeTile(2, 3, 'sea'),
        'sea_9_8': makeTile(2, 4, 'sea'),
        'sea_10': makeTile(2, 5, 'sea'),

        'sea_11': makeTile(3, 0, 'sea'),
        'sea_11_1': makeTile(3, 1, 'sea'),
        'sea_11_8': makeTile(3, 2, 'sea'),
        'sea_11_9': makeTile(3, 3, 'sea'),
        'sea_12': makeTile(3, 4, 'sea'),
        'sea_12_8': makeTile(3, 5, 'sea'),

        'sea_13': makeTile(4, 0, 'sea'),
        'sea_13_1': makeTile(4, 1, 'sea'),
        'sea_13_8': makeTile(4, 2, 'sea'),
        'sea_13_9': makeTile(4, 3, 'sea'),
        'sea_14': makeTile(4, 4, 'sea'),
        'sea_14_2': makeTile(4, 5, 'sea'),

        'sea_14_4': makeTile(5, 0, 'sea'),
        'sea_14_6': makeTile(5, 1, 'sea'),
        'sea_15': makeTile(5, 2, 'sea'),
        'sea_15_1': makeTile(5, 3, 'sea'),
        'sea_15_2': makeTile(5, 4, 'sea'),
        'sea_15_3': makeTile(5, 5, 'sea'),

        'sea_15_4': makeTile(6, 0, 'sea'),
        'sea_15_5': makeTile(6, 1, 'sea'),
        'sea_15_6': makeTile(6, 2, 'sea'),
        'sea_15_7': makeTile(6, 3, 'sea'),
        'sea_15_8': makeTile(6, 4, 'sea'),
        'sea_15_9': makeTile(6, 5, 'sea'),

        'sea_15_10': makeTile(7, 0, 'sea'),
        'sea_15_11': makeTile(7, 1, 'sea'),
        'sea_15_12': makeTile(7, 2, 'sea'),
        'sea_15_13': makeTile(7, 3, 'sea'),
        'sea_15_14': makeTile(7, 4, 'sea'),
        'sea_15_15': makeTile(7, 5, 'sea'),

        'wasteland': makeTile(0, 0, 'land'),    // 荒地
        'vocantLand': makeTile(0, 1, 'land'),    // 空き地
    }

    function makeBorderTilemap(tilemap: string) {
        // const rawDict = <TileDict>{};
        // rawDict[`${tilemap}_0`] = makeTile(0, 1, tilemap);  // 海

        return {
            // 荒地の道
            'wastelandRoad_0': makeTile(0, 1, tilemap),   // 海
            'wastelandRoad_16': makeTile(0, 2, tilemap),   // 海岸線
            'wastelandRoad_32': makeTile(0, 3, tilemap),
            'wastelandRoad_48': makeTile(0, 4, tilemap),
            'wastelandRoad_49': makeTile(0, 5, tilemap),

            'wastelandRoad_64': makeTile(1, 0, tilemap),
            'wastelandRoad_80': makeTile(1, 1, tilemap),
            'wastelandRoad_96': makeTile(1, 2, tilemap),
            'wastelandRoad_98': makeTile(1, 3, tilemap),
            'wastelandRoad_112': makeTile(1, 4, tilemap),
            'wastelandRoad_113': makeTile(1, 5, tilemap),

            'wastelandRoad_114': makeTile(2, 0, tilemap),
            'wastelandRoad_115': makeTile(2, 1, tilemap),
            'wastelandRoad_128': makeTile(2, 2, tilemap),
            'wastelandRoad_144': makeTile(2, 3, tilemap),
            'wastelandRoad_152': makeTile(2, 4, tilemap),
            'wastelandRoad_160': makeTile(2, 5, tilemap),

            'wastelandRoad_176': makeTile(3, 0, tilemap),
            'wastelandRoad_177': makeTile(3, 1, tilemap),
            'wastelandRoad_184': makeTile(3, 2, tilemap),
            'wastelandRoad_185': makeTile(3, 3, tilemap),
            'wastelandRoad_192': makeTile(3, 4, tilemap),
            'wastelandRoad_196': makeTile(3, 5, tilemap),

            'wastelandRoad_208': makeTile(4, 0, tilemap),
            'wastelandRoad_212': makeTile(4, 1, tilemap),
            'wastelandRoad_216': makeTile(4, 2, tilemap),
            'wastelandRoad_220': makeTile(4, 3, tilemap),
            'wastelandRoad_224': makeTile(4, 4, tilemap),
            'wastelandRoad_226': makeTile(4, 5, tilemap),

            'wastelandRoad_228': makeTile(5, 0, tilemap),
            'wastelandRoad_230': makeTile(5, 1, tilemap),
            'wastelandRoad_240': makeTile(5, 2, tilemap),
            'wastelandRoad_241': makeTile(5, 3, tilemap),
            'wastelandRoad_242': makeTile(5, 4, tilemap),
            'wastelandRoad_243': makeTile(5, 5, tilemap),

            'wastelandRoad_244': makeTile(6, 0, tilemap),
            'wastelandRoad_245': makeTile(6, 1, tilemap),
            'wastelandRoad_246': makeTile(6, 2, tilemap),
            'wastelandRoad_247': makeTile(6, 3, tilemap),
            'wastelandRoad_248': makeTile(6, 4, tilemap),
            'wastelandRoad_249': makeTile(6, 5, tilemap),

            'wastelandRoad_250': makeTile(7, 0, tilemap),
            'wastelandRoad_251': makeTile(7, 1, tilemap),
            'wastelandRoad_252': makeTile(7, 2, tilemap),
            'wastelandRoad_253': makeTile(7, 3, tilemap),
            'wastelandRoad_254': makeTile(7, 4, tilemap),
            'wastelandRoad_255': makeTile(7, 5, tilemap),
        };
    }

    Object.assign(rawTileDict, makeBorderTilemap('wastelandRoad'));

    const tileDict = ref<TileDict>(rawTileDict);

    return {
        tilemapFilepathDict,
        cellWidth,
        cellHeight,
        tileDict,
    };
}
