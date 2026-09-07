import type { CSSProperties } from 'react';
import { IngredientArt } from './IngredientArt';
import styles from './MockPhoto.module.css';

interface MockPhotoProps {
  /** 不同 seed 会得到不同的色调与构图，模拟不同的实拍照片 */
  seed: number;
  /** 宽高比，如 '4 / 3'、'1 / 1' */
  ratio?: string;
  /** 照片里出现的食材 id（用钢笔淡彩插画代替 emoji） */
  subjects?: string[];
  /** 识别中：让画面像被笔尖一点点显影出来 */
  developing?: boolean;
  className?: string;
}

/** 由 seed 稳定地生成一组低饱和暖色（像一张静物写生纸），统一在杏黄/沙色范围 */
function palette(seed: number) {
  const warmHues = [25, 32, 40, 48];
  const hue = warmHues[Math.abs(seed) % warmHues.length];
  return {
    p1: `hsl(${hue} 20% 90%)`,
    p2: `hsl(${(hue + 20) % 360} 16% 78%)`,
    p3: `hsl(${(hue + 42) % 360} 13% 62%)`,
  };
}

interface Placement {
  id: string;
  x: number;
  y: number;
  rot: number;
  size: number;
  back: boolean;
}

/** 由 seed 稳定地生成构图 */
function layout(seed: number, ids: string[]): Placement[] {
  return ids.map((id, i) => {
    const a = (seed * (i + 3) * 37) % 100;
    const b = (seed * (i + 7) * 53) % 100;
    const c = (seed * (i + 11) * 29) % 100;
    return {
      id,
      x: 18 + (a / 100) * 64,
      y: 24 + (b / 100) * 52,
      rot: -22 + (c / 100) * 44,
      size: 58 + (a / 100) * 40,
      back: i % 3 === 2,
    };
  });
}

const DEFAULT_SUBJECTS = ['tomato', 'egg', 'bokchoy', 'onion'];

/**
 * Mock 照片：用低饱和暖底 + 钢笔淡彩静物，模拟一张「刚拍的食材照」。
 * 接真实相机后，替换为 <img src={photoUri} /> 即可。
 */
export function MockPhoto({
  seed,
  ratio = '4 / 3',
  subjects = DEFAULT_SUBJECTS,
  developing = false,
  className = '',
}: MockPhotoProps) {
  const colors = palette(seed);
  const placements = layout(seed, subjects);

  return (
    <div
      className={`${styles.photo} ${developing ? styles.developing : ''} ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label="拍摄的食材照片"
    >
      <div
        className={styles.base}
        style={
          {
            '--p1': colors.p1,
            '--p2': colors.p2,
            '--p3': colors.p3,
          } as CSSProperties
        }
      />
      <div className={styles.subjects}>
        {placements.map((p, i) => (
          <span
            key={`${p.id}-${i}`}
            className={`${styles.subject} ${p.back ? styles.subjectBack : ''}`}
            style={
              {
                left: `${p.x}%`,
                top: `${p.y}%`,
                '--rot': `${p.rot}deg`,
                '--size': `${p.size}px`,
              } as CSSProperties
            }
          >
            <IngredientArt id={p.id} className={styles.subjectIllu} />
          </span>
        ))}
      </div>
      <div className={styles.grain} />
      <div className={styles.vignette} />
    </div>
  );
}
