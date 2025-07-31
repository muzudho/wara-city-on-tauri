import { ref, Ref } from 'vue';

// 型、共有データ等
import { StringDict } from '@/types/string-dict'; // @はsrcへのエイリアス
import { TileDict } from '@/types/tile-dict'; // @はsrcへのエイリアス
import { TileItem } from '@/interfaces/tile-item'; // @はsrcへのエイリアス

// タイルマップの元画像を管理する型
export interface SourceTileRectangles {
    tilemapFilepathDict: StringDict;  // 変更がないデータ
    cellWidth: Ref<number>;
    cellHeight: Ref<number>;
    tileDict: Ref<TileDict>;

    getTileByName: (name: string) => TileItem;
}

// モジュールスコープでインスタンスを1つだけ作る（シングルトン）
const tilemapFilepathDict = <StringDict>{
    // "/public" フォルダー下のパス
    'land': '/img/tiles/tilemap_land.png',
    'out': '/img/tiles/tilemap_out.png',
    'outBorder': '/img/tiles/tilemap_outBorder.png',
    'sea': '/img/tiles/tilemap_sea.png',
    'seaBorder': '/img/tiles/tilemap_seaBorder.png',
    'system': '/img/tiles/tilemap_system.png',
    'wastelandRoad': '/img/tiles/tilemap_wastelandRoad.png',
    'wastelandBorder': '/img/tiles/tilemap_wastelandBorder.png',
};

