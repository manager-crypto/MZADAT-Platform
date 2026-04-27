import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';

const API = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8080';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'بيانات الدخول غير صحيحة');
        return;
      }
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_role', data.role);
      localStorage.setItem('admin_name', data.full_name);
      localStorage.setItem('admin_email', data.email);
      navigate('/admin');
    } catch {
      setError('تعذّر الاتصال بالخادم، تأكد من تشغيل الـ Backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white">
            <span className="text-[#47CCD0]">مزادات</span> أدمن
          </h1>
          <p className="text-gray-400 mt-2 text-sm">لوحة تحكم المشرفين</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#161b22] border border-gray-800 rounded-2xl p-8 shadow-2xl"
        >
          <h2 className="text-xl font-bold text-white mb-8 text-center">تسجيل الدخول</h2>

          {error && (
            <div className="flex items-center gap-2 bg-red-900/30 border border-red-700 text-red-400 rounded-xl p-4 mb-6 text-sm">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-300 block text-start">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail size={16} className="absolute top-1/2 start-3 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="admin@mzadat.com"
                  className="w-full h-12 bg-[#0d1117] border border-gray-700 rounded-xl ps-10 pe-4 text-white text-start placeholder:text-gray-600 focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-300 block text-start">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock size={16} className="absolute top-1/2 start-3 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full h-12 bg-[#0d1117] border border-gray-700 rounded-xl ps-10 pe-10 text-white text-start placeholder:text-gray-600 focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute top-1/2 end-3 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 mt-8 bg-[#47CCD0] hover:bg-[#35a4a9] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'دخول'
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">
          نظام محمي · الوصول مقيد بالمشرفين المعتمدين فقط
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
