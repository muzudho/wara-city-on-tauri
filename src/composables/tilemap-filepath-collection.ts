// ##############
// # インポート #
// ##############

// 型
import { StringDict } from '@/types/string-dict'; // @はsrcへのエイリアス

// ################
// # エクスポート #
// ################

// モジュールスコープでインスタンスを1つだけ作る（シングルトン）
export const tilemapFilepathDict = <StringDict>{
    // "/public" フォルダー下のパス
    'land': '/img/tiles/tilemap_land.png',
    'out': '/img/tiles/tilemap_out.png',
    'outBorder': '/img/tiles/tilemap_outBorder.png',
    'sea': '/img/tiles/tilemap_sea.png',
    'seaBorder': '/img/tiles/tilemap_seaBorder.png',
    'system': '/img/tiles/tilemap_system.png',
    'wastelandRoad': '/img/tiles/tilemap_wastelandRoad.png',
    'wastelandBorder': '/img/tiles/tilemap_wastelandBorder.png',
};
