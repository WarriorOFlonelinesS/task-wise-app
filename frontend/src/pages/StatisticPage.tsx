import React, { Activity, useEffect, useMemo, useState } from 'react';
import { StatsRow } from '../components/Statistic/StatsRow';
import { TaskChart } from '../components/Statistic/TaskChart';
import Button from '../components/Common/Button';
import { AlertOctagon, Flame, Gauge, HeartPulse, Layers, LayoutDashboard, Target, TrendingUp, UserRound, Zap } from 'lucide-react';
import { getStatisticRequest } from '../features/statistic/statisticSlice';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { loginRequestWithToken } from '../features/auth/authSlice';
import CyberInsight from '../components/AI/CyberInsight';

export default function StatisticPage() {
  const buttonStyles = `
  p-2 rounded-xl border border-white/10 backdrop-blur-xl bg-white/5 
  text-cyan-400 shadow-lg transition-all duration-300
  hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]
  active:scale-95 mb-3
`;
  const tokenFromCookie = Cookies.get('token');
  const { statistic: rawStatistic, loading } = useSelector((state: RootState) => state.statistic);
  const token = useSelector((state: RootState) => state.auth.token);

  const dispatch = useDispatch();
  useEffect(() => {
    if (tokenFromCookie !== undefined) {
      dispatch(loginRequestWithToken(tokenFromCookie));
    }
  }, [tokenFromCookie]);

  useEffect(() => {
    if (token) {
      dispatch(getStatisticRequest(token));
    }
  }, [dispatch, token]);

  const actualStats = useMemo(() => {
    if (!rawStatistic) return null;
    return 'statistics' in rawStatistic ? (rawStatistic as any).statistics : rawStatistic;
  }, [rawStatistic]);
  
  const dashboardStats = useMemo(
    () => {
      const m = actualStats?.metrics;
     return [
      {
        id: 'stat-velocity',
        label: 'Швидкість роботи',
        value: m?.velocity?.value ?? 0,
        importance: m?.velocity?.importance ?? 'Normal',
        icon: <Gauge className="w-5 h-5 text-emerald-400" />,
      },
      {
        id: 'stat-stall-rate',
        label: 'Рівень простою',
        value: m?.stall_rate?.value ?? 0,
        importance: m?.stall_rate?.importance ?? 'Normal',
        icon: <AlertOctagon className="w-5 h-5 text-amber-500" />,
      },
      {
        id: 'stat-focus-density',
        label: 'Щільність фокусу',
        value: m?.focus_density?.value ?? 0,
        importance: m?.focus_density?.importance ?? 'Normal',
        icon: <Target className="w-5 h-5 text-cyan-400" />,
      },
      {
        id: 'stat-deadline-pressure',
        label: 'Тиск дедлайнів',
        value: m?.deadline_pressure?.value ?? 0,
        importance: m?.deadline_pressure?.importance ?? 'Normal',
        icon: <Flame className="w-5 h-5 text-red-400 animate-pulse" />,
      },
      {
        id: 'stat-queue-load',
        label: 'Навантаження черги',
        value: m?.queue_load?.value ?? 0,
        importance: m?.queue_load?.importance ?? 'Normal',
        icon: <Layers className="w-5 h-5 text-indigo-400" />,
      },
      {
        id: 'stat-status-health',
        label: 'Здоров’я статусів',
        value: m?.status_health?.value ?? 0,
        importance: m?.status_health?.importance ?? 'Normal',
        icon: <HeartPulse className="w-5 h-5 text-rose-400" />,
      },
    ]},
    [actualStats],
  );
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f3936] to-[#184e4a] text-white py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-3 text-white">Панель Статистики</h1>
      <div className="mb-3 flex flex-col items-center">
        <Button
          label={'Профіль'}
          icon={<UserRound className="w-5 h-5 mr-1" />}
          styles={buttonStyles}
          to="/profile"
        />
        <Button
          label={'Дошка завдань'}
          icon={<LayoutDashboard className="w-5 h-5 mr-1" />}
          styles={buttonStyles}
          to="/"
        />
      </div>
      <CyberInsight text={actualStats?.insights?.[0]} />
      <StatsRow statistics={dashboardStats} />
    </div>
  );
}
