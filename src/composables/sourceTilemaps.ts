import { ref, Ref } from 'vue';

// 型
import { StringDict } from '@/types/string-dict'; // @はsrcへのエイリアス

// タイルマップの元画像を管理する型
export interface SourceTilemaps {
    tilemapFilepathDict: StringDict;  // 変更がないデータ
    cellWidth: Ref<number>;
    cellHeight: Ref<number>;
}

// モジュールスコープでインスタンスを1つだけ作る
const tilemapFilepathDict = <StringDict>{
    'sea': '/public/img/tiles/tilemap_sea.png',
    'land': '/public/img/tiles/tilemap_land.png',
};
const cellWidth: Ref<number> = ref(32);
const cellHeight: Ref<number> = ref(32);

const sourceTilemaps: SourceTilemaps = {
    tilemapFilepathDict,
    cellWidth,
    cellHeight,
};

// 返すオブジェクトはシングルトン。
export function getSourceTilemaps(): SourceTilemaps {
    return sourceTilemaps;
}
