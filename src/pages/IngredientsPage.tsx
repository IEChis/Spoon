import { useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/AppShell';
import { IngredientChip } from '@/components/IngredientChip';
import { IngredientToken } from '@/components/IngredientToken';
import { Icon } from '@/components/Icon';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ALL_INGREDIENT_OPTIONS, useAppStore } from '@/store/AppStore';
import styles from './IngredientsPage.module.css';

export default function IngredientsPage() {
  const navigate = useNavigate();
  const { pantry, addToPantry, removeFromPantry } = useAppStore();

  const ownedIds = new Set(pantry.map((item) => item.id));

  return (
    <AppShell header={<ScreenHeader title="我的食材" back />} className="fade-up">
      <div className={styles.page}>
        <div className={styles.summary}>
          <h1 className={styles.summaryTitle}>手边有的</h1>
          <span className={styles.summaryCount}>共 {pantry.length} 样</span>
        </div>

        {/* 拍食材入口 */}
        <button type="button" className={styles.cameraCta} onClick={() => navigate('/camera')}>
          <span className={styles.cameraGlyph}>
            <Icon name="camera" size={20} strokeWidth={1.7} />
          </span>
          <span style={{ flex: 1 }}>
            <span className={styles.cameraTitle}>拍下食材，自动入库</span>
            <span className={styles.cameraDesc}>识别完成后会直接加进「手边有的」</span>
          </span>
          <Icon name="chevronRight" size={18} />
        </button>

        {/* 已收录 */}
        <section>
          <h2 className={`section-title ${styles.sectionTitle}`}>已收录</h2>
          {pantry.length > 0 ? (
            <div className={styles.chips}>
              {pantry.map((item) => (
                <IngredientChip
                  key={item.id}
                  ingredient={item}
                  active
                  showShelfLife
                  onRemove={removeFromPantry}
                />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>空空如也，去拍一张吧。</p>
          )}
        </section>

        {/* 食材库：点一下加入 / 已在库中则高亮 */}
        <section>
          <h2 className={`section-title ${styles.sectionTitle}`}>常见食材</h2>
          <div className={styles.grid}>
            {ALL_INGREDIENT_OPTIONS.map((item) => {
              const owned = ownedIds.has(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.tile} ${owned ? styles.owned : ''}`}
                  onClick={() => (owned ? removeFromPantry(item.id) : addToPantry(item.id))}
                  aria-pressed={owned}
                >
                  <span className={styles.tileBox}>
                    <IngredientToken id={item.id} size={40} />
                  </span>
                  <span className={styles.tileName}>{item.name}</span>
                  {owned ? (
                    <span className={styles.tileFlag}>已在库</span>
                  ) : (
                    <span className={styles.tileMeta}>可存 {item.shelfLifeDays} 天</span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
