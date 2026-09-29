import type { ConsumeItem, Recipe } from '@/types';

/**
 * 份数 → 用量 → 库存 → 消耗 的数据换算工具。
 * 所有缩放都是确定性的前端计算，不依赖 AI 重新生成。
 */

/** 计数类单位：按「个」计，非重量/体积，展示时友好取整 */
export const COUNT_UNITS = new Set([
  '个',
  '颗',
  '根',
  '块',
  '片',
  '瓣',
  '把',
  '枚',
  '条',
  '只',
  '份',
  '朵',
  '粒',
]);

/** 重量 / 体积单位：保留小数 */
export const WEIGHT_VOLUME_UNITS = new Set(['g', 'kg', 'ml', 'L', 'l', '克', '毫升', '升']);

/**
 * 按比例缩放基础用量：
 *   scaled = baseAmount × servings / baseServings
 * baseServings 非法时原样返回 baseAmount。
 */
export function scaleAmount(
  baseAmount: number,
  baseServings: number,
  servings: number,
): number {
  if (!baseServings || baseServings <= 0) return baseAmount;
  return (baseAmount * servings) / baseServings;
}

/**
 * 把缩放后的用量格式化为展示文案：
 *  - 计数食材（个/根…）：非整数时「约 N」，避免出现「4.5 个」这类厨房里别扭的数；
 *  - 重量/体积（g/ml…）：最多 1 位小数，去掉多余的 .0。
 * 注意：仅用于展示，底层库存计算仍使用 scaleAmount 的精确值。
 */
export function formatAmount(amount: number, unit: string): string {
  if (!Number.isFinite(amount)) return unit ? `${unit}` : '—';

  if (COUNT_UNITS.has(unit)) {
    const rounded = Math.round(amount);
    if (Math.abs(amount - rounded) < 0.001) return `${amount} ${unit}`;
    return `约 ${rounded} ${unit}`;
  }

  const fixed = Math.round(amount * 10) / 10;
  // 去掉整数后的 .0
  const text = Number.isInteger(fixed) ? String(fixed) : fixed.toFixed(1);
  return `${text} ${unit}`;
}

/**
 * 由菜谱与选定份数，生成本次烹饪计划消耗量：
 *  - 仅包含可缩放（scalable=true）的食材；
 *  - 计数类食材（个/根/把…）向上取整，避免库存出现「0.5 个鸡蛋」；
 *  - 重量/体积（g/ml…）保留精确值；
 *  - 定性食材（如「适量」）不参与精确扣减，不进入清单。
 */
export function buildConsumeList(recipe: Recipe, servings: number): ConsumeItem[] {
  return recipe.ingredients
    .filter((item) => item.scalable)
    .map((item) => {
      const scaled = scaleAmount(item.baseAmount, recipe.baseServings, servings);
      return {
        ingredientId: item.ingredientId,
        name: item.name,
        amount: COUNT_UNITS.has(item.unit) ? Math.ceil(scaled) : scaled,
        unit: item.unit,
      };
    });
}
