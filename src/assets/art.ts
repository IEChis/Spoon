/**
 * 真实视觉资产（钢笔淡彩食材插画 · 透明 PNG）
 * 这些资产来自产品提供的「素材」目录，已统一风格。
 * 优先用真实 PNG，缺失时回退到 SVG 线稿库（见 components/illustrations）。
 *
 * 注意：bokchoy（小白菜）演示集中没有单独的 PNG，
 * 使用最贴近的绿叶菜 cabbage（卷心菜）资产顶替。
 */
import tomato from './art/tomato.png';
import egg from './art/egg.png';
import onion from './art/onion.png';
import cabbage from './art/cabbage.png';
import peaPod from './art/pea-pod.png';
import pumpkin from './art/pumpkin.png';
import rosemary from './art/rosemary.png';

/** ingredient id → 真实钢笔淡彩 PNG 地址 */
export const INGREDIENT_ART: Record<string, string> = {
  tomato,
  egg,
  onion,
  bokchoy: cabbage,
  cabbage,
  pea_pod: peaPod,
  pumpkin,
  rosemary,
};

/** 菜谱封面的备用静物主图（按菜品主食材挑一张真实 PNG） */
export const RECIPE_HERO_ART: Record<string, string> = {
  'tomato-egg-bokchoy-noodle': tomato,
  'tomato-egg-scramble': tomato,
  'onion-egg-fried-rice': onion,
  'bokchoy-tofu-soup': cabbage,
};

export function getIngredientArt(id: string): string | undefined {
  return INGREDIENT_ART[id];
}

export function getRecipeHeroArt(recipeId: string): string | undefined {
  return RECIPE_HERO_ART[recipeId];
}
