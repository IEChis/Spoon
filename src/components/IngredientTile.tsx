import type { CSSProperties } from 'react';
import type { RecognizedIngredient } from '@/types';
import { CATEGORY_LABEL } from '@/types';
import { Icon } from './Icon';
import { IngredientToken } from './IngredientToken';
import styles from './IngredientTile.module.css';

interface IngredientTileProps {
  item: RecognizedIngredient;
  onToggle?: (id: string) => void;
  onRemove?: (id: string) => void;
  /** 是否显示置信度（手动添加时为 100%，可隐藏） */
  showConfidence?: boolean;
  /** 错落出现的动画延迟序号 */
  index?: number;
}

export function IngredientTile({
  item,
  onToggle,
  onRemove,
  showConfidence = true,
  index = 0,
}: IngredientTileProps) {
  const percent = Math.round(item.confidence * 100);

  const styleVars = {
    '--accent': item.color,
    animationDelay: `${index * 70}ms`,
  } as CSSProperties;

  return (
    <div
      className={`${styles.tile} ${item.selected ? styles.selected : styles.unselected} reveal-item`}
      style={styleVars}
    >
      <div className={styles.thumb} aria-hidden="true">
        <IngredientToken id={item.id} size={44} />
      </div>

      <button type="button" className={styles.body} onClick={() => onToggle?.(item.id)}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{item.name}</span>
          <span className="tag">{CATEGORY_LABEL[item.category]}</span>
        </div>
        <p className={styles.note}>{item.note}</p>
      </button>

      {showConfidence && (
        <div className={styles.meta}>
          <span className={styles.conf}>{percent}%</span>
          <span className={styles.bar}>
            <span className={styles.barFill} style={{ width: `${percent}%` }} />
          </span>
        </div>
      )}

      <button
        type="button"
        className={`${styles.check} ${item.selected ? styles.checkOn : ''}`}
        onClick={() => onToggle?.(item.id)}
        aria-label={item.selected ? `取消选择${item.name}` : `选择${item.name}`}
        aria-pressed={item.selected}
      >
        <Icon name="check" size={14} strokeWidth={2.4} />
      </button>

      {onRemove && (
        <button
          type="button"
          className={styles.remove}
          onClick={() => onRemove(item.id)}
          aria-label={`移除${item.name}`}
        >
          <Icon name="close" size={15} />
        </button>
      )}
    </div>
  );
}
