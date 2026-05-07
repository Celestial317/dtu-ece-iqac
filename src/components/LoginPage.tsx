import React, { useState } from 'react';
import { LogIn, User, Lock, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { PERIOD_OPTIONS, type PeriodOption } from '../schema';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const FACULTY_CREDENTIALS = {
  id: 'dtu@ece',
  password: '12345'
};

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [userType, setUserType] = useState<'student' | 'faculty' | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodOption | ''>('');
  const [studentName, setStudentName] = useState('');
  const [studentRoll, setStudentRoll] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [facultyPassword, setFacultyPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!studentName.trim() || !studentRoll.trim() || !studentPhone.trim()) {
      setError('All fields are required');
      return;
    }
    if (!selectedPeriod) {
      setError('Please select a period');
      return;
    }

    login(
      {
        type: 'student',
        name: studentName,
        rollNumber: studentRoll,
        phoneNumber: studentPhone
      },
      'student',
      selectedPeriod
    );
    onLoginSuccess();
  };

  const handleFacultyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (facultyId !== FACULTY_CREDENTIALS.id || facultyPassword !== FACULTY_CREDENTIALS.password) {
      setError('Invalid ID or password');
      return;
    }
    if (!selectedPeriod) {
      setError('Please select a period');
      return;
    }

    login({ type: 'faculty' }, 'faculty', selectedPeriod);
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-mint-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-mint-600 p-3 rounded-2xl mb-4">
            <LogIn size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">
            IQAC Bi-Monthly Data Portal by DTU ECE
          </h1>
          <p className="text-slate-500 font-semibold">Select your role to continue</p>
        </div>

        {/* Role Selection */}
        {!userType ? (
          <div className="space-y-4">
            <button
              onClick={() => setUserType('student')}
              className="w-full bg-white border-2 border-mint-300 rounded-2xl p-6 text-center hover:border-mint-600 hover:shadow-lg transition-all group"
            >
              <User size={32} className="mx-auto mb-3 text-mint-600 group-hover:text-mint-700" />
              <h3 className="font-black text-lg text-slate-900 uppercase tracking-wider">Student</h3>
              <p className="text-sm text-slate-500 mt-2">No password required</p>
            </button>

            <button
              onClick={() => setUserType('faculty')}
              className="w-full bg-white border-2 border-slate-300 rounded-2xl p-6 text-center hover:border-slate-600 hover:shadow-lg transition-all group"
            >
              <Lock size={32} className="mx-auto mb-3 text-slate-600 group-hover:text-slate-700" />
              <h3 className="font-black text-lg text-slate-900 uppercase tracking-wider">Faculty</h3>
              <p className="text-sm text-slate-500 mt-2">ID & password required</p>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-mint-100">
            <div className="relative mb-6">
              <label className="block text-sm sm:text-base font-black text-slate-800 uppercase tracking-[0.08em] mb-2 ml-0.5">
                Reporting Period
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 text-slate-400" size={16} />
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value as PeriodOption)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-4 focus:ring-mint-500/10 focus:border-mint-500 outline-none text-slate-900 font-bold"
                  aria-label="Select reporting period"
                >
                  <option value="" disabled>Select a period...</option>
                  {PERIOD_OPTIONS.map((period) => (
                    <option key={period} value={period}>
                      {period}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                setUserType(null);
                setError('');
                setStudentName('');
                setStudentRoll('');
                setStudentPhone('');
                setFacultyId('');
                setFacultyPassword('');
                setSelectedPeriod('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Go back to role selection"
            >
              ← Back to role selection
            </button>

            {userType === 'student' ? (
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <h2 className="font-black text-xl text-slate-900 uppercase tracking-wide mb-6">
                  Student Login
                </h2>

                <div>
                  <label className="block text-sm font-black text-slate-800 uppercase tracking-widest mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:border-mint-500 focus:ring-4 focus:ring-mint-500/10 outline-none text-slate-900 font-semibold"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-800 uppercase tracking-widest mb-2">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    value={studentRoll}
                    onChange={(e) => setStudentRoll(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:border-mint-500 focus:ring-4 focus:ring-mint-500/10 outline-none text-slate-900 font-semibold"
                    placeholder="Enter your roll number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-800 uppercase tracking-widest mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:border-mint-500 focus:ring-4 focus:ring-mint-500/10 outline-none text-slate-900 font-semibold"
                    placeholder="Enter your phone number"
                  />
                </div>

                {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-bold">{error}</div>}

                <button
                  type="submit"
                  className="w-full bg-mint-600 text-white py-3 rounded-xl font-black uppercase tracking-wider hover:bg-mint-700 transition-all shadow-lg mt-6"
                >
                  Enter Portal
                </button>
              </form>
            ) : (
              <form onSubmit={handleFacultyLogin} className="space-y-4">
                <h2 className="font-black text-xl text-slate-900 uppercase tracking-wide mb-6">
                  Faculty Login
                </h2>

                <div>
                  <label className="block text-sm font-black text-slate-800 uppercase tracking-widest mb-2">
                    Faculty ID
                  </label>
                  <input
                    type="text"
                    value={facultyId}
                    onChange={(e) => setFacultyId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:border-mint-500 focus:ring-4 focus:ring-mint-500/10 outline-none text-slate-900 font-semibold"
                    placeholder="Enter your faculty ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-800 uppercase tracking-widest mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={facultyPassword}
                    onChange={(e) => setFacultyPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:border-mint-500 focus:ring-4 focus:ring-mint-500/10 outline-none text-slate-900 font-semibold"
                    placeholder="Enter your password"
                  />
                </div>

                {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-bold">{error}</div>}

                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white py-3 rounded-xl font-black uppercase tracking-wider hover:bg-slate-800 transition-all shadow-lg mt-6"
                >
                  Login
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
