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
}

/** AI 识别出的单个食材：在食材基础上附带置信度与是否采纳 */
export interface RecognizedIngredient extends Ingredient {
  /** 0 ~ 1 */
  confidence: number;
  /** 用户在确认页是否勾选 */
  selected: boolean;
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

/** 菜谱 */
export interface Recipe {
  id: string;
  name: string;
  subtitle: string;
  ingredientIds: string[];
  timeMin: number;
  difficulty: '简单' | '适中' | '有点挑战';
  servings: number;
  tags: string[];
  /** 自然笔记式导语 */
  story: string;
  steps: RecipeStep[];
  tips: string[];
  /** 灵活替换：可以把某样食材换成另一样（Demo 用） */
  substitutes?: Array<{ from: string; to: string; note?: string }>;
}

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
