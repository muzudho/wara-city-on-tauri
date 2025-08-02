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
            <span class="window-title">Tile palette</span>
            <v-btn class="size-button" @click="onTitlebarSizeButtonClicked">{{ titlebarSizeButtonTextVM }}</v-btn>
        </v-container>

        <!-- クライアント領域 -->
        <v-container :style="clientAreaStyle">

            <!-- タイル選択リスト -->
            <v-select
                    v-model="selectedTilemapNameVM"
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
                        v-for="(tile, tilepath) in selectedTilemapTileDict"
                        :key="tilepath"
                        :srcLeft="tile.srcLeft"
                        :srcTop="tile.srcTop"
                        :srcWidth="tile.srcWidth"
                        :srcHeight="tile.srcHeight"
                        :tilemapUrl="getTilemapUrlByName(newTilepath(tilepath).getTilemapName())"
                        @click="onSrcTileClick(tilepath, tile)"/>

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
    import { getTilemapUrlByName } from '@/composables/tilemap-filepath-collection';
    import { newTilepath } from '@/composables/tilepath';

    // ++++++++++++++++++++++++++++++++++++
    // + インポート　＞　インターフェース +
    // ++++++++++++++++++++++++++++++++++++
    import { ListOption } from '@/interfaces/list-option';
    import { TileCursorPosition } from '@/interfaces/tile-cursor-position';
    import { TileData } from '@/interfaces/tile-data';

    // ++++++++++++++++++++++
    // + インポート　＞　型 +
    // ++++++++++++++++++++++
    import { TileDict } from '@/types/tile-dict';

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
        (event: 'selectTilemap', tilemapName: string, tilePath: string, tile: TileData): void;
    }
    const emit = defineEmits<Emits>();
    
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
            return `height: ${titlebarHeight + listboxHeight + tileAreaHeight.value}`;   // 横幅。
        }
    );

    // ++++++++++++++++
    // + タイトルバー +
    // ++++++++++++++++

    const titlebarHeight = 32;
    const titlebarSizeButtonTextVM = ref("＿");

    /**
     * タイトルバー・スタイル
     */
    const titlebarStyle = computed(
        function(): string {
            return `padding:0; color: black; background-color: lightgray; height: ${titlebarHeight}px;`;
        }
    );

    /**
     * タイトルバーのサイズボタンをクリックしたとき。
     */
    function onTitlebarSizeButtonClicked(){
        //alert("タイトルバーのサイズボタンをクリックしたとき。");
        if (clientAreaDisplayVM.value == "block") {
            clientAreaDisplayVM.value = "none";
            titlebarSizeButtonTextVM.value = "□";
        } else {
            clientAreaDisplayVM.value = "block";
            titlebarSizeButtonTextVM.value = "＿";
        }
    }

    // ++++++++++++++++++++
    // + クライアント領域 +
    // ++++++++++++++++++++

    const clientAreaDisplayVM = ref('block');

    const clientAreaHeight = computed(
        function(): number {
            return listboxHeight +      // タイルマップ名リストボックス
                tileAreaHeight.value +  // タイル領域
                16;                      // ボトム・マージン
        }
    );

    /**
     * クライアント領域スタイル
     */
    const clientAreaStyle = computed(
        function(): string {
            return "" + //
                ` display: ${clientAreaDisplayVM.value};` + //
                ` height: ${clientAreaHeight.value}px;` +   // 縦幅。
                " padding:0; background-color: aliceblue;";
        }
    );

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // + クライアント領域　＞　タイルマップ選択リストボックス +
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
    const selectedTilemapNameVM = ref<string>("sea")     // FIXME: 初期値どうする？

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

    /**
     * ［タイルマップ名］の変更を監視。
     */
    watch(selectedTilemapNameVM, () => {
        //alert(`選択マップ名=${selectedTilemapNameVM.value} カーソルx位置=${getMemoryTilePosition().xCells} y位置=${getMemoryTilePosition().yCells}`);
        // let text = "";
        // Object.entries(memoryTilePositionDict).forEach(([tliemapName, tilePos]) => {
        //     text += `タイルマップ名: ${tliemapName}, カーソル位置記憶: ${tilePos.xCells}, ${tilePos.yCells}\n`;
        // });
        // text += `タイルカーソルスタイル： ${tileCursorStyle.value}\n`;
        // alert(text);

        tileCursorLeftVM.value = getMemoryTilePosition().xCells * props.srcTileCollection.unitCellWidth.value - cursorLeftBorderWidth;
        tileCursorTopVM.value = getMemoryTilePosition().yCells * props.srcTileCollection.unitCellHeight.value - cursorTopBorderHeight;

        const tilemapName = selectedTilemapNameVM.value;
        const tilePath = getMemoryTilePosition().tliePath;
        const tile = props.srcTileCollection.getTileByPath(tilePath);

        // 親に変更を通知
        emit('selectTilemap', tilemapName, tilePath, tile);
        
        // 親に変更を通知
        emit('selectTile', tilePath, tile);
    });

    const selectedTilemapTileDict = computed(
        function(): TileDict {
            return props.srcTilemapCollection.getTilemapByName(selectedTilemapNameVM.value).tileDict;
        }
    );

    const tileAreaHeight = computed(
        function(): number {
            const bottomMargin = 8;
            return props.srcTilemapCollection.getTilemapByName(selectedTilemapNameVM.value).getPaletteHeight() + bottomMargin;
        }
    );

    /**
     * タイルエリア・スタイル
     */
    const tileAreaStyle = computed(
        function(): string {
            return '' + //
                ' width:' + props.srcTilemapCollection.getTilemapByName(selectedTilemapNameVM.value).getPaletteWidth() + 'px;' +   // 横幅。
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
        setMemoryTilePosition(
                selectedTilemapNameVM.value,
                tilePath,
                tile.srcLeft / props.srcTileCollection.unitCellWidth.value,
                tile.srcTop / props.srcTileCollection.unitCellHeight.value);
        tileCursorLeftVM.value = getMemoryTilePosition().xCells * props.srcTileCollection.unitCellWidth.value - cursorLeftBorderWidth;
        tileCursorTopVM.value = getMemoryTilePosition().yCells * props.srcTileCollection.unitCellHeight.value - cursorTopBorderHeight;

        // 親に変更を通知
        emit('selectTile', tilePath, tile);
    }

    // ++++++++++++++++++++++++++++++++++++++++
    // + クライアント領域　＞　タイルカーソル +
    // ++++++++++++++++++++++++++++++++++++++++

    const cursorLeftBorderWidth = 4;
    const cursorTopBorderHeight = 4;
    const tileCursorLeftVM = ref(0 - cursorLeftBorderWidth);
    const tileCursorTopVM = ref(0 - cursorTopBorderHeight);

    // 選択しているタイルマップ毎に位置を記憶する。
    const memoryTilePositionDict = <Record<string, TileCursorPosition>>{};
    function getMemoryTilePosition(): TileCursorPosition {
        if (!(selectedTilemapNameVM.value in memoryTilePositionDict)){
            const initialTileCursorPosition = props.srcTilemapCollection.getTilemapByName(selectedTilemapNameVM.value).initialTileCursorPosition;
            // 初期値をコピー
            memoryTilePositionDict[selectedTilemapNameVM.value] = <TileCursorPosition>{
                xCells: initialTileCursorPosition.xCells,
                yCells: initialTileCursorPosition.yCells,
                tliePath: initialTileCursorPosition.tliePath,
            };
        }
        return memoryTilePositionDict[selectedTilemapNameVM.value];
    }
    function setMemoryTilePosition(tilemapName: string, tilePath: string, xCells: number, yCells: number) {
        memoryTilePositionDict[tilemapName] = <TileCursorPosition>{
            xCells: xCells,
            yCells: yCells,
            tliePath: tilePath,
        };
    }

    const tileCursorStyle = computed(
        function(): string {
            return `position:absolute; top:${tileCursorTopVM.value}px; left:${tileCursorLeftVM.value}px; width:40px; height:40px; border-style: dashed; border-color: rgba(0, 0, 255, 0.5); border-width: 4px;`;
        }
    );
</script>

<style scoped>
    span.window-title {
        position:absolute; top:16px; left:16px;
    }
    button.size-button {
        position:absolute; right:4px; top:4px; padding: 0px; min-width:20px; height:20px;
    }
</style>