export function createSourceTileRectangles(): SourceTileRectangles {
    const cellWidth: Ref<number> = ref(32);     // FIXME: タイルサイズの初期値どうする？
    const cellHeight: Ref<number> = ref(32);

    function makeTile(y: number, x: number, tilemap: string) {
        return {srcTop:y*cellHeight.value, srcLeft:x*cellWidth.value, srcWidth:cellWidth.value, srcHeight:cellHeight.value, tilemapUrl:tilemapFilepathDict[tilemap]};
    }

    const rawTileDict = <TileDict>{
        'noImage': makeTile(0, 1, 'land'),    // 画像無しマーク
        'wasteland': makeTile(0, 0, 'land'),    // 荒地
        'vocantLand': makeTile(0, 1, 'land'),    // 空き地
    }

    // ８方向タイル（無印）
    function makeEightBorderTilemap(tilemap: string) {
        const rawDict = <TileDict>{};

        rawDict[`${tilemap}_0`] = makeTile(0, 1, tilemap);
        rawDict[`${tilemap}_16`] = makeTile(0, 2, tilemap);
        rawDict[`${tilemap}_32`] = makeTile(0, 3, tilemap);
        rawDict[`${tilemap}_48`] = makeTile(0, 4, tilemap);
        rawDict[`${tilemap}_49`] = makeTile(0, 5, tilemap);

        rawDict[`${tilemap}_64`] = makeTile(1, 0, tilemap);
        rawDict[`${tilemap}_80`] = makeTile(1, 1, tilemap);
        rawDict[`${tilemap}_96`] = makeTile(1, 2, tilemap);
        rawDict[`${tilemap}_98`] = makeTile(1, 3, tilemap);
        rawDict[`${tilemap}_112`] = makeTile(1, 4, tilemap);
        rawDict[`${tilemap}_113`] = makeTile(1, 5, tilemap);

        rawDict[`${tilemap}_114`] = makeTile(2, 0, tilemap);
        rawDict[`${tilemap}_115`] = makeTile(2, 1, tilemap);
        rawDict[`${tilemap}_128`] = makeTile(2, 2, tilemap);
        rawDict[`${tilemap}_144`] = makeTile(2, 3, tilemap);
        rawDict[`${tilemap}_152`] = makeTile(2, 4, tilemap);
        rawDict[`${tilemap}_160`] = makeTile(2, 5, tilemap);

        rawDict[`${tilemap}_176`] = makeTile(3, 0, tilemap);
        rawDict[`${tilemap}_177`] = makeTile(3, 1, tilemap);
        rawDict[`${tilemap}_184`] = makeTile(3, 2, tilemap);
        rawDict[`${tilemap}_185`] = makeTile(3, 3, tilemap);
        rawDict[`${tilemap}_192`] = makeTile(3, 4, tilemap);
        rawDict[`${tilemap}_196`] = makeTile(3, 5, tilemap);

        rawDict[`${tilemap}_208`] = makeTile(4, 0, tilemap);
        rawDict[`${tilemap}_212`] = makeTile(4, 1, tilemap);
        rawDict[`${tilemap}_216`] = makeTile(4, 2, tilemap);
        rawDict[`${tilemap}_220`] = makeTile(4, 3, tilemap);
        rawDict[`${tilemap}_224`] = makeTile(4, 4, tilemap);
        rawDict[`${tilemap}_226`] = makeTile(4, 5, tilemap);

        rawDict[`${tilemap}_228`] = makeTile(5, 0, tilemap);
        rawDict[`${tilemap}_230`] = makeTile(5, 1, tilemap);
        rawDict[`${tilemap}_240`] = makeTile(5, 2, tilemap);
        rawDict[`${tilemap}_241`] = makeTile(5, 3, tilemap);
        rawDict[`${tilemap}_242`] = makeTile(5, 4, tilemap);
        rawDict[`${tilemap}_243`] = makeTile(5, 5, tilemap);

        rawDict[`${tilemap}_244`] = makeTile(6, 0, tilemap);
        rawDict[`${tilemap}_245`] = makeTile(6, 1, tilemap);
        rawDict[`${tilemap}_246`] = makeTile(6, 2, tilemap);
        rawDict[`${tilemap}_247`] = makeTile(6, 3, tilemap);
        rawDict[`${tilemap}_248`] = makeTile(6, 4, tilemap);
        rawDict[`${tilemap}_249`] = makeTile(6, 5, tilemap);

        rawDict[`${tilemap}_250`] = makeTile(7, 0, tilemap);
        rawDict[`${tilemap}_251`] = makeTile(7, 1, tilemap);
        rawDict[`${tilemap}_252`] = makeTile(7, 2, tilemap);
        rawDict[`${tilemap}_253`] = makeTile(7, 3, tilemap);
        rawDict[`${tilemap}_254`] = makeTile(7, 4, tilemap);
        rawDict[`${tilemap}_255`] = makeTile(7, 5, tilemap);

        return rawDict;
    }

        // ４方向タイル（Aタイプ）
    function makeFourDirectionBorderTilemap(tilemap: string) {
        const rawDict = <TileDict>{};

        rawDict[`${tilemap}_A0`] = makeTile(0, 0, tilemap);
        rawDict[`${tilemap}_A16`] = makeTile(0, 1, tilemap);
        rawDict[`${tilemap}_A32`] = makeTile(0, 2, tilemap);
        rawDict[`${tilemap}_A48`] = makeTile(0, 3, tilemap);

        rawDict[`${tilemap}_A64`] = makeTile(1, 0, tilemap);
        rawDict[`${tilemap}_A80`] = makeTile(1, 1, tilemap);
        rawDict[`${tilemap}_A96`] = makeTile(1, 2, tilemap);
        rawDict[`${tilemap}_A112`] = makeTile(1, 3, tilemap);

        rawDict[`${tilemap}_A128`] = makeTile(2, 0, tilemap);
        rawDict[`${tilemap}_A144`] = makeTile(2, 1, tilemap);
        rawDict[`${tilemap}_A160`] = makeTile(2, 2, tilemap);
        rawDict[`${tilemap}_A176`] = makeTile(2, 3, tilemap);

        rawDict[`${tilemap}_A192`] = makeTile(3, 0, tilemap);
        rawDict[`${tilemap}_A208`] = makeTile(3, 1, tilemap);
        rawDict[`${tilemap}_A224`] = makeTile(3, 2, tilemap);
        rawDict[`${tilemap}_A240`] = makeTile(3, 3, tilemap);

        return rawDict;
    }

    Object.assign(rawTileDict, makeEightBorderTilemap('out'));
    Object.assign(rawTileDict, makeFourDirectionBorderTilemap('outBorder'));
    Object.assign(rawTileDict, makeEightBorderTilemap('sea'));
    Object.assign(rawTileDict, makeFourDirectionBorderTilemap('seaBorder'));
    Object.assign(rawTileDict, makeEightBorderTilemap('wastelandRoad'));
    Object.assign(rawTileDict, makeFourDirectionBorderTilemap('wastelandBorder'));

    const tileDict = ref<TileDict>(rawTileDict);

    return {
        tilemapFilepathDict,
        cellWidth,
        cellHeight,
        tileDict,
        getTileByName: (name: string)=>{
            return rawTileDict[name];
        },
    };
}
