/**
 * 钢笔淡彩插画库（识朴 Spoon）
 * 风格：复古钢笔线稿（深棕黑细线）+ 低饱和水彩淡彩晕染。
 * 所有插画均为透明 SVG，方便后续替换为真实素材。
 *
 * 视觉约定：
 *  - INK：深棕黑钢笔线（#3b332b），非纯黑、非绿，带温度
 *  - 水彩：低饱和、高明度、半透明的径向/线性渐变填充，叠加轻微高斯模糊模拟晕染
 *  - 线稿：细而略带手绘感（stroke-linecap=round）
 */
import type { CSSProperties, ReactElement } from 'react';
import type { StepIllu } from '@/types';

const INK = '#3b332b';

export interface IlluProps {
  className?: string;
  style?: CSSProperties;
}

/* ============================================================
   食材 / 植物（首页装饰 & 烹饪步骤共用）
   ============================================================ */

/** 番茄 —— 圆润果实 + 顶部绿叶萼 */
export function Tomato({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-tomato" cx="40%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#efbdab" stopOpacity="0.82" />
          <stop offset="62%" stopColor="#dd927c" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#d0937f" stopOpacity="0.16" />
        </radialGradient>
        <filter id="b-tomato" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>
      <g filter="url(#b-tomato)">
        <path d="M60 35 C83 33 102 51 102 72 C102 95 82 108 60 108 C38 108 18 95 18 72 C18 51 37 37 60 35 Z" fill="url(#w-tomato)" />
      </g>
      <path d="M60 35 C83 33 102 51 102 72 C102 95 82 108 60 108 C38 108 18 95 18 72 C18 51 37 37 60 35 Z" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M60 34 C56 23 50 21 45 23 C51 27 53 31 56 35 M60 34 C64 23 70 21 75 23 C69 27 67 31 64 35 M60 34 C60 25 60 21 60 19 C62 23 61 29 60 34" stroke={INK} strokeWidth="1.7" strokeLinecap="round" fill="#9fb587" fillOpacity="0.5" />
      <path d="M38 52 C45 43 56 41 65 46" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <path d="M33 76 C44 89 77 89 89 76" stroke={INK} strokeWidth="1" opacity="0.28" />
    </svg>
  );
}

