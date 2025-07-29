<template>
    <v-app>
        <v-main>
            <v-container class="pa-1">
                <v-row no-gutters>
                    <v-col><v-text-field v-model="filePathVM" label="File Path" class="pa-0"></v-text-field></v-col>
                    <v-col cols="2"><v-btn block v-on:click="onOpenButtonClicked" class="pa-0">Open</v-btn></v-col>
                    <v-col cols="2"><v-btn block v-on:click="onRefreshButtonClicked" class="pa-0">Refresh</v-btn></v-col>
                    <v-col cols="2"><v-btn block v-on:click="onWriteButtonClicked" class="pa-0">Write</v-btn></v-col>
                </v-row>
                <!-- 単純に敷き詰めているだけ。 -->
                <v-container class="pa-0" :style="'width:' + (boardWidth * cellWidth) + 'px; line-height: 0;'">
                    <!--
                        例えば、以下のようなタグをリピート。
                        <Tile :srcLeft="0" :srcTop="0" :srcWidth="32" :srcHeight="32" :tilemapUrl="'/public/img/tiles/tilemap_sea.png'"/>
                    -->
                    <Tile v-for="(key, index) in srcTileKeyListVM" :key="index" :srcLeft="srcTileDict[key].srcLeft" :srcTop="srcTileDict[key].srcTop" :srcWidth="srcTileDict[key].srcWidth" :srcHeight="srcTileDict[key].srcHeight" :tilemapUrl="srcTileDict[key].tilemapUrl"
                            @click="onMapTileClick(index)"/>
                    <!--
                    <Tile v-for="(item, index) in srcTileListVM" :key="index" :srcLeft="item.srcLeft" :srcTop="item.srcTop" :srcWidth="item.srcWidth" :srcHeight="item.srcHeight" :tilemapUrl="item.tilemapUrl"
                            @click="onMapTileClick(index)"/>
                    -->
                </v-container>
                <!--
                    タイル・パレット・ウィンドウ
                -->
                <vue-draggable-resizable
                        :w="200"
                        :h="100"
                        :x="30"
                        :y="60"
                        :draggable="true"
                        :resizable="false"
                        :parent="false"
                        class-name="panel"
                        style="background-color: aliceblue;">
                    <div style="color: black; background-color: lightgray; height: 32px;">
                        Tile palette
                    </div>
                    <div style="padding-left: 4px; padding-top: 4px; line-height: 0;">
                        <Tile v-for="(item, key) in srcTileDict" :key="key" :srcLeft="item.srcLeft"  :srcTop="item.srcTop" :srcWidth="item.srcWidth" :srcHeight="item.srcHeight" :tilemapUrl="item.tilemapUrl" @click="onSrcTileClick(key)"/>
                        <!--
                            <Tile :srcLeft="0"  :srcTop="0" :srcWidth="32" :srcHeight="32" :tilemapUrl="'/public/img/tiles/tilemap_sea.png'" @click="onSrcTileClick('sea_0')"/>
                            <Tile :srcLeft="32" :srcTop="0" :srcWidth="32" :srcHeight="32" :tilemapUrl="'/public/img/tiles/tilemap_sea.png'" @click="onSrcTileClick('wasteland')"/>
                        -->
                    </div>
                </vue-draggable-resizable>
                <!--
                    @dragging="(x, y) => updatePosition(key, x, y)"
                    @resizing="(x, y, w, h) => updateSize(key, x, y, w, h)"
                -->
                <!--
                    ターミナル・ウィンドウ
                -->
                <vue-draggable-resizable
                        :w="200"
                        :h="100"
                        :x="30"
                        :y="60"
                        :draggable="true"
                        :resizable="true"
                        :parent="false"
                        class-name="panel"
                        style="background-color: aliceblue;">
                    <v-row style="color: black; background-color: lightgray;" no-gutters>
                        Terminal
                    </v-row>
                    <v-row no-gutters>
                        <v-textarea v-model="textVM"></v-textarea>
                    </v-row>
                    <v-row no-gutters>
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
                        <v-col cols="2"><v-btn block v-on:click="onExecuteButtonClicked" class="pa-0">Execute</v-btn></v-col>
                    </v-row>
                </vue-draggable-resizable>

            </v-container>
        </v-main>
    </v-app>    
</template>

