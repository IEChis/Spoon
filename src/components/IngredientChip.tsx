import type { Ingredient } from '@/types';
import { Icon } from './Icon';
import { IngredientToken } from './IngredientToken';
import styles from './IngredientChip.module.css';

interface IngredientChipProps {
  ingredient: Ingredient;
  active?: boolean;
  onRemove?: (id: string) => void;
  onClick?: (id: string) => void;
  showShelfLife?: boolean;
}

export function IngredientChip({
  ingredient,
  active = false,
  onRemove,
  onClick,
  showShelfLife = false,
}: IngredientChipProps) {
  return (
    <span className={`${styles.chip} ${active ? styles.active : ''}`}>
      <button type="button" className={styles.btn} onClick={() => onClick?.(ingredient.id)} disabled={!onClick}>
        <span className={styles.chipIlluWrap}>
          <IngredientToken id={ingredient.id} size={18} />
        </span>
        <span className={styles.name}>{ingredient.name}</span>
        {showShelfLife && <span className={styles.shelf}>{ingredient.shelfLifeDays}天</span>}
      </button>
      {onRemove && (
        <button
          type="button"
          className={styles.remove}
          onClick={() => onRemove(ingredient.id)}
          aria-label={`移除${ingredient.name}`}
        >
          <Icon name="close" size={10} strokeWidth={2.4} />
        </button>
      )}
    </span>
  );
}
