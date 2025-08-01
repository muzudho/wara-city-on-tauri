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

        <v-container class="pa-0" style="background-color: aliceblue;">

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
                        v-for="(item, key) in props.srcTilemaps.getTilemapByName(selectedTilemapKey).tileDict"
                        :key="key"
                        :srcLeft="item.srcLeft"
                        :srcTop="item.srcTop"
                        :srcWidth="item.srcWidth"
                        :srcHeight="item.srcHeight"
                        :tilemapUrl="item.tilemapUrl"
                        @click="onSrcTileClick(key)"/>
            </v-container>            
        </v-container>
    </vue-draggable-resizable>
</template>

<script setup lang="ts">
    import { computed, ref, watch } from "vue";

    // ドラッグ可能パネル
    import VueDraggableResizable from 'vue-draggable-resizable';
    import 'vue-draggable-resizable/style.css';

    // コンポーネント、型、共有データ等。 @はsrcへのエイリアス
    import { SourceTilemaps } from '@/composables/sourceTilemaps';
    import Tile from '@/components/Tile.vue';

    // コンポーネントが受け取る引数
    interface Props {
        srcTilemaps: SourceTilemaps;
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
    ]
    const selectedTilemapKeyVM = ref<string>("sea")     // FIXME: 初期値どうする？
    // ［タイルマップ名］の変更を監視。
    watch(selectedTilemapKeyVM, () => {
        // 親に変更を通知
        emit('changeTilemap', selectedTilemapKeyVM.value);
    });
    const selectedTilemapKey = computed(
        function(): string {
            return selectedTilemapKeyVM.value
        }
    );

    const titlebarHeight = 32;
    const listboxHeight = 64;
    const tileAreaHeight = computed(
        function(): number {
            const bottomMargin = 8;
            return tileAreaHeight.value + bottomMargin;
        }
    );

    const titlebarStyle = computed(
        function(): string {
            return `color: black; background-color: lightgray; height: ${titlebarHeight}px;`;
        }
    );

    const listboxStyle = computed(
        function(): string {
            return `"height: ${listboxHeight}px;`;
        }
    );

    const panelStyle = computed(
        function(): string {
            const height = titlebarHeight + listboxHeight + tileAreaHeight.value;
            return `height: ${height}`;   // 横幅。
        }
    );

    const tileAreaStyle = computed(
        function(): string {
            return '' + //
                ' width:' + props.srcTilemaps.getTilemapByName(selectedTilemapKey.value).getPaletteWidth() + 'px;' +   // 横幅。
                ' height:' + (props.srcTilemaps.getTilemapByName(selectedTilemapKey.value).getPaletteHeight() + 8) + 'px;' +   // 横幅。
                ' padding: 0; line-height: 0;';
        }
    );

    const tileCursorStyle = computed(
        function(): string {
            return 'position:absolute; top:-4px; left:-4px; width:40px; height:40px; border-style: dashed; border-color: rgba(0, 0, 255, 0.5); border-width: 4px;';
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
