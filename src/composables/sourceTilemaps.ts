import { ref, Ref } from 'vue';

// 型
import { StringDict } from '@/types/string-dict'; // @はsrcへのエイリアス

// タイルマップの元画像を管理する型
export interface SourceTilemaps {
    tilemapFilepathDict: StringDict;  // 変更がないデータ
    cellWidth: Ref<number>;
    cellHeight: Ref<number>;
}

// モジュールスコープでインスタンスを1つだけ作る（シングルトン）
const tilemapFilepathDict = <StringDict>{
    'sea': '/public/img/tiles/tilemap_sea.png',
    'land': '/public/img/tiles/tilemap_land.png',
};

export function createSourceTilemaps(): SourceTilemaps {
    const cellWidth: Ref<number> = ref(32);
    const cellHeight: Ref<number> = ref(32);

    return {
        tilemapFilepathDict,
        cellWidth,
        cellHeight,
    };
}
