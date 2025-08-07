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
async function loadSourceTileCollectionJsonFile(): Promise<TileCollection | null> {
    try {
        const response = await fetch("/json/system/source-tile-collection.json");
        if (!response.ok) throw new Error("Failed to fetch JSON");
        const data: TileCollection = await response.json();
        return data;
    } catch (error) {
        alert(`ERROR: タイルの設定ファイル読込時。 ${error}`);
        //console.error("Error:", error);
        return null;
    }
}

/**
 * FIXME: 外部ファイル（JSON）を読み込む形式に変更したい。システム・タイルマップはハードコーディングする。
 * @returns 
 */
export function createEmptySourceTilesCollection(): Reactive<SourceTileCollection> {
    const unitCellWidth: number = 32;     // FIXME: 単位セルのサイズの初期値どうする？
    const unitCellHeight: number = 32;
    const tileDict : Ref<TileDict> = ref<TileDict>({});

    // システム・タイルマップはハードコーディング
    tileDict.value["system_default"] = <TileData>{  // 未設定時の代替画像
        top: 0,
        left: 0,
        width: 32,
        height: 32,
    };
    tileDict.value["system_noImage"] = <TileData>{  // 画像無しマーク
        top: 0,
        left: 32,
        width: 32,
        height: 32,
    };

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

/**
 * 非同期でJSONファイルを読み込む。画面への反映が遅れる。
 * @param tileDict 
 */
export async function loadSourceTilesCollection(tileDict : Ref<TileDict>): Promise<void> {
    const tileCollection : TileCollection | null = await loadSourceTileCollectionJsonFile();

    if (tileCollection != null) {
        Object.entries(tileCollection).forEach(([tilepath, tile]) => {
            //alert(`tilepath=${tilepath} srcTop=${tile.srcTop} srcLeft=${tile.srcLeft} srcWidth=${tile.srcWidth} srcHeight=${tile.srcHeight}`);
            tileDict.value[tilepath] = <TileData>{
                top: tile.top,
                left: tile.left,
                width: tile.width,
                height: tile.height,
            };
        });
    }
}
