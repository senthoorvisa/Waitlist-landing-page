import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/router';

type WaitlistEntry = {
  id: number;
  name: string;
  email: string;
  user_type: string;
  agreed_to_terms: boolean;
  created_at: string;
};

export default function Admin() {
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Simple password protection (not secure - just for demo)
  const adminPassword = 'dimension12admin';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('isAdmin', 'true');
    } else {
      setError('Invalid password');
    }
  };

  useEffect(() => {
    // Check if already authenticated
    if (localStorage.getItem('isAdmin') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWaitlistEntries();
    }
  }, [isAuthenticated]);

  const fetchWaitlistEntries = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setWaitlistEntries(data || []);
    } catch (error) {
      console.error('Error fetching waitlist entries:', error);
      setError('Failed to fetch waitlist entries');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
  };

  const getUserTypeColor = (userType: string) => {
    switch (userType.toLowerCase()) {
      case 'developer':
        return 'bg-primary/20 text-primary';
      case 'business':
        return 'bg-secondary/20 text-secondary';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-dark/50 backdrop-blur-md p-8 rounded-xl border border-gray-800">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Admin Access
            </h2>
            <p className="mt-2 text-center text-sm text-gray-300">
              Enter the admin password to access waitlist entries
            </p>
          </div>
          
          {error && (
            <div className="bg-red-500/20 text-red-500 p-3 rounded-md">
              {error}
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 bg-dark/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full btn"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Waitlist Entries
          </h1>
          
          <div className="flex gap-4">
            <button
              onClick={fetchWaitlistEntries}
              className="btn bg-primary/80 hover:bg-primary"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
            
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-dark border border-gray-700 hover:border-red-500 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-500/20 text-red-500 p-4 rounded-md mb-8">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : waitlistEntries.length === 0 ? (
          <div className="text-center py-20 bg-dark/40 backdrop-blur-md rounded-xl border border-gray-800">
            <p className="text-xl text-gray-300">No waitlist entries yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-dark/60">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    User Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {waitlistEntries.map((entry) => (
                  <tr key={entry.id} className="bg-dark/40 hover:bg-dark/60 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {entry.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {entry.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getUserTypeColor(entry.user_type)}`}>
                        {entry.user_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(entry.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 