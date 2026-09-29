import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiLoading } from '@/components/AiLoading';
import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { Icon } from '@/components/Icon';
import { IngredientToken } from '@/components/IngredientToken';
import { ScreenHeader } from '@/components/ScreenHeader';
import { getRecipe } from '@/mock/recipes';
import { formatAmount, scaleAmount } from '@/utils/servings';
import { useAppStore } from '@/store/AppStore';
import styles from './RecipePage.module.css';

/** 结果页兜底 Loading 文案（正常流程会先经过 /recipe/generating） */
const GENERATING_MESSAGES = [
  '正在认识你的食材……',
  '正在寻找合适的搭配……',
  '正在调整调味比例……',
  '马上就好……',
];

/** 步骤编号统一为两位，厨房里一眼扫得到 */
const padStep = (n: number) => String(n).padStart(2, '0');

export default function RecipePage() {
  const { recipeId } = useParams<{ recipeId?: string }>();
  const navigate = useNavigate();
  const {
    aiRecipe,
    generationStatus,
    generationError,
    regenerate,
    confirmedIngredients,
    pantry,
    favorites,
    toggleFavorite,
    beginCooking,
  } = useAppStore();

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  };

  const isAiFlow = !recipeId;
  const recipe = recipeId ? getRecipe(recipeId) : aiRecipe ?? undefined;

  /** 当前选择的份数（本地状态，初始化自菜谱 servings；调整即时影响用量与库存对比） */
  const [servings, setServings] = useState<number>(recipe?.servings ?? 2);
  const clampServings = (n: number) => Math.max(1, Math.min(12, n));

  /** 进入烹饪模式：先锁定本次份数与消耗量，再跳转 */
  const startCooking = () => {
    const targetId = recipeId ?? aiRecipe?.id;
    if (recipe) beginCooking(recipe, servings);
    navigate(targetId ? `/cooking/${targetId}` : '/cooking');
  };

  /* ============================================================
     AI 流程状态分支
     原则：只要 AI 还在处理（或流程已启动但结果未回），一律进入 Loading，
     绝不先渲染「没有找到菜谱 / 暂无结果」这类空态再突然替换成菜谱。
     ============================================================ */

  /* ---------------- 终态一：确实生成结束，但没有合适搭配 ---------------- */
  if (isAiFlow && generationStatus === 'empty') {
    return (
      <AppShell
        header={<ScreenHeader title="菜谱" back onBack={() => navigate(-1)} />}
        className="fade-up"
      >
        <EmptyState
          glyph={<Icon name="leaf" size={30} strokeWidth={1.5} />}
          title="今天的食材有点难搭配"
          desc="换一组食材试试，识朴会再帮你想想。"
          action={<Button onClick={() => navigate('/camera')}>换一组食材</Button>}
        />
      </AppShell>
    );
  }

  /* ---------------- 生成出错 ---------------- */
  if (isAiFlow && generationStatus === 'error') {
    return (
      <AppShell
        header={<ScreenHeader title="菜谱" back onBack={() => navigate(-1)} />}
        className="fade-up"
      >
        <EmptyState
          glyph={<Icon name="leaf" size={30} strokeWidth={1.5} />}
          title="这次没能配出来"
          desc={generationError ?? '请再试一次。'}
          action={
            <Button
              onClick={() => {
                if (confirmedIngredients.length) {
                  regenerate();
                  navigate('/recipe/generating');
                } else {
                  navigate('/camera');
                }
              }}
            >
              {confirmedIngredients.length ? '重新生成' : '重拍食材'}
            </Button>
          }
        />
      </AppShell>
    );
  }

  /* ---------------- 中间态：AI 正在处理 / 已启动但结果未回 → 一律 Loading ---------------- */
  if (isAiFlow && !aiRecipe) {
    // 流程根本没启动（不在生成中且无已确认食材）：给引导，而非「没有找到菜谱」
    if (generationStatus !== 'generating' && confirmedIngredients.length === 0) {
      return (
        <AppShell
          header={<ScreenHeader title="菜谱" back onBack={() => navigate('/')} />}
          className="fade-up"
        >
          <EmptyState
            glyph={<Icon name="sparkle" size={30} strokeWidth={1.5} />}
            title="还不知道要做什么"
            desc="拍一张食材的照片，识朴会根据你手边有的东西配一道菜。"
            action={<Button onClick={() => navigate('/camera')}>去拍食材</Button>}
          />
        </AppShell>
      );
    }

    return (
      <AppShell
        header={
          <ScreenHeader
            title="正在为你生成菜谱"
            back
            onBack={() => navigate(-1)}
          />
        }
        className="fade-up"
      >
        <div className={styles.loadingWrap}>
          <AiLoading messages={GENERATING_MESSAGES} />
        </div>
      </AppShell>
    );
  }

  /* ---------------- 固定菜谱不存在（仅 /recipe/:recipeId 会走到这里） ---------------- */
  if (!recipe) {
    return (
      <AppShell
        header={<ScreenHeader title="菜谱" back onBack={() => navigate(-1)} />}
        className="fade-up"
      >
        <EmptyState
          glyph={<Icon name="book" size={34} strokeWidth={1.6} />}
          title="没有找到这道菜谱"
          desc="它可能已经被移除了。"
          action={<Button onClick={() => navigate('/recipes')}>看看别的</Button>}
        />
      </AppShell>
    );
  }

  /* ---------------- 结果 ---------------- */
  const favorited = favorites.includes(recipe.id);

  /** 每个食材：缩放后用量 + 与当前库存的对比状态 */
  const rows = recipe.ingredients.map((ing) => {
    const need = scaleAmount(ing.baseAmount, recipe.baseServings, servings);
    const pantryItem = pantry.find((p) => p.id === ing.ingredientId) ?? null;
    const has = pantryItem != null;
    const stock = pantryItem?.stock ?? 0;
    let status: 'ok' | 'exact' | 'short' | 'missing';
    let gap = 0;
    if (!has) {
      status = 'missing';
      gap = need;
    } else if (stock + 0.0001 >= need) {
      status = Math.abs(stock - need) < 0.0001 ? 'exact' : 'ok';
    } else {
      status = 'short';
      gap = need - stock;
    }
    return { ing, need, stock, has, status, gap, pantryItem };
  });

  const stats = [
    { label: '时间', value: `${recipe.timeMin} 分钟` },
    { label: '份量', value: `${servings} 人份` },
    { label: '难度', value: recipe.difficulty },
  ];

  const cookCta = (
    <Button variant="primary" size="lg" block className={styles.cookCta} onClick={startCooking}>
      <Icon name="flame" size={18} />
      开始烹饪
    </Button>
  );

  const headerBookmark = (
    <button
      type="button"
      className={`${styles.bookmarkBtn} ${favorited ? styles.bookmarkOn : ''}`}
      onClick={() => {
        toggleFavorite(recipe.id);
        showToast(favorited ? '已取消收藏' : '已收藏到笔记');
      }}
      aria-label={favorited ? '取消收藏' : '收藏'}
      aria-pressed={favorited}
    >
      <Icon name="heart" size={18} fill={favorited ? 'currentColor' : 'none'} />
    </button>
  );

  const footer = isAiFlow ? (
    <div className={styles.footerWrap}>
      {cookCta}
      <div className={styles.footerRow}>
        <Button
          variant="secondary"
          size="lg"
          className={`${styles.footerSecondary} ${favorited ? styles.favOn : ''}`}
          onClick={() => {
            toggleFavorite(recipe.id);
            showToast(favorited ? '已取消收藏' : '已收藏到笔记');
          }}
        >
          <Icon name="heart" size={17} fill={favorited ? 'currentColor' : 'none'} />
          {favorited ? '已收藏' : '收藏'}
        </Button>
        <Button
          size="lg"
          className={styles.footerPrimary}
          onClick={() => {
            regenerate();
            navigate('/recipe/generating');
          }}
        >
          <Icon name="refresh" size={18} />
          重新生成
        </Button>
      </div>
    </div>
  ) : (
    <div className={styles.footerWrap}>
      {cookCta}
      <div className={styles.footerRow}>
        <Button
          variant="secondary"
          size="lg"
          className={`${styles.footerSecondary} ${favorited ? styles.favOn : ''}`}
          onClick={() => {
            toggleFavorite(recipe.id);
            showToast(favorited ? '已收藏' : '已收藏');
          }}
        >
          <Icon name="heart" size={17} fill={favorited ? 'currentColor' : 'none'} />
          {favorited ? '已收藏' : '收藏'}
        </Button>
        <Button size="lg" className={styles.footerPrimary} onClick={() => navigate('/camera')}>
          <Icon name="camera" size={18} />
          用我的食材做
        </Button>
      </div>
    </div>
  );

  return (
    <AppShell
      header={
        <ScreenHeader
          back
          onBack={() => navigate(-1)}
          right={headerBookmark}
        />
      }
      footer={footer}
      withFooterSpace
      className="fade-up"
    >
      <div className={styles.page} data-testid="recipe-result-page">
        {/* 第一层：菜谱名称 */}
        <header className={styles.heading}>
          <h1 className={styles.title}>{recipe.name}</h1>
        </header>

        {/* 第二层：一句简短的推荐理由 */}
        <p className={styles.reason}>
          <Icon name="sparkle" size={14} strokeWidth={1.8} className={styles.reasonIcon} />
          <span>{recipe.story}</span>
        </p>

        {/* 第三层：烹饪信息 */}
        <div className={styles.stats}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* 第四层：份数选择（即时影响用量与库存对比） */}
        <section className={styles.section}>
          <div className={styles.servingsRow}>
            <span className={styles.servingsLabel}>几人份</span>
            <div className={styles.stepper}>
              <button
                type="button"
                className={styles.stepBtn}
                onClick={() => setServings((s) => clampServings(s - 1))}
                disabled={servings <= 1}
                aria-label="减少份数"
              >
                −
              </button>
              <span className={styles.servingsVal}>{servings} 人份</span>
              <button
                type="button"
                className={styles.stepBtn}
                onClick={() => setServings((s) => clampServings(s + 1))}
                disabled={servings >= 12}
                aria-label="增加份数"
              >
                +
              </button>
            </div>
          </div>
        </section>

        {/* 第五层：食材 & 本次需要 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {isAiFlow ? '识别到的食材' : '食材'}
            <span className={styles.sectionSub}>本次需要 · {servings} 人份</span>
          </h2>
          <div className={styles.ingList}>
            {rows.map(({ ing, need, stock, has, status, gap, pantryItem }) => {
              const statusText =
                status === 'ok'
                  ? '✓ 库存充足'
                  : status === 'exact'
                    ? '刚好够用'
                    : status === 'short'
                      ? `还需 ${formatAmount(gap, ing.unit)}`
                      : '需备';
              return (
                <div
                  key={ing.ingredientId}
                  className={`${styles.ingRow} ${
                    status === 'missing' || status === 'short' ? styles.ingRowWarn : ''
                  }`}
                >
                  <span className={styles.ingName}>
                    <IngredientToken id={ing.ingredientId} size={22} />
                    {ing.name}
                  </span>
                  <span className={styles.ingAmount}>
                    {ing.scalable ? formatAmount(need, ing.unit) : ing.note ?? '适量'}
                  </span>
                  <span className={styles.ingStock}>
                    {has
                      ? `库存 ${formatAmount(stock, pantryItem?.stockUnit ?? ing.unit)}`
                      : '未入库'}
                  </span>
                  <span
                    className={`${styles.ingStatus} ${
                      status === 'ok' || status === 'exact'
                        ? styles.statusOk
                        : status === 'short'
                          ? styles.statusShort
                          : styles.statusMiss
                    }`}
                  >
                    {statusText}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* 第五层：烹饪步骤（大字号，厨房里看得清） */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>做法</h2>
          <ol className={styles.steps}>
            {recipe.steps.map((step) => (
              <li key={step.index} className={styles.step}>
                <span className={styles.stepNo}>{padStep(step.index)}</span>
                <div className={styles.stepBody}>
                  <div className={styles.stepHead}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    {step.durationMin > 0 && (
                      <span className={styles.stepTime}>{step.durationMin} 分钟</span>
                    )}
                  </div>
                  <p className={styles.stepDetail}>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {toast && <div className={styles.toast}>{toast}</div>}
    </AppShell>
  );
}
