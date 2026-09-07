import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/AppShell';
import { EmptyState } from '@/components/EmptyState';
import { Icon } from '@/components/Icon';
import { RecipeCard } from '@/components/RecipeCard';
import { ScreenHeader } from '@/components/ScreenHeader';
import { RECIPES } from '@/mock/recipes';
import { useAppStore } from '@/store/AppStore';
import styles from './RecipesPage.module.css';

type FilterKey = 'all' | 'favorite' | 'quick' | 'onePot';

const FILTERS: Array<{ key: FilterKey; label: string }> = [
  { key: 'all', label: '全部' },
  { key: 'favorite', label: '收藏' },
  { key: 'quick', label: '15 分钟内' },
  { key: 'onePot', label: '一锅出' },
];

export default function RecipesPage() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useAppStore();
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState<FilterKey>('all');

  const list = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return RECIPES.filter((recipe) => {
      const matchKeyword =
        kw === '' ||
        recipe.name.toLowerCase().includes(kw) ||
        recipe.ingredientIds.some((id) => id.includes(kw)) ||
        recipe.tags.some((tag) => tag.toLowerCase().includes(kw));

      const matchFilter =
        filter === 'all'
          ? true
          : filter === 'favorite'
            ? favorites.includes(recipe.id)
            : filter === 'quick'
              ? recipe.timeMin <= 15
              : recipe.tags.includes('一锅出');

      return matchKeyword && matchFilter;
    });
  }, [keyword, filter, favorites]);

  return (
    <AppShell header={<ScreenHeader title="菜谱" back={false} />} showTabBar className="fade-up">
      <div className={styles.page}>
        <div>
          <h1 className={styles.title}>菜谱</h1>
          <p className={styles.sub}>共 {RECIPES.length} 道 · 按你手边的食材挑</p>
        </div>

        <div className={styles.search}>
          <Icon name="scan" size={16} />
          <input
            className={styles.input}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜菜名或食材，比如「番茄」"
          />
          {keyword && (
            <button type="button" onClick={() => setKeyword('')} aria-label="清空搜索">
              <Icon name="close" size={15} />
            </button>
          )}
        </div>

        <div className={styles.filters}>
          {FILTERS.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`${styles.filter} ${filter === item.key ? styles.filterOn : ''}`}
              onClick={() => setFilter(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {list.length > 0 ? (
          <div className={styles.list}>
            {list.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                favorited={favorites.includes(recipe.id)}
                onToggleFavorite={toggleFavorite}
                onClick={(r) => navigate(`/recipe/${r.id}`)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            glyph={<Icon name="scan" size={32} strokeWidth={1.6} />}
            title="没有匹配的菜谱"
            desc="换个关键词，或者去拍一张食材让识朴帮你配。"
          />
        )}
      </div>
    </AppShell>
  );
}
