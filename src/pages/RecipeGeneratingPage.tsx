import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiLoading } from '@/components/AiLoading';
import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useAppStore } from '@/store/AppStore';
import styles from './RecipeGeneratingPage.module.css';

/** AI 生成期间的状态文案：轻微变化，避免「卡住了」的错觉 */
const MESSAGES = [
  '正在认识你的食材……',
  '正在寻找合适的搭配……',
  '正在调整调味比例……',
  '马上就好……',
];

export default function RecipeGeneratingPage() {
  const navigate = useNavigate();
  const {
    confirmedIngredients,
    generationStatus,
    aiRecipe,
    generationError,
    regenerate,
    resetFlow,
  } = useAppStore();

  const [phase, setPhase] = useState(0);
  const [minReady, setMinReady] = useState(false);

  /* 启动生成：如果直接访问本页且未在生成中，自动用已确认食材开始 */
  useEffect(() => {
    if (generationStatus === 'idle') {
      if (confirmedIngredients.length > 0) {
        regenerate();
      } else {
        navigate('/recognition', { replace: true });
      }
    }
  }, [confirmedIngredients.length, generationStatus, navigate, regenerate]);

  /* 最低停留 2.5 秒，让动画和文案能被完整感知 */
  useEffect(() => {
    const t = window.setTimeout(() => setMinReady(true), 2500);
    return () => window.clearTimeout(t);
  }, []);

  /* 文案阶段切换 */
  useEffect(() => {
    if (generationStatus !== 'generating') return;
    const timers = [
      window.setTimeout(() => setPhase(1), 700),
      window.setTimeout(() => setPhase(2), 1500),
      window.setTimeout(() => setPhase(3), 2200),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [generationStatus]);

  /* 成功完成后跳转到菜谱结果 */
  useEffect(() => {
    if (generationStatus === 'success' && aiRecipe && minReady) {
      navigate('/recipe', { replace: true });
    }
  }, [aiRecipe, generationStatus, minReady, navigate]);

  const handleRetry = () => {
    if (confirmedIngredients.length === 0) {
      navigate('/camera', { replace: true });
      return;
    }
    regenerate();
    setPhase(0);
    setMinReady(false);
    window.setTimeout(() => setMinReady(true), 2500);
  };

  const handleReshoot = () => {
    resetFlow();
    navigate('/camera', { replace: true });
  };

  /* ---------------- Empty 状态（生成确实结束且无结果，才允许出现） ---------------- */
  if (generationStatus === 'empty') {
    return (
      <AppShell
        header={<ScreenHeader title="菜谱" back onBack={() => navigate('/recognition')} />}
        className="fade-up"
      >
        <div className={styles.resultWrap}>
          <span className={styles.resultDeco}>
            <Icon name="leaf" size={28} strokeWidth={1.5} />
          </span>
          <p className={styles.resultTitle}>今天的食材有点难搭配</p>
          <p className={styles.resultDesc}>换一组食材试试，识朴会再帮你想想。</p>
          <Button onClick={handleReshoot}>换一组食材</Button>
        </div>
      </AppShell>
    );
  }

  /* ---------------- Error 状态 ---------------- */
  if (generationStatus === 'error') {
    return (
      <AppShell
        header={<ScreenHeader title="菜谱" back onBack={() => navigate('/recognition')} />}
        className="fade-up"
      >
        <div className={styles.resultWrap}>
          <span className={styles.resultDeco}>
            <Icon name="leaf" size={28} strokeWidth={1.5} />
          </span>
          <p className={styles.resultTitle}>好像出了点小问题</p>
          <p className={styles.resultDesc}>{generationError ?? '请再试一次。'}</p>
          <Button onClick={handleRetry}>
            {confirmedIngredients.length > 0 ? '再试一次' : '重新拍食材'}
          </Button>
        </div>
      </AppShell>
    );
  }

  /* ---------------- 生成中（含 idle 起步）：真正的中间状态 ---------------- */
  return (
    <AppShell
      header={
        <ScreenHeader
          title="正在为你生成菜谱"
          back
          onBack={() => navigate('/recognition', { replace: true })}
        />
      }
      showTabBar={false}
      className="fade-up"
    >
      <div className={styles.page} data-testid="recipe-generating-page">
        <AiLoading messages={MESSAGES} phase={phase} />
      </div>
    </AppShell>
  );
}
