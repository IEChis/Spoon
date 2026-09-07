import { NavLink } from 'react-router-dom';
import { Icon } from './Icon';
import type { IconName } from './Icon';
import styles from './TabBar.module.css';

interface TabItem {
  to: string;
  label: string;
  icon: IconName;
}

const TABS: TabItem[] = [
  { to: '/', label: '首页', icon: 'home' },
  { to: '/recipes', label: '菜谱', icon: 'book' },
  { to: '/profile', label: '我的', icon: 'user' },
];

export function TabBar() {
  return (
    <nav className={styles.tabbar}>
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
        >
          <Icon name={tab.icon} size={23} strokeWidth={1.7} />
          <span className={styles.label}>{tab.label}</span>
          <span className={styles.dot} />
        </NavLink>
      ))}
    </nav>
  );
}
