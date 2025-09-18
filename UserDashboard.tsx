import React, { useState, ReactNode } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserIcon, PostIcon, BellIcon } from '../components/Icons';
import { ARTICLES } from '../constants';

const navItems = [
  { path: '/user/profile', label: 'Profile', icon: <UserIcon /> },
  { path: '/user/posts', label: 'My Posts', icon: <PostIcon /> },
  { path: '/user/notifications', label: 'Notifications', icon: <BellIcon /> },
];

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const location = useLocation();
    
    return (
        <div className="flex min-h-screen pt-20">
            <aside className="w-64 bg-gray-900 bg-opacity-50 backdrop-blur-xl border-r border-gray-800 p-6 hidden md:block">
                <nav className="space-y-4">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                location.pathname.startsWith(item.path)
                                    ? 'bg-brand-blue text-white shadow-lg'
                                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                            }`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
            <main className="flex-1 p-6 md:p-10">
                {children}
            </main>
        </div>
    );
};

const Card: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-gray-900 bg-opacity-50 backdrop-blur-lg border border-gray-700 rounded-xl shadow-2xl p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

const UserProfile = () => {
    const { user } = useAuth();
    if (!user) return null;
    return (
        <Card>
            <h2 className="text-3xl font-bold text-white mb-6">My Profile</h2>
            <div className="flex items-center space-x-6">
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-brand-accent"/>
                <div>
                    <h3 className="text-2xl font-semibold text-white">{user.name}</h3>
                    <p className="text-gray-400">{user.email}</p>
                </div>
            </div>
             <form className="mt-8 space-y-4">
                 <input type="text" defaultValue={user.name} className="w-full bg-gray-800/70 p-3 rounded-md border border-gray-600" />
                 <input type="email" defaultValue={user.email} className="w-full bg-gray-800/70 p-3 rounded-md border border-gray-600" />
                 <input type="password" placeholder="New Password" className="w-full bg-gray-800/70 p-3 rounded-md border border-gray-600" />
                 <button className="px-6 py-2 bg-brand-blue hover:bg-brand-lightblue rounded-md text-white font-semibold">Save Changes</button>
             </form>
        </Card>
    );
};

const UserPosts = () => {
    const { user } = useAuth();
    const myArticles = ARTICLES.filter(a => a.authorId === user?.id);

    return (
        <Card>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">My Posts</h2>
                <button className="px-5 py-2 bg-brand-blue hover:bg-brand-lightblue rounded-md text-white font-semibold">New Post</button>
            </div>
            <div className="space-y-4">
                {myArticles.length > 0 ? myArticles.map(article => (
                    <div key={article.id} className="bg-gray-800/60 p-4 rounded-lg flex justify-between items-center">
                        <div>
                           <h3 className="text-xl font-semibold text-white">{article.title}</h3>
                           <span className={`text-sm px-2 py-0.5 rounded-full ${article.status === 'APPROVED' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{article.status}</span>
                        </div>
                        <div className="space-x-2">
                            <button className="text-brand-accent hover:text-white">Edit</button>
                            <button 
                                className="text-red-400 hover:text-red-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                                disabled={article.status === 'APPROVED'}
                                title={article.status === 'APPROVED' ? "Cannot delete an approved article." : "Delete article"}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )) : <p className="text-gray-400">You haven't submitted any posts yet.</p>}
            </div>
        </Card>
    );
};

const UserNotifications = () => {
    return (
        <Card>
            <h2 className="text-3xl font-bold text-white mb-6">Notifications</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/60 p-4 rounded-lg">
                <p className="text-white"><span className="font-bold">Admin</span> approved your post: "Exploring the Deep Sea".</p>
                <p className="text-xs text-gray-400 mt-1">2 days ago</p>
              </div>
               <div className="bg-gray-800/60 p-4 rounded-lg">
                <p className="text-white">Welcome to the platform!</p>
                <p className="text-xs text-gray-400 mt-1">5 days ago</p>
              </div>
            </div>
        </Card>
    );
};


export default function UserDashboard() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <DashboardLayout>
       <Routes>
            <Route index element={
                 <div className="text-white">
                     <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}!</h1>
                     <p className="text-lg text-gray-300">Here's your personal dashboard.</p>
                 </div>
            } />
            <Route path="profile" element={<UserProfile />} />
            <Route path="posts" element={<UserPosts />} />
            <Route path="notifications" element={<UserNotifications />} />
        </Routes>
    </DashboardLayout>
  );
}