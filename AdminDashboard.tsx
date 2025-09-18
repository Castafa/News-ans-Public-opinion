import React, { ReactNode, useState, useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DashboardIcon, UserManagementIcon, ContentIcon, AnalyticsIcon, SettingsIcon, PaintBrushIcon, Logo } from '../components/Icons';
import { useSettings } from '../contexts/SettingsContext';
import { useAuth } from '../contexts/AuthContext';
import { USERS, ARTICLES } from '../constants';
import { User, Article } from '../types';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/admin/users', label: 'User Management', icon: <UserManagementIcon /> },
  { path: '/admin/content', label: 'Content', icon: <ContentIcon /> },
  { path: '/admin/analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
  { path: '/admin/appearance', label: 'Appearance', icon: <PaintBrushIcon /> },
  { path: '/admin/settings', label: 'Settings', icon: <SettingsIcon /> },
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

const AdminHome = () => (
  <div>
    <h1 className="text-4xl font-bold text-white mb-6">Admin Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <h3 className="text-lg text-gray-400">Total Users</h3>
        <p className="text-4xl font-bold text-white">{USERS.length}</p>
      </Card>
      <Card>
        <h3 className="text-lg text-gray-400">Total Articles</h3>
        <p className="text-4xl font-bold text-white">{ARTICLES.length}</p>
      </Card>
      <Card>
        <h3 className="text-lg text-gray-400">Pending Approval</h3>
        <p className="text-4xl font-bold text-white">{ARTICLES.filter(a => a.status === 'PENDING').length}</p>
      </Card>
      <Card>
        <h3 className="text-lg text-gray-400">Site Visits (24h)</h3>
        <p className="text-4xl font-bold text-white">1,234</p>
      </Card>
    </div>
  </div>
);

const UserManagement = () => {
    const { user: currentUser } = useAuth();
    return (
        <Card>
            <h2 className="text-3xl font-bold text-white mb-6">User Management</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Role</th><th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {USERS.map((user: User) => (
                            <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                <td className="p-4 flex items-center space-x-3"><img src={user.avatar} className="w-10 h-10 rounded-full" alt={user.name}/><span>{user.name}</span></td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs ${user.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}`}>{user.role}</span></td>
                                <td className="p-4 space-x-2">
                                    <button 
                                        className="text-brand-accent hover:text-white disabled:text-gray-500 disabled:cursor-not-allowed"
                                        disabled={user.id === currentUser?.id}
                                        title={user.id === currentUser?.id ? "Cannot edit your own account here." : "Edit user"}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="text-red-400 hover:text-red-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                                        disabled={user.id === currentUser?.id}
                                        title={user.id === currentUser?.id ? "Cannot delete yourself." : "Delete user"}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

const ContentManagement = () => (
    <Card>
        <h2 className="text-3xl font-bold text-white mb-6">Content Management</h2>
        <div className="space-y-4">
            {ARTICLES.map((article: Article) => (
                <div key={article.id} className="bg-gray-800/60 p-4 rounded-lg flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-white">{article.title}</h3>
                        <p className="text-sm text-gray-400">by {article.authorName}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                       <span className={`text-sm px-2 py-0.5 rounded-full ${article.status === 'APPROVED' ? 'bg-green-500/20 text-green-300' : article.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'}`}>{article.status}</span>
                        {article.status === 'PENDING' && <button className="text-green-400">Approve</button>}
                        <button className="text-brand-accent">Edit</button>
                        <button className="text-red-400">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    </Card>
);

const analyticsData = [
  { name: 'Mon', users: 400, posts: 24 },
  { name: 'Tue', users: 300, posts: 13 },
  { name: 'Wed', users: 200, posts: 98 },
  { name: 'Thu', users: 278, posts: 39 },
  { name: 'Fri', users: 189, posts: 48 },
  { name: 'Sat', users: 239, posts: 38 },
  { name: 'Sun', users: 349, posts: 43 },
];

const ReportsAnalytics = () => (
    <div>
        <h2 className="text-3xl font-bold text-white mb-6">Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <h3 className="text-xl font-bold text-white mb-4">New Users This Week</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                        <XAxis dataKey="name" stroke="#A0AEC0" />
                        <YAxis stroke="#A0AEC0" />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: '1px solid #4A5568' }} />
                        <Legend />
                        <Bar dataKey="users" fill="#42A5F5" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
            <Card>
                <h3 className="text-xl font-bold text-white mb-4">Posts This Week</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                        <XAxis dataKey="name" stroke="#A0AEC0" />
                        <YAxis stroke="#A0AEC0" />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: '1px solid #4A5568' }} />
                        <Legend />
                        <Line type="monotone" dataKey="posts" stroke="#0D47A1" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        </div>
    </div>
);

const AppearanceSettings = () => {
    const { settings, updateSettings } = useSettings();
    const [title, setTitle] = useState(settings.siteTitle);
    const [logoPreview, setLogoPreview] = useState<string | null>(settings.siteLogo);
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSettings({ siteTitle: title, siteLogo: logoPreview });
        alert('Settings saved!');
    };

    return (
        <Card>
            <h2 className="text-3xl font-bold text-white mb-6">Appearance</h2>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                <div>
                  <label className="text-gray-300 block mb-2">Site Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-2 bg-gray-800/70 p-3 rounded-md border border-gray-600"/>
                </div>
                 <div>
                  <label className="text-gray-300 block mb-2">Site Logo</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 h-16 bg-gray-800/70 rounded-md flex items-center justify-center border border-gray-600 overflow-hidden">
                      {logoPreview ? <img src={logoPreview} alt="Logo preview" className="object-contain max-w-full max-h-full"/> : <Logo />}
                    </div>
                    <label htmlFor="logo-upload" className="cursor-pointer px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-semibold transition-colors">
                        Upload New Logo
                    </label>
                    <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </div>
                </div>
                <button type="submit" className="px-6 py-2 bg-brand-blue hover:bg-brand-lightblue rounded-md text-white font-semibold">Save Settings</button>
            </form>
        </Card>
    );
};


const Settings = () => (
    <Card>
        <h2 className="text-3xl font-bold text-white mb-6">Settings</h2>
        <form className="space-y-6 max-w-lg">
            <div>
              <label className="text-gray-300">Site Name</label>
              <input type="text" defaultValue="News and Public Opinion" className="w-full mt-2 bg-gray-800/70 p-3 rounded-md border border-gray-600"/>
            </div>
             <div>
              <label className="text-gray-300">Allow User Registration</label>
              <div className="mt-2"><input type="checkbox" defaultChecked className="h-5 w-5 rounded text-brand-blue focus:ring-brand-blue"/></div>
            </div>
            <button className="px-6 py-2 bg-brand-blue hover:bg-brand-lightblue rounded-md text-white font-semibold">Save Settings</button>
        </form>
    </Card>
);

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="dashboard" element={<AdminHome />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="content" element={<ContentManagement />} />
        <Route path="analytics" element={<ReportsAnalytics />} />
        <Route path="appearance" element={<AppearanceSettings />} />
        <Route path="settings" element={<Settings />} />
        <Route index element={<AdminHome />} />
      </Routes>
    </DashboardLayout>
  );
}