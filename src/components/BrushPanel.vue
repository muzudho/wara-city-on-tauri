<template>
    <vue-draggable-resizable
            :w="216"
            :x="0"
            :y="0"
            :draggable="true"
            :resizable="true"
            :parent="false">

        <!-- ウィンドウ・タイトル -->
        <v-container>
            Brush
        </v-container>

        <v-container class="pa-0" style="background-color: aliceblue;">

            <!-- タイルを敷き詰めるだけ -->
            <v-container style="position: relative;">
                <Tile
                        :srcLeft="0"
                        :srcTop="0"
                        :srcWidth="32"
                        :srcHeight="32"
                        :tilemapUrl="'sea'"/>
            </v-container>            
        </v-container>
    </vue-draggable-resizable>
</template>

<script setup lang="ts">
    // ドラッグ可能パネル
    import VueDraggableResizable from 'vue-draggable-resizable';
    import 'vue-draggable-resizable/style.css';

    // コンポーネント、型、共有データ等。 @はsrcへのエイリアス
    import Tile from '@/components/Tile.vue';
</script>

<style scoped>
</style>
