import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from './Icon';
import styles from './ScreenHeader.module.css';

interface ScreenHeaderProps {
  title?: string;
  subtitle?: string;
  /** 是否显示返回按钮 */
  back?: boolean;
  /** 自定义返回行为，默认 history.back() */
  onBack?: () => void;
  /** 右侧操作区 */
  right?: ReactNode;
  /** 相机 / 识别页使用：透明浮层样式 */
  floating?: boolean;
  bordered?: boolean;
}

export function ScreenHeader({
  title,
  subtitle,
  back = true,
  onBack,
  right,
  floating = false,
  bordered = true,
}: ScreenHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <header
      className={[styles.header, floating ? styles.floating : '', bordered ? styles.bordered : '']
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.bar}>
        <div className={`${styles.side} ${styles['side--left']}`}>
          {back && (
            <button type="button" className={styles.iconBtn} onClick={handleBack} aria-label="返回">
              <Icon name="chevronLeft" size={20} />
            </button>
          )}
        </div>
        {title && <h1 className={styles.title}>{title}</h1>}
        <div className={`${styles.side} ${styles['side--right']}`}>{right}</div>
      </div>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}
