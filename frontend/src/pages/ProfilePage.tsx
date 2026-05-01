import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import LogoutButton from '../components/Auth/LogoutButton';
import { useNavigate } from 'react-router-dom';

import { getProfileRequest } from '../features/profile/profileSlice';
import Button from '../components/Common/Button';
import { LayoutDashboard, ColumnChartStacked, ChartColumnStacked} from 'lucide-react';


function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const profileImage =
    useSelector((state: RootState) => state.profile.profile?.avatar_url) ??
    '/immagine-removebg-preview.png';
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfileRequest(token));
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-[#0f3936] to-[#184e4a] text-white py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Profile</h1>
      <img className="h-20 w-20 self-center mb-8" src={profileImage} alt="" />
      <h2 className="text-2xl font-bold text-center mb-8 text-white">Welcome, {user.name}</h2>
      <p className="text-center">{user.email}</p>
      <Button link={'/statistic'} label={'Statistic'} icon={<ChartColumnStacked  className="w-5 h-5 mr-1" />}/>
      <Button link={'/'} label={'Dashboard'} icon={<LayoutDashboard className="w-5 h-5 mr-1" />}/>
      <LogoutButton />
    </div>
  );
}

export default ProfilePage;
