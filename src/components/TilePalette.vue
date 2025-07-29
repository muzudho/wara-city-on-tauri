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
        <div style="color: black; background-color: lightgray; height: 32px;">
            Tile palette
        </div>
        <div style="padding-left: 4px; padding-top: 4px; line-height: 0;">
            <Tile v-for="(item, key) in props.srcTileDict" :key="key" :srcLeft="item.srcLeft"  :srcTop="item.srcTop" :srcWidth="item.srcWidth" :srcHeight="item.srcHeight" :tilemapUrl="item.tilemapUrl" @click="onSrcTileClick(key)"/>
        </div>
    </vue-draggable-resizable>
</template>

<script setup lang="ts">
    import { ref } from "vue";

    import VueDraggableResizable from 'vue-draggable-resizable';
    import 'vue-draggable-resizable/style.css';

    interface TileItem {
        srcLeft: number;    // 切り抜く矩形のX座標（px）
        srcTop: number;     // 切り抜く矩形のY座標（px）
        srcWidth: number;   // 切り抜く矩形の横幅（px）
        srcHeight: number;  // 切り抜く矩形の縦幅（px）
        tilemapUrl: string; // タイルマップ画像のURL
    }

    type TileDict = Record<string, TileItem>;

    interface Props {
        srcTileDict: TileDict;    // 辞書
    }

    const props = defineProps<Props>();
    /*
    // definePropsにデフォルト値を設定
    const props = withDefaults(defineProps<Props>(), {
        "srcTileDict": {} as TileDict,
    });
    */

    const penVM = ref('')

    function onSrcTileClick(name: string) {
        //alert(`ソースタイルをクリックした： name=${name}`)
        penVM.value = name
    }
</script>

<style scoped>
</style>
