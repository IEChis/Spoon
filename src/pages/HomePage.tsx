import { useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/AppShell';
import { Icon } from '@/components/Icon';
import { useAppStore } from '@/store/AppStore';
import { RECIPES, getRecipe } from '@/mock/recipes';
import styles from './HomePage.module.css';

export default function HomePage() {
  const navigate = useNavigate();
  const { history } = useAppStore();

  // 最近生成：优先展示真实历史，空则用示例菜谱兜底，保证 Demo 不空
  const recent = (
    history.length > 0
      ? history.slice(0, 3).map((h) => getRecipe(h.recipeId)).filter(Boolean)
      : RECIPES.slice(0, 3)
  ) as NonNullable<ReturnType<typeof getRecipe>>[];

  return (
    <AppShell showTabBar className="fade-up">
      <div className={styles.home}>
        {/* 顶部：一句轻量引导 */}
        <header className={styles.intro}>
          <h1 className={styles.title}>今天吃什么？</h1>
          <p className={styles.sub}>拍下手边的食材，剩下的我们一起来。</p>
        </header>

        {/* 中央：唯一核心行为 —— 拍食材 */}
        <div className={styles.capture}>
          <button
            type="button"
            className={styles.captureBtn}
            onClick={() => navigate('/camera')}
            aria-label="拍食材"
          >
            <span className={styles.captureHalo} aria-hidden="true" />
            <Icon name="camera" size={38} strokeWidth={1.5} />
            <span className={styles.captureBtnText}>拍食材</span>
          </button>

          <button
            type="button"
            className={styles.captureAlt}
            onClick={() => navigate('/camera')}
          >
            也可以从相册选择
          </button>
        </div>

        {/* 底部：少量最近生成 */}
        <section className={styles.recent}>
          <div className={styles.recentHead}>
            <span className={styles.recentTitle}>最近生成</span>
            <button
              type="button"
              className={styles.recentMore}
              onClick={() => navigate('/recipes')}
            >
              全部
              <Icon name="chevronRight" size={14} strokeWidth={1.8} />
            </button>
          </div>

          <ul className={styles.recentList}>
            {recent.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  className={styles.recentItem}
                  onClick={() => navigate(`/recipe/${r.id}`)}
                >
                  <span className={styles.recentName}>{r.name}</span>
                  <span className={styles.recentMeta}>{r.timeMin} 分钟</span>
                  <Icon
                    name="chevronRight"
                    size={16}
                    strokeWidth={1.8}
                    className={styles.recentChevron}
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
