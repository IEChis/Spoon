import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { INGREDIENTS, getIngredient } from '@/mock/ingredients';
import { getCookware, getSeasoning } from '@/mock/kitchen';
import { generateRecipe } from '@/services/recipe';
import { recognizeIngredients, mergeRecognitions } from '@/services/recognition';
import type {
  Cookware,
  HistoryEntry,
  Ingredient,
  Recipe,
  RecognitionResult,
  RecognizedIngredient,
  Seasoning,
} from '@/types';

export type RecognitionStatus = 'idle' | 'scanning' | 'done' | 'error';
export type GenerationStatus = 'idle' | 'generating' | 'success' | 'empty' | 'error';
/** 相机入口意图：做菜（识别后生成菜谱） / 采购（识别后只入菜篮子） */
export type CaptureMode = 'cook' | 'purchase';

interface AppStoreValue {
  /* ---- 识别流程 ---- */
  photoSeeds: number[];
  recognitionStatus: RecognitionStatus;
  recognition: RecognitionResult | null;
  /** 本次拍照的意图：做菜 / 记录采购 */
  captureMode: CaptureMode;
  setCaptureMode: (mode: CaptureMode) => void;
  /** 开始一次新的识别（传入所有已拍/已上传的照片种子） */
  startRecognition: (seeds: number[]) => void;
  /** 重新识别当前所有照片 */
  retryRecognition: () => void;
  /** 勾选 / 取消某个识别结果 */
  toggleRecognized: (id: string) => void;
  /** 调整某个识别结果的数量 */
  setRecognizedQuantity: (id: string, quantity: number) => void;
  /** 手动补充一个未被识别出的食材 */
  addRecognized: (ingredientId: string) => void;
  /** 把识别结果写入菜篮子（合并存量，采购/做菜都会先记录） */
  recordToPantry: (items: Ingredient[]) => void;
  /** 直接用当前菜篮子生成一道菜 */
  generateFromPantry: () => void;
  /** 先把识别到的食材合并（数量累加）进菜篮子，再以合并后的完整菜篮子生成菜谱 */
  generateFromMerged: (items: Array<Ingredient & { quantity?: number; unit?: string }>) => void;
  /** 做完一道菜后，按菜谱食材扣减菜篮子存量（归零自动移除） */
  consumeRecipe: (recipe: Recipe) => void;

  /* ---- 菜谱生成 ---- */
  confirmedIngredients: Ingredient[];
  generationStatus: GenerationStatus;
  aiRecipe: Recipe | null;
  generationError: string | null;
  /** 确认食材并触发生成，随后跳转到结果页 */
  confirmIngredients: (items: Ingredient[], options?: { forceEmpty?: boolean; forceError?: string }) => void;
  /** 用当前已确认的食材重新生成 */
  regenerate: () => void;

  /* ---- 我的厨房 ---- */
  pantry: Ingredient[];
  addToPantry: (ingredientId: string) => void;
  removeFromPantry: (ingredientId: string) => void;
  addCustomIngredient: (name: string) => void;
  seasonings: Seasoning[];
  toggleSeasoning: (seasoningId: string) => void;
  addCustomSeasoning: (name: string) => void;
  cookware: Cookware[];
  toggleCookware: (cookwareId: string) => void;
  addCustomCookware: (name: string) => void;

  /* ---- 收藏 / 历史 ---- */
  favorites: string[];
  toggleFavorite: (recipeId: string) => void;
  history: HistoryEntry[];

  /* ---- 其它 ---- */
  /** 结束本轮流程，清空中间态 */
  resetFlow: () => void;
}

const AppStoreContext = createContext<AppStoreValue | null>(null);

/** 初始菜篮子：带初始存量，便于演示「做完菜消耗 / 归零自动删除」 */
const INITIAL_PANTRY: Array<{ id: string; stock: number; unit: string }> = [
  { id: 'tomato', stock: 2, unit: '个' },
  { id: 'egg', stock: 4, unit: '个' },
  { id: 'bokchoy', stock: 2, unit: '把' },
  { id: 'noodle', stock: 1, unit: '把' },
  { id: 'scallion', stock: 3, unit: '根' },
];

