import { useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { Icon } from '@/components/Icon';
import { ScreenHeader } from '@/components/ScreenHeader';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <AppShell header={<ScreenHeader title="走丢了" back={false} />} className="fade-up">
      <EmptyState
        glyph={<Icon name="leaf" size={34} strokeWidth={1.6} />}
        title="这页不在篮子里"
        desc="页面可能已经不存在了，回首页看看。"
        action={<Button onClick={() => navigate('/')}>回首页</Button>}
      />
    </AppShell>
  );
}
