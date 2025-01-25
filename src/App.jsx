
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import LoaderGif from './assets/loader.gif';
import Profile from './pages/Dashboard/Profile';
import Plan from './pages/Dashboard/Plan';
import AOS from 'aos';
import 'aos/dist/aos.css';
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const Layout = lazy(() => import('./components/dashboard/Layout'));
const Home = lazy(() => import('./pages/Dashboard/Home'));
const Contacts = lazy(() => import('./pages/Dashboard/Contacts'));
const Companies = lazy(() => import('./pages/Dashboard/Companies'));
const CallLogs = lazy(() => import('./pages/Dashboard/CallLogs'));
const User = lazy(() => import('./pages/Dashboard/User'));
const VoiceLibrary = lazy(() => import('./pages/Dashboard/VoiceLibrary'));
const Task = lazy(() => import('./pages/Dashboard/Task'));
const Calendar = lazy(() => import('./pages/Dashboard/Calendar'));
const InvitationPage = lazy(() => import('./pages/Auth/InvitationPage'));

function SuspenseWithDelay({ children, fallback, delay = 0, minDisplayTime = 2000 }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), minDisplayTime);
    return () => clearTimeout(timer);
  }, [minDisplayTime]);

  return isLoading ? (
    <div className="flex justify-center items-center w-screen h-screen">
      <img src={LoaderGif} alt="Loading..." className="h-[6rem]" />
    </div>
  ) : (
    <Suspense fallback={fallback}>{children}</Suspense>
  );
}

function App() {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <>
      <Toaster />

      <BrowserRouter>
        <SuspenseWithDelay fallback={<div className="flex justify-center items-center w-screen h-screen"><img src={LoaderGif} alt="Taxi Dashboard - Loader" className="h-[6rem]" /></div>} minDisplayTime={2000}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard/" element={<Layout />}>
              <Route path="home" element={<Home />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="companies" element={<Companies />} />
              <Route path="calls" element={<CallLogs />} />
              <Route path="users" element={<User />} />
              <Route path="voices" element={<VoiceLibrary />} />
              <Route path="task" element={<Task />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="profile" element={<Profile />} />
              <Route path="plan" element={<Plan />} />
            </Route>
          </Routes>
        </SuspenseWithDelay>
      </BrowserRouter>
    </>
  );
}

export default App;
