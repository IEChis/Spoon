import { useEffect } from 'react';
import { HashRouter, useLocation } from 'react-router-dom';
import { AppRoutes } from '@/router';
import { AppStoreProvider } from '@/store/AppStore';

/** 切换页面时把内容区滚回顶部 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const body = document.querySelector('.screen__body');
    if (body) body.scrollTop = 0;
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
