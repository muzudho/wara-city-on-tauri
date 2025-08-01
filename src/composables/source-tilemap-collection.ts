import { reactive, ref, Ref } from 'vue';

// 型、共有データ等。 @はsrcへのエイリアス
import { SourceTileCollection } from '@/composables/source-tile-collection';
import { TilemapData } from '@/interfaces/tilemap-data';
import { TileDict } from '@/types/tile-dict';
import { TilemapDict } from '@/types/tilemap-dict';

// タイルマップの元画像を管理する型
export interface SourceTilemapCollection {
    tilemapDict: Ref<TilemapDict>;

    getTilemapByName: (name: string) => TilemapData;
}

export function createSourceTilemapCollection(srcTileCollection: SourceTileCollection): SourceTilemapCollection {
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

        tileDict[`${tilemap}_0`] = srcTileCollection.tileDict.value[`${tilemap}_0`];
        tileDict[`${tilemap}_16`] = srcTileCollection.tileDict.value[`${tilemap}_16`];
        tileDict[`${tilemap}_32`] = srcTileCollection.tileDict.value[`${tilemap}_32`];
        tileDict[`${tilemap}_48`] = srcTileCollection.tileDict.value[`${tilemap}_48`];
        tileDict[`${tilemap}_49`] = srcTileCollection.tileDict.value[`${tilemap}_49`];

        tileDict[`${tilemap}_64`] = srcTileCollection.tileDict.value[`${tilemap}_64`];
        tileDict[`${tilemap}_80`] = srcTileCollection.tileDict.value[`${tilemap}_80`];
        tileDict[`${tilemap}_96`] = srcTileCollection.tileDict.value[`${tilemap}_96`];
        tileDict[`${tilemap}_98`] = srcTileCollection.tileDict.value[`${tilemap}_98`];
        tileDict[`${tilemap}_112`] = srcTileCollection.tileDict.value[`${tilemap}_112`];
        tileDict[`${tilemap}_113`] = srcTileCollection.tileDict.value[`${tilemap}_113`];

        tileDict[`${tilemap}_114`] = srcTileCollection.tileDict.value[`${tilemap}_114`];
        tileDict[`${tilemap}_115`] = srcTileCollection.tileDict.value[`${tilemap}_115`];
        tileDict[`${tilemap}_128`] = srcTileCollection.tileDict.value[`${tilemap}_128`];
        tileDict[`${tilemap}_144`] = srcTileCollection.tileDict.value[`${tilemap}_144`];
        tileDict[`${tilemap}_152`] = srcTileCollection.tileDict.value[`${tilemap}_152`];
        tileDict[`${tilemap}_160`] = srcTileCollection.tileDict.value[`${tilemap}_160`];

        tileDict[`${tilemap}_176`] = srcTileCollection.tileDict.value[`${tilemap}_176`];
        tileDict[`${tilemap}_177`] = srcTileCollection.tileDict.value[`${tilemap}_177`];
        tileDict[`${tilemap}_184`] = srcTileCollection.tileDict.value[`${tilemap}_184`];
        tileDict[`${tilemap}_185`] = srcTileCollection.tileDict.value[`${tilemap}_185`];
        tileDict[`${tilemap}_192`] = srcTileCollection.tileDict.value[`${tilemap}_192`];
        tileDict[`${tilemap}_196`] = srcTileCollection.tileDict.value[`${tilemap}_196`];

        tileDict[`${tilemap}_208`] = srcTileCollection.tileDict.value[`${tilemap}_208`];
        tileDict[`${tilemap}_212`] = srcTileCollection.tileDict.value[`${tilemap}_212`];
        tileDict[`${tilemap}_216`] = srcTileCollection.tileDict.value[`${tilemap}_216`];
        tileDict[`${tilemap}_220`] = srcTileCollection.tileDict.value[`${tilemap}_220`];
        tileDict[`${tilemap}_224`] = srcTileCollection.tileDict.value[`${tilemap}_224`];
        tileDict[`${tilemap}_226`] = srcTileCollection.tileDict.value[`${tilemap}_226`];

        tileDict[`${tilemap}_228`] = srcTileCollection.tileDict.value[`${tilemap}_228`];
        tileDict[`${tilemap}_230`] = srcTileCollection.tileDict.value[`${tilemap}_230`];
        tileDict[`${tilemap}_240`] = srcTileCollection.tileDict.value[`${tilemap}_240`];
        tileDict[`${tilemap}_241`] = srcTileCollection.tileDict.value[`${tilemap}_241`];
        tileDict[`${tilemap}_242`] = srcTileCollection.tileDict.value[`${tilemap}_242`];
        tileDict[`${tilemap}_243`] = srcTileCollection.tileDict.value[`${tilemap}_243`];

        tileDict[`${tilemap}_244`] = srcTileCollection.tileDict.value[`${tilemap}_244`];
        tileDict[`${tilemap}_245`] = srcTileCollection.tileDict.value[`${tilemap}_245`];
        tileDict[`${tilemap}_246`] = srcTileCollection.tileDict.value[`${tilemap}_246`];
        tileDict[`${tilemap}_247`] = srcTileCollection.tileDict.value[`${tilemap}_247`];
        tileDict[`${tilemap}_248`] = srcTileCollection.tileDict.value[`${tilemap}_248`];
        tileDict[`${tilemap}_249`] = srcTileCollection.tileDict.value[`${tilemap}_249`];

        tileDict[`${tilemap}_250`] = srcTileCollection.tileDict.value[`${tilemap}_250`];
        tileDict[`${tilemap}_251`] = srcTileCollection.tileDict.value[`${tilemap}_251`];
        tileDict[`${tilemap}_252`] = srcTileCollection.tileDict.value[`${tilemap}_252`];
        tileDict[`${tilemap}_253`] = srcTileCollection.tileDict.value[`${tilemap}_253`];
        tileDict[`${tilemap}_254`] = srcTileCollection.tileDict.value[`${tilemap}_254`];
        tileDict[`${tilemap}_255`] = srcTileCollection.tileDict.value[`${tilemap}_255`];

        return tileDict;
    }

    // ４方向タイル（A型）を切り抜く
    function cropFourDirectoryTileDict(tilemap: string) {
        const tileDict = <TileDict>{};

        tileDict[`${tilemap}_A0`] = srcTileCollection.tileDict.value[`${tilemap}_A0`];
        tileDict[`${tilemap}_A16`] = srcTileCollection.tileDict.value[`${tilemap}_A16`];
        tileDict[`${tilemap}_A32`] = srcTileCollection.tileDict.value[`${tilemap}_A32`];
        tileDict[`${tilemap}_A48`] = srcTileCollection.tileDict.value[`${tilemap}_A48`];

        tileDict[`${tilemap}_A64`] = srcTileCollection.tileDict.value[`${tilemap}_A64`];
        tileDict[`${tilemap}_A80`] = srcTileCollection.tileDict.value[`${tilemap}_A80`];
        tileDict[`${tilemap}_A96`] = srcTileCollection.tileDict.value[`${tilemap}_A96`];
        tileDict[`${tilemap}_A112`] = srcTileCollection.tileDict.value[`${tilemap}_A112`];

        tileDict[`${tilemap}_A128`] = srcTileCollection.tileDict.value[`${tilemap}_A128`];
        tileDict[`${tilemap}_A144`] = srcTileCollection.tileDict.value[`${tilemap}_A144`];
        tileDict[`${tilemap}_A160`] = srcTileCollection.tileDict.value[`${tilemap}_A160`];
        tileDict[`${tilemap}_A176`] = srcTileCollection.tileDict.value[`${tilemap}_A176`];

        tileDict[`${tilemap}_A192`] = srcTileCollection.tileDict.value[`${tilemap}_A192`];
        tileDict[`${tilemap}_A208`] = srcTileCollection.tileDict.value[`${tilemap}_A208`];
        tileDict[`${tilemap}_A224`] = srcTileCollection.tileDict.value[`${tilemap}_A224`];
        tileDict[`${tilemap}_A240`] = srcTileCollection.tileDict.value[`${tilemap}_A240`];

        return tileDict;
    }

    tilemapDict.value["land"] = reactive<TilemapData>({
        tileDict: {
            'land_wasteland': srcTileCollection.tileDict.value["land_wasteland"],       // 荒地
            'land_vocantLand': srcTileCollection.tileDict.value["land_vocantLand"],     // 空き地
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
            system_noImage: srcTileCollection.tileDict.value["system_noImage"],   // 画像無しマーク
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
