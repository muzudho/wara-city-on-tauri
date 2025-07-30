<template>
    <vue-draggable-resizable
            :w="400"
            :x="0"
            :y="0"
            :draggable="true"
            :resizable="true"
            :parent="false">
        
        <!-- ウィンドウ・タイトル -->
        <v-container style="color: black; background-color: lightgray; height: 32px;">
            Terminal
        </v-container>

        <v-container class="pa-0" style="background-color: aliceblue;">

            <v-textarea v-model="textVM"></v-textarea>

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
                <v-col cols="3"><v-btn block v-on:click="onExecuteButtonClicked" class="pa-0">Execute</v-btn></v-col>
            </v-row>
        </v-container>
    </vue-draggable-resizable>
</template>

<script setup lang="ts">
    import { invoke } from "@tauri-apps/api/core";
    import { ref } from "vue";

    // ドラッグ可能パネル
    import VueDraggableResizable from 'vue-draggable-resizable';
    import 'vue-draggable-resizable/style.css';

    // 型
    import { Board } from '@/composables/board';
    import { SourceTileRectangles } from "@/composables/sourceTileRectangles";
    import { SourceTilemaps } from "@/composables/sourceTilemaps";

    // コンポーネントが受け取る引数
    interface Props {
        srcTileRectangles: SourceTileRectangles;
        srcTilemaps: SourceTilemaps;
        board: Board;
    }
    const props = defineProps<Props>();

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
    const textVM = ref()

    async function onExecuteButtonClicked() {
        //alert(`［Execute］ボタンを押したぜ。 selectedItemVM.value=${selectedItemVM.value}`)

        if (selectedItemVM.value == 'マップJSON出力1'){

            // TODO 🌟 外部からパラメーターを取得したい。
            let jsonText = '{\n'
            jsonText += `    "widthCells": ${props.board.widthCells.value},\n`;
            jsonText += `    "heightCells": ${props.board.heightCells.value},\n`;
            jsonText += `    "cellWidth": ${props.srcTileRectangles.cellWidth.value},\n`;
            jsonText += `    "cellHeight": ${props.srcTileRectangles.cellHeight.value},\n`;
            jsonText += '    "tileList": [\n';
            props.board.tileKeyArray.value.forEach((tileKey: string, _index: number) => {
                jsonText += `        "${tileKey}",\n`;
            });
            jsonText += '        ""\n'; // 番兵
            jsonText += '    ]\n';
            jsonText += "}\n"; //

            textVM.value = jsonText;

        } else if (selectedItemVM.value == 'マップJSON入力1'){

            // TODO マップJSON入力
            //const jsonString = '{"tile1": {"srcLeft": 10, "srcTop": 20}}';
            const jsonString = textVM.value;
            let result;
            //let srcTileKeyList2VM = Array<string>;
            try {
                result = JSON.parse(jsonString);// as TileMap;
                //alert(`result=${result}`);

                // 配列全体をそのまま入れ替えると、値の変更通知機能が失われてしまうので、要素を１つずつ入れる。
                for(let i=0; i<props.board.areaCells.value; i+=1){
                    props.board.tileKeyArray.value[i] = result["tileList"][i];    // 配列
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
</script>

<style scoped>
</style>
