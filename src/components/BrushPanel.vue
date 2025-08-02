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
            <span class="window-title">Brush</span>
            <v-btn class="size-button" @click="onTitlebarSizeButtonClicked">{{ titlebarSizeButtonTextVM }}</v-btn>
        </v-container>

        <!-- クライアント領域 -->
        <v-container :style="clientAreaStyle">

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
                    v-model="selectedDrawingMethodNameVM"                    
                    label="右クリックの働き"
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
        drawingMethodName: string;
    }
    const props = defineProps<Props>();

    // ##############################################
    // # このコンポーネントで起こるカスタムイベント #
    // ##############################################
    interface Emits {
        // イベント名と、変更通知メソッドの引数と、そのメソッドの戻り値。
        (event: 'selectDrawingMethodName', drawingMethodName: string): void;
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
            return `height: ${titlebarHeight + clientAreaHeight.value}`;   // 横幅。
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
            return tileRowHeight + 2*tileRowMargin + // タイル行
                listboxHeight;  // 描き方選択リストボックス
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
                ' padding: 0; line-height: 0; background-color: aliceblue;';
        }
    );

    // ++++++++++++++++++++++++++++++++++
    // + クライアント領域　＞　タイル行 +
    // ++++++++++++++++++++++++++++++++++

    const tileRowHeight = 32;
    const tileRowMargin = 8;

    /**
     * 選択タイル・スタイル
     */
    const selectedTileStyle = computed(
        function(): string {
            return '' + //
                ` width: 32px;` + //
                ` height: ${tileRowHeight}px;` + //
                ` margin: ${tileRowMargin}px;` + //
                ' padding: 0; line-height: 0; background-color: aliceblue;';
        }
    );

    // ++++++++++++++++++++++++++++++++++++++++++++++++++
    // + クライアント領域　＞　描き方選択リストボックス +
    // ++++++++++++++++++++++++++++++++++++++++++++++++++

    const optionsVM = <Array<ListOption>>[
        // アルファベット順ではなく、使いやすい順に並べる。
        {key: "dot", value: "１マスずつ描く"},
        {key: "fill", value: "塗り潰し（１塗りにつき１００マスまで）"},
        {key: "border", value: "１マスずつ描く（境界線の自動接続）"},
    ];
    const selectedDrawingMethodNameVM = ref<string>(props.drawingMethodName)

    const listboxHeight = 64;

    /**
     * リストボックス・スタイル
     */
    const listboxStyle = computed(
        function(): string {
            return `"height: ${listboxHeight}px;`;
        }
    );

    /**
     * ［描き方］リストボックスの変更を監視。
     */
    watch(selectedDrawingMethodNameVM, () => {
        // 親に変更を通知
        emit('selectDrawingMethodName', selectedDrawingMethodNameVM.value);
    });

</script>

<style scoped>
    span.window-title {
        position:absolute; top:16px; left:16px;
    }
    button.size-button {
        position:absolute; right:4px; top:4px; padding: 0px; min-width:20px; height:20px;
    }
</style>