<script setup lang="ts">
    import { invoke } from "@tauri-apps/api/core";
    import { open } from '@tauri-apps/plugin-dialog';
    import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
    import { ref } from "vue";

    import VueDraggableResizable from 'vue-draggable-resizable';
    import 'vue-draggable-resizable/style.css';

    import Tile from './components/Tile.vue';

    const boardWidth = 10;
    const cellWidth = 32;
    const cellHeight = 32;
    const boardArea = 100;

    /*
    interface TileDict {
        [key: string]: TileItem;
    }
    */
    type TileDict = Record<string, TileItem>;

    interface TileItem {
        srcLeft: number;    // 切り抜く矩形のX座標（px）
        srcTop: number;     // 切り抜く矩形のY座標（px）
        srcWidth: number;   // 切り抜く矩形の横幅（px）
        srcHeight: number;  // 切り抜く矩形の縦幅（px）
        tilemapUrl: string; // タイルマップ画像のURL
    }

    const srcTileDict = {
        //'sea': {srcTop:0*32, srcLeft:0*32, srcWidth:32, srcHeight:32, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_0': {srcTop:0*cellHeight, srcLeft:1*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_1': {srcTop:0*cellHeight, srcLeft:2*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_2': {srcTop:0*cellHeight, srcLeft:3*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_3': {srcTop:0*cellHeight, srcLeft:4*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_3_1': {srcTop:0*cellHeight, srcLeft:5*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},

        'sea_4': {srcTop:1*cellHeight, srcLeft:0*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_5': {srcTop:1*cellHeight, srcLeft:1*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_6': {srcTop:1*cellHeight, srcLeft:2*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_6_2': {srcTop:1*cellHeight, srcLeft:3*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_7': {srcTop:1*cellHeight, srcLeft:4*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_7_1': {srcTop:1*cellHeight, srcLeft:5*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},

        'sea_7_2': {srcTop:2*cellHeight, srcLeft:0*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_7_3': {srcTop:2*cellHeight, srcLeft:1*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_8': {srcTop:2*cellHeight, srcLeft:2*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_9': {srcTop:2*cellHeight, srcLeft:3*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_9_8': {srcTop:2*cellHeight, srcLeft:4*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_10': {srcTop:2*cellHeight, srcLeft:5*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},

        'sea_11': {srcTop:3*cellHeight, srcLeft:0*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_11_1': {srcTop:3*cellHeight, srcLeft:1*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_11_8': {srcTop:3*cellHeight, srcLeft:2*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_11_9': {srcTop:3*cellHeight, srcLeft:3*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_12': {srcTop:3*cellHeight, srcLeft:4*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_12_8': {srcTop:3*cellHeight, srcLeft:5*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},

        'sea_13': {srcTop:4*cellHeight, srcLeft:0*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_13_1': {srcTop:4*cellHeight, srcLeft:1*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_13_8': {srcTop:4*cellHeight, srcLeft:2*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_13_9': {srcTop:4*cellHeight, srcLeft:3*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_14': {srcTop:4*cellHeight, srcLeft:4*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_14_2': {srcTop:4*cellHeight, srcLeft:5*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},

        'sea_14_4': {srcTop:5*cellHeight, srcLeft:0*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_14_6': {srcTop:5*cellHeight, srcLeft:1*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_15': {srcTop:5*cellHeight, srcLeft:2*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_15_1': {srcTop:5*cellHeight, srcLeft:3*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_15_2': {srcTop:5*cellHeight, srcLeft:4*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_15_3': {srcTop:5*cellHeight, srcLeft:5*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},

        'sea_15_4': {srcTop:6*cellHeight, srcLeft:0*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_15_5': {srcTop:6*cellHeight, srcLeft:1*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_15_6': {srcTop:6*cellHeight, srcLeft:2*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_15_7': {srcTop:6*cellHeight, srcLeft:3*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_15_8': {srcTop:6*cellHeight, srcLeft:4*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_15_9': {srcTop:6*cellHeight, srcLeft:5*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},

        'sea_15_10': {srcTop:7*cellHeight, srcLeft:0*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_15_11': {srcTop:7*cellHeight, srcLeft:1*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_15_12': {srcTop:7*cellHeight, srcLeft:2*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_15_13': {srcTop:7*cellHeight, srcLeft:3*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_15_14': {srcTop:7*cellHeight, srcLeft:4*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea_15_15': {srcTop:7*cellHeight, srcLeft:5*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},

        'wasteland': {srcTop:7*cellHeight, srcLeft:6*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},    // 荒地
    } as TileDict;

    const srcTileKeyListVM = ref<Array<string>>([
        // [0]行目
        'wasteland',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',

        // [1]行目
        'sea_0',
        'wasteland',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',

        // [2]行目
        'sea_0',
        'sea_0',
        'wasteland',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',

        // [3]行目
        'sea_0',
        'sea_0',
        'sea_0',
        'wasteland',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',

        // [4]行目
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'wasteland',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',

        // [5]行目
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'wasteland',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',

        // [6]行目
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'wasteland',
        'sea_0',
        'sea_0',
        'sea_0',

        // [7]行目
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'wasteland',
        'sea_0',
        'sea_0',

        // [8]行目
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'wasteland',
        'sea_0',

        // [9]行目
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'sea_0',
        'wasteland',
    ]);

    const penVM = ref('')

    interface IOption {
        key: string;
        value: string;
    }

    const filePathVM = ref("C:\\Users\\muzud\\OneDrive\\ドキュメント\\temp\\temp.csv");
    const optionsVM = <Array<IOption>>[
        {key: "", value: ""},
        {key: "都道府県スプリット1", value: "都道府県スプリット"},
        {key: "マップJSON出力1", value: "マップJSON出力"},
        {key: "マップJSON入力1", value: "マップJSON入力（未実装）"},
    ]
    const selectedItemVM = ref<string>("")
    const textVM = ref()

    async function onOpenButtonClicked() {
        console.log("［Open］ボタンを押したぜ。")
        // Open a dialog
        const filePath = await open({
            multiple: false,
            directory: false,  // ファイルを開く。
            defaultPath: filePathVM.value
        });
        filePathVM.value = filePath ?? "";  // パスの取得に失敗したら空文字列を入れる。
        readFile()
    }

    async function onRefreshButtonClicked() {
        console.log("［Refresh］ボタンを押したぜ。")
        readFile()
    }

    async function onWriteButtonClicked() {
        console.log("［Write］ボタンを押したぜ。")
        // 書き込むためには、📄 `src-tauri/capabilities/default.json` ファイルの `permissions` を設定する必要がある。
        await writeTextFile(filePathVM.value, textVM.value);
    }

    async function readFile() {
        const contents = await readTextFile(filePathVM.value);  
        textVM.value = contents
    }

    async function onExecuteButtonClicked() {
        //alert(`［Execute］ボタンを押したぜ。 selectedItemVM.value=${selectedItemVM.value}`)

        if (selectedItemVM.value == 'マップJSON出力1'){

            let jsonText = '{ "tileList": [\n'
            srcTileKeyListVM.value.forEach((tileKey: string, _index: number) => {
                jsonText += `"${tileKey}",\n`;
            });
            jsonText += '""'; // 番兵
            jsonText += "] }"; //

            textVM.value = jsonText;

        } else if (selectedItemVM.value == 'マップJSON入力1'){

            // TODO マップJSON入力
            //const jsonString = '{"tile1": {"srcLeft": 10, "srcTop": 20}}';
            const jsonString = textVM.value;
            let result;
            //let srcTileKeyList2VM = Array<string>;
            try {
                result = JSON.parse(jsonString);// as TileMap;
                alert(`result=${result}`);

                // 配列全体をそのまま入れ替えると、値の変更通知機能が失われてしまうので、要素を１つずつ入れる。
                for(let i=0; i<boardArea; i+=1){
                    srcTileKeyListVM.value[i] = result["tileList"][i];    // 配列
                }
            } catch (error) {
                alert(`エラー：${error}`);
            }

            textVM.value = JSON.stringify(result, null, '    ');

        } else {
            textVM.value = await callTranslate(textVM.value, selectedItemVM.value)
        }
    }

    // Tauriのコマンドを呼び出し。
    // 文字列を渡すと、指定の操作を実施後の文字列を返す。
    async function callTranslate(sourceStr: string, commandName: string): Promise<string> {
        const resultStr = await invoke<string>('translate', {sourceStr: sourceStr, commandName: commandName});
        return resultStr;
    }

    function onMapTileClick(index: number) {
        //alert(`マップタイルをクリックした： index=${index}`)
        if (penVM.value == '') {
            return;
        }
        // マップタイルを更新
        srcTileKeyListVM.value[index] = penVM.value
    }

    function onSrcTileClick(name: string) {
        //alert(`ソースタイルをクリックした： name=${name}`)
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