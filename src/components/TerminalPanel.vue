<template>
    <vue-draggable-resizable
            :w="400"
            :x="0"
            :y="0"
            :draggable="true"
            :resizable="true"
            :parent="false"
            :style="panelStyle">
        
        <!-- ウィンドウ・タイトル -->
        <v-container :style="titlebarStyle">
            <span class="window-title">Terminal</span>
            <v-btn class="size-button" @click="onTitlebarSizeButtonClicked">{{ titlebarSizeButtonTextVM }}</v-btn>
        </v-container>

        <!-- クライアント領域 -->
        <v-container :style="clientAreaStyle">

            <!-- FIXME: テキストエリアは可変サイズのため、縦幅を取得する方法が分からない。 -->
            <v-textarea
                v-model="textVM"
                :style="textareaStyle"/>

            <v-row no-gutters :style="listboxAreaStyle">
                <v-col class="pa-0">
                    <v-select
                            v-model="selectedItemVM"
                            v-bind:items="optionsVM"
                            label="機能"
                            item-title="value"
                            item-value="key"
                            class="ma-0">
                    </v-select>
                </v-col>
                <v-col cols="3"><v-btn block v-on:click="onExecuteButtonClicked" class="pa-0">Execute</v-btn></v-col>
            </v-row>
        </v-container>
    </vue-draggable-resizable>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############
    //import { invoke } from "@tauri-apps/api/core";
    import { computed, Reactive, ref } from "vue";

    // ++++++++++++++++++++++++++++++++++++++
    // + インポート　＞　ドラッグ可能パネル +
    // ++++++++++++++++++++++++++++++++++++++
    import VueDraggableResizable from 'vue-draggable-resizable';
    import 'vue-draggable-resizable/style.css';

    // ++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーザル +
    // ++++++++++++++++++++++++++++++++
    //
    // @はsrcへのエイリアス
    //
    import { Board } from '@/composables/board';
    import { SourceTileCollection } from "@/composables/source-tile-collection";
    import { SourceTilemapCollection } from "@/composables/source-tilemap-collection";

    // ####################################
    // # このコンポーネントが受け取る引数 #
    // ####################################
    interface Props {
        srcTileCollection: Reactive<SourceTileCollection>;
        srcTilemaps: Reactive<SourceTilemapCollection>;
        board: Reactive<Board>;
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
            return `height: ${titlebarHeight + textAreaHeight.value + listboxAreaHeight.value}`;   // 横幅。
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

    /**
     * クライアント領域スタイル
     */
    const clientAreaStyle = computed(
        function(): string {
            return "" + //
                ` display: ${clientAreaDisplayVM.value};` + //
                ` height: ${textAreaHeight.value + listboxAreaHeight.value};` + //
                " padding:0; background-color: aliceblue;";
        }
    );

    // ++++++++++++++++++++++++++++++++++++++++++
    // + クライアント領域　＞　テキストボックス +
    // ++++++++++++++++++++++++++++++++++++++++++

    const textVM = ref()
    const textAreaHeight = ref(100);

    /**
     * テキストエリア・スタイル
     */
    const textareaStyle = computed(
        function(): string {
            return "" + //
                ` height: ${textAreaHeight.value};`;
        }
    );

    // ++++++++++++++++++++++++++++++++++++++++
    // + クライアント領域　＞　リストボックス +
    // ++++++++++++++++++++++++++++++++++++++++

    const listboxAreaHeight = ref(64);

    interface IOption {
        key: string;
        value: string;
    }

    const optionsVM = <Array<IOption>>[
        {key: "", value: ""},
        {key: "マップJSON出力1", value: "マップJSON出力"},
        {key: "マップJSON入力1", value: "マップJSON入力"},
        {key: "都道府県スプリット1", value: "都道府県スプリット"},
    ]
    const selectedItemVM = ref<string>("")

    /**
     * リストボックス領域スタイル
     */
    const listboxAreaStyle = computed(
        function(): string {
            return "" + //
                ` height: ${listboxAreaHeight.value};`;
        }
    );

    // ++++++++++++++++++++++++++++++++++++
    // + クライアント領域　＞　実行ボタン +
    // ++++++++++++++++++++++++++++++++++++

    async function onExecuteButtonClicked() {
        //alert(`［Execute］ボタンを押したぜ。 selectedItemVM.value=${selectedItemVM.value}`)

        if (selectedItemVM.value == 'マップJSON出力1'){

            let jsonText = '{\n'
            jsonText += `    "widthCells": ${props.board.widthCells},\n`;
            jsonText += `    "heightCells": ${props.board.heightCells},\n`;
            jsonText += `    "unitCellWidth": ${props.srcTileCollection.unitCellWidth},\n`;
            jsonText += `    "unitCellHeight": ${props.srcTileCollection.unitCellHeight},\n`;
            jsonText += '    "tileList": [\n';
            props.board.tilepathArray.forEach((tileKey: string, _index: number) => {
                jsonText += `        "${tileKey}",\n`;
            });
            jsonText += '        ""\n'; // 番兵
            jsonText += '    ]\n';
            jsonText += "}\n"; //

            textVM.value = jsonText;

        } else if (selectedItemVM.value == 'マップJSON入力1'){

            if (props.board == null) {
                return;
            }

            // TODO マップJSON入力
            //const jsonString = '{"tile1": {"srcLeft": 10, "srcTop": 20}}';
            const jsonString = textVM.value;
            let result;
            //let srcTileKeyList2VM = Array<string>;
            try {
                result = JSON.parse(jsonString);// as TileMap;
                //alert(`result=${result}`);

                // 配列全体をそのまま入れ替えると、値の変更通知機能が失われてしまうので、要素を１つずつ入れる。
                for(let i=0; i<props.board.areaCells; i+=1){
                    props.board.tilepathArray[i] = result["tileList"][i];    // 配列から、タイルのキー名を取り出し、代入
                }
            } catch (error) {
                alert(`エラー：${error}`);
            }

            textVM.value = JSON.stringify(result, null, '    ');

        }
    }
</script>

<style scoped>
    span.window-title {
        position:absolute; top:16px; left:16px;
    }
    button.size-button {
        position:absolute; right:4px; top:4px; padding: 0px; min-width:20px; height:20px;
    }
</style>
