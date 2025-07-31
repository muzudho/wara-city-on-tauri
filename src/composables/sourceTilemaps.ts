import { ref, Ref } from 'vue';

// 型、共有データ等。 @はsrcへのエイリアス
import { SourceTileRectangles } from '@/composables/sourceTileRectangles';
import { TileDict } from '@/types/tile-dict';
import { TileDictDict } from '@/types/tile-dict-dict';

// タイルマップの元画像を管理する型
export interface SourceTilemaps {
    tileDictDict: Ref<TileDictDict>;    // タイルの辞書。

    getTileDictByName: (name: string) => TileDict;
}

export function createSourceTilemaps(srcTileRectangles: SourceTileRectangles): SourceTilemaps {
    const tileDictDict = ref<TileDictDict>({
        "land" : {  // FIXME: 旧仕様
            'land_wasteland': srcTileRectangles.tileDict.value["land_wasteland"],    // 荒地
            'land_vocantLand': srcTileRectangles.tileDict.value["land_vocantLand"],    // 空き地
        },
        "system": {
            'system_noImage': srcTileRectangles.tileDict.value["system_noImage"],    // 画像無しマーク
        },
    });

    // ８方向タイル（無印）を切り抜く
    function cropEightDirectionTiles(tilemap: string) {
        const rawDict = <TileDict>{};

        rawDict[`${tilemap}_0`] = srcTileRectangles.tileDict.value[`${tilemap}_0`];
        rawDict[`${tilemap}_16`] = srcTileRectangles.tileDict.value[`${tilemap}_16`];
        rawDict[`${tilemap}_32`] = srcTileRectangles.tileDict.value[`${tilemap}_32`];
        rawDict[`${tilemap}_48`] = srcTileRectangles.tileDict.value[`${tilemap}_48`];
        rawDict[`${tilemap}_49`] = srcTileRectangles.tileDict.value[`${tilemap}_49`];

        rawDict[`${tilemap}_64`] = srcTileRectangles.tileDict.value[`${tilemap}_64`];
        rawDict[`${tilemap}_80`] = srcTileRectangles.tileDict.value[`${tilemap}_80`];
        rawDict[`${tilemap}_96`] = srcTileRectangles.tileDict.value[`${tilemap}_96`];
        rawDict[`${tilemap}_98`] = srcTileRectangles.tileDict.value[`${tilemap}_98`];
        rawDict[`${tilemap}_112`] = srcTileRectangles.tileDict.value[`${tilemap}_112`];
        rawDict[`${tilemap}_113`] = srcTileRectangles.tileDict.value[`${tilemap}_113`];

        rawDict[`${tilemap}_114`] = srcTileRectangles.tileDict.value[`${tilemap}_114`];
        rawDict[`${tilemap}_115`] = srcTileRectangles.tileDict.value[`${tilemap}_115`];
        rawDict[`${tilemap}_128`] = srcTileRectangles.tileDict.value[`${tilemap}_128`];
        rawDict[`${tilemap}_144`] = srcTileRectangles.tileDict.value[`${tilemap}_144`];
        rawDict[`${tilemap}_152`] = srcTileRectangles.tileDict.value[`${tilemap}_152`];
        rawDict[`${tilemap}_160`] = srcTileRectangles.tileDict.value[`${tilemap}_160`];

        rawDict[`${tilemap}_176`] = srcTileRectangles.tileDict.value[`${tilemap}_176`];
        rawDict[`${tilemap}_177`] = srcTileRectangles.tileDict.value[`${tilemap}_177`];
        rawDict[`${tilemap}_184`] = srcTileRectangles.tileDict.value[`${tilemap}_184`];
        rawDict[`${tilemap}_185`] = srcTileRectangles.tileDict.value[`${tilemap}_185`];
        rawDict[`${tilemap}_192`] = srcTileRectangles.tileDict.value[`${tilemap}_192`];
        rawDict[`${tilemap}_196`] = srcTileRectangles.tileDict.value[`${tilemap}_196`];

        rawDict[`${tilemap}_208`] = srcTileRectangles.tileDict.value[`${tilemap}_208`];
        rawDict[`${tilemap}_212`] = srcTileRectangles.tileDict.value[`${tilemap}_212`];
        rawDict[`${tilemap}_216`] = srcTileRectangles.tileDict.value[`${tilemap}_216`];
        rawDict[`${tilemap}_220`] = srcTileRectangles.tileDict.value[`${tilemap}_220`];
        rawDict[`${tilemap}_224`] = srcTileRectangles.tileDict.value[`${tilemap}_224`];
        rawDict[`${tilemap}_226`] = srcTileRectangles.tileDict.value[`${tilemap}_226`];

        rawDict[`${tilemap}_228`] = srcTileRectangles.tileDict.value[`${tilemap}_228`];
        rawDict[`${tilemap}_230`] = srcTileRectangles.tileDict.value[`${tilemap}_230`];
        rawDict[`${tilemap}_240`] = srcTileRectangles.tileDict.value[`${tilemap}_240`];
        rawDict[`${tilemap}_241`] = srcTileRectangles.tileDict.value[`${tilemap}_241`];
        rawDict[`${tilemap}_242`] = srcTileRectangles.tileDict.value[`${tilemap}_242`];
        rawDict[`${tilemap}_243`] = srcTileRectangles.tileDict.value[`${tilemap}_243`];

        rawDict[`${tilemap}_244`] = srcTileRectangles.tileDict.value[`${tilemap}_244`];
        rawDict[`${tilemap}_245`] = srcTileRectangles.tileDict.value[`${tilemap}_245`];
        rawDict[`${tilemap}_246`] = srcTileRectangles.tileDict.value[`${tilemap}_246`];
        rawDict[`${tilemap}_247`] = srcTileRectangles.tileDict.value[`${tilemap}_247`];
        rawDict[`${tilemap}_248`] = srcTileRectangles.tileDict.value[`${tilemap}_248`];
        rawDict[`${tilemap}_249`] = srcTileRectangles.tileDict.value[`${tilemap}_249`];

        rawDict[`${tilemap}_250`] = srcTileRectangles.tileDict.value[`${tilemap}_250`];
        rawDict[`${tilemap}_251`] = srcTileRectangles.tileDict.value[`${tilemap}_251`];
        rawDict[`${tilemap}_252`] = srcTileRectangles.tileDict.value[`${tilemap}_252`];
        rawDict[`${tilemap}_253`] = srcTileRectangles.tileDict.value[`${tilemap}_253`];
        rawDict[`${tilemap}_254`] = srcTileRectangles.tileDict.value[`${tilemap}_254`];
        rawDict[`${tilemap}_255`] = srcTileRectangles.tileDict.value[`${tilemap}_255`];

        return rawDict;
    }

    // ４方向タイル（A型）を切り抜く
    function cropFourDirectoryTiles(tilemap: string) {
        const rawDict = <TileDict>{};

        rawDict[`${tilemap}_A0`] = srcTileRectangles.tileDict.value[`${tilemap}_A0`];
        rawDict[`${tilemap}_A16`] = srcTileRectangles.tileDict.value[`${tilemap}_A16`];
        rawDict[`${tilemap}_A32`] = srcTileRectangles.tileDict.value[`${tilemap}_A32`];
        rawDict[`${tilemap}_A48`] = srcTileRectangles.tileDict.value[`${tilemap}_A48`];

        rawDict[`${tilemap}_A64`] = srcTileRectangles.tileDict.value[`${tilemap}_A64`];
        rawDict[`${tilemap}_A80`] = srcTileRectangles.tileDict.value[`${tilemap}_A80`];
        rawDict[`${tilemap}_A96`] = srcTileRectangles.tileDict.value[`${tilemap}_A96`];
        rawDict[`${tilemap}_A112`] = srcTileRectangles.tileDict.value[`${tilemap}_A112`];

        rawDict[`${tilemap}_A128`] = srcTileRectangles.tileDict.value[`${tilemap}_A128`];
        rawDict[`${tilemap}_A144`] = srcTileRectangles.tileDict.value[`${tilemap}_A144`];
        rawDict[`${tilemap}_A160`] = srcTileRectangles.tileDict.value[`${tilemap}_A160`];
        rawDict[`${tilemap}_A176`] = srcTileRectangles.tileDict.value[`${tilemap}_A176`];

        rawDict[`${tilemap}_A192`] = srcTileRectangles.tileDict.value[`${tilemap}_A192`];
        rawDict[`${tilemap}_A208`] = srcTileRectangles.tileDict.value[`${tilemap}_A208`];
        rawDict[`${tilemap}_A224`] = srcTileRectangles.tileDict.value[`${tilemap}_A224`];
        rawDict[`${tilemap}_A240`] = srcTileRectangles.tileDict.value[`${tilemap}_A240`];

        return rawDict;
    }

    tileDictDict.value["out"] = cropEightDirectionTiles('out');
    tileDictDict.value["outBorder"] = cropFourDirectoryTiles('outBorder');
    tileDictDict.value["sea"] = cropEightDirectionTiles('sea');
    tileDictDict.value["seaBorder"] = cropFourDirectoryTiles('seaBorder');
    tileDictDict.value["system"] = cropEightDirectionTiles('system');
    tileDictDict.value["wastelandRoad"] = cropEightDirectionTiles('wastelandRoad');
    tileDictDict.value["wastelandBorder"] = cropFourDirectoryTiles('wastelandBorder');

    return {
        tileDictDict,
        getTileDictByName: (name: string)=>{
            if (name in tileDictDict.value) {
                //alert(`DEBUG: "${name}"というタイルマップに切り替えます。`)
                return tileDictDict.value[name];
            }

            alert(`ERROR: "${name}"というタイルマップが見つかりません。`)
            return <TileDict>{};
        },
    };
}
