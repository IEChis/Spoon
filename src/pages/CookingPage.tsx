import { useRef, useState } from 'react';
import type { TouchEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { getRecipe } from '@/mock/recipes';
import { useAppStore } from '@/store/AppStore';
import type { Recipe } from '@/types';
import styles from './CookingPage.module.css';

/**
 * 烹饪模式：真正做饭时使用的操作界面。
 * 设计原则：少看、少想、少操作、大字号、高可读性。
 *  - 一步一页，当前步骤独占整屏
 *  - 超大字号（标题 32~40 / 正文 22~28）
 *  - 左右滑动 + 明显的「下一步 / 完成烹饪」按钮
 *  - 隐藏 TabBar，仅保留「退出」
 */
export default function CookingPage() {
  const { recipeId } = useParams<{ recipeId?: string }>();
  const navigate = useNavigate();
  const { aiRecipe, consumeRecipe } = useAppStore();

  const isAiFlow = !recipeId;
  const recipe: Recipe | undefined = recipeId ? getRecipe(recipeId) : aiRecipe ?? undefined;

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  /** 保证一道菜只消耗一次库存 */
  const consumedRef = useRef(false);

  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -50) next();
    else if (dx > 50) prev();
    touchX.current = null;
  };

  if (!recipe) {
    return (
      <div className={`screen ${styles.cook}`}>
        <div className={styles.empty}>
          <p>这道菜谱暂时打不开。</p>
          <button className={styles.doneGhost} onClick={() => navigate('/')}>
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const total = recipe.steps.length;
  const current = recipe.steps[Math.min(step, total - 1)];
  const isLast = step >= total - 1;

  const next = () => {
    if (done) return;
    if (isLast) {
      if (!consumedRef.current && recipe) {
        consumeRecipe(recipe);
        consumedRef.current = true;
      }
      setDone(true);
    } else setStep((s) => Math.min(s + 1, total - 1));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const exit = () => navigate(isAiFlow ? '/recipe' : `/recipe/${recipe.id}`);

  /* ---------------- 完成页 ---------------- */
  if (done) {
    return (
      <div className={`screen ${styles.cook}`}>
        <div className={styles.done}>
          <div className={styles.doneMark}>
            <Icon name="check" size={40} strokeWidth={2.2} />
          </div>
          <h2 className={styles.doneTitle}>完成啦。</h2>
          <p className={styles.doneSub}>今天也好好吃饭了。</p>
          <div className={styles.doneActions}>
            <button className={styles.donePrimary} onClick={() => navigate('/camera')}>
              <Icon name="camera" size={18} />
              再做一道
            </button>
            <button className={styles.doneGhost} onClick={() => navigate('/')}>
              返回首页
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- 烹饪一步一页 ---------------- */
  return (
    <div className={`screen ${styles.cook}`}>
      {/* 顶部：仅保留退出 */}
      <header className={styles.top}>
        <button type="button" className={styles.exit} onClick={exit}>
          <Icon name="close" size={20} />
          退出
        </button>
      </header>

      {/* 进度 */}
      <div className={styles.progress}>
        <span className={styles.recipeName}>{recipe.name}</span>
        <span className={styles.count}>
          步骤 {Math.min(step + 1, total)} / {total}
        </span>
        <div className={styles.dots}>
          {recipe.steps.map((s, i) => (
            <span key={s.index} className={`${styles.dot} ${i <= step ? styles.dotOn : ''}`} />
          ))}
        </div>
      </div>

      {/* 主舞台：一步一页（可左右滑动），纯文字、大字号、清晰 */}
      <main className={styles.stage} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <h2 className={styles.title} key={`t-${current.index}`}>
          {current.title}
        </h2>
        <p className={styles.detail} key={`d-${current.index}`}>
          {current.cookBrief ?? current.detail}
        </p>
      </main>

      {/* 底部操作：明确的按钮（不依赖手势） */}
      <div className={styles.footer}>
        {step > 0 && (
          <button type="button" className={styles.prev} onClick={prev}>
            <Icon name="chevronLeft" size={20} />
            上一步
          </button>
        )}
        <button type="button" className={styles.next} onClick={next}>
          {isLast ? '完成烹饪' : '下一步'}
          {!isLast && <Icon name="arrowRight" size={20} />}
        </button>
      </div>
    </div>
  );
}
