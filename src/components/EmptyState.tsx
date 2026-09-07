import type { ReactNode } from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  /** 钢笔淡彩插画或手绘图标（不要再传 emoji） */
  glyph?: ReactNode;
  title: string;
  desc?: string;
  action?: ReactNode;
}

export function EmptyState({ glyph, title, desc, action }: EmptyStateProps) {
  return (
    <div className={styles.wrap}>
      {glyph && <div className={styles.glyph}>{glyph}</div>}
      <p className={styles.title}>{title}</p>
      {desc && <p className={styles.desc}>{desc}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
