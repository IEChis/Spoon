import type { Ingredient, RecognizedIngredient } from '@/types';

/**
 * 食材库（Mock）
 * 前四种为本阶段「固定识别结果」，即无论拍什么都会识别出来的演示素材。
 * 视觉一律用钢笔淡彩插画（真实 PNG 优先，见 components/IngredientArt），不再使用 emoji。
 */
export const INGREDIENTS: Ingredient[] = [
  {
    id: 'tomato',
    name: '番茄',
    color: '#D9603F',
    category: 'vegetable',
    note: '蒂部发青的更耐放，熟透的适合炒出沙。',
    shelfLifeDays: 5,
  },
  {
    id: 'egg',
    name: '鸡蛋',
    color: '#C9A24A',
    category: 'protein',
    note: '打散时加一小勺温水，炒出来更蓬松。',
    shelfLifeDays: 20,
  },
  {
    id: 'bokchoy',
    name: '小白菜',
    color: '#6FA05A',
    category: 'vegetable',
    note: '梗先下锅、叶后下锅，口感才分层。',
    shelfLifeDays: 3,
  },
  {
    id: 'onion',
    name: '洋葱',
    color: '#C79A6B',
    category: 'vegetable',
    note: '切前冷藏十分钟，不太容易辣眼睛。',
    shelfLifeDays: 14,
  },
  {
    id: 'scallion',
    name: '小葱',
    color: '#7BAE66',
    category: 'seasoning',
    note: '葱白爆香，葱绿起锅前撒。',
    shelfLifeDays: 4,
  },
  {
    id: 'noodle',
    name: '挂面',
    color: '#C9A86B',
    category: 'staple',
    note: '水宽火大，面汤才不糊。',
    shelfLifeDays: 180,
  },
  {
    id: 'tofu',
    name: '嫩豆腐',
    color: '#C9BFA6',
    category: 'protein',
    note: '下锅前用淡盐水泡五分钟，不容易碎。',
    shelfLifeDays: 2,
  },
  {
    id: 'mushroom',
    name: '香菇',
    color: '#A5855F',
    category: 'vegetable',
    note: '泡发的水别倒，是天然的鲜味来源。',
    shelfLifeDays: 6,
  },
];

export const INGREDIENT_MAP: Record<string, Ingredient> = Object.fromEntries(
  INGREDIENTS.map((item) => [item.id, item]),
);

/** 按 id 取食材，取不到时给一个安全兜底 */
export function getIngredient(id: string): Ingredient {
  return (
    INGREDIENT_MAP[id] ?? {
      id,
      name: '未知食材',
      color: '#9AA79C',
      category: 'other',
      note: '暂时没有它的档案。',
      shelfLifeDays: 3,
    }
  );
}

/**
 * Mock 识别结果：固定返回 番茄 / 鸡蛋 / 小白菜 / 洋葱
 * 真实接入 API 时，只需让 recognition 服务返回同样结构即可。
 */
export function buildMockRecognized(): RecognizedIngredient[] {
  const fixed: Array<{ id: string; confidence: number }> = [
    { id: 'tomato', confidence: 0.97 },
    { id: 'egg', confidence: 0.94 },
    { id: 'bokchoy', confidence: 0.88 },
    { id: 'onion', confidence: 0.76 },
  ];

  return fixed.map(({ id, confidence }) => ({
    ...getIngredient(id),
    confidence,
    selected: true,
  }));
}
