// ##############
// # インポート #
// ##############

import { Ref } from 'vue';

// ++++++++++++++++++++++++++++++++++++
// + インポート　＞　インターフェース +
// ++++++++++++++++++++++++++++++++++++
//
// @はsrcへのエイリアス
//

import { TilemapData } from '@/interfaces/tilemap-data';

// ################
// # エクスポート #
// ################

export type TilemapDict = Record<string, Ref<TilemapData>>;
