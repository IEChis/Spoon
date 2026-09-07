import type { ReactNode } from 'react';
import { TabBar } from './TabBar';

interface AppShellProps {
  children: ReactNode;
  /** 顶部区域（通常用 ScreenHeader） */
  header?: ReactNode;
  /** 底部固定操作栏 */
  footer?: ReactNode;
  /** 是否展示底部导航（Tab 页为 true，流程页为 false） */
  showTabBar?: boolean;
  /** 内容区是否去掉左右内边距（相机等沉浸式页面） */
  flush?: boolean;
  /** 内容区底部是否预留操作栏空间 */
  withFooterSpace?: boolean;
  className?: string;
}

/**
 * 页面外壳：统一承载 header / 滚动内容区 / 固定底栏 / TabBar，
 * 保证各页结构一致、安全区一致。
 */
export function AppShell({
  children,
  header,
  footer,
  showTabBar = false,
  flush = false,
  withFooterSpace = false,
  className = '',
}: AppShellProps) {
  const bodyClass = [
    'screen__body',
    flush ? 'screen__body--flush' : '',
    withFooterSpace ? 'screen__body--with-footer' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="screen">
      {header}
      <main className={bodyClass}>{children}</main>
      {footer && <div className="screen__footer">{footer}</div>}
      {showTabBar && <TabBar />}
    </div>
  );
}
