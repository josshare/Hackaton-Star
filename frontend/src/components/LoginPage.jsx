import React, { useState } from 'react';
import { Droplets, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button'; // Adjusted path
import { Input } from '../ui/input';   // Adjusted path

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => { // Removed type annotation
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onLogin();
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel - Hero */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-sidebar relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-accent blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-primary blur-2xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-accent/20 rounded-xl">
              <Droplets className="w-8 h-8 text-accent" />
            </div>
            <span className="text-2xl font-bold text-sidebar-foreground">AquaPredict</span>
          </div>
          
          <h1 className="text-4xl xl:text-5xl font-bold text-sidebar-foreground leading-tight mb-6">
            Anticipa el estrés hídrico.
            <br />
            <span className="text-accent">Conecta con leads.</span>
          </h1>
          
          <p className="text-lg text-sidebar-foreground/70 max-w-md leading-relaxed">
            Plataforma de análisis predictivo para proveedores de captadores pluviales. 
            Accede a datos de 3 a 9 meses futuros y encuentra oportunidades de mercado.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            <div>
              <div className="text-3xl font-bold text-accent">500+</div>
              <div className="text-sm text-sidebar-foreground/60">Códigos postales</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">9</div>
              <div className="text-sm text-sidebar-foreground/60">Meses de predicción</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">98%</div>
              <div className="text-sm text-sidebar-foreground/60">Precisión</div>
            </div>
          </div>
        </div>

        {/* Water drops decoration */}
        <div className="absolute bottom-0 right-0 opacity-20">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
            <circle cx="300" cy="300" r="150" stroke="currentColor" strokeWidth="1" className="text-accent" />
            <circle cx="300" cy="300" r="100" stroke="currentColor" strokeWidth="1" className="text-accent" />
            <circle cx="300" cy="300" r="50" stroke="currentColor" strokeWidth="1" className="text-accent" />
          </svg>
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="p-2 bg-accent/10 rounded-xl">
              <Droplets className="w-6 h-6 text-accent" />
            </div>
            <span className="text-xl font-bold">AquaPredict</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Bienvenido</h2>
            <p className="text-muted-foreground">Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="tu@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-input" />
                <span className="text-muted-foreground">Recordarme</span>
              </label>
              <a href="#" className="text-primary hover:underline">¿Olvidaste tu contraseña?</a>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Iniciar sesión
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t text-center">
            <p className="text-sm text-muted-foreground">
              ¿No tienes una cuenta?{' '}
              <a href="#" className="text-primary font-medium hover:underline">
                Solicita acceso
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;