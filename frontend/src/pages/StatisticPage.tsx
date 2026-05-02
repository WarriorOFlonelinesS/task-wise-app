import React, { useEffect, useState } from 'react';
import { StatsRow } from '../components/Statistic/StatsRow';
import { TaskChart } from '../components/Statistic/TaskChart';
import Button from '../components/Common/Button';
import { LayoutDashboard, UserRound } from 'lucide-react';

export default function StatisticPage() {
  const dashboardStats = [
    {
      label: 'Активні завдання',
      value: 12,
      icon: '⚡',
    },
    {
      label: 'Дедлайни сьогодні',
      value: 5,
      icon: '🕒',
    },
    {
      label: 'Ефективність',
      value: 84,
      icon: '📈',
    },
  ];
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f3936] to-[#184e4a] text-white py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-3 text-white">Statistic Panel</h1>
      <div className="mb-3 ">
        <Button link={'/profile'} label={'Profile'} icon={<UserRound className="w-5 h-5 mr-1" />} />
        <Button
          link={'/'}
          label={'Dashboard'}
          icon={<LayoutDashboard className="w-5 h-5 mr-1" />}
        />
      </div>
      <StatsRow statistics={dashboardStats} />
      <TaskChart />
      <StatsRow statistics={dashboardStats} />
    </div>
  );
}
