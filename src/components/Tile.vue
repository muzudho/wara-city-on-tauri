<template>
    <div class="tile" :style="tileStyle"></div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    interface TileArgs {
        srcLeft: number;    // 切り抜く矩形のX座標（px）
        srcTop: number;     // 切り抜く矩形のY座標（px）
        srcWidth: number;   // 切り抜く矩形の横幅（px）
        srcHeight: number;  // 切り抜く矩形の縦幅（px）
        tilemapUrl: string; // タイルマップ画像のURL
    }
    // definePropsにデフォルト値を設定
    const props = withDefaults(defineProps<TileArgs>(), {
        srcWidth: 32,
        srcHeight: 32,
    });

    const tileStyle = computed(() => ({
        width: `${props.srcWidth}px`,
        height: `${props.srcHeight}px`,
        backgroundImage: `url('${props.tilemapUrl}')`,
        backgroundPosition: `${-props.srcLeft}px ${-props.srcTop}px`,
        backgroundRepeat: 'no-repeat',
    }));
</script>

<style scoped>
    .tile {
        display: inline-block;
    }
</style>