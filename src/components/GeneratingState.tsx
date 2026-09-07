import { useEffect, useState } from 'react';
import { Dish } from './illustrations';
import styles from './GeneratingState.module.css';

const STEPS = ['清点手边的食材', '翻找合适的搭配', '写下每一步', '端出这一碗'];

interface GeneratingStateProps {
  title?: string;
}

/** 生成中的等待态：步骤依次点亮 + 骨架条，让等待显得有进度 */
export function GeneratingState({ title = '正在为你配一道菜' }: GeneratingStateProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const total = STEPS.length;
    const timer = window.setInterval(() => {
      setStep((prev) => (prev + 1) % total);
    }, 520);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={`${styles.orb} wash`}>
        <Dish className={styles.orbIllu} />
      </div>
      <p className={styles.title}>{title}</p>

      <div className={styles.steps}>
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={[
              styles.step,
              i < step ? styles.stepDone : '',
              i === step ? styles.stepActive : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className={styles.bullet} />
            {label}
          </div>
        ))}
      </div>

      <div className={styles.skeleton}>
        <div className={styles.bar} style={{ width: '72%' }} />
        <div className={styles.bar} style={{ width: '100%' }} />
        <div className={styles.bar} style={{ width: '88%' }} />
      </div>
    </div>
  );
}
