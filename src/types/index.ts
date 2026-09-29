/** 识朴 Spoon · 领域模型定义 */

/** 食材大类 */
export type IngredientCategory = 'vegetable' | 'protein' | 'staple' | 'seasoning' | 'other';

export const CATEGORY_LABEL: Record<IngredientCategory, string> = {
  vegetable: '蔬菜',
  protein: '蛋奶蛋白',
  staple: '主食',
  seasoning: '调料',
  other: '其他',
};

/** 食材 */
export interface Ingredient {
  id: string;
  name: string;
  /** 强调色（用于识别卡片的细描边 / 进度点缀，非背景大色块） */
  color: string;
  category: IngredientCategory;
  /** 自然笔记式的一句小注 */
  note: string;
  /** 常温 / 冷藏建议存放天数 */
  shelfLifeDays: number;
  /** 菜篮子中的存量（仅菜篮子场景用到，目录 / 识别里可不传） */
  stock?: number;
  /** 存量单位，如 个 / 把 / 根，缺省为 份 */
  stockUnit?: string;
}

/** AI 识别出的单个食材：在食材基础上附带置信度与是否采纳 */
export interface RecognizedIngredient extends Ingredient {
  /** 0 ~ 1 */
  confidence: number;
  /** 用户在确认页是否勾选 */
  selected: boolean;
  /** 识别到的大致数量（如 番茄 ×2） */
  quantity: number;
  /** 数量单位，如 个 / 把 / 根 */
  unit: string;
}

/** 一次识别会话的结果 */
export interface RecognitionResult {
  id: string;
  createdAt: number;
  /** Mock 阶段用照片种子代替真实照片，可包含多张照片 */
  imageSeeds: number[];
  items: RecognizedIngredient[];
}

/** 烹饪模式可用的插画种类（钢笔淡彩） */
export type StepIllu =
  | 'prep'
  | 'egg'
  | 'tomato'
  | 'onion'
  | 'noodle'
  | 'bokchoy'
  | 'pot'
  | 'pan'
  | 'dish'
  | 'herb';

/** 菜谱步骤 */
export interface RecipeStep {
  index: number;
  title: string;
  detail: string;
  /** 该步骤建议耗时（分钟） */
  durationMin: number;
  /** 烹饪模式对应的钢笔淡彩插画（可选，缺省时按标题推断） */
  illu?: StepIllu;
  /** 烹饪模式专用精简文案（远距离可读）；缺省时回退到 detail */
  cookBrief?: string;
}

/** 菜谱中的一道食材（结构化用量） */
export interface RecipeIngredient {
  /** 关联食材 id（与「我的厨房」库存一致关联，不依赖名称） */
  ingredientId: string;
  name: string;
  /** 基础份数（baseServings）下的用量，数值可缩放 */
  baseAmount: number;
  /** 用量单位：个 / 颗 / 根 / 把 / 片 / 瓣 / ml / L / g / kg 等 */
  unit: string;
  /**
   * 定性用量备注，如「适量」「少许」。
   * 仅在 scalable=false 时作为展示文案，不参与份数缩放。
   */
  note?: string;
  /**
   * 是否参与份数缩放：
   *  true  = 按比例的精确数值，随 servings 实时计算；
   *  false = 定性描述（如「适量」），始终保持 note 原样、不缩放。
   */
  scalable: boolean;
}

/** 一道菜完成烹饪后，针对某食材计划消耗的量（已按 servings 缩放） */
export interface ConsumeItem {
  ingredientId: string;
  name: string;
  /** 本次实际消耗量（底层保留可计算数值，不做展示取整） */
  amount: number;
  unit: string;
}

/** 一次烹饪任务：开始烹饪时锁定 recipeId / 份数 / 实际消耗清单 */
export interface CookingSession {
  recipeId: string;
  recipeName: string;
  /** 用户当前选择的份数（锁定为本次烹饪的最终参数） */
  servings: number;
  /** 菜谱基础份数，用于回溯缩放比例 */
  baseServings: number;
  /** 已按 servings 缩放、待扣减的食材清单 */
  ingredientsToConsume: ConsumeItem[];
  /** 是否已对库存执行过扣减（防止同一任务重复扣减） */
  consumed: boolean;
  createdAt: number;
}

/** 菜谱 */
export interface Recipe {
  id: string;
  name: string;
  subtitle: string;
  /** 结构化食材（含基础用量与单位），替代原 ingredientIds */
  ingredients: RecipeIngredient[];
  timeMin: number;
  difficulty: '简单' | '适中' | '有点挑战';
  /** AI 最初生成菜谱时的标准份数（换算基准，不可随意改动） */
  baseServings: number;
  /** 用户当前实际选择的份数（可由用户在详情页调整） */
  servings: number;
  tags: string[];
  /** 自然笔记式导语 */
  story: string;
  steps: RecipeStep[];
  tips: string[];
  /** 灵活替换：可以把某样食材换成另一样（Demo 用） */
  substitutes?: Array<{ from: string; to: string; note?: string }>;
}

/** 取菜谱用到的食材 id 集合（兼容旧用法） */
export const recipeIngredientIds = (recipe: Recipe): string[] =>
  recipe.ingredients.map((item) => item.ingredientId);

/** 调料 / 调味品 */
export interface Seasoning {
  id: string;
  name: string;
  /** 一句话说明用途或用量偏好 */
  note: string;
}

/** 厨具 / 厨房电器 */
export interface Cookware {
  id: string;
  name: string;
  /** 一句话说明规格或使用场景 */
  note: string;
}

/** 历史记录条目 */
export interface HistoryEntry {
  id: string;
  createdAt: number;
  recipeId: string;
  recipeName: string;
  ingredientNames: string[];
}
