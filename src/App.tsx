import { useEffect } from 'react';
import { HashRouter, useLocation } from 'react-router-dom';
import { AppRoutes } from '@/router';
import { AppStoreProvider } from '@/store/AppStore';

/** 切换页面时把内容区滚回顶部 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const resetScroll = () => {
      const body = document.querySelector('.screen__body');
      if (body) body.scrollTop = 0;
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
    };
    resetScroll();
    // 等 DOM 绘制完成后再兜底一次，避免异步内容把页面顶下去
    const raf = requestAnimationFrame(resetScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <HashRouter>
      <AppStoreProvider>
        <ScrollToTop />
        <div className="stage">
          <div className="app">
            <AppRoutes />
          </div>
        </div>
      </AppStoreProvider>
    </HashRouter>
  );
}
