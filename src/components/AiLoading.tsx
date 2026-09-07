import { useEffect, useState } from 'react';
import styles from './AiLoading.module.css';

interface AiLoadingProps {
  /** 依次切换的状态文案 */
  messages: string[];
  /**
   * 当前阶段索引，由外部驱动。
   * 不传则由组件内部按 interval 自动轮播（用于兜底等待）。
   */
  phase?: number;
  /** 内部自动轮播间隔（ms） */
  interval?: number;
}

/**
 * AI 处理中的等待态。
 *
 * 设计取向：旋转的小圆环 + 呼吸光环 + 逐步点亮的小圆点 + 文案交叉淡入。
 * 刻意避免任何科技感光效，保持与饮食/生活方式定位一致的温柔节奏。
 *
 * 这是一个「真正的中间状态」——调用方必须在 AI 处理期间渲染它，
 * 不允许先渲染空结果再替换。
 */
export function AiLoading({ messages, phase, interval = 900 }: AiLoadingProps) {
  const [auto, setAuto] = useState(0);

  useEffect(() => {
    if (phase !== undefined) return;
    const timer = window.setInterval(() => {
      setAuto((prev) => (prev + 1) % Math.max(messages.length, 1));
    }, interval);
    return () => window.clearInterval(timer);
  }, [phase, interval, messages.length]);

  const total = Math.max(messages.length, 1);
  const idx = phase === undefined ? auto : Math.min(Math.max(phase, 0), total - 1);
  const current = messages[idx] ?? '';

  return (
    <div className={styles.wrap} role="status" aria-live="polite" aria-busy="true">
      <span className={styles.srOnly}>{current}</span>

      {/* 旋转小圆环 + 呼吸光环 */}
      <div className={styles.ringArea} aria-hidden="true">
        <span className={styles.halo} />
        <span className={styles.ring} />
      </div>

      {/* 逐步点亮的圆点 */}
      <div className={styles.dots} aria-hidden="true">
        {messages.map((_, i) => (
          <span key={i} className={`${styles.dot} ${i <= idx ? styles.dotOn : ''}`} />
        ))}
      </div>

      {/* 文案交叉淡入切换 */}
      <div className={styles.copy} aria-hidden="true">
        {messages.map((text, i) => (
          <p key={text} className={`${styles.message} ${i === idx ? styles.messageIn : ''}`}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
