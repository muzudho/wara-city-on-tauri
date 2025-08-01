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
            Tile palette
        </v-container>

        <!-- クライアント領域 -->
        <v-container class="pa-0" :style="clientAreaStyle">

            <!-- タイル選択リスト -->
            <v-select
                    v-model="selectedTilemapKeyVM"
                    v-bind:items="optionsVM"
                    label="タイルマップ名"
                    item-title="value"
                    item-value="key"
                    class="ma-0"
                    :style="listboxStyle">
            </v-select>

            <!-- タイルを敷き詰めるだけ -->
            <v-container :style="tileAreaStyle" style="position: relative;">
                <!-- タイル・カーソル -->
                <div :style="tileCursorStyle"></div>

                <Tile
                        v-for="(tile, key) in props.srcTilemapCollection.getTilemapByName(selectedTilemapKey).tileDict"
                        :key="key"
                        :srcLeft="tile.srcLeft"
                        :srcTop="tile.srcTop"
                        :srcWidth="tile.srcWidth"
                        :srcHeight="tile.srcHeight"
                        :tilemapUrl="tile.tilemapUrl"
                        @click="onSrcTileClick(key, tile)"/>
            </v-container>            
        </v-container>
    </vue-draggable-resizable>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############
    import { computed, ref, watch } from "vue";

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

    // ++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーザル +
    // ++++++++++++++++++++++++++++++++
    import { SourceTileCollection } from '@/composables/source-tile-collection';
    import { SourceTilemapCollection } from '@/composables/source-tilemap-collection';

    // ++++++++++++++++++++++++++++++++++++
    // + インポート　＞　インターフェース +
    // ++++++++++++++++++++++++++++++++++++
    import { TileData } from '@/interfaces/tile-data';

    // ####################################
    // # このコンポーネントが受け取る引数 #
    // ####################################
    interface Props {
        srcTileCollection: SourceTileCollection;
        srcTilemapCollection: SourceTilemapCollection;
    }
    const props = defineProps<Props>();

    // ##############################################
    // # このコンポーネントで起こるカスタムイベント #
    // ##############################################
    interface Emits {
        // イベント名と、変更通知メソッドの引数と、そのメソッドの戻り値。
        (event: 'selectTile', tilePath: string, tile: TileData): void;
        (event: 'changeTilemap', value: string): void;
    }
    const emit = defineEmits<Emits>();
    
    // ############################
    // # このコンポーネントの画面 #
    // ############################

    /**
     * パネル・スタイル
     */
    const panelStyle = computed(
        function(): string {
            const height = titlebarHeight + listboxHeight + tileAreaHeight.value;
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

    /**
     * クライアント領域スタイル
     */
    const clientAreaStyle = computed(
        function(): string {
            return "background-color: aliceblue;";
        }
    );

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // + クライアント領域　＞　タイルマップ・リストボックス +
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // タイル選択リストボックス
    interface ListOption {
        key: string;
        value: string;
    }

    const optionsVM = <Array<ListOption>>[
        //{key: "", value: ""},
        // アルファベット順ではなく、使いやすい順に並べる。
        {key: "sea", value: "海"},
        {key: "seaBorder", value: "海の境界線"},
        {key: "land", value: "陸"},
        {key: "wastelandRoad", value: "荒地の道"},
        {key: "wastelandBorder", value: "荒地の境界線"},
        {key: "out", value: "外"},
        {key: "outBorder", value: "外の境界線"},
        {key: "system", value: "システム"},
    ];

    const listboxHeight = 64;

    /**
     * リストボックス・スタイル
     */
    const listboxStyle = computed(
        function(): string {
            return `"height: ${listboxHeight}px;`;
        }
    );

    // ++++++++++++++++++++++++++++++++++++++
    // + クライアント領域　＞　タイルエリア +
    // ++++++++++++++++++++++++++++++++++++++

    const selectedTilemapKeyVM = ref<string>("sea")     // FIXME: 初期値どうする？
    /**
     * ［タイルマップ名］の変更を監視。
     */
    watch(selectedTilemapKeyVM, () => {
        // TODO タイルカーソルの位置を復元したい。

        // 

        // 親に変更を通知
        emit('changeTilemap', selectedTilemapKeyVM.value);
    });
    const selectedTilemapKey = computed(
        function(): string {
            return selectedTilemapKeyVM.value
        }
    );

    const tileAreaHeight = computed(
        function(): number {
            const bottomMargin = 8;
            return props.srcTilemapCollection.getTilemapByName(selectedTilemapKey.value).getPaletteHeight() + bottomMargin;
        }
    );

    /**
     * タイルエリア・スタイル
     */
    const tileAreaStyle = computed(
        function(): string {
            return '' + //
                ' width:' + props.srcTilemapCollection.getTilemapByName(selectedTilemapKey.value).getPaletteWidth() + 'px;' +   // 横幅。
                ' height:' + tileAreaHeight.value + 'px;' +   // 縦幅。
                ' padding: 0; line-height: 0;';
        }
    );

    /**
     * ソースタイルをクリックしたとき。
     * @param tilePath フラットなタイル名。
     */
    function onSrcTileClick(tilePath: string, tile: TileData) {
        // カーソルの位置を再設定。
        selectedTileHorizontalCells.value = tile.srcLeft / props.srcTileCollection.unitCellWidth.value;
        selectedTileVerticalCells.value = tile.srcTop / props.srcTileCollection.unitCellHeight.value;
        // selectedTileLeft.value = tile.srcLeft - cursorLeftBorderWidth;
        // selectedTileTop.value = tile.srcTop - cursorTopBorderHeight;

        //alert(`ソースタイルをクリックした： name=${name} selectedTileLeft=${selectedTileLeft.value} selectedTileTop=${selectedTileTop.value}`)

        // TODO そのタイルの横幅、縦幅を取得したい。

        // 親に変更を通知
        emit('selectTile', tilePath, tile);
    }

    // ++++++++++++++++++++++++++++++++++++++++
    // + クライアント領域　＞　タイルカーソル +
    // ++++++++++++++++++++++++++++++++++++++++

    // TODO 選択しているタイルマップ毎に位置を記憶したい。

    const cursorLeftBorderWidth = 4;
    const cursorTopBorderHeight = 4;
    const selectedTileHorizontalCells = ref(0);
    const selectedTileVerticalCells = ref(0);
    const selectedTileLeft = computed(
        function(): number {
            return selectedTileHorizontalCells.value * props.srcTileCollection.unitCellWidth.value - cursorLeftBorderWidth;
        }
    );
    const selectedTileTop = computed(
        function(): number{
            return selectedTileVerticalCells.value * props.srcTileCollection.unitCellHeight.value - cursorTopBorderHeight;
        }
    );
    const tileCursorStyle = computed(
        function(): string {
            return `position:absolute; top:${selectedTileTop.value}px; left:${selectedTileLeft.value}px; width:40px; height:40px; border-style: dashed; border-color: rgba(0, 0, 255, 0.5); border-width: 4px;`;
        }
    );
</script>

<style scoped>
</style>
