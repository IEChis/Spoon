import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { Icon } from '@/components/Icon';
import { IngredientTile } from '@/components/IngredientTile';
import { IngredientToken } from '@/components/IngredientToken';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ALL_INGREDIENT_OPTIONS, useAppStore } from '@/store/AppStore';
import styles from './RecognitionPage.module.css';

/** 识别期间的状态文案：与「生成菜谱」阶段的文案刻意区分开 */
const SCAN_STEPS = ['正在看清照片里的食材……', '正在比对它们的特征……', '快要认出来了……'];

export default function RecognitionPage() {
  const navigate = useNavigate();
  const {
    photoSeeds,
    recognitionStatus,
    recognition,
    retryRecognition,
    toggleRecognized,
    addRecognized,
    confirmIngredients,
    generationStatus,
  } = useAppStore();

  const [showAdd, setShowAdd] = useState(false);

  /** AI 识别三段动画：扫描轮廓 → 识别纹理 → 寻找搭配 */
  const scanning = recognitionStatus === 'scanning';
  const [scanStep, setScanStep] = useState(0);

  useEffect(() => {
    if (!scanning) return;
    setScanStep(0);
    const t1 = setTimeout(() => setScanStep(1), 720);
    const t2 = setTimeout(() => setScanStep(2), 1440);
    const t3 = setTimeout(() => setScanStep(3), 2050);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [scanning]);

  /** 未经过拍照直接进入本页：引导回相机 */
  if (photoSeeds.length === 0) {
    return (
      <AppShell showTabBar={false} className="fade-up">
        <EmptyState
          glyph={<Icon name="camera" size={32} strokeWidth={1.6} />}
          title="还没有照片"
          desc="先拍一张食材的照片，识朴才能开始辨认。"
          action={<Button onClick={() => navigate('/camera')}>去拍照</Button>}
        />
      </AppShell>
    );
  }

  const items = recognition?.items ?? [];
  const selectedCount = items.filter((i) => i.selected).length;

  const handleConfirm = () => {
    const selected = items.filter((i) => i.selected);
    if (selected.length === 0 || generationStatus === 'generating') return;
    confirmIngredients(selected);
    navigate('/recipe/generating');
  };

  const candidateOptions = ALL_INGREDIENT_OPTIONS.filter(
    (opt) => !items.some((item) => item.id === opt.id),
  );

  const footer = (
    <>
      {recognitionStatus === 'error' ? (
        <Button block size="lg" onClick={retryRecognition}>
          <Icon name="refresh" size={18} />
          重新识别
        </Button>
      ) : (
        <Button
          block
          size="lg"
          disabled={scanning || generationStatus === 'generating' || selectedCount === 0}
          onClick={handleConfirm}
          className={styles.footerBtn}
          aria-label="生成今日菜谱"
        >
          {scanning ? (
            '辨认中…'
          ) : (
            <>
              <Icon name="sparkle" size={18} />
              生成今日菜谱
            </>
          )}
        </Button>
      )}
    </>
  );

  return (
    <AppShell
      header={
        <ScreenHeader
          title="今天发现了这些"
          onBack={() => navigate('/camera')}
          right={
            <button
              type="button"
              onClick={() => navigate('/')}
              aria-label="回到首页"
              className={styles.closeBtn}
            >
              <Icon name="close" size={19} />
            </button>
          }
        />
      }
      footer={footer}
      withFooterSpace
      className="fade-up"
    >
      <div className={styles.page}>
        {scanning && (
          <div className={styles.scanPanel}>
            <p className={styles.scanTitle}>正在识别食材</p>
            {SCAN_STEPS.map((label, i) => {
              const state = i < scanStep ? 'done' : i === scanStep ? 'active' : 'await';
              return (
                <div key={label} className={`${styles.scanRow} ${styles[state]}`}>
                  <span className={styles.scanDot}>
                    {i < scanStep ? (
                      <Icon name="check" size={12} strokeWidth={2.6} />
                    ) : i === scanStep ? (
                      <span className={styles.pulse} />
                    ) : null}
                  </span>
                  <span className={styles.scanLabel}>{label}</span>
                </div>
              );
            })}
          </div>
        )}

        {recognitionStatus === 'error' && (
          <div className={styles.errorBox}>
            <span className={styles.errorGlyph}>
              <Icon name="leaf" size={22} strokeWidth={1.6} className={styles.errorIcon} />
            </span>
            <p className={styles.statusTitle}>这张照片不太好认</p>
            <p className={styles.note}>试试换个光线更亮的地方，把食材摊开一些再拍。</p>
          </div>
        )}

        {recognitionStatus === 'done' && (
          <>
            {/* 发现数 · 轻揭示 */}
            <div className={`${styles.foundBanner} reveal-item`}>
              <Icon name="leaf" size={16} strokeWidth={1.8} />
              <span>
                从 {photoSeeds.length} 张照片里发现 <strong>{items.length}</strong> 种食材
              </span>
              <span className={styles.foundCount}>已选 {selectedCount} / {items.length}</span>
            </div>

            {/* 4 张独立视觉卡片：像被记在自然观察笔记里的食材 */}
            <div className={styles.fieldHead}>
              <span className={styles.fieldKicker}>观察记录</span>
              <span className={styles.fieldRule} aria-hidden="true" />
            </div>
            <div className={styles.list}>
              {items.map((item, i) => (
                <IngredientTile key={item.id} item={item} index={i} onToggle={toggleRecognized} />
              ))}
            </div>

            {candidateOptions.length > 0 && (
              <>
                <button
                  type="button"
                  className={styles.addToggle}
                  onClick={() => setShowAdd((v) => !v)}
                >
                  <Icon name={showAdd ? 'minus' : 'plus'} size={14} />
                  {showAdd ? '收起' : '还有别的？手动添加'}
                </button>

                {showAdd && (
                  <div className={styles.addPanel}>
                    <p className={styles.addLabel}>点一下加进清单</p>
                    <div className={styles.addOptions}>
                      {candidateOptions.map((opt) => {
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            className={styles.addOption}
                            onClick={() => addRecognized(opt.id)}
                          >
                            <Icon name="plus" size={12} />
                            <IngredientToken id={opt.id} size={18} />
                            {opt.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}

            <p className={styles.note}>
              轻点卡片可以取消不需要的食材。识别结果由模型给出，把握越大、色条越深。
            </p>

            {/* 轻量重拍 / 再认 */}
            <div className={styles.photoActions}>
              <Button variant="secondary" className={styles.retake} onClick={() => navigate('/camera')}>
                <Icon name="camera" size={16} />
                重拍
              </Button>
              <Button variant="secondary" className={styles.retake} onClick={retryRecognition}>
                <Icon name="refresh" size={16} />
                再认一次
              </Button>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
