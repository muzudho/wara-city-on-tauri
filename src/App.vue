<template>
    <v-app>
        <v-main>
            <v-container class="pa-0" :style="boardStyle">
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
                            v-for="key in board.tileKeyArray">
                            key: {{ key }}<br/>
                    </container>
                -->
                <Tile
                        v-for="(key, index) in board.tileKeyArray.value"
                        :key="index"
                        :srcLeft="srcTileRectangles.getTileByPath(key).srcLeft"
                        :srcTop="srcTileRectangles.getTileByPath(key).srcTop"
                        :srcWidth="srcTileRectangles.getTileByPath(key).srcWidth"
                        :srcHeight="srcTileRectangles.getTileByPath(key).srcHeight"
                        :tilemapUrl="srcTileRectangles.getTileByPath(key).tilemapUrl"
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
                        :srcTilemaps="srcTilemaps"
                        v-on:changeTilemap="onTilemapChanged"
                        v-on:selectTile="onSrcTileClicked"
                        style="position:fixed; top:112px; left:16px; z-index: 10;"/>

                <!-- ターミナル・ウィンドウ
                -->
                <TerminalPanel
                        :srcTileRectangles="srcTileRectangles"
                        :srcTilemaps="srcTilemaps"
                        :board="board"
                        style="position:fixed; top:16px; left:240px; z-index: 20;"/>

            </v-container>
        </v-main>
    </v-app>    
</template>

<script setup lang="ts">
    import { computed, ref } from "vue";

    // コンポーネント
    import Tile from '@/components/Tile.vue';
    import TilePalettePanel from '@/components/TilePalettePanel.vue';
    import TerminalPanel from '@/components/TerminalPanel.vue';
    import BrushPanel from '@/components/BrushPanel.vue';

    // コンポーザブル
    import { SourceTilemaps, createSourceTilemaps } from '@/composables/sourceTilemaps';
    import { createSourceTilesCollection } from '@/composables/source-tiles-collection';
    import { createBoard } from '@/composables/board';

    // インターフェース
    import { TileData } from '@/interfaces/tile-data';

    // 盤情報は、ゲーム内のターミナル・ウィンドウと共有できる変数にしたい。
    const srcTileRectangles = createSourceTilesCollection();
    const srcTilemaps: SourceTilemaps = createSourceTilemaps(srcTileRectangles);
    const board = createBoard(srcTileRectangles);

    const boardStyle = computed(
        function(): string {
            return '' + //
                ' max-width: ' + board.widthPixels.value + 'px;' + // NOTE: max-width が 1200px ぐらいしかないような気がする。増やしておく。
                ' width:' + board.widthPixels.value + 'px;' +   // 横幅。
                ' line-height: 0;'
        }
    );

    const selectedTileFlatNameVM = ref('');
    const mouseDraggingVM = ref(false);

    const selectedTileDataVM = ref<TileData>({
        srcLeft: 0,
        srcTop: 32,
        srcWidth: 32,
        srcHeight: 32,
        tilemapUrl: "/img/tiles/tilemap_sea.png", // タイルマップ画像のURL
    });

    function onMapTileClick(index: number) {
        //alert(`マップタイルをクリックした： index=${index}`)
        if (selectedTileFlatNameVM.value == '') {
            return;
        }
        // マップタイルを更新
        board.tileKeyArray.value[index] = selectedTileFlatNameVM.value
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
        board.tileKeyArray.value[index] = selectedTileFlatNameVM.value
    }

    function onTilemapChanged(_key: string) {
        //alert(`タイルマップを変更した： key=${key}`)
        //selectedTilemapKeyVM.value = key
    }

    function onSrcTileClicked(name: string) {
        //alert(`ソースタイル２をクリックした： name=${name}`)
        selectedTileFlatNameVM.value = name
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