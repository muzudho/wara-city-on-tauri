// ##############
// # インポート #
// ##############

import { Reactive, reactive, ref, Ref } from 'vue';

// ++++++++++++++++++++++
// + インポート　＞　型 +
// ++++++++++++++++++++++
//
// @はsrcへのエイリアス
//

import { TileDict } from '@/types/tile-dict';

// ++++++++++++++++++++++++++++++++++++
// + インポート　＞　インターフェース +
// ++++++++++++++++++++++++++++++++++++

import { TileData } from '@/interfaces/tile-data';

// ################
// # エクスポート #
// ################

// タイルマップの元画像を管理する型
export interface SourceTileCollection {
    unitCellWidth: number;     // 単位セルの横幅
    unitCellHeight: number;    // 単位セルの縦幅
    tileDict: Ref<TileDict>;        // フラットにタイルが入っている辞書

    getTileByPath: (tilePath: string) => TileData;
}

type TileCollection = Record<string, TileData>;

/**
 * 非同期処理なので、反映が遅れることに注意。
 * @returns 
 */
async function loadTileCollection(): Promise<TileCollection | null> {
    try {
        const response = await fetch("/json/system/source-tile-collection.json");
        if (!response.ok) throw new Error("Failed to fetch JSON");
        const data: TileCollection = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

/**
 * FIXME: 外部ファイル（JSON）を読み込む形式に変更したい。
 * @returns 
 */
export function createEmptySourceTilesCollection(): Reactive<SourceTileCollection> {

    const unitCellWidth: number = 32;     // FIXME: 単位セルのサイズの初期値どうする？
    const unitCellHeight: number = 32;

    function makeTile(y: number, x: number) {
        return {srcTop:y*unitCellHeight, srcLeft:x*unitCellWidth, srcWidth:unitCellWidth, srcHeight:unitCellHeight};
    }

    const tileDict : Ref<TileDict> = ref<TileDict>({});

    // 荒地
    tileDict.value["land_wasteland"] = <TileData>{
        srcTop: 0,
        srcLeft: 0,
        srcWidth: 32,
        srcHeight: 32,
    };
    // 空き地
    tileDict.value["land_vocantLand"] = <TileData>{
        srcTop: 0,
        srcLeft: 32,
        srcWidth: 32,
        srcHeight: 32,
    };
    // システム
    tileDict.value["system_noImage"] = <TileData>{  // 画像無しマーク
        srcTop: 0,
        srcLeft: 32,
        srcWidth: 32,
        srcHeight: 32,
    };

    // FIXME: 🌟 非同期に JSON ファイルを読み込むので、画面への反映が遅れる。
    // FIXME: 🌟 辞書の場合、変更通知が送られない？
    loadTileCollection().then((tileCollection) => {
        //alert(`A tileCollection=${JSON.stringify(tileCollection)}`);
        const dict1 : Record<string, TileData> = tileCollection ?? {
            "": {
                srcTop: 0,
                srcLeft: 0,
                srcWidth: 0,
                srcHeight: 0,
            }
        };

        Object.entries(dict1).forEach(([tilepath, tile]) => {
            //alert(`tilepath=${tilepath} srcTop=${tile.srcTop} srcLeft=${tile.srcLeft} srcWidth=${tile.srcWidth} srcHeight=${tile.srcHeight}`);
            tileDict.value[tilepath] = <TileData>{
                srcTop: tile.srcTop,
                srcLeft: tile.srcLeft,
                srcWidth: tile.srcWidth,
                srcHeight: tile.srcHeight,
            };
        });
    });

    // ８方向タイル（無印）
    function makeEightBorderTilemap(tilemap: string) {
        const rawDict = <TileDict>{};

        rawDict[`${tilemap}_0`] = makeTile(0, 0);
        rawDict[`${tilemap}_16`] = makeTile(0, 1);
        rawDict[`${tilemap}_32`] = makeTile(0, 2);
        rawDict[`${tilemap}_48`] = makeTile(0, 3);
        rawDict[`${tilemap}_49`] = makeTile(0, 4);
        rawDict[`${tilemap}_64`] = makeTile(0, 5);

        rawDict[`${tilemap}_80`] = makeTile(1, 0);
        rawDict[`${tilemap}_96`] = makeTile(1, 1);
        rawDict[`${tilemap}_98`] = makeTile(1, 2);
        rawDict[`${tilemap}_112`] = makeTile(1, 3);
        rawDict[`${tilemap}_113`] = makeTile(1, 4);
        rawDict[`${tilemap}_114`] = makeTile(1, 5);

        rawDict[`${tilemap}_115`] = makeTile(2, 0);
        rawDict[`${tilemap}_128`] = makeTile(2, 1);
        rawDict[`${tilemap}_144`] = makeTile(2, 2);
        rawDict[`${tilemap}_152`] = makeTile(2, 3);
        rawDict[`${tilemap}_160`] = makeTile(2, 4);
        rawDict[`${tilemap}_176`] = makeTile(2, 5);

        rawDict[`${tilemap}_177`] = makeTile(3, 0);
        rawDict[`${tilemap}_184`] = makeTile(3, 1);
        rawDict[`${tilemap}_185`] = makeTile(3, 2);
        rawDict[`${tilemap}_192`] = makeTile(3, 3);
        rawDict[`${tilemap}_196`] = makeTile(3, 4);
        rawDict[`${tilemap}_208`] = makeTile(3, 5);

        rawDict[`${tilemap}_212`] = makeTile(4, 0);
        rawDict[`${tilemap}_216`] = makeTile(4, 1);
        rawDict[`${tilemap}_220`] = makeTile(4, 2);
        rawDict[`${tilemap}_224`] = makeTile(4, 3);
        rawDict[`${tilemap}_226`] = makeTile(4, 4);
        rawDict[`${tilemap}_228`] = makeTile(4, 5);

        rawDict[`${tilemap}_230`] = makeTile(5, 0);
        rawDict[`${tilemap}_240`] = makeTile(5, 1);
        rawDict[`${tilemap}_241`] = makeTile(5, 2);
        rawDict[`${tilemap}_242`] = makeTile(5, 3);
        rawDict[`${tilemap}_243`] = makeTile(5, 4);
        rawDict[`${tilemap}_244`] = makeTile(5, 5);

        rawDict[`${tilemap}_245`] = makeTile(6, 0);
        rawDict[`${tilemap}_246`] = makeTile(6, 1);
        rawDict[`${tilemap}_247`] = makeTile(6, 2);
        rawDict[`${tilemap}_248`] = makeTile(6, 3);
        rawDict[`${tilemap}_249`] = makeTile(6, 4);
        rawDict[`${tilemap}_250`] = makeTile(6, 5);

        rawDict[`${tilemap}_251`] = makeTile(7, 0);
        rawDict[`${tilemap}_252`] = makeTile(7, 1);
        rawDict[`${tilemap}_253`] = makeTile(7, 2);
        rawDict[`${tilemap}_254`] = makeTile(7, 3);
        rawDict[`${tilemap}_255`] = makeTile(7, 4);

        return rawDict;
    }

        // ４方向タイル（Aタイプ）
    function makeFourDirectionBorderTilemap(tilemap: string) {
        const rawDict = <TileDict>{};

        rawDict[`${tilemap}_A0`] = makeTile(0, 0);
        rawDict[`${tilemap}_A16`] = makeTile(0, 1);
        rawDict[`${tilemap}_A32`] = makeTile(0, 2);
        rawDict[`${tilemap}_A48`] = makeTile(0, 3);

        rawDict[`${tilemap}_A64`] = makeTile(1, 0);
        rawDict[`${tilemap}_A80`] = makeTile(1, 1);
        rawDict[`${tilemap}_A96`] = makeTile(1, 2);
        rawDict[`${tilemap}_A112`] = makeTile(1, 3);

        rawDict[`${tilemap}_A128`] = makeTile(2, 0);
        rawDict[`${tilemap}_A144`] = makeTile(2, 1);
        rawDict[`${tilemap}_A160`] = makeTile(2, 2);
        rawDict[`${tilemap}_A176`] = makeTile(2, 3);

        rawDict[`${tilemap}_A192`] = makeTile(3, 0);
        rawDict[`${tilemap}_A208`] = makeTile(3, 1);
        rawDict[`${tilemap}_A224`] = makeTile(3, 2);
        rawDict[`${tilemap}_A240`] = makeTile(3, 3);

        return rawDict;
    }

    Object.assign(tileDict.value, makeEightBorderTilemap('out'));
    Object.assign(tileDict.value, makeFourDirectionBorderTilemap('outBorder'));
    Object.assign(tileDict.value, makeEightBorderTilemap('sea'));
    Object.assign(tileDict.value, makeFourDirectionBorderTilemap('seaBorder'));
    Object.assign(tileDict.value, makeEightBorderTilemap('wastelandRoad'));
    Object.assign(tileDict.value, makeFourDirectionBorderTilemap('wastelandBorder'));

    return reactive<SourceTileCollection>({
        unitCellWidth,
        unitCellHeight,
        tileDict,
        getTileByPath: (tilePath: string)=>{
            if (tilePath in tileDict.value) {
                return tileDict.value[tilePath];
            }
            return tileDict.value['system_noImage'];   // 画像無しマーク画像
        },
    });
}
