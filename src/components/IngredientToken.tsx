import type { CSSProperties } from 'react';
import { getIngredient } from '@/mock/ingredients';

interface IngredientTokenProps {
  id: string;
  /** 边长（px），默认 30 */
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * 食材的无插画标识：用食材强调色描边 + 首字。
 * 既不依赖插画素材，又能按颜色区分食材，保持简洁轻盈。
 */
export function IngredientToken({ id, size = 30, className, style }: IngredientTokenProps) {
  const ing = getIngredient(id);
  const color = ing?.color ?? 'var(--moss)';
  const label = ing?.name?.slice(0, 1) ?? '?';

  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none',
        width: size,
        height: size,
        borderRadius: 'var(--r-sm)',
        border: `1.5px solid ${color}`,
        color,
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: Math.round(size * 0.42),
        lineHeight: 1,
        letterSpacing: 0,
        ...style,
      }}
    >
      {label}
    </span>
  );
}
