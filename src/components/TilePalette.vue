<template>
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

        <!-- ウィンドウ・タイトル -->
        <div style="color: black; background-color: lightgray; height: 32px;">
            Tile palette
        </div>

        <!-- タイル選択リスト -->
        <v-row no-gutters>
            <v-col class="pa-0">
                <v-select
                        v-model="selectedItemVM"
                        v-bind:items="optionsVM"
                        label="タイルマップ名"
                        item-title="value"
                        item-value="key"
                        class="ma-0">
                </v-select>
            </v-col>
        </v-row>

        <!-- タイルを敷き詰めるだけ -->
        <div style="padding-left: 4px; padding-top: 4px; line-height: 0;">
            <Tile v-for="(item, key) in srcTileDict" :key="key" :srcLeft="item.srcLeft"  :srcTop="item.srcTop" :srcWidth="item.srcWidth" :srcHeight="item.srcHeight" :tilemapUrl="item.tilemapUrl" @click="onSrcTileClick(key)"/>
        </div>

    </vue-draggable-resizable>
</template>

<script setup lang="ts">
    import { ref } from "vue";

    // ドラッグ可能パネル
    import VueDraggableResizable from 'vue-draggable-resizable';
    import 'vue-draggable-resizable/style.css';

    // 型
    import { TileDict } from '@/types/tile-dict'; // @はsrcへのエイリアス

    // コンポーネント
    import Tile from '@/components/Tile.vue';

    // 共有データ
    import { createSourceTilemaps } from '@/composables/sourceTilemaps';

    // タイル選択リストボックス
    interface ListOption {
        key: string;
        value: string;
    }

    const optionsVM = <Array<ListOption>>[
        {key: "", value: ""},
        {key: "sea", value: "海"},
        {key: "land", value: "陸"},
    ]
    const selectedItemVM = ref<string>("sea")

    const cellWidth = 32;
    const cellHeight = 32;

    const {tilemapFilepathDict} = createSourceTilemaps();

    const srcTileDict = {
        'sea_0': {srcTop:0*cellHeight, srcLeft:1*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_1': {srcTop:0*cellHeight, srcLeft:2*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_2': {srcTop:0*cellHeight, srcLeft:3*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_3': {srcTop:0*cellHeight, srcLeft:4*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_3_1': {srcTop:0*cellHeight, srcLeft:5*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},

        'sea_4': {srcTop:1*cellHeight, srcLeft:0*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_5': {srcTop:1*cellHeight, srcLeft:1*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_6': {srcTop:1*cellHeight, srcLeft:2*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_6_2': {srcTop:1*cellHeight, srcLeft:3*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_7': {srcTop:1*cellHeight, srcLeft:4*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_7_1': {srcTop:1*cellHeight, srcLeft:5*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},

        'sea_7_2': {srcTop:2*cellHeight, srcLeft:0*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_7_3': {srcTop:2*cellHeight, srcLeft:1*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_8': {srcTop:2*cellHeight, srcLeft:2*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_9': {srcTop:2*cellHeight, srcLeft:3*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_9_8': {srcTop:2*cellHeight, srcLeft:4*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_10': {srcTop:2*cellHeight, srcLeft:5*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},

        'sea_11': {srcTop:3*cellHeight, srcLeft:0*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_11_1': {srcTop:3*cellHeight, srcLeft:1*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_11_8': {srcTop:3*cellHeight, srcLeft:2*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_11_9': {srcTop:3*cellHeight, srcLeft:3*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_12': {srcTop:3*cellHeight, srcLeft:4*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_12_8': {srcTop:3*cellHeight, srcLeft:5*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},

        'sea_13': {srcTop:4*cellHeight, srcLeft:0*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_13_1': {srcTop:4*cellHeight, srcLeft:1*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_13_8': {srcTop:4*cellHeight, srcLeft:2*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_13_9': {srcTop:4*cellHeight, srcLeft:3*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_14': {srcTop:4*cellHeight, srcLeft:4*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_14_2': {srcTop:4*cellHeight, srcLeft:5*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},

        'sea_14_4': {srcTop:5*cellHeight, srcLeft:0*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_14_6': {srcTop:5*cellHeight, srcLeft:1*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15': {srcTop:5*cellHeight, srcLeft:2*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_1': {srcTop:5*cellHeight, srcLeft:3*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_2': {srcTop:5*cellHeight, srcLeft:4*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_3': {srcTop:5*cellHeight, srcLeft:5*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},

        'sea_15_4': {srcTop:6*cellHeight, srcLeft:0*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_5': {srcTop:6*cellHeight, srcLeft:1*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_6': {srcTop:6*cellHeight, srcLeft:2*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_7': {srcTop:6*cellHeight, srcLeft:3*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_8': {srcTop:6*cellHeight, srcLeft:4*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_9': {srcTop:6*cellHeight, srcLeft:5*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},

        'sea_15_10': {srcTop:7*cellHeight, srcLeft:0*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_11': {srcTop:7*cellHeight, srcLeft:1*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_12': {srcTop:7*cellHeight, srcLeft:2*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_13': {srcTop:7*cellHeight, srcLeft:3*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_14': {srcTop:7*cellHeight, srcLeft:4*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},
        'sea_15_15': {srcTop:7*cellHeight, srcLeft:5*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},

        'wasteland': {srcTop:7*cellHeight, srcLeft:6*cellWidth, srcWidth:cellWidth, srcHeight:cellHeight, tilemapUrl:tilemapFilepathDict['sea']},    // 荒地
    } as TileDict;

    const selectedTileVM = ref('')

    // カスタムイベントを定義
    interface Emits {
        // イベント名と、変更通知メソッドの引数と、そのメソッドの戻り値。
        (event: 'selectTile', value: string): void;
    }
    const emit = defineEmits<Emits>();

    function onSrcTileClick(name: string) {
        //alert(`ソースタイルをクリックした： name=${name}`)
        selectedTileVM.value = name
        // 親に変更を通知
        emit('selectTile', name);
    }
</script>

<style scoped>
</style>