const INITIAL_SEASONING_IDS = ['salt', 'soysauce', 'sugar', 'vinegar', 'sesameoil', 'pepper'];

const INITIAL_COOKWARE_IDS = ['wok', 'souppot', 'ricecooker', 'cuttingboard', 'knife'];

const INITIAL_HISTORY: HistoryEntry[] = [
  {
    id: 'hist_seed_1',
    createdAt: Date.now() - 1000 * 60 * 60 * 26,
    recipeId: 'tomato-egg-bokchoy-noodle',
    recipeName: '番茄鸡蛋小白菜面',
    ingredientNames: ['番茄', '鸡蛋', '小白菜'],
  },
];

let seq = 0;
const nextId = (prefix: string) => `${prefix}_${Date.now()}_${seq++}`;

/** Demo 调试用：让下一次生成强制返回空结果 */
let forceEmptyNext = false;

export function AppStoreProvider({ children }: { children: ReactNode }) {
  /* ---------- 识别流程 ---------- */
  const [photoSeeds, setPhotoSeeds] = useState<number[]>([]);
  const [recognitionStatus, setRecognitionStatus] = useState<RecognitionStatus>('idle');
  const [recognition, setRecognition] = useState<RecognitionResult | null>(null);
  const [captureMode, setCaptureMode] = useState<CaptureMode>('cook');

  /* ---------- 生成流程 ---------- */
  const [confirmedIngredients, setConfirmedIngredients] = useState<Ingredient[]>([]);
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>('idle');
  const [aiRecipe, setAiRecipe] = useState<Recipe | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  /* ---------- 个人数据 ---------- */
  const [pantry, setPantry] = useState<Ingredient[]>(() =>
    INITIAL_PANTRY.map(({ id, stock, unit }) => ({
      ...getIngredient(id),
      stock,
      stockUnit: unit,
    })),
  );
  const [seasonings, setSeasonings] = useState<Seasoning[]>(() =>
    INITIAL_SEASONING_IDS.map(getSeasoning),
  );
  const [cookware, setCookware] = useState<Cookware[]>(() =>
    INITIAL_COOKWARE_IDS.map(getCookware),
  );
  const [favorites, setFavorites] = useState<string[]>(['tomato-egg-scramble']);
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY);

  /* ============================================================
     生成流程重置（被多处复用，需最先声明）
     ============================================================ */
  const resetGeneration = useCallback(() => {
    setAiRecipe(null);
    setGenerationStatus('idle');
    setGenerationError(null);
  }, []);

  /* ============================================================
     识别
     ============================================================ */
  const runRecognition = useCallback((seeds: number[]) => {
    if (seeds.length === 0) {
      setRecognitionStatus('error');
      return;
    }
    setRecognitionStatus('scanning');
    setRecognition(null);

    Promise.all(seeds.map((seed) => recognizeIngredients(seed)))
      .then((results) => {
        setRecognition(mergeRecognitions(results));
        setRecognitionStatus('done');
      })
      .catch(() => {
        setRecognitionStatus('error');
      });
  }, []);

  const startRecognition = useCallback(
    (seeds: number[]) => {
      setPhotoSeeds(seeds);
      resetGeneration();
      runRecognition(seeds);
    },
    [resetGeneration, runRecognition],
  );

  const retryRecognition = useCallback(() => {
    runRecognition(photoSeeds.length > 0 ? photoSeeds : [Math.floor(Math.random() * 1000)]);
  }, [photoSeeds, runRecognition]);

  const toggleRecognized = useCallback((id: string) => {
    setRecognition((prev) =>
      prev
        ? {
            ...prev,
            items: prev.items.map((item) =>
              item.id === id ? { ...item, selected: !item.selected } : item,
            ),
          }
        : prev,
    );
  }, []);

  const setRecognizedQuantity = useCallback((id: string, quantity: number) => {
    const next = Math.max(1, quantity);
    setRecognition((prev) =>
      prev
        ? {
            ...prev,
            items: prev.items.map((item) =>
              item.id === id ? { ...item, quantity: next } : item,
            ),
          }
        : prev,
    );
  }, []);

  const addRecognized = useCallback((ingredientId: string) => {
    setRecognition((prev) => {
      if (!prev) return prev;
      if (prev.items.some((item) => item.id === ingredientId)) return prev;
      const next: RecognizedIngredient = {
        ...getIngredient(ingredientId),
        confidence: 1,
        selected: true,
        quantity: 1,
        unit: '份',
      };
      return { ...prev, items: [...prev.items, next] };
    });
  }, []);

  /* ============================================================
     生成菜谱
     ============================================================ */
  const runGeneration = useCallback(
    (items: Ingredient[], options?: { forceEmpty?: boolean; forceError?: string }) => {
      if (generationStatus === 'generating') return;
      if (items.length === 0) {
        setGenerationStatus('error');
        setGenerationError('至少选中一种食材');
        return;
      }
      setGenerationStatus('generating');
      setGenerationError(null);
      setAiRecipe(null);

      const shouldForceEmpty = options?.forceEmpty || forceEmptyNext;
      if (forceEmptyNext) forceEmptyNext = false;

      generateRecipe(items.map((item) => item.id), {
        forceEmpty: shouldForceEmpty,
        kitchenContext: {
          ingredientIds: items.map((item) => item.id),
          pantryIds: pantry.map((item) => item.id),
          seasoningIds: seasonings.map((item) => item.id),
          cookwareIds: cookware.map((item) => item.id),
        },
      })
        .then((recipe) => {
          if (!recipe || shouldForceEmpty) {
            setAiRecipe(null);
            setGenerationStatus('empty');
            return;
          }
          if (options?.forceError) {
            setAiRecipe(null);
            setGenerationStatus('error');
            setGenerationError(options.forceError);
            return;
          }
          setAiRecipe(recipe);
          setGenerationStatus('success');
          setHistory((prev) =>
            [
              {
                id: nextId('hist'),
                createdAt: Date.now(),
                recipeId: recipe.id,
                recipeName: recipe.name,
                ingredientNames: items.map((item) => item.name),
              },
              ...prev,
            ].slice(0, 20),
          );
        })
        .catch((err: unknown) => {
          setAiRecipe(null);
          setGenerationStatus('error');
          setGenerationError(err instanceof Error ? err.message : '生成失败，请再试一次');
        });
    },
    [generationStatus, pantry, seasonings, cookware],
  );

  const confirmIngredients = useCallback(
    (items: Ingredient[], options?: { forceEmpty?: boolean; forceError?: string }) => {
      const plain: Ingredient[] = items.map(({ id, name, color, category, note }) => ({
        id,
        name,
        color,
        category,
        note,
        shelfLifeDays: getIngredient(id).shelfLifeDays,
      }));
      setConfirmedIngredients(plain);
      runGeneration(plain, options);
    },
    [runGeneration],
  );

  const regenerate = useCallback(() => {
    if (generationStatus === 'generating' || confirmedIngredients.length === 0) return;
    runGeneration(confirmedIngredients);
  }, [confirmedIngredients, generationStatus, runGeneration]);

  /** 直接用当前菜篮子里的食材生成一道菜 */
  const generateFromPantry = useCallback(() => {
    if (pantry.length === 0) return;
    const items: Ingredient[] = pantry.map((p) => ({ ...p }));
    setConfirmedIngredients(items);
    resetGeneration();
    runGeneration(items);
  }, [pantry, resetGeneration, runGeneration]);

  /**
   * 识别结果页「生成今日菜谱」专用：
   * 先把本次识别到的食材合并（数量累加）进菜篮子，再以合并后的完整菜篮子
   * 作为生成输入。即「先更新菜篮子，再基于更新后的完整菜篮子生成菜谱」。
   */
  const generateFromMerged = useCallback(
    (items: Array<Ingredient & { quantity?: number; unit?: string }>) => {
      if (items.length === 0) return;
      // 合并进菜篮子（已存在的按数量累加，不存在的新建）
      const map = new Map(pantry.map((p) => [p.id, { ...p }]));
      items.forEach((item) => {
        const qty = item.stock ?? item.quantity ?? 1;
        const unit = item.stockUnit ?? item.unit ?? '份';
        const existing = map.get(item.id);
        if (existing) {
          existing.stock = (existing.stock ?? 1) + qty;
          existing.stockUnit = unit;
        } else {
          map.set(item.id, { ...item, stock: qty, stockUnit: unit });
        }
      });
      const merged = Array.from(map.values());
      setPantry(merged);
      // 以合并后的完整菜篮子作为生成输入
      const base: Ingredient[] = merged.map(({ id, name, color, category, note }) => ({
        id,
        name,
        color,
        category,
        note,
        shelfLifeDays: getIngredient(id).shelfLifeDays,
      }));
      setConfirmedIngredients(base);
      resetGeneration();
      runGeneration(base);
    },
    [pantry, resetGeneration, runGeneration],
  );

  /* ============================================================
     个人数据
     ============================================================ */
  const addToPantry = useCallback((ingredientId: string) => {
    setPantry((prev) =>
      prev.some((item) => item.id === ingredientId) ? prev : [...prev, getIngredient(ingredientId)],
    );
  }, []);

  const removeFromPantry = useCallback((ingredientId: string) => {
    setPantry((prev) => prev.filter((item) => item.id !== ingredientId));
  }, []);

  /**
   * 把识别到的食材写入菜篮子：已存在的按数量累加，不存在的新建。
   * 这样「识图」这一步就完成了食材与数量的记录（采购 / 做菜都会先走这里）。
   */
  const recordToPantry = useCallback(
    (items: Array<Ingredient & { quantity?: number; unit?: string }>) => {
    setPantry((prev) => {
      const map = new Map(prev.map((p) => [p.id, { ...p }]));
      items.forEach((item) => {
        const qty = item.stock ?? item.quantity ?? 1;
        const unit = item.stockUnit ?? item.unit ?? '份';
        const existing = map.get(item.id);
        if (existing) {
          existing.stock = (existing.stock ?? 1) + qty;
          existing.stockUnit = unit;
        } else {
          map.set(item.id, { ...item, stock: qty, stockUnit: unit });
        }
      });
      return Array.from(map.values());
    });
  }, []);

  /**
   * 做完一道菜后按菜谱食材扣减菜篮子存量；扣到 0 自动移除该项。
   * 仅在菜篮子中存在、且菜谱用到的食材上扣减，每份用掉 1 单位。
   */
  const consumeRecipe = useCallback((recipe: Recipe) => {
    const ids = new Set(recipe.ingredientIds);
    setPantry((prev) =>
      prev
        .map((p) => (ids.has(p.id) ? { ...p, stock: (p.stock ?? 1) - 1 } : p))
        .filter((p) => (p.stock ?? 0) > 0),
    );
  }, []);

  const addCustomIngredient = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setPantry((prev) => {
      if (prev.some((item) => item.name === trimmed)) return prev;
      const next: Ingredient = {
        id: nextId('custom_ing'),
        name: trimmed,
        color: '#9AA79C',
        category: 'other',
        note: '',
        shelfLifeDays: 3,
        stock: 1,
        stockUnit: '份',
      };
      return [...prev, next];
    });
  }, []);

  const toggleSeasoning = useCallback((seasoningId: string) => {
    setSeasonings((prev) => {
      if (prev.some((item) => item.id === seasoningId)) {
        return prev.filter((item) => item.id !== seasoningId);
      }
      return [...prev, getSeasoning(seasoningId)];
    });
  }, []);

  const toggleCookware = useCallback((cookwareId: string) => {
    setCookware((prev) => {
      if (prev.some((item) => item.id === cookwareId)) {
        return prev.filter((item) => item.id !== cookwareId);
      }
      return [...prev, getCookware(cookwareId)];
    });
  }, []);

  const addCustomSeasoning = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setSeasonings((prev) => {
      if (prev.some((item) => item.name === trimmed)) return prev;
      return [...prev, { id: nextId('custom_sea'), name: trimmed, note: '' }];
    });
  }, []);

  const addCustomCookware = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCookware((prev) => {
      if (prev.some((item) => item.name === trimmed)) return prev;
      return [...prev, { id: nextId('custom_cook'), name: trimmed, note: '' }];
    });
  }, []);

  const toggleFavorite = useCallback((recipeId: string) => {
    setFavorites((prev) =>
      prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId],
    );
  }, []);

  /* ============================================================
     其它
     ============================================================ */
  const resetFlow = useCallback(() => {
    setPhotoSeeds([]);
    setRecognition(null);
    setRecognitionStatus('idle');
    setConfirmedIngredients([]);
    resetGeneration();
  }, [resetGeneration]);

  /* ============================================================
     Debug helpers（仅用于 Demo 截图验证，真实环境可移除）
     ============================================================ */
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__spoon_debug = {
      setGenerationEmpty: () => {
        setAiRecipe(null);
        setGenerationError(null);
        setGenerationStatus('empty');
      },
      setGenerationError: (msg?: string) => {
        setAiRecipe(null);
        setGenerationError(msg ?? '生成失败，请再试一次');
        setGenerationStatus('error');
      },
      forceEmptyNext: () => {
        forceEmptyNext = true;
      },
      resetGeneration: () => resetGeneration(),
    };
  }, [resetGeneration]);

  const value = useMemo<AppStoreValue>(
    () => ({
      photoSeeds,
      recognitionStatus,
      recognition,
      captureMode,
      setCaptureMode,
      startRecognition,
      retryRecognition,
      toggleRecognized,
      setRecognizedQuantity,
      addRecognized,
      recordToPantry,
      generateFromPantry,
      generateFromMerged,
      consumeRecipe,

      confirmedIngredients,
      generationStatus,
      aiRecipe,
      generationError,
      confirmIngredients,
      regenerate,

      pantry,
      addToPantry,
      removeFromPantry,
      addCustomIngredient,
      seasonings,
      toggleSeasoning,
      addCustomSeasoning,
      cookware,
      toggleCookware,
      addCustomCookware,
      favorites,
      toggleFavorite,
      history,

      resetFlow,
    }),
    [
      photoSeeds,
      recognitionStatus,
      recognition,
      captureMode,
      setCaptureMode,
      startRecognition,
      retryRecognition,
      toggleRecognized,
      setRecognizedQuantity,
      addRecognized,
      recordToPantry,
      generateFromPantry,
      generateFromMerged,
      consumeRecipe,
      confirmedIngredients,
      generationStatus,
      aiRecipe,
      generationError,
      confirmIngredients,
      regenerate,
      pantry,
      addToPantry,
      removeFromPantry,
      addCustomIngredient,
      seasonings,
      toggleSeasoning,
      addCustomSeasoning,
      cookware,
      toggleCookware,
      addCustomCookware,
      favorites,
      toggleFavorite,
      history,
      resetFlow,
    ],
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore(): AppStoreValue {
  const ctx = useContext(AppStoreContext);
  if (!ctx) {
    throw new Error('useAppStore 必须在 AppStoreProvider 内使用');
  }
  return ctx;
}

/** 供「手动添加食材」弹层使用的候选列表 */
export const ALL_INGREDIENT_OPTIONS = INGREDIENTS;
