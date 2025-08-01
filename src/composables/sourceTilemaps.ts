import { reactive, ref, Ref } from 'vue';

// 型、共有データ等。 @はsrcへのエイリアス
import { SourceTilesCollection } from '@/composables/source-tiles-collection';
import { TilemapData } from '@/interfaces/tilemap-data';
import { TileDict } from '@/types/tile-dict';
import { TilemapDict } from '@/types/tilemap-dict';

// タイルマップの元画像を管理する型
export interface SourceTilemaps {
    tilemapDict: Ref<TilemapDict>;

    getTilemapByName: (name: string) => TilemapData;
}

export function createSourceTilemaps(srcTilesCollection: SourceTilesCollection): SourceTilemaps {
    const tilemapDict = ref<TilemapDict>({});

    // メソッド定義
    const getPaletteWidth = function (this: TilemapData) {
        return this.horizontalUnitCells * this.unitCellWidth;
    };
    const getPaletteHeight = function (this: TilemapData) {
        return this.verticalUnitCells * this.unitCellHeight;
    };

    // ８方向タイル（無印）を切り抜く
    function cropEightDirectionTileDict(tilemap: string) {
        const tileDict = <TileDict>{};

        tileDict[`${tilemap}_0`] = srcTilesCollection.tileDict.value[`${tilemap}_0`];
        tileDict[`${tilemap}_16`] = srcTilesCollection.tileDict.value[`${tilemap}_16`];
        tileDict[`${tilemap}_32`] = srcTilesCollection.tileDict.value[`${tilemap}_32`];
        tileDict[`${tilemap}_48`] = srcTilesCollection.tileDict.value[`${tilemap}_48`];
        tileDict[`${tilemap}_49`] = srcTilesCollection.tileDict.value[`${tilemap}_49`];

        tileDict[`${tilemap}_64`] = srcTilesCollection.tileDict.value[`${tilemap}_64`];
        tileDict[`${tilemap}_80`] = srcTilesCollection.tileDict.value[`${tilemap}_80`];
        tileDict[`${tilemap}_96`] = srcTilesCollection.tileDict.value[`${tilemap}_96`];
        tileDict[`${tilemap}_98`] = srcTilesCollection.tileDict.value[`${tilemap}_98`];
        tileDict[`${tilemap}_112`] = srcTilesCollection.tileDict.value[`${tilemap}_112`];
        tileDict[`${tilemap}_113`] = srcTilesCollection.tileDict.value[`${tilemap}_113`];

        tileDict[`${tilemap}_114`] = srcTilesCollection.tileDict.value[`${tilemap}_114`];
        tileDict[`${tilemap}_115`] = srcTilesCollection.tileDict.value[`${tilemap}_115`];
        tileDict[`${tilemap}_128`] = srcTilesCollection.tileDict.value[`${tilemap}_128`];
        tileDict[`${tilemap}_144`] = srcTilesCollection.tileDict.value[`${tilemap}_144`];
        tileDict[`${tilemap}_152`] = srcTilesCollection.tileDict.value[`${tilemap}_152`];
        tileDict[`${tilemap}_160`] = srcTilesCollection.tileDict.value[`${tilemap}_160`];

        tileDict[`${tilemap}_176`] = srcTilesCollection.tileDict.value[`${tilemap}_176`];
        tileDict[`${tilemap}_177`] = srcTilesCollection.tileDict.value[`${tilemap}_177`];
        tileDict[`${tilemap}_184`] = srcTilesCollection.tileDict.value[`${tilemap}_184`];
        tileDict[`${tilemap}_185`] = srcTilesCollection.tileDict.value[`${tilemap}_185`];
        tileDict[`${tilemap}_192`] = srcTilesCollection.tileDict.value[`${tilemap}_192`];
        tileDict[`${tilemap}_196`] = srcTilesCollection.tileDict.value[`${tilemap}_196`];

        tileDict[`${tilemap}_208`] = srcTilesCollection.tileDict.value[`${tilemap}_208`];
        tileDict[`${tilemap}_212`] = srcTilesCollection.tileDict.value[`${tilemap}_212`];
        tileDict[`${tilemap}_216`] = srcTilesCollection.tileDict.value[`${tilemap}_216`];
        tileDict[`${tilemap}_220`] = srcTilesCollection.tileDict.value[`${tilemap}_220`];
        tileDict[`${tilemap}_224`] = srcTilesCollection.tileDict.value[`${tilemap}_224`];
        tileDict[`${tilemap}_226`] = srcTilesCollection.tileDict.value[`${tilemap}_226`];

        tileDict[`${tilemap}_228`] = srcTilesCollection.tileDict.value[`${tilemap}_228`];
        tileDict[`${tilemap}_230`] = srcTilesCollection.tileDict.value[`${tilemap}_230`];
        tileDict[`${tilemap}_240`] = srcTilesCollection.tileDict.value[`${tilemap}_240`];
        tileDict[`${tilemap}_241`] = srcTilesCollection.tileDict.value[`${tilemap}_241`];
        tileDict[`${tilemap}_242`] = srcTilesCollection.tileDict.value[`${tilemap}_242`];
        tileDict[`${tilemap}_243`] = srcTilesCollection.tileDict.value[`${tilemap}_243`];

        tileDict[`${tilemap}_244`] = srcTilesCollection.tileDict.value[`${tilemap}_244`];
        tileDict[`${tilemap}_245`] = srcTilesCollection.tileDict.value[`${tilemap}_245`];
        tileDict[`${tilemap}_246`] = srcTilesCollection.tileDict.value[`${tilemap}_246`];
        tileDict[`${tilemap}_247`] = srcTilesCollection.tileDict.value[`${tilemap}_247`];
        tileDict[`${tilemap}_248`] = srcTilesCollection.tileDict.value[`${tilemap}_248`];
        tileDict[`${tilemap}_249`] = srcTilesCollection.tileDict.value[`${tilemap}_249`];

        tileDict[`${tilemap}_250`] = srcTilesCollection.tileDict.value[`${tilemap}_250`];
        tileDict[`${tilemap}_251`] = srcTilesCollection.tileDict.value[`${tilemap}_251`];
        tileDict[`${tilemap}_252`] = srcTilesCollection.tileDict.value[`${tilemap}_252`];
        tileDict[`${tilemap}_253`] = srcTilesCollection.tileDict.value[`${tilemap}_253`];
        tileDict[`${tilemap}_254`] = srcTilesCollection.tileDict.value[`${tilemap}_254`];
        tileDict[`${tilemap}_255`] = srcTilesCollection.tileDict.value[`${tilemap}_255`];

        return tileDict;
    }

    // ４方向タイル（A型）を切り抜く
    function cropFourDirectoryTileDict(tilemap: string) {
        const tileDict = <TileDict>{};

        tileDict[`${tilemap}_A0`] = srcTilesCollection.tileDict.value[`${tilemap}_A0`];
        tileDict[`${tilemap}_A16`] = srcTilesCollection.tileDict.value[`${tilemap}_A16`];
        tileDict[`${tilemap}_A32`] = srcTilesCollection.tileDict.value[`${tilemap}_A32`];
        tileDict[`${tilemap}_A48`] = srcTilesCollection.tileDict.value[`${tilemap}_A48`];

        tileDict[`${tilemap}_A64`] = srcTilesCollection.tileDict.value[`${tilemap}_A64`];
        tileDict[`${tilemap}_A80`] = srcTilesCollection.tileDict.value[`${tilemap}_A80`];
        tileDict[`${tilemap}_A96`] = srcTilesCollection.tileDict.value[`${tilemap}_A96`];
        tileDict[`${tilemap}_A112`] = srcTilesCollection.tileDict.value[`${tilemap}_A112`];

        tileDict[`${tilemap}_A128`] = srcTilesCollection.tileDict.value[`${tilemap}_A128`];
        tileDict[`${tilemap}_A144`] = srcTilesCollection.tileDict.value[`${tilemap}_A144`];
        tileDict[`${tilemap}_A160`] = srcTilesCollection.tileDict.value[`${tilemap}_A160`];
        tileDict[`${tilemap}_A176`] = srcTilesCollection.tileDict.value[`${tilemap}_A176`];

        tileDict[`${tilemap}_A192`] = srcTilesCollection.tileDict.value[`${tilemap}_A192`];
        tileDict[`${tilemap}_A208`] = srcTilesCollection.tileDict.value[`${tilemap}_A208`];
        tileDict[`${tilemap}_A224`] = srcTilesCollection.tileDict.value[`${tilemap}_A224`];
        tileDict[`${tilemap}_A240`] = srcTilesCollection.tileDict.value[`${tilemap}_A240`];

        return tileDict;
    }

    tilemapDict.value["land"] = reactive<TilemapData>({
        tileDict: {
            'land_wasteland': srcTilesCollection.tileDict.value["land_wasteland"],       // 荒地
            'land_vocantLand': srcTilesCollection.tileDict.value["land_vocantLand"],     // 空き地
        },
        unitCellWidth: 32,
        unitCellHeight: 32,
        horizontalUnitCells: 4,
        verticalUnitCells: 4,
        getPaletteWidth,
        getPaletteHeight,
    });

    tilemapDict.value["system"] = reactive<TilemapData>({
        tileDict: {
            system_noImage: srcTilesCollection.tileDict.value["system_noImage"],   // 画像無しマーク
        },
        unitCellWidth: 32,
        unitCellHeight: 32,
        horizontalUnitCells: 4,
        verticalUnitCells: 4,
        getPaletteWidth,
        getPaletteHeight,
    });

    tilemapDict.value["out"] = reactive<TilemapData>({
        tileDict: cropEightDirectionTileDict('out'),
        unitCellWidth: 32,
        unitCellHeight: 32,
        horizontalUnitCells: 6,
        verticalUnitCells: 8,
        getPaletteWidth,
        getPaletteHeight,
    });
    tilemapDict.value["outBorder"] = reactive<TilemapData>({
        tileDict: cropFourDirectoryTileDict('outBorder'),
        unitCellWidth: 32,
        unitCellHeight: 32,
        horizontalUnitCells: 4,
        verticalUnitCells: 4,
        getPaletteWidth,
        getPaletteHeight,
    });
    tilemapDict.value["sea"] = reactive<TilemapData>({
        tileDict: cropEightDirectionTileDict('sea'),
        unitCellWidth: 32,
        unitCellHeight: 32,
        horizontalUnitCells: 6,
        verticalUnitCells: 8,
        getPaletteWidth,
        getPaletteHeight,
    });
    tilemapDict.value["seaBorder"] = reactive<TilemapData>({
        tileDict: cropFourDirectoryTileDict('seaBorder'),
        unitCellWidth: 32,
        unitCellHeight: 32,
        horizontalUnitCells: 4,
        verticalUnitCells: 4,
        getPaletteWidth,
        getPaletteHeight,
    });
    tilemapDict.value["wastelandRoad"] = reactive<TilemapData>({
        tileDict: cropEightDirectionTileDict('wastelandRoad'),
        unitCellWidth: 32,
        unitCellHeight: 32,
        horizontalUnitCells: 6,
        verticalUnitCells: 8,
        getPaletteWidth,
        getPaletteHeight,
    });
    tilemapDict.value["wastelandBorder"] = reactive<TilemapData>({
        tileDict: cropFourDirectoryTileDict('wastelandBorder'),
        unitCellWidth: 32,
        unitCellHeight: 32,
        horizontalUnitCells: 4,
        verticalUnitCells: 4,
        getPaletteWidth,
        getPaletteHeight,
    });

    return {
        tilemapDict,
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
