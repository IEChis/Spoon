import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiLoading } from '@/components/AiLoading';
import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { Icon } from '@/components/Icon';
import { IngredientToken } from '@/components/IngredientToken';
import { ScreenHeader } from '@/components/ScreenHeader';
import { getIngredient } from '@/mock/ingredients';
import { getRecipe } from '@/mock/recipes';
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
  } = useAppStore();

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  };

  /** 进入烹饪模式（一步一页） */
  const startCooking = () => {
    const targetId = recipeId ?? aiRecipe?.id;
    navigate(targetId ? `/cooking/${targetId}` : '/cooking');
  };

  const isAiFlow = !recipeId;
  const recipe = recipeId ? getRecipe(recipeId) : aiRecipe ?? undefined;

  /* ============================================================
     AI 流程状态分支
     原则：只要 AI 还在处理（或流程已启动但结果未回），一律进入 Loading，
     绝不先渲染「没有找到菜谱 / 暂无结果」这类空态再突然替换成菜谱。
     ============================================================ */

  /* ---------------- 终态一：确实生成结束，但没有合适搭配 ---------------- */
  if (isAiFlow && generationStatus === 'empty') {
    return (
      <AppShell
        header={<ScreenHeader title="菜谱" back onBack={() => navigate('/recognition')} />}
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
        header={<ScreenHeader title="菜谱" back onBack={() => navigate('/recognition')} />}
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
            onBack={() => navigate('/recognition')}
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
        header={<ScreenHeader title="菜谱" back onBack={() => navigate('/recipes')} />}
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
  const pantryIds = new Set(pantry.map((i) => i.id));
  const ingredients = recipe.ingredientIds.map(getIngredient);
  const favorited = favorites.includes(recipe.id);

  const stats = [
    { label: '时间', value: `${recipe.timeMin} 分钟` },
    { label: '份量', value: `${recipe.servings} 人份` },
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
          onBack={() => (isAiFlow ? navigate('/') : navigate(-1))}
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

        {/* 第四层：食材 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{isAiFlow ? '识别到的食材' : '食材'}</h2>
          <div className={styles.ingredients}>
            {ingredients.map((item) => {
              const has = pantryIds.has(item.id);
              return (
                <span
                  key={item.id}
                  className={`${styles.ingItem} ${has ? '' : styles.ingMissing}`}
                >
                  <span className={styles.ingIcon}>
                    <IngredientToken id={item.id} size={22} />
                  </span>
                  {item.name}
                  {!has && <span className={styles.ingFlag}>需备</span>}
                </span>
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
