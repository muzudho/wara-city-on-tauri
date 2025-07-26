<template>
    ぺぺぺ
    <!--
    -->
    <div class="tile" :style="tileStyle"></div>
    ぺぺぺ
    <!--
    タイル<div class="tile" :style="tileStyle"></div>たいる。
    <div style="width: 32px; height: 32px;
        background-image: url('/public/img/tiles/tilemap1.png');
        background-position: -32px 0px;
        background-repeat: no-repeat;"></div>
    -->
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    //*
    interface TileArgs {
        tileX: { type: Number, required: true }, // タイルのX座標（グリッド）
        tileY: { type: Number, required: true }, // タイルのY座標（グリッド）
        tileSize: { type: Number, default: 32 }, // タイルの幅と高さ（px）
        tilemapUrl: { type: String, required: true }, // タイルマップ画像のURL
    }
    const props = defineProps<TileArgs>();
    // */

    /*
    const tileStyle = computed(() => ({
        width: `${props.tileSize}px`,
        height: `${props.tileSize}px`,
        backgroundImage: `url('${props.tilemapUrl}')`,
        backgroundPosition: `${-props.tileX * props.tileSize}px ${-props.tileY * props.tileSize}px`,
        backgroundRepeat: 'no-repeat',
    }));
    // */

    //*
    const tileStyle = computed(() => ({
        width: `${props.tileSize}px`,
        height: `${props.tileSize}px`,
        backgroundImage: `url('${props.tilemapUrl}')`,
        backgroundPosition: `-32px 0px`,
        backgroundRepeat: 'no-repeat',
    }));
    // */

    /*
    const tileStyle = computed(() => ({
        width: `32px`,
        height: `32px`,
        backgroundImage: `url('/public/img/tiles/tilemap1.png')`,
        backgroundPosition: `-32px 0px`,
        backgroundRepeat: 'no-repeat',
    }));
    // */

    /*
    // const tileStyle = computed(() => ({
    //     width: `${props.tileSize}px`,
    //     height: `${props.tileSize}px`,
    //     backgroundImage: `url(${props.tilemapUrl})`,
    //     backgroundPosition: `${-props.tileX * props.tileSize}px ${-props.tileY * props.tileSize}px`,
    //     backgroundRepeat: 'no-repeat',
    // }));
    // */
</script>

<style scoped>
    .tile {
        display: inline-block;
    }
</style>