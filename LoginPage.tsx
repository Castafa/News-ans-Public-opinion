
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Role, User } from '../types';

export default function LoginPage() {
  const [loginStep, setLoginStep] = useState<'credentials' | 'phone'>('credentials');
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleCredentialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await auth.verifyCredentials(email, password);
      if (user) {
        if (user.role === Role.ADMIN) {
          setPendingUser(user);
          setLoginStep('phone');
        } else if (user.role === Role.USER) {
          auth.completeLogin(user);
          navigate(from, { replace: true });
        } else {
           // Fallback for other roles if any
          auth.completeLogin(user);
          navigate(from, { replace: true });
        }
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (pendingUser && pendingUser.phoneNumber === phoneNumber) {
        auth.completeLogin(pendingUser);
        navigate('/admin');
    } else {
        setError('Invalid phone number.');
    }
    setIsLoading(false);
  };
  
  const handleBack = () => {
      setLoginStep('credentials');
      setPendingUser(null);
      setError('');
      setPhoneNumber('');
  }

  const renderCredentialForm = () => (
    <form onSubmit={handleCredentialSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-800 bg-opacity-70 text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-accent transition"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-800 bg-opacity-70 text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-accent transition"
          placeholder="••••••••"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-brand-lightblue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Verifying...' : 'Sign in'}
        </button>
      </div>
    </form>
  );

  const renderPhoneForm = () => (
     <form onSubmit={handlePhoneSubmit} className="space-y-6">
        <div>
            <p className="text-center text-gray-300 mb-4">For security, please verify your phone number.</p>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
            <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full bg-gray-800 bg-opacity-70 text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-accent transition"
            placeholder="1234567890"
            />
        </div>
        <div>
            <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-brand-lightblue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
            >
            {isLoading ? 'Verifying...' : 'Verify'}
            </button>
        </div>
         <div>
            <button
            type="button"
            onClick={handleBack}
            className="w-full flex justify-center py-3 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-transparent hover:bg-gray-700/50 focus:outline-none transition-colors"
            >
            Back
            </button>
        </div>
    </form>
  )

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 bg-opacity-50 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-8">
          <h2 className="text-4xl font-bold text-center text-white mb-6">
            {loginStep === 'credentials' ? 'Login' : 'Admin Verification'}
          </h2>
          
          {error && <p className="bg-red-500/30 text-red-300 p-3 rounded-md mb-4 text-center">{error}</p>}
          
          {loginStep === 'credentials' ? renderCredentialForm() : renderPhoneForm()}
          
        </div>
      </div>
    </div>
  );
}