import type { CSSProperties } from 'react';
import { WatercolorSpot } from '@/components/illustrations';
import { IngredientArt } from '@/components/IngredientArt';
import type { Recipe } from '@/types';
import styles from './RecipeArt.module.css';

interface RecipeArtProps {
  recipe: Recipe;
  className?: string;
  /** 静物中最多展示的食材数（默认 4） */
  max?: number;
}

/**
 * 菜谱主图：把菜谱食材的真实钢笔淡彩 PNG 摆成静物，
 * 覆在水彩晕染之上，像手绘食谱扉页里的一幅主插画。
 * 没有真实资产的食材回退到 SVG 线稿，整体仍保持同一视觉语言。
 */
export function RecipeArt({ recipe, className, max = 4 }: RecipeArtProps) {
  const ids = (recipe.ingredientIds ?? []).slice(0, max);

  return (
    <div className={[styles.recipeArt, className].filter(Boolean).join(' ')}>
      <WatercolorSpot className={styles.wash} />
      <div className={styles.stage}>
        {ids.map((id, i) => (
          <span key={`${id}-${i}`} className={styles.item} style={{ '--i': i } as CSSProperties}>
            <IngredientArt id={id} className={styles.itemArt} />
          </span>
        ))}
      </div>
    </div>
  );
}
