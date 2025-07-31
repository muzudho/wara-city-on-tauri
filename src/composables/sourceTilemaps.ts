import { ref, Ref } from 'vue';

// 型、共有データ等。 @はsrcへのエイリアス
import { SourceTileRectangles } from '@/composables/sourceTileRectangles';
import { TilemapData } from '@/interfaces/tilemap-data';
import { TileDict } from '@/types/tile-dict';
import { TilemapDict } from '@/types/tilemap-dict';
import { TileDictDict } from '@/types/tile-dict-dict';

// タイルマップの元画像を管理する型
export interface SourceTilemaps {
    tileDictDict: Ref<TileDictDict>;    // タイルの辞書。
    tilemapDict: Ref<TilemapDict>;

    getTileDictByName: (name: string) => TileDict;
    getTilemapByName: (name: string) => TilemapData;
}

export function createSourceTilemaps(srcTileRectangles: SourceTileRectangles): SourceTilemaps {
    const tileDictDict = ref<TileDictDict>({
        "land" : {
            'land_wasteland': srcTileRectangles.tileDict.value["land_wasteland"],    // 荒地
            'land_vocantLand': srcTileRectangles.tileDict.value["land_vocantLand"],    // 空き地
        },
        "system": {
            'system_noImage': srcTileRectangles.tileDict.value["system_noImage"],    // 画像無しマーク
        },
    });
    const tilemapDict = ref<TilemapDict>({
        "land" : {
            "tileDict": tileDictDict.value["land"],
            "paletteWidth": 128,
            "paletteHeight": 128,
        },
        "system": {
            "tileDict": tileDictDict.value["system"],
            "paletteWidth": 128,
            "paletteHeight": 128,
        },
    });

    // ８方向タイル（無印）を切り抜く
    function cropEightDirectionTileDict(tilemap: string) {
        const tileDict = <TileDict>{};

        tileDict[`${tilemap}_0`] = srcTileRectangles.tileDict.value[`${tilemap}_0`];
        tileDict[`${tilemap}_16`] = srcTileRectangles.tileDict.value[`${tilemap}_16`];
        tileDict[`${tilemap}_32`] = srcTileRectangles.tileDict.value[`${tilemap}_32`];
        tileDict[`${tilemap}_48`] = srcTileRectangles.tileDict.value[`${tilemap}_48`];
        tileDict[`${tilemap}_49`] = srcTileRectangles.tileDict.value[`${tilemap}_49`];

        tileDict[`${tilemap}_64`] = srcTileRectangles.tileDict.value[`${tilemap}_64`];
        tileDict[`${tilemap}_80`] = srcTileRectangles.tileDict.value[`${tilemap}_80`];
        tileDict[`${tilemap}_96`] = srcTileRectangles.tileDict.value[`${tilemap}_96`];
        tileDict[`${tilemap}_98`] = srcTileRectangles.tileDict.value[`${tilemap}_98`];
        tileDict[`${tilemap}_112`] = srcTileRectangles.tileDict.value[`${tilemap}_112`];
        tileDict[`${tilemap}_113`] = srcTileRectangles.tileDict.value[`${tilemap}_113`];

        tileDict[`${tilemap}_114`] = srcTileRectangles.tileDict.value[`${tilemap}_114`];
        tileDict[`${tilemap}_115`] = srcTileRectangles.tileDict.value[`${tilemap}_115`];
        tileDict[`${tilemap}_128`] = srcTileRectangles.tileDict.value[`${tilemap}_128`];
        tileDict[`${tilemap}_144`] = srcTileRectangles.tileDict.value[`${tilemap}_144`];
        tileDict[`${tilemap}_152`] = srcTileRectangles.tileDict.value[`${tilemap}_152`];
        tileDict[`${tilemap}_160`] = srcTileRectangles.tileDict.value[`${tilemap}_160`];

        tileDict[`${tilemap}_176`] = srcTileRectangles.tileDict.value[`${tilemap}_176`];
        tileDict[`${tilemap}_177`] = srcTileRectangles.tileDict.value[`${tilemap}_177`];
        tileDict[`${tilemap}_184`] = srcTileRectangles.tileDict.value[`${tilemap}_184`];
        tileDict[`${tilemap}_185`] = srcTileRectangles.tileDict.value[`${tilemap}_185`];
        tileDict[`${tilemap}_192`] = srcTileRectangles.tileDict.value[`${tilemap}_192`];
        tileDict[`${tilemap}_196`] = srcTileRectangles.tileDict.value[`${tilemap}_196`];

        tileDict[`${tilemap}_208`] = srcTileRectangles.tileDict.value[`${tilemap}_208`];
        tileDict[`${tilemap}_212`] = srcTileRectangles.tileDict.value[`${tilemap}_212`];
        tileDict[`${tilemap}_216`] = srcTileRectangles.tileDict.value[`${tilemap}_216`];
        tileDict[`${tilemap}_220`] = srcTileRectangles.tileDict.value[`${tilemap}_220`];
        tileDict[`${tilemap}_224`] = srcTileRectangles.tileDict.value[`${tilemap}_224`];
        tileDict[`${tilemap}_226`] = srcTileRectangles.tileDict.value[`${tilemap}_226`];

        tileDict[`${tilemap}_228`] = srcTileRectangles.tileDict.value[`${tilemap}_228`];
        tileDict[`${tilemap}_230`] = srcTileRectangles.tileDict.value[`${tilemap}_230`];
        tileDict[`${tilemap}_240`] = srcTileRectangles.tileDict.value[`${tilemap}_240`];
        tileDict[`${tilemap}_241`] = srcTileRectangles.tileDict.value[`${tilemap}_241`];
        tileDict[`${tilemap}_242`] = srcTileRectangles.tileDict.value[`${tilemap}_242`];
        tileDict[`${tilemap}_243`] = srcTileRectangles.tileDict.value[`${tilemap}_243`];

        tileDict[`${tilemap}_244`] = srcTileRectangles.tileDict.value[`${tilemap}_244`];
        tileDict[`${tilemap}_245`] = srcTileRectangles.tileDict.value[`${tilemap}_245`];
        tileDict[`${tilemap}_246`] = srcTileRectangles.tileDict.value[`${tilemap}_246`];
        tileDict[`${tilemap}_247`] = srcTileRectangles.tileDict.value[`${tilemap}_247`];
        tileDict[`${tilemap}_248`] = srcTileRectangles.tileDict.value[`${tilemap}_248`];
        tileDict[`${tilemap}_249`] = srcTileRectangles.tileDict.value[`${tilemap}_249`];

        tileDict[`${tilemap}_250`] = srcTileRectangles.tileDict.value[`${tilemap}_250`];
        tileDict[`${tilemap}_251`] = srcTileRectangles.tileDict.value[`${tilemap}_251`];
        tileDict[`${tilemap}_252`] = srcTileRectangles.tileDict.value[`${tilemap}_252`];
        tileDict[`${tilemap}_253`] = srcTileRectangles.tileDict.value[`${tilemap}_253`];
        tileDict[`${tilemap}_254`] = srcTileRectangles.tileDict.value[`${tilemap}_254`];
        tileDict[`${tilemap}_255`] = srcTileRectangles.tileDict.value[`${tilemap}_255`];

        return tileDict;
    }

    // ４方向タイル（A型）を切り抜く
    function cropFourDirectoryTileDict(tilemap: string) {
        const tileDict = <TileDict>{};

        tileDict[`${tilemap}_A0`] = srcTileRectangles.tileDict.value[`${tilemap}_A0`];
        tileDict[`${tilemap}_A16`] = srcTileRectangles.tileDict.value[`${tilemap}_A16`];
        tileDict[`${tilemap}_A32`] = srcTileRectangles.tileDict.value[`${tilemap}_A32`];
        tileDict[`${tilemap}_A48`] = srcTileRectangles.tileDict.value[`${tilemap}_A48`];

        tileDict[`${tilemap}_A64`] = srcTileRectangles.tileDict.value[`${tilemap}_A64`];
        tileDict[`${tilemap}_A80`] = srcTileRectangles.tileDict.value[`${tilemap}_A80`];
        tileDict[`${tilemap}_A96`] = srcTileRectangles.tileDict.value[`${tilemap}_A96`];
        tileDict[`${tilemap}_A112`] = srcTileRectangles.tileDict.value[`${tilemap}_A112`];

        tileDict[`${tilemap}_A128`] = srcTileRectangles.tileDict.value[`${tilemap}_A128`];
        tileDict[`${tilemap}_A144`] = srcTileRectangles.tileDict.value[`${tilemap}_A144`];
        tileDict[`${tilemap}_A160`] = srcTileRectangles.tileDict.value[`${tilemap}_A160`];
        tileDict[`${tilemap}_A176`] = srcTileRectangles.tileDict.value[`${tilemap}_A176`];

        tileDict[`${tilemap}_A192`] = srcTileRectangles.tileDict.value[`${tilemap}_A192`];
        tileDict[`${tilemap}_A208`] = srcTileRectangles.tileDict.value[`${tilemap}_A208`];
        tileDict[`${tilemap}_A224`] = srcTileRectangles.tileDict.value[`${tilemap}_A224`];
        tileDict[`${tilemap}_A240`] = srcTileRectangles.tileDict.value[`${tilemap}_A240`];

        return tileDict;
    }

    tileDictDict.value["out"] = cropEightDirectionTileDict('out');
    tileDictDict.value["outBorder"] = cropFourDirectoryTileDict('outBorder');
    tileDictDict.value["sea"] = cropEightDirectionTileDict('sea');
    tileDictDict.value["seaBorder"] = cropFourDirectoryTileDict('seaBorder');
    tileDictDict.value["system"] = cropEightDirectionTileDict('system');
    tileDictDict.value["wastelandRoad"] = cropEightDirectionTileDict('wastelandRoad');
    tileDictDict.value["wastelandBorder"] = cropFourDirectoryTileDict('wastelandBorder');

    tilemapDict.value["out"] = {
        "tileDict": cropEightDirectionTileDict('out'),
        "paletteWidth": 192,
        "paletteHeight": 256,
    };
    tilemapDict.value["outBorder"] = {
        "tileDict": cropFourDirectoryTileDict('outBorder'),
        "paletteWidth": 128,
        "paletteHeight": 128,
    };
    tilemapDict.value["sea"] = {
        "tileDict": cropEightDirectionTileDict('sea'),
        "paletteWidth": 192,
        "paletteHeight": 256,
    };
    tilemapDict.value["seaBorder"] = {
        "tileDict": cropFourDirectoryTileDict('seaBorder'),
        "paletteWidth": 128,
        "paletteHeight": 128,
    };
    tilemapDict.value["system"] = {
        "tileDict": cropEightDirectionTileDict('system'),
        "paletteWidth": 128,
        "paletteHeight": 128,
    };
    tilemapDict.value["wastelandRoad"] = {
        "tileDict": cropEightDirectionTileDict('wastelandRoad'),
        "paletteWidth": 192,
        "paletteHeight": 256,
    };
    tilemapDict.value["wastelandBorder"] = {
        "tileDict": cropFourDirectoryTileDict('wastelandBorder'),
        "paletteWidth": 128,
        "paletteHeight": 128,
    };

    return {
        tileDictDict,
        tilemapDict,
        getTileDictByName: (name: string)=>{
            if (name in tileDictDict.value) {
                //alert(`DEBUG: "${name}"というタイルマップに切り替えます。`)
                return tileDictDict.value[name];
            }

            alert(`ERROR: "${name}"というタイルマップが見つかりません。`)
            return <TileDict>{};
        },
        getTilemapByName: (name: string)=>{
            if (name in tilemapDict.value) {
                //alert(`DEBUG: "${name}"というタイルマップに切り替えます。`)
                return tilemapDict.value[name];
            }

            alert(`ERROR: "${name}"というタイルマップが見つかりません。`)
            return <TilemapData>{};
        },
    };
}
