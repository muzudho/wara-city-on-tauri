<template>
    <div class="tile" :style="tileStyle"></div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    interface TileArgs {
        tileX: number;      // タイルのX座標（グリッド）
        tileY: number;      // タイルのY座標（グリッド）
        tileSize?: number;  // タイルの幅と高さ（px）
        tilemapUrl: string; // タイルマップ画像のURL
    }
    // definePropsにデフォルト値を設定
    const props = withDefaults(defineProps<TileArgs>(), {
        tileSize: 32,
    });

    const tileStyle = computed(() => ({
        width: `${props.tileSize}px`,
        height: `${props.tileSize}px`,
        backgroundImage: `url('${props.tilemapUrl}')`,
        backgroundPosition: `${-props.tileX * props.tileSize}px ${-props.tileY * props.tileSize}px`,
        backgroundRepeat: 'no-repeat',
    }));
</script>

<style scoped>
    .tile {
        display: inline-block;
    }
</style>