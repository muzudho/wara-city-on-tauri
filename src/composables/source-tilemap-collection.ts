// ##############
// # インポート #
// ##############

import { Reactive, reactive, ref, Ref } from 'vue';

// ++++++++++++++++++++++++++++++++
// + インポート　＞　コンポーザル +
// ++++++++++++++++++++++++++++++++
//
// @はsrcへのエイリアス
//

import { SourceTileCollection } from '@/composables/source-tile-collection';

// ++++++++++++++++++++++++++++++++++++
// + インポート　＞　インターフェース +
// ++++++++++++++++++++++++++++++++++++

import { TilemapData } from '@/interfaces/tilemap-data';
import { TileCursorPosition } from '@/interfaces/tile-cursor-position';

// ++++++++++++++++++++++
// + インポート　＞　型 +
// ++++++++++++++++++++++

import { TileDict } from '@/types/tile-dict';
import { TilemapDict } from '@/types/tilemap-dict';

// ################
// # エクスポート #
// ################

// タイルマップの元画像を管理する型
export interface SourceTilemapCollection {
    tilemapDict: Ref<TilemapDict>;

    getTilemapByName: (name: string) => Ref<TilemapData>;
}

/**
 * TODO 準備中。
 * @param srcTileCollection 
 * @returns 
 */
export function createEmptySourceTilemapCollection2(srcTileCollection: Reactive<SourceTileCollection>): Reactive<SourceTilemapCollection> {
    const tilemapDict = ref<TilemapDict>({});

    return reactive<SourceTilemapCollection>({
        tilemapDict,
        getTilemapByName: (name: string)=>{
            if (name in tilemapDict.value) {
                //alert(`DEBUG: "${name}"というタイルマップに切り替えます。`)

                return ref<TilemapData>(tilemapDict.value[name]);   // FIXME 🌟 こんな書き方でいいのか？
            }

            alert(`ERROR: "${name}"というタイルマップが見つかりません。`)
            return <Ref<TilemapData>>{};    // FIXME 🌟 こんな書き方でいいのか？
        },
    });
}

