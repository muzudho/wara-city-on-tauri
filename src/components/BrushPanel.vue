<template>
    <vue-draggable-resizable
            :w="216"
            :x="0"
            :y="0"
            :draggable="true"
            :resizable="true"
            :parent="false"
            :style="panelStyle">

        <!-- ウィンドウ・タイトル -->
        <v-container :style="titlebarStyle">
            Brush
        </v-container>

        <!-- クライアント領域 -->
        <v-container class="pa-0" :style="clientAreaStyle">

            <!-- 選択タイル -->
            <Tile
                    :srcLeft="selectedTileDataVM.srcLeft"
                    :srcTop="selectedTileDataVM.srcTop"
                    :srcWidth="selectedTileDataVM.srcWidth"
                    :srcHeight="selectedTileDataVM.srcHeight"
                    :tilemapUrl="selectedTileDataVM.tilemapUrl"
                    :style="selectedTileStyle"/>
        </v-container>
    </vue-draggable-resizable>
</template>

<script setup lang="ts">
    import { computed, ref } from "vue";

    // ドラッグ可能パネル
    import VueDraggableResizable from 'vue-draggable-resizable';
    import 'vue-draggable-resizable/style.css';

    // コンポーネント、型、共有データ等。 @はsrcへのエイリアス
    import Tile from '@/components/Tile.vue';
    import { TileData } from '@/interfaces/tile-data';

    const selectedTileDataVM = ref<TileData>({
        srcLeft: 0,
        srcTop: 0,
        srcWidth: 32,
        srcHeight: 32,
        tilemapUrl: "/img/tiles/tilemap_sea.png", // タイルマップ画像のURL
    });

    // ##########
    // # パネル #
    // ##########

    /**
     * パネル・スタイル
     */
    const panelStyle = computed(
        function(): string {
            const height = titlebarHeight + clientAreaHeight.value;
            return `height: ${height}`;   // 横幅。
        }
    );

    // ################
    // # タイトルバー #
    // ################

    const titlebarHeight = 32;

    /**
     * タイトルバー・スタイル
     */
    const titlebarStyle = computed(
        function(): string {
            return `color: black; background-color: lightgray; height: ${titlebarHeight}px;`;
        }
    );

    // ####################
    // # クライアント領域 #
    // ####################

    const clientAreaHeight = computed(
        function(): number {
            return selectedTileHeight + 2*selectedTileMargin;
        }
    );

    /**
     * クライアント領域スタイル
     */
    const clientAreaStyle = computed(
        function(): string {
            return '' + //
                ' height:' + clientAreaHeight.value + 'px;' +   // 縦幅。
                ' padding: 0; line-height: 0; background-color: aliceblue;';
        }
    );

    // ##############
    // # 選択タイル #
    // ##############

    const selectedTileHeight = 32;
    const selectedTileMargin = 8;

    /**
     * 選択タイル・スタイル
     */
    const selectedTileStyle = computed(
        function(): string {
            return '' + //
                ` width: 32px;` + //
                ` height: ${selectedTileHeight}px;` + //
                ` margin: ${selectedTileMargin}px;` + //
                ' padding: 0; line-height: 0; background-color: aliceblue;';
        }
    );

</script>

<style scoped>
</style>
