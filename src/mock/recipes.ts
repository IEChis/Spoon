import type { Recipe } from '@/types';

/**
 * 菜谱库（Mock）
 * 当前阶段 AI 生成结果固定为「番茄鸡蛋小白菜面」，
 * 其余菜谱用于「菜谱」Tab 的列表展示与推荐位。
 */
export const RECIPES: Recipe[] = [
  {
    id: 'tomato-egg-bokchoy-noodle',
    name: '番茄鸡蛋小白菜面',
    subtitle: '一碗把冰箱清空的热汤面',
    ingredientIds: ['tomato', 'egg', 'bokchoy', 'noodle'],
    timeMin: 15,
    difficulty: '简单',
    servings: 2,
    tags: ['一锅出', '15分钟', '清冰箱'],
    story:
      '番茄先炒出沙，鸡蛋后放才嫩，小白菜最后下锅保住脆。三样东西凑在一起，刚好是一碗有汤有菜有蛋白的面。',
    steps: [
      {
        index: 1,
        title: '备料',
        detail:
          '番茄顶部划十字，开水烫 30 秒去皮切块；小白菜洗净，梗叶分开；鸡蛋打散，加一小勺温水。',
        durationMin: 5,
        illu: 'prep',
        cookBrief: '番茄划十字烫去皮切块；小白菜洗净梗叶分开；鸡蛋加温水打散。',
      },
      {
        index: 2,
        title: '炒蛋',
        detail: '热锅凉油，蛋液下锅后别急着翻，边缘凝固再划散，七分熟盛出备用。',
        durationMin: 3,
        illu: 'egg',
        cookBrief: '热锅凉油，蛋液下锅别急翻，边缘凝固再划散，七分熟盛出。',
      },
      {
        index: 3,
        title: '炒番茄出沙',
        detail: '锅里补一点油，下番茄块中火翻炒，加半勺盐逼出汁水，炒到软烂成酱状。',
        durationMin: 5,
        illu: 'tomato',
        cookBrief: '补油下番茄中火炒，加盐逼出汁，炒到软烂成酱。',
      },
      {
        index: 4,
        title: '煮汤底',
        detail: '往番茄里加两碗热水煮开，尝味补盐，喜欢的话点几滴生抽提鲜。',
        durationMin: 3,
        illu: 'pot',
        cookBrief: '加两碗热水煮开，尝味补盐，点几滴生抽提鲜。',
      },
      {
        index: 5,
        title: '下面与菜',
        detail: '挂面下锅煮至八分熟，先放小白菜梗，再放叶子，最后倒回炒蛋。',
        durationMin: 4,
        illu: 'noodle',
        cookBrief: '挂面煮八分熟，先放菜梗再放叶，最后倒回炒蛋。',
      },
      {
        index: 6,
        title: '出锅',
        detail: '关火淋几滴香油，撒葱花。趁热吃，汤会自己变浓。',
        durationMin: 1,
        illu: 'dish',
        cookBrief: '关火淋香油撒葱花，趁热吃，汤会更浓。',
      },
    ],
    tips: [
      '番茄去皮后更容易出沙，赶时间可以省略。',
      '汤底用热水而不是冷水，酸味更柔和。',
      '面条别煮太软，盛到碗里还会继续吸汤。',
    ],
    substitutes: [
      { from: '挂面', to: '乌冬面', note: '更弹，煮的时间要短一点' },
      { from: '鸡蛋', to: '嫩豆腐', note: '少油版，蛋白质照样够' },
      { from: '小白菜', to: '生菜', note: '最后三十秒再下，保脆' },
    ],
  },
  {
    id: 'tomato-egg-scramble',
    name: '番茄炒蛋',
    subtitle: '最不会出错的那道菜',
    ingredientIds: ['tomato', 'egg', 'scallion'],
    timeMin: 12,
    difficulty: '简单',
    servings: 2,
    tags: ['家常', '10分钟', '下饭'],
    story: '糖不是为了让菜变甜，而是把番茄的酸托起来。这一勺的差别，就是家常和馆子的差别。',
    steps: [
      {
        index: 1,
        title: '备料',
        detail: '番茄切块，鸡蛋打散加一小勺温水，小葱切末。',
        durationMin: 4,
        illu: 'prep',
      },
      { index: 2, title: '滑蛋', detail: '油热后下蛋液，凝固即盛出，不要炒老。', durationMin: 3, illu: 'egg' },
      {
        index: 3,
        title: '炒番茄',
        detail: '下番茄炒出汁，加半勺糖、适量盐。',
        durationMin: 4,
        illu: 'tomato',
      },
      { index: 4, title: '合炒', detail: '倒回鸡蛋翻匀，撒葱花出锅。', durationMin: 1, illu: 'pan' },
    ],
    tips: ['糖只放一点点，作用是提鲜不是调味。', '鸡蛋里加温水比加牛奶更不容易腥。'],
  },
  {
    id: 'onion-egg-fried-rice',
    name: '洋葱蛋炒饭',
    subtitle: '隔夜饭的最好归宿',
    ingredientIds: ['onion', 'egg', 'scallion'],
    timeMin: 15,
    difficulty: '简单',
    servings: 1,
    tags: ['剩饭', '快手', '一人食'],
    story: '洋葱要炒到边缘发黄、甜味出来，这碗饭就成了一半。',
    steps: [
      { index: 1, title: '备料', detail: '洋葱切丁，隔夜饭用手抓散，鸡蛋打散。', durationMin: 4, illu: 'prep' },
      {
        index: 2,
        title: '炒洋葱',
        detail: '中火把洋葱丁炒软炒到边缘微焦。',
        durationMin: 4,
        illu: 'onion',
      },
      { index: 3, title: '下饭', detail: '转大火下米饭，用铲子压散炒至粒粒分明。', durationMin: 4, illu: 'pan' },
      { index: 4, title: '调味', detail: '沿锅边淋蛋液，翻匀后加盐和葱花。', durationMin: 3, illu: 'pan' },
    ],
    tips: ['饭一定要隔夜的，水分少才炒得散。', '锅要够热，饭才不会粘。'],
  },
  {
    id: 'bokchoy-tofu-soup',
    name: '小白菜豆腐汤',
    subtitle: '清淡但不会寡',
    ingredientIds: ['bokchoy', 'tofu', 'mushroom'],
    timeMin: 18,
    difficulty: '简单',
    servings: 2,
    tags: ['少油', '暖胃', '素食'],
    story: '香菇水就是这锅汤的底味，什么都不用加，也已经很鲜。',
    steps: [
      { index: 1, title: '备料', detail: '香菇泡发留水，豆腐切块，小白菜洗净切段。', durationMin: 5, illu: 'prep' },
      { index: 2, title: '煮汤', detail: '香菇水和清水入锅煮开，下香菇与豆腐。', durationMin: 6, illu: 'pot' },
      { index: 3, title: '下菜', detail: '转小火放小白菜，煮到梗变透明。', durationMin: 5, illu: 'bokchoy' },
      { index: 4, title: '调味', detail: '加盐、几滴香油即可。', durationMin: 2, illu: 'pot' },
    ],
    tips: ['泡香菇的水静置后只用上层，底部有沙。', '豆腐别煮太久，会起蜂窝。'],
  },
];

export const RECIPE_MAP: Record<string, Recipe> = Object.fromEntries(
  RECIPES.map((item) => [item.id, item]),
);

/** 本阶段 AI 生成结果的固定指向 */
export const FEATURED_RECIPE_ID = 'tomato-egg-bokchoy-noodle';

export function getRecipe(id: string): Recipe | undefined {
  return RECIPE_MAP[id];
}

/**
 * Mock 生成菜谱：无论传入什么食材，当前固定返回「番茄鸡蛋小白菜面」。
 * 后续接真实模型时，替换这里的实现即可，页面与状态层无需改动。
 */
export function buildMockRecipe(): Recipe {
  return RECIPE_MAP[FEATURED_RECIPE_ID];
}