export function createEmptySourceTilemapCollection(srcTileCollection: Reactive<SourceTileCollection>): Reactive<SourceTilemapCollection> {
    const tilemapDict = ref<TilemapDict>({});

    // メソッド定義
    const getPaletteWidth = function (this: TilemapData) {
        return this.horizontalUnitCells * this.unitCellWidth;
    };
    const getPaletteHeight = function (this: TilemapData) {
        return this.verticalUnitCells * this.unitCellHeight;
    };

    // ８方向タイル（無印）を切り抜く
    function cropEightDirectionTileDict(tilemap: string) : Ref<TileDict> {
        const tileDict = ref<TileDict>({});

        tileDict.value[`${tilemap}_0`] = srcTileCollection.tileDict[`${tilemap}_0`];
        tileDict.value[`${tilemap}_16`] = srcTileCollection.tileDict[`${tilemap}_16`];
        tileDict.value[`${tilemap}_32`] = srcTileCollection.tileDict[`${tilemap}_32`];
        tileDict.value[`${tilemap}_48`] = srcTileCollection.tileDict[`${tilemap}_48`];
        tileDict.value[`${tilemap}_49`] = srcTileCollection.tileDict[`${tilemap}_49`];

        tileDict.value[`${tilemap}_64`] = srcTileCollection.tileDict[`${tilemap}_64`];
        tileDict.value[`${tilemap}_80`] = srcTileCollection.tileDict[`${tilemap}_80`];
        tileDict.value[`${tilemap}_96`] = srcTileCollection.tileDict[`${tilemap}_96`];
        tileDict.value[`${tilemap}_98`] = srcTileCollection.tileDict[`${tilemap}_98`];
        tileDict.value[`${tilemap}_112`] = srcTileCollection.tileDict[`${tilemap}_112`];
        tileDict.value[`${tilemap}_113`] = srcTileCollection.tileDict[`${tilemap}_113`];

        tileDict.value[`${tilemap}_114`] = srcTileCollection.tileDict[`${tilemap}_114`];
        tileDict.value[`${tilemap}_115`] = srcTileCollection.tileDict[`${tilemap}_115`];
        tileDict.value[`${tilemap}_128`] = srcTileCollection.tileDict[`${tilemap}_128`];
        tileDict.value[`${tilemap}_144`] = srcTileCollection.tileDict[`${tilemap}_144`];
        tileDict.value[`${tilemap}_152`] = srcTileCollection.tileDict[`${tilemap}_152`];
        tileDict.value[`${tilemap}_160`] = srcTileCollection.tileDict[`${tilemap}_160`];

        tileDict.value[`${tilemap}_176`] = srcTileCollection.tileDict[`${tilemap}_176`];
        tileDict.value[`${tilemap}_177`] = srcTileCollection.tileDict[`${tilemap}_177`];
        tileDict.value[`${tilemap}_184`] = srcTileCollection.tileDict[`${tilemap}_184`];
        tileDict.value[`${tilemap}_185`] = srcTileCollection.tileDict[`${tilemap}_185`];
        tileDict.value[`${tilemap}_192`] = srcTileCollection.tileDict[`${tilemap}_192`];
        tileDict.value[`${tilemap}_196`] = srcTileCollection.tileDict[`${tilemap}_196`];

        tileDict.value[`${tilemap}_208`] = srcTileCollection.tileDict[`${tilemap}_208`];
        tileDict.value[`${tilemap}_212`] = srcTileCollection.tileDict[`${tilemap}_212`];
        tileDict.value[`${tilemap}_216`] = srcTileCollection.tileDict[`${tilemap}_216`];
        tileDict.value[`${tilemap}_220`] = srcTileCollection.tileDict[`${tilemap}_220`];
        tileDict.value[`${tilemap}_224`] = srcTileCollection.tileDict[`${tilemap}_224`];
        tileDict.value[`${tilemap}_226`] = srcTileCollection.tileDict[`${tilemap}_226`];

        tileDict.value[`${tilemap}_228`] = srcTileCollection.tileDict[`${tilemap}_228`];
        tileDict.value[`${tilemap}_230`] = srcTileCollection.tileDict[`${tilemap}_230`];
        tileDict.value[`${tilemap}_240`] = srcTileCollection.tileDict[`${tilemap}_240`];
        tileDict.value[`${tilemap}_241`] = srcTileCollection.tileDict[`${tilemap}_241`];
        tileDict.value[`${tilemap}_242`] = srcTileCollection.tileDict[`${tilemap}_242`];
        tileDict.value[`${tilemap}_243`] = srcTileCollection.tileDict[`${tilemap}_243`];

        tileDict.value[`${tilemap}_244`] = srcTileCollection.tileDict[`${tilemap}_244`];
        tileDict.value[`${tilemap}_245`] = srcTileCollection.tileDict[`${tilemap}_245`];
        tileDict.value[`${tilemap}_246`] = srcTileCollection.tileDict[`${tilemap}_246`];
        tileDict.value[`${tilemap}_247`] = srcTileCollection.tileDict[`${tilemap}_247`];
        tileDict.value[`${tilemap}_248`] = srcTileCollection.tileDict[`${tilemap}_248`];
        tileDict.value[`${tilemap}_249`] = srcTileCollection.tileDict[`${tilemap}_249`];

        tileDict.value[`${tilemap}_250`] = srcTileCollection.tileDict[`${tilemap}_250`];
        tileDict.value[`${tilemap}_251`] = srcTileCollection.tileDict[`${tilemap}_251`];
        tileDict.value[`${tilemap}_252`] = srcTileCollection.tileDict[`${tilemap}_252`];
        tileDict.value[`${tilemap}_253`] = srcTileCollection.tileDict[`${tilemap}_253`];
        tileDict.value[`${tilemap}_254`] = srcTileCollection.tileDict[`${tilemap}_254`];
        tileDict.value[`${tilemap}_255`] = srcTileCollection.tileDict[`${tilemap}_255`];

        return tileDict;
    }

    // ４方向タイル（A型）を切り抜く
    function cropFourDirectoryTileDict(tilemap: string) : Ref<TileDict> {
        const tileDict = ref<TileDict>({});

        tileDict.value[`${tilemap}_A0`] = srcTileCollection.tileDict[`${tilemap}_A0`];
        tileDict.value[`${tilemap}_A16`] = srcTileCollection.tileDict[`${tilemap}_A16`];
        tileDict.value[`${tilemap}_A32`] = srcTileCollection.tileDict[`${tilemap}_A32`];
        tileDict.value[`${tilemap}_A48`] = srcTileCollection.tileDict[`${tilemap}_A48`];

        tileDict.value[`${tilemap}_A64`] = srcTileCollection.tileDict[`${tilemap}_A64`];
        tileDict.value[`${tilemap}_A80`] = srcTileCollection.tileDict[`${tilemap}_A80`];
        tileDict.value[`${tilemap}_A96`] = srcTileCollection.tileDict[`${tilemap}_A96`];
        tileDict.value[`${tilemap}_A112`] = srcTileCollection.tileDict[`${tilemap}_A112`];

        tileDict.value[`${tilemap}_A128`] = srcTileCollection.tileDict[`${tilemap}_A128`];
        tileDict.value[`${tilemap}_A144`] = srcTileCollection.tileDict[`${tilemap}_A144`];
        tileDict.value[`${tilemap}_A160`] = srcTileCollection.tileDict[`${tilemap}_A160`];
        tileDict.value[`${tilemap}_A176`] = srcTileCollection.tileDict[`${tilemap}_A176`];

        tileDict.value[`${tilemap}_A192`] = srcTileCollection.tileDict[`${tilemap}_A192`];
        tileDict.value[`${tilemap}_A208`] = srcTileCollection.tileDict[`${tilemap}_A208`];
        tileDict.value[`${tilemap}_A224`] = srcTileCollection.tileDict[`${tilemap}_A224`];
        tileDict.value[`${tilemap}_A240`] = srcTileCollection.tileDict[`${tilemap}_A240`];

        return tileDict;
    }

    tilemapDict.value["land"] = reactive<TilemapData>({
        tileDict: {
            land_wasteland: srcTileCollection.tileDict["land_wasteland"],       // 荒地
            land_vocantLand: srcTileCollection.tileDict["land_vocantLand"],     // 空き地
            //land_forest: srcTileCollection.tileDict["land_forest"],     // FIXME: 🌟 JSON ファイルから読み取る
        },
        unitCellWidth: 32,
        unitCellHeight: 32,
        horizontalUnitCells: 4,
        verticalUnitCells: 4,
        initialTileCursorPosition: <TileCursorPosition>{
            xCells: 0,
            yCells: 0,
            tliePath: "land_wasteland", // FIXME: 🌟自動設定できないか？
        },
        getPaletteWidth,
        getPaletteHeight,
    });

    tilemapDict.value["system"] = reactive<TilemapData>({
        tileDict: {
            system_noImage: srcTileCollection.tileDict["system_noImage"],   // 画像無しマーク
        },
        unitCellWidth: 32,
        unitCellHeight: 32,
        horizontalUnitCells: 4,
        verticalUnitCells: 4,
        initialTileCursorPosition: <TileCursorPosition>{
            xCells: 0,
            yCells: 0,
            tliePath: "system_noImage", // FIXME: 🌟自動設定できないか？
        },
        getPaletteWidth,
        getPaletteHeight,
    });

    tilemapDict.value["out"] = reactive<TilemapData>({
        tileDict: cropEightDirectionTileDict('out').value,
        unitCellWidth: 32,
        unitCellHeight: 32,
        horizontalUnitCells: 6,
        verticalUnitCells: 8,
        initialTileCursorPosition: <TileCursorPosition>{
            xCells: 0,
            yCells: 0,
            tliePath: "out_0", // FIXME: 🌟自動設定できないか？
        },
        getPaletteWidth,
        getPaletteHeight,
    });
    tilemapDict.value["outBorder"] = reactive<TilemapData>({
        tileDict: cropFourDirectoryTileDict('outBorder').value,
        unitCellWidth: 32,
        unitCellHeight: 32,
        horizontalUnitCells: 4,
        verticalUnitCells: 4,
        initialTileCursorPosition: <TileCursorPosition>{
            xCells: 0,
            yCells: 0,
            tliePath: "outBorder_A0", // FIXME: 🌟自動設定できないか？
        },
        getPaletteWidth,
        getPaletteHeight,
    });
    tilemapDict.value["sea"] = reactive<TilemapData>({
        tileDict: cropEightDirectionTileDict('sea').value,
        unitCellWidth: 32,
        unitCellHeight: 32,
        horizontalUnitCells: 6,
        verticalUnitCells: 8,
        initialTileCursorPosition: <TileCursorPosition>{
            xCells: 0,
            yCells: 0,
            tliePath: "sea_0", // FIXME: 🌟自動設定できないか？
        },
        getPaletteWidth,
        getPaletteHeight,
    });
    tilemapDict.value["seaBorder"] = reactive<TilemapData>({
        tileDict: cropFourDirectoryTileDict('seaBorder').value,
        unitCellWidth: 32,
        unitCellHeight: 32,
        horizontalUnitCells: 4,
        verticalUnitCells: 4,
        initialTileCursorPosition: <TileCursorPosition>{
            xCells: 0,
            yCells: 0,
            tliePath: "seaBorder_A0", // FIXME: 🌟自動設定できないか？
        },
        getPaletteWidth,
        getPaletteHeight,
    });
    tilemapDict.value["wastelandRoad"] = reactive<TilemapData>({    // 荒地の道
        tileDict: cropEightDirectionTileDict('wastelandRoad').value,
        unitCellWidth: 32,
        unitCellHeight: 32,
        horizontalUnitCells: 6,
        verticalUnitCells: 8,
        initialTileCursorPosition: <TileCursorPosition>{
            xCells: 0,
            yCells: 0,
            tliePath: "wastelandRoad_0", // FIXME: 🌟自動設定できないか？
        },
        getPaletteWidth,
        getPaletteHeight,
    });
    tilemapDict.value["wastelandBorder"] = reactive<TilemapData>({
        tileDict: cropFourDirectoryTileDict('wastelandBorder').value,
        unitCellWidth: 32,
        unitCellHeight: 32,
        horizontalUnitCells: 4,
        verticalUnitCells: 4,
        initialTileCursorPosition: <TileCursorPosition>{
            xCells: 0,
            yCells: 0,
            tliePath: "wastelandBorder_A0", // FIXME: 🌟自動設定できないか？
        },
        getPaletteWidth,
        getPaletteHeight,
    });

    return reactive<SourceTilemapCollection>({
        tilemapDict,
        getTilemapByName: (name: string)=>{
            if (name in tilemapDict.value) {
                //alert(`DEBUG: "${name}"というタイルマップに切り替えます。`)

                return ref<TilemapData>(tilemapDict.value[name]);   // FIXME 🌟 こんな書き方でいいのか？
            }

            alert(`ERROR: "${name}"というタイルマップが見つかりません。`)
            return <Ref<TilemapData>>{};    // FIXME 🌟 こんな書き方でいいのか？
        },
    });
}
