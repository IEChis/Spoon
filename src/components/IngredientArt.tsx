import type { CSSProperties } from 'react';
import { getIngredientArt } from '@/assets/art';
import { getIngredientIllustration } from '@/components/illustrations';

interface IngredientArtProps {
  id: string;
  className?: string;
  style?: CSSProperties;
  /** 入场是否使用水彩显色动画 */
  wash?: boolean;
  /** 无真实资产时回退 SVG 的 viewBox 尺寸 */
  svgSize?: number;
}

/**
 * 统一的食材插画组件。
 * 优先使用真实钢笔淡彩 PNG；没有对应资产的食材回退到 SVG 线稿库。
 * 让所有页面（首页 / 识别 / 菜谱 / 食材库 / 烹饪）共享同一套视觉语言。
 */
export function IngredientArt({ id, className, style, wash, svgSize }: IngredientArtProps) {
  const url = getIngredientArt(id);

  if (url) {
    return (
      <img
        src={url}
        alt=""
        draggable={false}
        className={[className, wash ? 'wash' : ''].filter(Boolean).join(' ')}
        style={style}
      />
    );
  }

  const Svg = getIngredientIllustration(id);
  return (
    <Svg
      className={className}
      style={{ width: svgSize, height: svgSize, ...style }}
    />
  );
}
