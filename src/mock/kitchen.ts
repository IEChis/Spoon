import type { Seasoning, Cookware } from '@/types';

/** 常见家庭调料台 */
export const SEASONINGS: Seasoning[] = [
  { id: 'salt', name: '盐', note: '日常炒菜、煮汤都少不了' },
  { id: 'soysauce', name: '生抽', note: '提鲜调味，炒菜拌馅都能用' },
  { id: 'darksoy', name: '老抽', note: '上色用，红烧时加一点' },
  { id: 'oyster', name: '蚝油', note: '炒青菜、拌肉馅很顺手' },
  { id: 'sugar', name: '糖', note: '中和酸味、提亮鲜度' },
  { id: 'vinegar', name: '醋', note: '凉拌、去腥、增加香气' },
  { id: 'cookingwine', name: '料酒', note: '去腥增香，腌肉煮汤常用' },
  { id: 'sesameoil', name: '香油', note: '出锅前淋几滴，提香' },
  { id: 'pepper', name: '白胡椒粉', note: '汤面、炒菜撒一点暖味' },
];

/** 常见家庭厨具 */
export const COOKWARE: Cookware[] = [
  { id: 'wok', name: '炒锅', note: '最常用的中式炒菜锅' },
  { id: 'souppot', name: '汤锅', note: '煮汤、煮面、焯水都可以' },
  { id: 'ricecooker', name: '电饭煲', note: '煮饭、蒸菜、慢炖都方便' },
  { id: 'fryingpan', name: '平底锅', note: '煎蛋、煎饼、煎牛排' },
  { id: 'steamer', name: '蒸锅', note: '蒸鱼、蒸蛋、热馒头' },
  { id: 'cuttingboard', name: '砧板', note: '切菜切肉必备' },
  { id: 'knife', name: '菜刀', note: '中式片切皆宜' },
];

const SEASONING_MAP: Record<string, Seasoning> = Object.fromEntries(
  SEASONINGS.map((item) => [item.id, item]),
);

const COOKWARE_MAP: Record<string, Cookware> = Object.fromEntries(
  COOKWARE.map((item) => [item.id, item]),
);

export function getSeasoning(id: string): Seasoning {
  return SEASONING_MAP[id] ?? { id, name: '未知调料', note: '暂时没有它的档案。' };
}

export function getCookware(id: string): Cookware {
  return COOKWARE_MAP[id] ?? { id, name: '未知厨具', note: '暂时没有它的档案。' };
}
