import React, { useState } from 'react';
import { Routes, Route, Link, Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useSettings } from './contexts/SettingsContext';
import { Role } from './types';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import { ARTICLES } from './constants';
import { Article } from './types';
import { HomeIcon, NewsIcon, InfoIcon, ContactIcon, Logo, MenuIcon, LogoutIcon, DashboardIcon, UserIcon } from './components/Icons';

// --- Placeholder Pages ---

const HomePage = () => {
  const { settings } = useSettings();
  return (
    <div className="text-center p-8 pt-24">
      <h1 className="text-5xl font-extrabold text-white mb-4">Welcome to {settings.siteTitle}</h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        Your source for community-driven articles and discussions. Explore diverse perspectives on today's most important topics.
      </p>
    </div>
  );
};

const NewsPage = () => (
  <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-24">
    <h1 className="text-4xl font-bold text-white mb-8">Latest Articles</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {ARTICLES.filter(a => a.status === 'APPROVED').map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  </div>
);

const ArticleCard = ({ article }: { article: Article }) => {
    const { user, isAdmin } = useAuth();
    const canEdit = isAdmin || user?.id === article.authorId;

    return (
      <div className="bg-gray-900 bg-opacity-50 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
        <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
          <p className="text-gray-400 text-sm mb-4">By {article.authorName} on {new Date(article.createdAt).toLocaleDateString()}</p>
          <p className="text-gray-300 line-clamp-3 flex-grow">{article.content}</p>
          <div className="mt-4 flex justify-between items-center">
             <Link to={`/articles/${article.id}`} className="text-brand-accent hover:text-brand-lightblue font-semibold">Read more &rarr;</Link>
             {canEdit && (
                <Link to={isAdmin ? `/admin/content` : `/user/posts`} className="text-sm text-gray-400 hover:text-white px-3 py-1 rounded-md bg-gray-700/50 hover:bg-gray-700 transition-colors">
                    Edit
                </Link>
             )}
          </div>
        </div>
      </div>
    );
};


const AboutPage = () => (
  <div className="max-w-4xl mx-auto p-8 pt-24 text-white">
    <h1 className="text-4xl font-bold mb-4">About Us</h1>
    <p className="text-lg text-gray-300">We are a platform dedicated to fostering open discussion and sharing diverse viewpoints on a wide range of topics. Our mission is to empower individuals to share their stories and perspectives.</p>
  </div>
);

const ContactPage = () => (
  <div className="max-w-4xl mx-auto p-8 pt-24 text-white">
    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
    <p className="text-lg text-gray-300">Have a question or feedback? We'd love to hear from you. Reach out to us at contact@npo.com.</p>
  </div>
);

// --- Layout Components ---

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'News', path: '/news', icon: <NewsIcon /> },
    { label: 'About', path: '/about', icon: <InfoIcon /> },
    { label: 'Contact', path: '/contact', icon: <ContactIcon /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-70 backdrop-blur-xl border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
               {settings.siteLogo ? (
                <img src={settings.siteLogo} alt="Site Logo" className="h-8 w-auto" />
              ) : (
                <Logo />
              )}
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map(link => (
                  <Link key={link.path} to={link.path} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2">
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <>
                  <span className="text-white mr-4">Welcome, {user?.name}!</span>
                  {user?.role === Role.ADMIN && (
                    <Link to="/admin" className="p-2 text-gray-300 hover:text-white"><DashboardIcon/></Link>
                  )}
                  {user?.role === Role.USER && (
                    <Link to="/user" className="p-2 text-gray-300 hover:text-white"><UserIcon /></Link>
                  )}
                  <button onClick={handleLogout} className="p-2 text-gray-300 hover:text-white"><LogoutIcon /></button>
                </>
              ) : (
                <Link to="/login" className="text-white bg-brand-blue hover:bg-brand-lightblue px-4 py-2 rounded-md text-sm font-semibold">
                  Login
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {navLinks.map(link => (
                <Link key={link.path} to={link.path} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2">
                    {link.icon}
                    <span>{link.label}</span>
                </Link>
             ))}
          </div>
           <div className="pt-4 pb-3 border-t border-gray-700">
            {isAuthenticated ? (
                <div className="px-5 flex items-center">
                    <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={user?.avatar} alt="" />
                    </div>
                    <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">{user?.name}</div>
                        <div className="text-sm font-medium leading-none text-gray-400">{user?.email}</div>
                    </div>
                </div>
            ) : (
                 <div className="px-2 space-y-1">
                    <Link to="/login" className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-brand-blue hover:bg-brand-lightblue">Login</Link>
                </div>
            )}
           </div>
        </div>
      )}
    </header>
  );
};

const Layout = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
       <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://picsum.photos/seed/space/1920/1080')", zIndex: -2}}></div>
       <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60" style={{zIndex: -1}}></div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};


// --- Auth & Routing ---

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    // Redirect to a more appropriate page, e.g., home or an 'unauthorized' page.
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};


// --- Main App Component ---

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute allowedRoles={[Role.ADMIN]} />}>
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[Role.USER]} />}>
        <Route path="/user/*" element={<UserDashboard />} />
      </Route>

       {/* Fallback route */}
       <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}