/** 鸡蛋 —— 碗中卧着一颗带黄的白煮蛋 */
export function Egg({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-eggwhite" cx="46%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#fbf6ea" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#efe6d2" stopOpacity="0.6" />
        </radialGradient>
        <radialGradient id="w-yolk" cx="44%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f4cf76" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e0a23f" stopOpacity="0.55" />
        </radialGradient>
        <filter id="b-egg" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <path d="M20 66 C22 92 44 104 60 104 C76 104 98 92 100 66 Z" fill="#ece3d2" fillOpacity="0.55" filter="url(#b-egg)" />
      <path d="M20 66 C22 92 44 104 60 104 C76 104 98 92 100 66" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M16 66 L104 66" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M44 60 C44 44 52 36 62 36 C74 36 82 46 82 60 C82 70 72 76 62 76 C52 76 44 70 44 60 Z" fill="url(#w-eggwhite)" />
      <path d="M44 60 C44 44 52 36 62 36 C74 36 82 46 82 60 C82 70 72 76 62 76 C52 76 44 70 44 60 Z" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="63" cy="57" r="13" fill="url(#w-yolk)" />
      <circle cx="63" cy="57" r="13" stroke={INK} strokeWidth="1.8" />
      <path d="M57 52 C60 49 66 49 69 52" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/** 小白菜 —— 白梗 + 舒展绿叶 */
export function BokChoy({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-bokleaf" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#aecb94" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#7ba15f" stopOpacity="0.38" />
        </radialGradient>
        <linearGradient id="w-bokstem" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3ecdb" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e3d8c0" stopOpacity="0.55" />
        </linearGradient>
        <filter id="b-bok" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>
      <g filter="url(#b-bok)">
        <path d="M60 16 C40 22 30 44 34 66 C44 60 56 58 60 58 C64 58 76 60 86 66 C90 44 80 22 60 16 Z" fill="url(#w-bokleaf)" />
      </g>
      <path d="M60 52 C57 70 56 88 58 102 C60 104 62 104 64 102 C66 88 65 70 62 52 Z" fill="url(#w-bokstem)" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M60 16 C40 22 30 44 34 66 C44 60 56 58 60 58 C64 58 76 60 86 66 C90 44 80 22 60 16 Z" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M60 30 C52 36 46 48 44 60 M60 30 C68 36 74 48 76 60 M60 40 C56 50 54 60 54 66 M60 40 C64 50 66 60 66 66" stroke={INK} strokeWidth="1" opacity="0.42" />
    </svg>
  );
}

/** 洋葱 —— 扁圆鳞茎 + 根须 + 顶部枯叶 */
export function Onion({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-onion" cx="44%" cy="40%" r="68%">
          <stop offset="0%" stopColor="#ecd2bd" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#c8a183" stopOpacity="0.42" />
        </radialGradient>
        <filter id="b-onion" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>
      <g filter="url(#b-onion)">
        <path d="M60 30 C84 30 100 48 100 70 C100 92 82 104 60 104 C38 104 20 92 20 70 C20 48 36 30 60 30 Z" fill="url(#w-onion)" />
      </g>
      <path d="M60 30 C84 30 100 48 100 70 C100 92 82 104 60 104 C38 104 20 92 20 70 C20 48 36 30 60 30 Z" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M60 32 C58 50 58 84 60 102 M44 34 C40 52 40 84 44 100 M76 34 C80 52 80 84 76 100" stroke={INK} strokeWidth="1.1" opacity="0.38" />
      <path d="M60 30 C58 18 54 12 50 10 M60 30 C62 18 66 12 70 10 M60 30 C60 20 60 14 60 9" stroke={INK} strokeWidth="1.7" strokeLinecap="round" fill="#c2a679" fillOpacity="0.4" />
      <path d="M48 103 L46 110 M56 104 L55 112 M64 104 L66 112 M72 103 L74 110" stroke={INK} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/** 香草 —— 细枝上的对生小叶（罗勒/薄荷感） */
export function Herb({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-herb" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#aac88c" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7ba15f" stopOpacity="0.4" />
        </radialGradient>
        <filter id="b-herb" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <path d="M60 108 C60 84 58 56 56 30" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <g filter="url(#b-herb)">
        <path d="M56 30 C42 26 30 32 28 44 C42 46 54 42 56 30 Z" fill="url(#w-herb)" />
        <path d="M56 52 C42 48 30 54 28 66 C42 68 54 64 56 52 Z" fill="url(#w-herb)" />
        <path d="M58 46 C72 42 84 48 86 60 C72 62 60 58 58 46 Z" fill="url(#w-herb)" />
        <path d="M58 70 C72 66 84 72 86 84 C72 86 60 82 58 70 Z" fill="url(#w-herb)" />
        <path d="M56 30 C56 22 56 16 57 10 C60 16 59 24 56 30 Z" fill="url(#w-herb)" />
      </g>
      <g stroke={INK} strokeWidth="1.8" strokeLinejoin="round">
        <path d="M56 30 C42 26 30 32 28 44 C42 46 54 42 56 30 Z" />
        <path d="M56 52 C42 48 30 54 28 66 C42 68 54 64 56 52 Z" />
        <path d="M58 46 C72 42 84 48 86 60 C72 62 60 58 58 46 Z" />
        <path d="M58 70 C72 66 84 72 86 84 C72 86 60 82 58 70 Z" />
        <path d="M56 30 C56 22 56 16 57 10 C60 16 59 24 56 30 Z" />
      </g>
    </svg>
  );
}

/** 胡萝卜 —— 橙红直根 + 羽状叶 */
export function Carrot({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="w-carrot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e7b083" stopOpacity="0.78" />
          <stop offset="100%" stopColor="#c98a5f" stopOpacity="0.46" />
        </linearGradient>
        <filter id="b-carrot" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>
      <g filter="url(#b-carrot)">
        <path d="M58 40 L66 40 L78 100 C72 106 62 106 56 100 Z" fill="url(#w-carrot)" />
      </g>
      <path d="M58 40 L66 40 L78 100 C72 106 62 106 56 100 Z" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M62 46 L60 96 M68 46 L71 96" stroke={INK} strokeWidth="1" opacity="0.38" />
      <path d="M62 40 C58 24 50 18 42 18 M62 40 C64 24 70 18 78 18 M62 40 C62 26 62 20 62 14" stroke={INK} strokeWidth="1.8" strokeLinecap="round" fill="#9fb587" fillOpacity="0.45" />
    </svg>
  );
}

/** 嫩豆腐 —— 切角方块 + 气孔 */
export function Tofu({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="w-tofu" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbf8f0" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#ece4d2" stopOpacity="0.7" />
        </linearGradient>
        <filter id="b-tofu" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <g filter="url(#b-tofu)">
        <path d="M30 44 L74 36 L96 56 L52 66 Z" fill="url(#w-tofu)" />
        <path d="M52 66 L96 56 L92 92 L48 100 Z" fill="url(#w-tofu)" opacity="0.92" />
        <path d="M30 44 L52 66 L48 100 L24 78 Z" fill="url(#w-tofu)" opacity="0.86" />
      </g>
      <g stroke={INK} strokeWidth="2" strokeLinejoin="round">
        <path d="M30 44 L74 36 L96 56 L52 66 Z" />
        <path d="M52 66 L96 56 L92 92 L48 100 Z" />
        <path d="M30 44 L52 66 L48 100 L24 78 Z" />
      </g>
      <path d="M44 54 L62 50 M58 72 L80 64 M40 78 L52 88" stroke={INK} strokeWidth="1" opacity="0.3" fill="none" />
      <circle cx="58" cy="56" r="2" fill={INK} opacity="0.22" />
      <circle cx="70" cy="72" r="2" fill={INK} opacity="0.22" />
      <circle cx="42" cy="74" r="2" fill={INK} opacity="0.22" />
    </svg>
  );
}

/** 香菇 —— 伞盖 + 菌褶 + 胖 stem */
export function Mushroom({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-cap" cx="50%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#c9a983" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#9c7c58" stopOpacity="0.5" />
        </radialGradient>
        <linearGradient id="w-stem" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3ecdc" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#e3d8c0" stopOpacity="0.7" />
        </linearGradient>
        <filter id="b-mush" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <g filter="url(#b-mush)">
        <path d="M22 56 C22 34 42 20 60 20 C78 20 98 34 98 56 C80 62 40 62 22 56 Z" fill="url(#w-cap)" />
      </g>
      <path d="M22 56 C22 34 42 20 60 20 C78 20 98 34 98 56 C80 62 40 62 22 56 Z" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M60 56 L60 60" stroke="none" />
      <path d="M40 56 C40 70 44 84 52 92 C58 96 62 96 68 92 C76 84 80 70 80 56" fill="url(#w-stem)" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M30 54 C44 58 76 58 90 54" stroke={INK} strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M34 38 C44 30 76 30 86 38" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

/** 米饭 —— 一碗蓬松的米 */
export function Rice({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-rice" cx="48%" cy="38%" r="64%">
          <stop offset="0%" stopColor="#fdfaf2" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#ece2cd" stopOpacity="0.7" />
        </radialGradient>
        <filter id="b-rice" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <path d="M18 64 C20 92 42 106 60 106 C78 106 100 92 102 64 Z" fill="#ece3d2" fillOpacity="0.55" filter="url(#b-rice)" />
      <path d="M18 64 C20 92 42 106 60 106 C78 106 100 92 102 64" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M14 64 L106 64" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M30 64 C28 44 42 32 60 32 C78 32 92 44 90 64 C74 56 46 56 30 64 Z" fill="url(#w-rice)" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M44 46 C46 42 50 42 52 46 M58 42 C60 38 64 38 66 42 M70 48 C72 44 76 44 78 48" stroke={INK} strokeWidth="0.9" opacity="0.32" fill="none" />
    </svg>
  );
}

/* ============================================================
   烹饪步骤插画（操作场景）
   ============================================================ */

/** 备料 —— 砧板 + 菜刀 */
export function Prep({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="w-board" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ecdcc0" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#cdb78c" stopOpacity="0.5" />
        </linearGradient>
        <filter id="b-prep" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <g filter="url(#b-prep)">
        <path d="M14 70 C14 64 20 60 30 60 L96 60 C104 60 108 66 108 72 C108 80 102 84 92 84 L24 84 C16 84 14 78 14 70 Z" fill="url(#w-board)" />
      </g>
      <path d="M14 70 C14 64 20 60 30 60 L96 60 C104 60 108 66 108 72 C108 80 102 84 92 84 L24 84 C16 84 14 78 14 70 Z" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M30 70 L92 70" stroke={INK} strokeWidth="1" opacity="0.3" />
      <path d="M70 30 L104 30 C106 30 106 38 104 40 L74 46 C70 47 68 42 68 38 Z" fill="#e3e7e3" fillOpacity="0.7" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M68 46 L60 58 C58 60 60 62 63 61 L72 50" fill="#c9b48a" fillOpacity="0.6" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

/** 面条 —— 碗中卷曲的面 */
export function Noodle({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-noodle" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#f6eccf" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e6d4a6" stopOpacity="0.5" />
        </radialGradient>
        <filter id="b-noodle" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <path d="M18 64 C20 92 42 106 60 106 C78 106 100 92 102 64 Z" fill="#ece3d2" fillOpacity="0.55" filter="url(#b-noodle)" />
      <path d="M18 64 C20 92 42 106 60 106 C78 106 100 92 102 64" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M14 64 L106 64" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M40 60 C40 48 48 44 52 52 C56 44 64 46 62 56 C70 48 78 54 72 62 C66 70 54 68 52 60 C48 70 38 68 40 60 Z" fill="url(#w-noodle)" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M46 56 C50 52 56 52 60 56 M52 60 C56 58 62 58 66 62" stroke={INK} strokeWidth="0.9" opacity="0.4" fill="none" />
    </svg>
  );
}

/** 汤锅 —— 带耳的小汤锅 + 蒸汽 */
export function Pot({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-pot" cx="50%" cy="40%" r="62%">
          <stop offset="0%" stopColor="#eef0ec" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#cfd6cf" stopOpacity="0.5" />
        </radialGradient>
        <filter id="b-pot" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <path d="M30 44 C36 40 84 40 90 44 C92 44 94 46 94 50 L90 78 C90 90 78 96 60 96 C42 96 30 90 30 78 L26 50 C26 46 28 44 30 44 Z" fill="url(#w-pot)" filter="url(#b-pot)" />
      <path d="M30 44 C36 40 84 40 90 44 C92 44 94 46 94 50 L90 78 C90 90 78 96 60 96 C42 96 30 90 30 78 L26 50 C26 46 28 44 30 44 Z" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M22 52 C16 50 14 56 20 58 M98 52 C104 50 106 56 100 58" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M40 34 C38 28 44 26 44 32 M60 32 C58 24 66 24 64 32 M80 34 C78 28 84 26 84 32" stroke={INK} strokeWidth="1.6" strokeLinecap="round" opacity="0.55" fill="none" />
    </svg>
  );
}

/** 平底锅 —— 煎炒用 */
export function Pan({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-pan" cx="42%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#5b655b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3a433a" stopOpacity="0.5" />
        </radialGradient>
        <filter id="b-pan" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <path d="M28 56 C28 44 44 38 60 38 C76 38 92 44 92 56 C92 68 76 74 60 74 C44 74 28 68 28 56 Z" fill="url(#w-pan)" filter="url(#b-pan)" />
      <path d="M28 56 C28 44 44 38 60 38 C76 38 92 44 92 56 C92 68 76 74 60 74 C44 74 28 68 28 56 Z" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M92 52 C108 50 112 56 112 60 C112 64 108 66 94 64" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M44 50 C52 46 68 46 76 50 M48 58 C56 55 64 55 72 58" stroke="#dfe3df" strokeWidth="1" opacity="0.4" fill="none" />
    </svg>
  );
}

/** 成菜 —— 一碗带面与菜的完成态 */
export function Dish({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-dish" cx="48%" cy="40%" r="62%">
          <stop offset="0%" stopColor="#f6eccf" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#e3cfa0" stopOpacity="0.5" />
        </radialGradient>
        <radialGradient id="w-dishbroth" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#efbf9d" stopOpacity="0.66" />
          <stop offset="100%" stopColor="#dd8d63" stopOpacity="0.32" />
        </radialGradient>
        <filter id="b-dish" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>
      <path d="M16 60 C18 92 42 108 60 108 C78 108 102 92 104 60 Z" fill="#efe6d3" fillOpacity="0.55" filter="url(#b-dish)" />
      <path d="M16 60 C18 92 42 108 60 108 C78 108 102 92 104 60" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 60 L108 60" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx="60" cy="60" rx="42" ry="13" fill="url(#w-dishbroth)" />
      <ellipse cx="60" cy="60" rx="42" ry="13" stroke={INK} strokeWidth="1.6" />
      <path d="M48 56 C48 48 56 46 60 52 C64 46 72 48 70 56 C76 50 82 54 78 60 C72 66 60 64 58 58 C54 66 44 64 48 56 Z" fill="url(#w-dish)" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M40 70 L80 70" stroke="#7ba15f" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

/** 小枝叶 —— 纯粹的装饰枝条 */
export function Leaf({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-leaf" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#aac88c" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7ba15f" stopOpacity="0.38" />
        </radialGradient>
        <filter id="b-leaf" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <path d="M30 100 C50 80 70 56 92 24" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <g filter="url(#b-leaf)">
        <path d="M44 80 C32 74 26 60 32 50 C46 54 52 68 44 80 Z" fill="url(#w-leaf)" />
        <path d="M62 56 C50 50 44 36 50 26 C64 30 70 44 62 56 Z" fill="url(#w-leaf)" />
        <path d="M58 64 C70 60 80 50 82 38 C70 40 60 52 58 64 Z" fill="url(#w-leaf)" />
      </g>
      <g stroke={INK} strokeWidth="1.7" strokeLinejoin="round">
        <path d="M44 80 C32 74 26 60 32 50 C46 54 52 68 44 80 Z" />
        <path d="M62 56 C50 50 44 36 50 26 C64 30 70 44 62 56 Z" />
        <path d="M58 64 C70 60 80 50 82 38 C70 40 60 52 58 64 Z" />
      </g>
    </svg>
  );
}

/* ============================================================
   烹饪步骤插画分发
   ============================================================ */

const STEP_MAP: Record<StepIllu, (p: IlluProps) => ReactElement> = {
  prep: Prep,
  egg: Egg,
  tomato: Tomato,
  onion: Onion,
  noodle: Noodle,
  bokchoy: BokChoy,
  pot: Pot,
  pan: Pan,
  dish: Dish,
  herb: Herb,
};

/** 根据步骤标题推断插画种类（缺省 illu 时使用） */
export function inferStepIllu(title: string): StepIllu {
  if (/蛋/.test(title)) return 'egg';
  if (/番茄/.test(title)) return 'tomato';
  if (/洋葱/.test(title)) return 'onion';
  if (/面|粉|饭/.test(title)) return 'noodle';
  if (/菜|蔬|青|叶/.test(title)) return 'bokchoy';
  if (/汤|煮|焯|沸/.test(title)) return 'pot';
  if (/炒|煎|翻|锅/.test(title)) return 'pan';
  if (/香|草|葱|芹|花/.test(title)) return 'herb';
  return 'prep';
}

export function StepIllustration({ kind, className, style }: IlluProps & { kind: StepIllu }) {
  const Comp = STEP_MAP[kind] ?? Prep;
  return <Comp className={className} style={style} />;
}

/* ============================================================
   更多食材 / 植物（首页高密度装饰用）
   ============================================================ */

/** 南瓜 —— 半月切片 + 籽囊 */
export function Pumpkin({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-pumpkin" cx="50%" cy="40%" r="68%">
          <stop offset="0%" stopColor="#f2c27d" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#d69a4f" stopOpacity="0.45" />
        </radialGradient>
        <filter id="b-pumpkin" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>
      <g filter="url(#b-pumpkin)">
        <path d="M20 70 C20 42 40 22 60 22 C80 22 100 42 100 70 C100 96 82 106 60 106 C38 106 20 96 20 70 Z" fill="url(#w-pumpkin)" />
      </g>
      <path d="M20 70 C20 42 40 22 60 22 C80 22 100 42 100 70 C100 96 82 106 60 106 C38 106 20 96 20 70 Z" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M60 22 C58 12 54 8 50 6 M60 22 C62 12 66 8 70 6" stroke={INK} strokeWidth="1.7" strokeLinecap="round" fill="#9fb587" fillOpacity="0.4" />
      <path d="M38 50 C38 42 46 38 52 42 C58 36 68 38 72 46 C80 44 86 54 82 62 C88 70 82 80 74 80 C72 90 62 94 54 88 C46 94 36 88 34 78 C26 76 24 66 30 60 C26 54 30 48 38 50 Z" stroke={INK} strokeWidth="1.1" opacity="0.35" fill="none" />
      <ellipse cx="52" cy="62" rx="4" ry="3" fill={INK} opacity="0.22" />
      <ellipse cx="68" cy="58" rx="4" ry="3" fill={INK} opacity="0.22" />
      <ellipse cx="60" cy="76" rx="4" ry="3" fill={INK} opacity="0.22" />
    </svg>
  );
}

/** 西兰花 —— 伞状小花球 + 粗茎 */
export function Broccoli({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-broc" cx="45%" cy="36%" r="66%">
          <stop offset="0%" stopColor="#9ebf84" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#6e9157" stopOpacity="0.45" />
        </radialGradient>
        <filter id="b-broc" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>
      <path d="M54 78 L54 104 C54 108 66 108 66 104 L66 78" fill="#d6e0c8" fillOpacity="0.6" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <g filter="url(#b-broc)">
        <circle cx="42" cy="52" r="18" fill="url(#w-broc)" />
        <circle cx="60" cy="42" r="20" fill="url(#w-broc)" />
        <circle cx="78" cy="54" r="17" fill="url(#w-broc)" />
        <circle cx="52" cy="68" r="15" fill="url(#w-broc)" />
        <circle cx="72" cy="70" r="14" fill="url(#w-broc)" />
      </g>
      <g stroke={INK} strokeWidth="1.8" strokeLinejoin="round">
        <circle cx="42" cy="52" r="18" />
        <circle cx="60" cy="42" r="20" />
        <circle cx="78" cy="54" r="17" />
        <circle cx="52" cy="68" r="15" />
        <circle cx="72" cy="70" r="14" />
      </g>
      <path d="M48 48 C52 44 58 44 62 48 M56 62 C60 58 66 60 68 64" stroke={INK} strokeWidth="0.9" opacity="0.35" fill="none" />
    </svg>
  );
}

/** 姜 —— 不规则根茎块 + 芽眼 */
export function Ginger({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="w-ginger" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ecd3af" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#c9a674" stopOpacity="0.5" />
        </linearGradient>
        <filter id="b-ginger" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <g filter="url(#b-ginger)">
        <path d="M30 70 C22 62 24 48 34 44 C32 34 42 26 52 30 C60 22 74 24 80 34 C92 36 98 48 92 58 C96 68 88 80 76 80 C70 90 54 90 48 80 C38 82 30 78 30 70 Z" fill="url(#w-ginger)" />
      </g>
      <path d="M30 70 C22 62 24 48 34 44 C32 34 42 26 52 30 C60 22 74 24 80 34 C92 36 98 48 92 58 C96 68 88 80 76 80 C70 90 54 90 48 80 C38 82 30 78 30 70 Z" stroke={INK} strokeWidth="2.1" strokeLinejoin="round" />
      <path d="M44 46 C48 42 56 42 60 48 M54 62 C60 58 68 60 72 66" stroke={INK} strokeWidth="1" opacity="0.35" fill="none" />
      <circle cx="42" cy="58" r="2.2" fill={INK} opacity="0.3" />
      <circle cx="66" cy="48" r="2.2" fill={INK} opacity="0.3" />
      <circle cx="76" cy="68" r="2.2" fill={INK} opacity="0.3" />
    </svg>
  );
}

/** 藕 —— 横切圆片 + 孔洞 */
export function LotusRoot({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-lotus" cx="50%" cy="45%" r="62%">
          <stop offset="0%" stopColor="#f5ead6" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#e2d2b3" stopOpacity="0.55" />
        </radialGradient>
        <filter id="b-lotus" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <g filter="url(#b-lotus)">
        <ellipse cx="60" cy="64" rx="42" ry="34" fill="url(#w-lotus)" />
      </g>
      <ellipse cx="60" cy="64" rx="42" ry="34" stroke={INK} strokeWidth="2.2" />
      <ellipse cx="60" cy="64" rx="34" ry="26" stroke={INK} strokeWidth="1.2" opacity="0.4" fill="none" />
      <circle cx="60" cy="64" r="4.5" fill={INK} opacity="0.22" />
      <circle cx="44" cy="56" r="3.6" fill={INK} opacity="0.22" />
      <circle cx="76" cy="56" r="3.6" fill={INK} opacity="0.22" />
      <circle cx="44" cy="72" r="3.6" fill={INK} opacity="0.22" />
      <circle cx="76" cy="72" r="3.6" fill={INK} opacity="0.22" />
      <circle cx="60" cy="48" r="3.6" fill={INK} opacity="0.22" />
      <circle cx="60" cy="80" r="3.6" fill={INK} opacity="0.22" />
    </svg>
  );
}

/** 豌豆荚 —— 弯曲荚壳 + 三粒豆子 */
export function PeaPod({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="w-pod" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b8d49a" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#8fb66f" stopOpacity="0.48" />
        </linearGradient>
        <filter id="b-pod" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <g filter="url(#b-pod)">
        <path d="M22 78 C18 58 36 34 64 28 C84 24 98 34 96 48 C94 62 74 74 52 80 C38 84 26 86 22 78 Z" fill="url(#w-pod)" />
      </g>
      <path d="M22 78 C18 58 36 34 64 28 C84 24 98 34 96 48 C94 62 74 74 52 80 C38 84 26 86 22 78 Z" stroke={INK} strokeWidth="2.1" strokeLinejoin="round" />
      <path d="M32 68 C44 58 66 48 88 44" stroke={INK} strokeWidth="1" opacity="0.35" fill="none" />
      <circle cx="44" cy="60" r="5.5" fill="#e8f0d8" fillOpacity="0.85" stroke={INK} strokeWidth="1.4" />
      <circle cx="62" cy="52" r="5.5" fill="#e8f0d8" fillOpacity="0.85" stroke={INK} strokeWidth="1.4" />
      <circle cx="80" cy="46" r="5.5" fill="#e8f0d8" fillOpacity="0.85" stroke={INK} strokeWidth="1.4" />
      <path d="M96 48 C100 46 104 48 106 52" stroke={INK} strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** 香菜 / 细叶香草 —— 细碎羽状叶 */
export function Coriander({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-cori" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#a8c98a" stopOpacity="0.78" />
          <stop offset="100%" stopColor="#7ba15f" stopOpacity="0.4" />
        </radialGradient>
        <filter id="b-cori" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <path d="M60 110 C60 86 58 60 54 36" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <g filter="url(#b-cori)">
        <path d="M54 36 C40 30 28 36 26 48 C40 50 50 44 54 36 Z" fill="url(#w-cori)" />
        <path d="M56 58 C42 52 30 58 28 70 C42 72 52 66 56 58 Z" fill="url(#w-cori)" />
        <path d="M58 80 C44 74 32 80 30 92 C44 94 54 88 58 80 Z" fill="url(#w-cori)" />
        <path d="M56 36 C70 30 82 36 84 48 C70 50 60 44 56 36 Z" fill="url(#w-cori)" />
        <path d="M58 58 C72 52 84 58 86 70 C72 72 62 66 58 58 Z" fill="url(#w-cori)" />
      </g>
      <g stroke={INK} strokeWidth="1.7" strokeLinejoin="round">
        <path d="M54 36 C40 30 28 36 26 48 C40 50 50 44 54 36 Z" />
        <path d="M56 58 C42 52 30 58 28 70 C42 72 52 66 56 58 Z" />
        <path d="M58 80 C44 74 32 80 30 92 C44 94 54 88 58 80 Z" />
        <path d="M56 36 C70 30 82 36 84 48 C70 50 60 44 56 36 Z" />
        <path d="M58 58 C72 52 84 58 86 70 C72 72 62 66 58 58 Z" />
      </g>
    </svg>
  );
}

/** 肉片 —— 薄切肉片卷 + 油花 */
export function MeatSlice({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-meat" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#e6b0a0" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#c97e6a" stopOpacity="0.45" />
        </radialGradient>
        <filter id="b-meat" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>
      <g filter="url(#b-meat)">
        <path d="M22 60 C22 38 40 26 60 26 C80 26 98 38 98 60 C98 80 84 92 60 92 C36 92 22 80 22 60 Z" fill="url(#w-meat)" />
      </g>
      <path d="M22 60 C22 38 40 26 60 26 C80 26 98 38 98 60 C98 80 84 92 60 92 C36 92 22 80 22 60 Z" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M34 52 C44 46 56 46 66 52 M30 68 C42 60 58 60 70 68" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" opacity="0.4" />
      <path d="M40 60 C48 56 60 56 68 62" stroke={INK} strokeWidth="0.9" opacity="0.3" fill="none" />
      <path d="M50 76 C58 72 66 74 72 80" stroke={INK} strokeWidth="1.2" strokeLinecap="round" opacity="0.32" fill="none" />
    </svg>
  );
}

/** 葱 —— 葱白 + 细长葱叶 */
export function Scallion({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="w-scallion" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d8e8c4" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#a6c688" stopOpacity="0.45" />
        </linearGradient>
        <filter id="b-scallion" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <path d="M60 110 L60 58" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <g filter="url(#b-scallion)">
        <path d="M60 58 C44 54 30 40 26 22 C40 28 54 42 60 58 Z" fill="url(#w-scallion)" />
        <path d="M60 58 C76 54 90 40 94 22 C80 28 66 42 60 58 Z" fill="url(#w-scallion)" />
        <path d="M60 58 C60 42 62 26 68 12 C64 26 62 42 60 58 Z" fill="url(#w-scallion)" />
        <path d="M52 66 L68 66 L66 84 L54 84 Z" fill="#f5f0e4" fillOpacity="0.75" />
      </g>
      <path d="M60 58 C44 54 30 40 26 22 C40 28 54 42 60 58 Z" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M60 58 C76 54 90 40 94 22 C80 28 66 42 60 58 Z" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M60 58 C60 42 62 26 68 12 C64 26 62 42 60 58 Z" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M52 66 L68 66 L66 84 L54 84 Z" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M54 72 L64 72 M55 78 L63 78" stroke={INK} strokeWidth="0.9" opacity="0.35" />
    </svg>
  );
}

/** 水彩晕染斑点 —— 模拟纸张上的淡彩水痕（装饰背景） */
export function WatercolorSpot({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-spot1" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#c4d6b3" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#c4d6b3" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#c4d6b3" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="w-spot2" cx="60%" cy="65%" r="55%">
          <stop offset="0%" stopColor="#e3bfa8" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#e3bfa8" stopOpacity="0" />
        </radialGradient>
        <filter id="b-spot" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <g filter="url(#b-spot)" opacity="0.8">
        <ellipse cx="70" cy="65" rx="56" ry="48" fill="url(#w-spot1)" />
        <ellipse cx="95" cy="105" rx="42" ry="38" fill="url(#w-spot2)" />
      </g>
    </svg>
  );
}

/* ============================================================
   食材 / 菜谱插画映射（供卡片、封面、列表统一取用）
   ============================================================ */

export type IlluComponent = (p: IlluProps) => ReactElement;

/** 食材 id → 钢笔淡彩插画 */
export const INGREDIENT_ILLU: Record<string, IlluComponent> = {
  tomato: Tomato,
  egg: Egg,
  bokchoy: BokChoy,
  onion: Onion,
  scallion: Scallion,
  noodle: Noodle,
  tofu: Tofu,
  mushroom: Mushroom,
};

/** 菜谱 id → 封面插画 */
export const RECIPE_ILLU: Record<string, IlluComponent> = {
  'tomato-egg-bokchoy-noodle': Noodle,
  'tomato-egg-scramble': Egg,
  'onion-egg-fried-rice': Rice,
  'bokchoy-tofu-soup': Dish,
};

/** 取食材插画，兜底用枝叶 */
export function getIngredientIllustration(id: string): IlluComponent {
  return INGREDIENT_ILLU[id] ?? Leaf;
}

/** 取菜谱封面插画，兜底用成菜 */
export function getRecipeIllustration(id: string): IlluComponent {
  return RECIPE_ILLU[id] ?? Dish;
}

/* ============================================================
   首页角落丛组件（高密度、自然错落、钢笔淡彩）
   每个角落丛由多个小元素组成，方便整体旋转/缩放/定位
   ============================================================ */

export function CornerTopLeft({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform="translate(-12,-18) scale(0.62)">
        <PeaPod />
      </g>
      <g transform="translate(78,-8) scale(0.48)">
        <Herb />
      </g>
      <g transform="translate(22,52) scale(0.46)">
        <Coriander />
      </g>
      <g transform="translate(112,42) scale(0.36)">
        <Leaf />
      </g>
      <path d="M190 10 C150 18 100 38 60 78" stroke={INK} strokeWidth="1.2" strokeLinecap="round" opacity="0.18" fill="none" />
    </svg>
  );
}

export function CornerTopRight({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform="translate(90,-16) scale(0.6)">
        <Pumpkin />
      </g>
      <g transform="translate(12,8) scale(0.42)">
        <Broccoli />
      </g>
      <g transform="translate(105,58) scale(0.48)">
        <Onion />
      </g>
      <g transform="translate(18,62) scale(0.36)">
        <Herb />
      </g>
      <path d="M20 18 C70 26 130 52 170 98" stroke={INK} strokeWidth="1.2" strokeLinecap="round" opacity="0.18" fill="none" />
    </svg>
  );
}

export function CornerBottomLeft({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform="translate(20,115) scale(0.72)">
        <Ginger />
      </g>
      <g transform="translate(110,130) scale(0.58)">
        <Scallion />
      </g>
      <g transform="translate(25,40) scale(0.48)">
        <Leaf />
      </g>
      <g transform="translate(130,55) scale(0.5)">
        <Coriander />
      </g>
      <path d="M180 200 C130 185 70 160 40 110" stroke={INK} strokeWidth="1.2" strokeLinecap="round" opacity="0.2" fill="none" />
    </svg>
  );
}

export function CornerBottomRight({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform="translate(95,120) scale(0.72)">
        <LotusRoot />
      </g>
      <g transform="translate(10,135) scale(0.6)">
        <MeatSlice />
      </g>
      <g transform="translate(115,45) scale(0.52)">
        <Carrot />
      </g>
      <g transform="translate(25,55) scale(0.46)">
        <Herb />
      </g>
      <g transform="translate(60,115) scale(0.42)">
        <Leaf />
      </g>
      <path d="M30 190 C80 175 140 145 175 90" stroke={INK} strokeWidth="1.2" strokeLinecap="round" opacity="0.2" fill="none" />
    </svg>
  );
}

/** 小角落装饰（适合流程页边角，保持低调） */
export function Sprig({ className, style }: IlluProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="w-sprig" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#a9c78f" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#7ba15f" stopOpacity="0.25" />
        </radialGradient>
        <filter id="b-sprig" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      <path d="M10 90 C30 70 50 50 70 20" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
      <g filter="url(#b-sprig)">
        <path d="M34 62 C24 58 20 48 24 40 C34 44 38 54 34 62 Z" fill="url(#w-sprig)" />
        <path d="M50 46 C40 42 36 32 40 24 C50 28 54 38 50 46 Z" fill="url(#w-sprig)" />
        <path d="M66 30 C56 26 52 16 56 8 C66 12 70 22 66 30 Z" fill="url(#w-sprig)" />
      </g>
      <g stroke={INK} strokeWidth="1.4" strokeLinejoin="round">
        <path d="M34 62 C24 58 20 48 24 40 C34 44 38 54 34 62 Z" />
        <path d="M50 46 C40 42 36 32 40 24 C50 28 54 38 50 46 Z" />
        <path d="M66 30 C56 26 52 16 56 8 C66 12 70 22 66 30 Z" />
      </g>
    </svg>
  );
}
