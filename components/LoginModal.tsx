// components/LoginModal.tsx
import React, { useState } from 'react';
import { XMarkIcon } from './icons/XMarkIcon';
import { EyeIcon } from './icons/EyeIcon';
import { EyeSlashIcon } from './icons/EyeSlashIcon';
import { User } from '../App';
import { login as apiLogin } from '../services/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onForgotPasswordClick: () => void;
  onLoginSuccess: (user: User) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
  onForgotPasswordClick,
  onLoginSuccess
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');

    try {
      setSubmitting(true);
      const res = await apiLogin({ email, password });
      if (res?.success) {
        const u = res?.data?.user;
        const userObj: User = {
          name: (u?.full_name || `${u?.first_name ?? ''} ${u?.last_name ?? ''}`).trim(),
          email: u?.email ?? email,
          company: undefined
        };
        onLoginSuccess(userObj);
        onClose();
      } else {
        setErrorMsg(res?.message || 'No se pudo iniciar sesión.');
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Error desconocido';
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w/full max-w-md transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold font-display text-brand-primary">Iniciar Sesión</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-sm">
              {errorMsg}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="email" type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary" />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                required
                className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-brand-secondary focus:border-brand-secondary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            <div className="text-right">
              <button type="button" onClick={onForgotPasswordClick} className="text-sm text-brand-secondary hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={`w-full bg-brand-secondary hover:bg-brand-primary text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {submitting ? 'Ingresando…' : 'Ingresar'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            ¿No tienes una cuenta?{' '}
            <button onClick={onSwitchToRegister} className="font-semibold text-brand-secondary hover:underline">
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
