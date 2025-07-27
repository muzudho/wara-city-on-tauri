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
                <v-container class="pa-0" style="width:320px; line-height: 0;">
                    <!--
                        例えば、以下のようなタグをリピート。
                        <Tile :srcLeft="0" :srcTop="0" :srcWidth="32" :srcHeight="32" :tilemapUrl="'/public/img/tiles/tilemap_sea.png'"/>
                    -->
                    <Tile v-for="(item, index) in srcTileListVM" :key="index" :srcLeft="item.srcLeft" :srcTop="item.srcTop" :srcWidth="item.srcWidth" :srcHeight="item.srcHeight" :tilemapUrl="item.tilemapUrl"
                            @click="onMapTileClick(index)"/>
                </v-container>
                <!--
                    TODO パレット・ウィンドウを置きたい。
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
                    style="background-color: aliceblue;"
                    >
                    <div style="color: black; background-color: lightgray; height: 32px;">
                        Tile palette
                    </div>
                    <div style="padding-left: 4px; padding-top: 4px;">
                        <Tile :srcLeft="0"  :srcTop="0" :srcWidth="32" :srcHeight="32" :tilemapUrl="'/public/img/tiles/tilemap_sea.png'" @click="onSrcTileClick('sea0')"/>
                        <Tile :srcLeft="32" :srcTop="0" :srcWidth="32" :srcHeight="32" :tilemapUrl="'/public/img/tiles/tilemap_sea.png'" @click="onSrcTileClick('wasteland')"/>
                    </div>
                </vue-draggable-resizable>
                <!--
                    @dragging="(x, y) => updatePosition(key, x, y)"
                    @resizing="(x, y, w, h) => updateSize(key, x, y, w, h)"
                -->

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

    interface TileDict {
        [key: string]: TileItem;
    }

    interface TileItem {
        srcLeft: number;    // 切り抜く矩形のX座標（px）
        srcTop: number;     // 切り抜く矩形のY座標（px）
        srcWidth: number;   // 切り抜く矩形の横幅（px）
        srcHeight: number;  // 切り抜く矩形の縦幅（px）
        tilemapUrl: string; // タイルマップ画像のURL
    }

    const srcTileDict = {
        'sea': {srcLeft:0*32, srcTop:0*32, srcWidth:32, srcHeight:32, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea0': {srcLeft:1*32, srcTop:0*32, srcWidth:32, srcHeight:32, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea1': {srcLeft:2*32, srcTop:0*32, srcWidth:32, srcHeight:32, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea2': {srcLeft:3*32, srcTop:0*32, srcWidth:32, srcHeight:32, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea3': {srcLeft:4*32, srcTop:0*32, srcWidth:32, srcHeight:32, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'sea3_1': {srcLeft:5*32, srcTop:0*32, srcWidth:32, srcHeight:32, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},
        'wasteland': {srcLeft:6*32, srcTop:7*32, srcWidth:32, srcHeight:32, tilemapUrl:'/public/img/tiles/tilemap_sea.png'},    // 荒地
    } as TileDict;

    const srcTileListVM = ref([
        // [0]行目
        srcTileDict['wasteland'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],

        // [1]行目
        srcTileDict['sea0'],
        srcTileDict['wasteland'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],

        // [2]行目
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['wasteland'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],

        // [3]行目
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['wasteland'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],

        // [4]行目
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['wasteland'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],

        // [5]行目
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['wasteland'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],

        // [6]行目
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['wasteland'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],

        // [7]行目
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['wasteland'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],

        // [8]行目
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['wasteland'],
        srcTileDict['sea0'],

        // [9]行目
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['sea0'],
        srcTileDict['wasteland'],
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
        console.log("［Execute］ボタンを押したぜ。")
        //textVM.value = "［Execute］ボタンを押したぜ。"
        //textVM.value = selectedItemVM
        //textVM.value = selectedItemVM.value
        textVM.value = await callTranslate(textVM.value, selectedItemVM.value)
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
        srcTileListVM.value[index] = srcTileDict[penVM.value]
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