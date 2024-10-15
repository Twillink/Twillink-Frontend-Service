'use client';
import React, {useState} from 'react';
import Button from '@/components/Button';
import PanelContainer from '@/components/PanelContainer';
import {useRouter} from 'next/navigation';
import Tabs from '@/components/Tabs';
import MyProfile from './AccountTabPanels/MyProfile';
import Admin from './AccountTabPanels/Admin';
import Billing from './AccountTabPanels/Billing';
import {useAppDispatch} from '@/libs/hooks/useReduxHook';
import {authLogout} from '@/libs/store/features/authSlice';

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const tabLabels = [
    'My Profile',
    // 'Admin', 'Billing'
  ];
  const handleLogout = () => {
    dispatch(authLogout());
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    router.push('/');
  };
  return (
    <PanelContainer>
      <div className="flex justify-between items-center">
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabLabels={tabLabels}
        />
        {activeTab === 2 ? (
          <Button
            outline
            size="sm"
            color="error"
            title="Cancel Subscription"
            onClick={() => router.push('/')}
          />
        ) : (
          <Button
            outline
            size="sm"
            color="error"
            title="Logout"
            onClick={handleLogout}
          />
        )}
      </div>

      <div className="pt-10">
        {activeTab === 0 && <MyProfile />}
        {activeTab === 1 && <Admin />}
        {activeTab === 2 && <Billing />}
      </div>
    </PanelContainer>
  );
}
