// 型
import { StringDict } from '@/types/string-dict'; // @はsrcへのエイリアス

// タイルマップの元画像を管理する型
export interface SourceTilemaps {
    tilemapFilepathDict: StringDict;  // 変更がないデータ
}

// モジュールスコープでインスタンスを1つだけ作る
const tilemapFilepathDict = <StringDict>{
    'sea': '/public/img/tiles/tilemap_sea.png',
    'land': '/public/img/tiles/tilemap_land.png',
};

const sourceTilemaps: SourceTilemaps = {
    tilemapFilepathDict
};

// 返すオブジェクトはシングルトン。
export function getSourceTilemaps(): SourceTilemaps {
    return sourceTilemaps;
}
