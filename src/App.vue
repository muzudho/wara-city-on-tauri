<template>
    <v-app>
        <v-main>
            <!-- クライアント領域 -->
            <v-container class="pa-0" :style="clientAreaStyle">
                <!-- 単純にタイルを敷き詰めているだけ。 -->
                <!-- 例えば、以下のようなタグをリピート。
                    <Tile
                            :srcLeft="0"
                            :srcTop="0"
                            :srcWidth="32"
                            :srcHeight="32"
                            :tilemapUrl="'/public/img/tiles/tilemap_sea.png'"/>
                    selectedTilemapKey: {{ selectedTilemapKey }}<br/>
                    <container
                            style="line-height: 12px;"
                            v-for="tilePath in board.tileKeyArray">
                            tilePath: {{ tilePath }}<br/>
                    </container>
                -->
                <Tile
                        v-for="(tilePath, index) in board.tileKeyArray.value"
                        :key="index"
                        :srcLeft="srcTileCollection.getTileByPath(tilePath).srcLeft"
                        :srcTop="srcTileCollection.getTileByPath(tilePath).srcTop"
                        :srcWidth="srcTileCollection.getTileByPath(tilePath).srcWidth"
                        :srcHeight="srcTileCollection.getTileByPath(tilePath).srcHeight"
                        :tilemapUrl="srcTileCollection.getTileByPath(tilePath).tilemapUrl"
                        @click="onMapTileClick(index)"
                        @mousedown="onMapTileMouseDown(index)"
                        @mouseup="onMapTileMouseUp(index)"
                        @mousemove="onMapTileMouseMove(index)"
                        style="z-index: 1;"/>

                <!-- ブラシ・ウィンドウ
                -->
                <BrushPanel
                        :selectedTileData="selectedTileDataVM"
                        style="position:fixed; top:16px; left:16px; z-index: 30;"/>

                <!-- タイル・パレット・ウィンドウ
                -->
                <TilePalettePanel
                        :srcTileCollection="srcTileCollection"
                        :srcTilemapCollection="srcTilemaps"
                        v-on:changeTilemap="onTilemapChanged"
                        v-on:selectTile="onSrcTileClicked"
                        style="position:fixed; top:170px; left:16px; z-index: 10;"/>

                <!-- ターミナル・ウィンドウ
                -->
                <TerminalPanel
                        :srcTileCollection="srcTileCollection"
                        :srcTilemaps="srcTilemaps"
                        :board="board"
                        style="position:fixed; top:16px; left:240px; z-index: 20;"/>

            </v-container>
        </v-main>
    </v-app>    
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, ref } from "vue";

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++
    //
    // @はsrcへのエイリアス
    //

    import Tile from '@/components/Tile.vue';
    import TilePalettePanel from '@/components/TilePalettePanel.vue';
    import TerminalPanel from '@/components/TerminalPanel.vue';
    import BrushPanel from '@/components/BrushPanel.vue';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーザブル +
    // ++++++++++++++++++++++++++++++++++

    import { SourceTilemapCollection, createSourceTilemapCollection } from '@/composables/source-tilemap-collection';
    import { createSourceTilesCollection } from '@/composables/source-tile-collection';
    import { createBoard } from '@/composables/board';

    // ++++++++++++++++++++++++++++++++++++
    // + インポート　＞　インターフェース +
    // ++++++++++++++++++++++++++++++++++++

    import { TileData } from '@/interfaces/tile-data';

    // ##############
    // # 共有データ #
    // ##############

    // 盤情報は、ゲーム内のターミナル・ウィンドウと共有できる変数にしたい。
    const srcTileCollection = createSourceTilesCollection();
    const srcTilemaps: SourceTilemapCollection = createSourceTilemapCollection(srcTileCollection);

    // ############################
    // # このコンポーネントの画面 #
    // ############################

    // ++++++++++++++++++++
    // + クライアント領域 +
    // ++++++++++++++++++++

    // クライアント領域。マップのタイルが敷き詰めてある。
    const clientAreaStyle = computed(
        function(): string {
            return '' + //
                ' max-width: ' + board.widthPixels.value + 'px;' + // NOTE: max-width が 1200px ぐらいしかないような気がする。増やしておく。
                ' width:' + board.widthPixels.value + 'px;' +   // 横幅。
                ' line-height: 0;'
        }
    );

    // ++++++++++++++++++++++++++++++++
    // + クライアント領域　＞　マップ +
    // ++++++++++++++++++++++++++++++++

    const board = createBoard(srcTileCollection);   // 盤。いわゆるマップ。
    const mouseDraggingVM = ref(false);

    /**
     * マップタイルをクリックしたとき。
     * @param index クリックしたタイルのインデックス。
     */
    function onMapTileClick(index: number) {
        //alert(`マップタイルをクリックした： index=${index}`)
        // if (selectedTilePathVM.value == '') {
        //     return;
        // }

        // マップタイルを更新
        callPaint(index);
    }

    function onMapTileMouseDown(_index: number) {
        mouseDraggingVM.value = true;
    }

    function onMapTileMouseUp(_index: number) {
        mouseDraggingVM.value = false;
    }

    function onMapTileMouseMove(index: number) {
        if (! mouseDraggingVM.value) {
            return;
        }

        // マップタイルを更新
        callPaint(index);
        // // マップタイルを更新
        // board.tileKeyArray.value[index] = selectedTilePathVM.value
    }

    // ++++++++++++++++++++++++++++++++++++++++++
    // + クライアント領域　＞　タイル・パレット +
    // ++++++++++++++++++++++++++++++++++++++++++

    const selectedTilePathVM = ref('sea_0');  // FIXME: 初期値どうする？
    const selectedTileDataVM = ref<TileData>({  // FIXME: 初期値どうする？
        srcLeft: 0,
        srcTop: 0,
        srcWidth: 32,
        srcHeight: 32,
        tilemapUrl: "/img/tiles/tilemap_sea.png", // タイルマップ画像のURL
    });

    function onTilemapChanged(_tilePath: string) {
        //alert(`タイルマップを変更した： tilePath=${tilePath}`)
        //selectedTilemapKeyVM.value = tilePath
    }

    /**
     * ソースタイルをクリックしたとき。
     * @param tilePath 
     */
    function onSrcTileClicked(tilePath: string, tile: TileData) {
        //alert(`ソースタイル２をクリックした： tilePath=${tilePath}`)
        selectedTilePathVM.value = tilePath;
        selectedTileDataVM.value = tile;
    }

    // ################
    // # サブルーチン #
    // ################

    /**
     * Tauriのコマンドを呼び出し。
     * 文字列を渡すと、指定の操作を実施後の文字列を返す。
     * @param tileIndex クリックしたタイルのインデックス
     */
    async function callPaint(tileIndex: number): Promise<string> {
        // マップタイルを更新
        board.tileKeyArray.value[tileIndex] = selectedTilePathVM.value

        //const resultStr = await invoke<string>('translateRs', {sourceStr: sourceStr, commandName: commandName});
        return "";
    }

</script>

<style>
html {
    /* Tauri のウィンドウに横スクロールバーを付ける */
    overflow-x: scroll !important;
}

:root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    /*line-height: 24px;*/
    font-weight: 400;

    color: #0f0f0f;
    background-color: #f6f6f6;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
}

.container {
    /*height: 95vh;*/
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}

.row {
    display: flex;
    justify-content: center;
}

input,
button {
    border-radius: 8px;
    border: 1px solid transparent;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    color: #0f0f0f;
    background-color: #ffffff;
    transition: border-color 0.25s;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

button {
    padding: 0.6em 1.2em;
    cursor: pointer;
}

button:hover {
    border-color: #396cd8;
}
button:active {
    border-color: #396cd8;
    background-color: #e8e8e8;
}

input,
button {
    outline: none;
}

@media (prefers-color-scheme: dark) {
    :root {
        color: #f6f6f6;
        background-color: #2f2f2f;
    }

    input,
    button {
        color: #ffffff;
        background-color: #0f0f0f98;
    }
    button:active {
        background-color: #0f0f0f69;
    }
}
</style>