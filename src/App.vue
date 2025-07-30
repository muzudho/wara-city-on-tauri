<template>
    <v-app>
        <v-main>
            <v-container class="pa-1">
                <!--
                    配列length:{{ board.tileKeyArray.value.length }}<br/>
                -->

                <!-- 単純にタイルを敷き詰めているだけ。 -->
                <v-container class="pa-0" :style="boardStyle">
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
                            :srcLeft="srcTileRectangles.tileDict.value[key].srcLeft"
                            :srcTop="srcTileRectangles.tileDict.value[key].srcTop"
                            :srcWidth="srcTileRectangles.tileDict.value[key].srcWidth"
                            :srcHeight="srcTileRectangles.tileDict.value[key].srcHeight"
                            :tilemapUrl="srcTileRectangles.tileDict.value[key].tilemapUrl"
                            @click="onMapTileClick(index)"/>
                </v-container>

                <!-- タイル・パレット・ウィンドウ
                -->
                <TilePalette
                        :srcTileDictDict="srcTilemaps.tileDictDict.value"
                        v-on:changeTilemap="onTilemapChanged"
                        v-on:selectTile="onSrcTileClicked"></TilePalette>

                <!-- ターミナル・ウィンドウ
                -->
                <Terminal
                        :srcTileRectangles="srcTileRectangles"
                        :srcTilemaps="srcTilemaps"
                        :board="board"></Terminal>

            </v-container>
        </v-main>
    </v-app>    
</template>

<script setup lang="ts">
    import { computed, ref } from "vue";

    // コンポーネント
    import Tile from '@/components/Tile.vue';
    import TilePalette from '@/components/TilePalette.vue';
    import Terminal from '@/components/Terminal.vue';

    // 型、共有データ等
    import { SourceTilemaps, createSourceTilemaps } from '@/composables/sourceTilemaps';
    import { createSourceTileRectangles } from '@/composables/sourceTileRectangles';
    import { createBoard } from '@/composables/board';

    // 盤情報は、ゲーム内のターミナル・ウィンドウと共有できる変数にしたい。
    const srcTileRectangles = createSourceTileRectangles();
    const srcTilemaps: SourceTilemaps = createSourceTilemaps(srcTileRectangles);
    const board = createBoard(srcTileRectangles);

    const boardStyle = computed(
        function(): string {
            return 'width:' + board.widthPixels.value + 'px; line-height: 0;'
        }
    );

    const selectedTilemapKeyVM = ref('sea')     // TODO 初期値どうする？
    const penVM = ref('')

    function onMapTileClick(index: number) {
        //alert(`マップタイルをクリックした： index=${index}`)
        if (penVM.value == '') {
            return;
        }
        // マップタイルを更新
        board.tileKeyArray.value[index] = penVM.value
    }

    function onTilemapChanged(key: string) {
        //alert(`タイルマップを変更した： key=${key}`)
        selectedTilemapKeyVM.value = key
    }

    function onSrcTileClicked(name: string) {
        //alert(`ソースタイル２をクリックした： name=${name}`)
        penVM.value = name
    }
</script>

<style>
:root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
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
    height: 95vh;
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