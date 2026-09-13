import { useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/AppShell';
import { Icon } from '@/components/Icon';
import { useAppStore } from '@/store/AppStore';
import styles from './HomePage.module.css';

export default function HomePage() {
  const navigate = useNavigate();
  const { pantry, setCaptureMode, generateFromPantry } = useAppStore();

  const cookFromPantry = () => {
    if (pantry.length === 0) return;
    generateFromPantry();
    navigate('/recipe/generating');
  };

  return (
    <AppShell showTabBar className="fade-up">
      <div className={styles.home}>
        {/* 顶部：标题与简短说明 */}
        <header className={styles.intro}>
          <h1 className={styles.title}>今天吃什么？</h1>
          <p className={styles.sub}>拍下手边的食材，剩下的我们一起来。</p>
        </header>

        {/* 中间：圆形拍食材主入口 */}
        <section className={styles.capture} aria-label="拍食材">
          <button
            type="button"
            className={styles.captureBtn}
            onClick={() => {
              setCaptureMode('cook');
              navigate('/camera');
            }}
            aria-label="拍食材"
          >
            <Icon name="camera" size={34} strokeWidth={1.5} />
          </button>
          <span className={styles.captureTitle}>拍食材</span>
          <span className={styles.captureHint}>识别手边的食材</span>
        </section>

        {/* 下方：菜篮子状态卡片 → 直接生成菜谱 */}
        <section className={styles.cook} aria-label="直接生成菜谱">
          <button
            type="button"
            className={`${styles.cookCard} ${pantry.length === 0 ? styles.cookCardDisabled : ''}`}
            onClick={cookFromPantry}
            disabled={pantry.length === 0}
            title={pantry.length === 0 ? '菜篮子还是空的，先记录点食材吧' : undefined}
            aria-label="直接生成菜谱"
          >
            {/* 顶部状态行：我的菜篮子 · N种食材 */}
            <span className={styles.pantryStatus}>
              <span className={styles.pantryStatusIcon}>
                <Icon name="basket" size={14} strokeWidth={1.6} />
              </span>
              <span className={styles.pantryStatusText}>
                我的菜篮子 · {pantry.length} 种食材
              </span>
              <Icon name="chevronRight" size={14} strokeWidth={1.8} />
            </span>

            {/* 主体文案 */}
            <span className={styles.cookBody}>
              <span className={styles.cookText}>
                <span className={styles.cookTitle}>直接生成菜谱</span>
                <span className={styles.cookSub}>从我的菜篮子开始</span>
              </span>
            </span>
          </button>
        </section>
      </div>
    </AppShell>
  );
}
