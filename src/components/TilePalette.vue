<template>
    <vue-draggable-resizable
            :w="208"
            :h="100"
            :x="30"
            :y="60"
            :draggable="true"
            :resizable="false"
            :parent="false"
            class-name="panel">
        <v-container class="pa-0" style="background-color: aliceblue;">
            <!-- ウィンドウ・タイトル -->
            <v-row no-gutters style="color: black; background-color: lightgray; height: 32px;">
                Tile palette
            </v-row>

            <!-- タイル選択リスト -->
            <v-row no-gutters>
                <v-select
                        v-model="selectedTilemapKeyVM"
                        v-bind:items="optionsVM"
                        label="タイルマップ名"
                        item-title="value"
                        item-value="key"
                        class="ma-0">
                </v-select>
            </v-row>

            <!-- タイルを敷き詰めるだけ -->
            <div style="padding: 8px; line-height: 0;">
                <Tile
                        v-for="(item, key) in props.srcTileDictDict[selectedTilemapKey]"
                        :key="key"
                        :srcLeft="item.srcLeft"
                        :srcTop="item.srcTop"
                        :srcWidth="item.srcWidth"
                        :srcHeight="item.srcHeight"
                        :tilemapUrl="item.tilemapUrl"
                        @click="onSrcTileClick(key)"/>
            </div>            
        </v-container>
    </vue-draggable-resizable>
</template>

<script setup lang="ts">
    import { computed, ref, watch } from "vue";

    // ドラッグ可能パネル
    import VueDraggableResizable from 'vue-draggable-resizable';
    import 'vue-draggable-resizable/style.css';

    // コンポーネント、型、共有データ等
    import Tile from '@/components/Tile.vue';
    import { TileDictDict } from '@/types/tile-dict-dict'; // @はsrcへのエイリアス

    // コンポーネントが受け取る引数
    interface Props {
        srcTileDictDict: TileDictDict;
    }
    const props = defineProps<Props>();

    // カスタムイベントを定義
    interface Emits {
        // イベント名と、変更通知メソッドの引数と、そのメソッドの戻り値。
        (event: 'selectTile', value: string): void;
        (event: 'changeTilemap', value: string): void;
    }
    const emit = defineEmits<Emits>();

    // タイル選択リストボックス
    interface ListOption {
        key: string;
        value: string;
    }

    const optionsVM = <Array<ListOption>>[
        {key: "", value: ""},
        {key: "sea", value: "海"},
        {key: "sea2", value: "海2"},
        {key: "land", value: "陸"},
        {key: "wastelandRoad", value: "荒地の道"},
    ]
    const selectedTilemapKeyVM = ref<string>("sea")     // FIXME: 初期値どうする？
    // ビューモデルの変更を監視。
    watch(selectedTilemapKeyVM, () => {
        // 親に変更を通知
        emit('changeTilemap', selectedTilemapKeyVM.value);
    });
    const selectedTilemapKey = computed(
        function(): string {
            return selectedTilemapKeyVM.value
        }
    );

    function onSrcTileClick(name: string) {
        //alert(`ソースタイルをクリックした： name=${name}`)
        // 親に変更を通知
        emit('selectTile', name);
    }
</script>

<style scoped>
</style>
