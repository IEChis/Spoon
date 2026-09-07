import type { Recipe } from '@/types';
import { Icon } from './Icon';
import styles from './RecipeCard.module.css';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: (recipe: Recipe) => void;
  favorited?: boolean;
  onToggleFavorite?: (recipeId: string) => void;
  /** 右上角角标，例如「AI 为你配的」 */
  badge?: string;
}

export function RecipeCard({
  recipe,
  onClick,
  favorited = false,
  onToggleFavorite,
  badge,
}: RecipeCardProps) {
  const initial = recipe.name.slice(0, 1);
  return (
    <div className={styles.card}>
      <button
        type="button"
        className={styles.cover}
        onClick={() => onClick?.(recipe)}
        aria-label={`查看菜谱 ${recipe.name}`}
      >
        <span className={styles.coverChar}>{initial}</span>
      </button>

      <button type="button" className={styles.body} onClick={() => onClick?.(recipe)}>
        {badge && <span className="tag tag--clay" style={{ alignSelf: 'flex-start' }}>{badge}</span>}
        <p className={styles.title}>{recipe.name}</p>
        <p className={styles.sub}>{recipe.subtitle}</p>
        <div className={styles.tags}>
          {recipe.tags.slice(0, 2).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <Icon name="clock" size={13} />
            {recipe.timeMin} 分钟
          </span>
          <span className={styles.metaItem}>
            <Icon name="flame" size={13} />
            {recipe.difficulty}
          </span>
        </div>
      </button>

      {onToggleFavorite && (
        <button
          type="button"
          className={`${styles.favBtn} ${favorited ? styles.favOn : ''}`}
          onClick={() => onToggleFavorite(recipe.id)}
          aria-label={favorited ? '取消收藏' : '收藏'}
          aria-pressed={favorited}
        >
          <Icon name="heart" size={17} />
        </button>
      )}
    </div>
  );
}
