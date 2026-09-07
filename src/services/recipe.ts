import { buildMockRecipe } from '@/mock/recipes';
import type { Recipe } from '@/types';

/** 模拟模型生成耗时 */
const GENERATE_DELAY_MS = 2600;

export interface KitchenContext {
  /** 用户确认要用的食材 */
  ingredientIds: string[];
  /** 用户厨房里还有的食材 */
  pantryIds: string[];
  /** 用户拥有的调料 */
  seasoningIds: string[];
  /** 用户拥有的厨具 */
  cookwareIds: string[];
}

export interface GenerateRecipeOptions {
  /** 仅用于 Demo/测试：强制返回空结果 */
  forceEmpty?: boolean;
  /** 用户厨房上下文，用于生成更贴合实际的步骤与贴士 */
  kitchenContext?: KitchenContext;
}

/**
 * 根据已确认食材和厨房上下文生成菜谱（Mock）
 *
 * 真实接入时替换为对后端的请求，把 kitchenContext 一并传过去即可。
 * 返回值保持 Recipe 结构，页面层无需改动。
 */
export function generateRecipe(
  ingredientIds: string[],
  _options?: GenerateRecipeOptions,
): Promise<Recipe | null> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!ingredientIds || ingredientIds.length === 0) {
        reject(new Error('至少需要一种食材才能生成菜谱'));
        return;
      }
      if (_options?.forceEmpty) {
        resolve(null);
        return;
      }
      resolve(buildContextualRecipe(_options?.kitchenContext));
    }, GENERATE_DELAY_MS);
  });
}

/** 根据厨房上下文微调固定菜谱：让步骤和贴士更贴合用户真实条件 */
function buildContextualRecipe(context?: KitchenContext): Recipe {
  const recipe = buildMockRecipe();
  if (!context) return recipe;

  const { seasoningIds = [], cookwareIds = [] } = context;
  const hasWok = cookwareIds.includes('wok');
  const hasFryingPan = cookwareIds.includes('fryingpan');
  const hasSesameOil = seasoningIds.includes('sesameoil');
  const hasSoySauce = seasoningIds.includes('soysauce');
  const hasOyster = seasoningIds.includes('oyster');

  // 厨具缺省时，把「炒锅」相关措辞改成平底锅或通用锅具
  const steps = recipe.steps.map((step) => {
    let detail = step.detail;
    let title = step.title;
    let cookBrief = step.cookBrief ?? step.detail;

    if (!hasWok && hasFryingPan && (detail.includes('炒锅') || detail.includes('热锅凉油'))) {
      detail = detail.replace('热锅凉油', '平底锅中小火，刷一层薄油');
      detail = detail.replace('锅里补一点油', '平底锅里补一点油');
      cookBrief = cookBrief.replace('热锅凉油', '平底锅刷薄油');
      cookBrief = cookBrief.replace('锅里补一点油', '平底锅补油');
    }

    return { ...step, title, detail, cookBrief };
  });

  // 根据调料补充/删减贴士
  const extraTips: string[] = [];
  if (!hasSesameOil) {
    extraTips.push('你家暂时没有香油，出锅时可以用少许食用油代替。');
  }
  if (hasOyster && hasSoySauce) {
    extraTips.push('你有一瓶蚝油和生抽，煮汤底时各加小半勺会更鲜。');
  }

  const tips = [...recipe.tips, ...extraTips].slice(0, 5);

  return { ...recipe, steps, tips };
}
