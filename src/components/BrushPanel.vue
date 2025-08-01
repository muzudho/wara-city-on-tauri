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
                    :srcLeft="props.selectedTileData.srcLeft"
                    :srcTop="props.selectedTileData.srcTop"
                    :srcWidth="props.selectedTileData.srcWidth"
                    :srcHeight="props.selectedTileData.srcHeight"
                    :tilemapUrl="props.selectedTileData.tilemapUrl"
                    :style="selectedTileStyle"/>
            
            <!-- 描き方選択リスト -->
            <v-select
                    v-bind:items="optionsVM"
                    v-model="selectedDrawingNameVM"                    
                    label="描き方"
                    item-title="value"
                    item-value="key"
                    class="ma-0"
                    :style="listboxStyle">
            </v-select>
            
        </v-container>
    </vue-draggable-resizable>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############
    import { computed, ref } from "vue";

    // ++++++++++++++++++++++++++++++++++++++
    // + インポート　＞　ドラッグ可能パネル +
    // ++++++++++++++++++++++++++++++++++++++
    import VueDraggableResizable from 'vue-draggable-resizable';
    import 'vue-draggable-resizable/style.css';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++
    //
    // @はsrcへのエイリアス
    //
    import Tile from '@/components/Tile.vue';

    // ++++++++++++++++++++++++++++++++++++
    // + インポート　＞　インターフェース +
    // ++++++++++++++++++++++++++++++++++++
    import { ListOption } from '@/interfaces/list-option';
    import { TileData } from '@/interfaces/tile-data';

    // ################################
    // # コンポーネントが受け取る引数 #
    // ################################
    interface Props {
        selectedTileData: TileData;
    }
    const props = defineProps<Props>();

    // ############################
    // # このコンポーネントの画面 #
    // ############################

    // ++++++++++
    // + パネル +
    // ++++++++++

    /**
     * パネル・スタイル
     */
    const panelStyle = computed(
        function(): string {
            const height = titlebarHeight + clientAreaHeight.value;
            return `height: ${height}`;   // 横幅。
        }
    );

    // ++++++++++++++++
    // + タイトルバー +
    // ++++++++++++++++

    const titlebarHeight = 32;

    /**
     * タイトルバー・スタイル
     */
    const titlebarStyle = computed(
        function(): string {
            return `color: black; background-color: lightgray; height: ${titlebarHeight}px;`;
        }
    );

    // ++++++++++++++++++++
    // + クライアント領域 +
    // ++++++++++++++++++++

    const clientAreaHeight = computed(
        function(): number {
            return selectedTileHeight + 2*selectedTileMargin + // 選択タイル
                listboxHeight;  // 描き方選択リストボックス
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

    // ++++++++++++++++++++++++++++++++++++
    // + クライアント領域　＞　選択タイル +
    // ++++++++++++++++++++++++++++++++++++

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

    // ++++++++++++++++++++++++++++++++++++++++++++++++++
    // + クライアント領域　＞　描き方選択リストボックス +
    // ++++++++++++++++++++++++++++++++++++++++++++++++++

    const optionsVM = <Array<ListOption>>[
        // アルファベット順ではなく、使いやすい順に並べる。
        {key: "dot", value: "１マスずつ"},
        {key: "fill", value: "塗り潰し"},
    ];
    const selectedDrawingNameVM = ref<string>("dot")     // FIXME: 初期値どうする？

    const listboxHeight = 64;

    /**
     * リストボックス・スタイル
     */
    const listboxStyle = computed(
        function(): string {
            return `"height: ${listboxHeight}px;`;
        }
    );

</script>

<style scoped>
</style>
