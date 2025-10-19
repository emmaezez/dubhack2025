import { useState } from 'react';
import { Home, Calendar, Heart, BookOpen } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { TrackPage } from './components/TrackPage';
import { CarePage } from './components/CarePage';
import { LearnPage } from './components/LearnPage';
import { SettingsPage } from './components/SettingsPage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activePage, setActivePage] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'track', label: 'Track', icon: Calendar },
    { id: 'care', label: 'Care', icon: Heart },
    { id: 'learn', label: 'Learn', icon: BookOpen }
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage onNavigate={setActivePage} />;
      case 'track':
        return <TrackPage />;
      case 'care':
        return <CarePage />;
      case 'learn':
        return <LearnPage />;
      case 'settings':
        return <SettingsPage onNavigate={setActivePage} />;
      default:
        return <HomePage onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDF8F5] max-w-[393px] mx-auto">
      {/* Main Content */}
      <main className="relative">
        {renderPage()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[393px] mx-auto bg-white/90 backdrop-blur-lg border-t border-[#C8A2C8]/30 shadow-2xl">
        <div className="flex justify-around items-center px-2 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                  isActive 
                    ? 'text-[#C8A2C8]' 
                    : 'text-[#554B4B]/60 hover:text-[#C8A2C8]'
                }`}
              >
                <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform`}>
                  <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-[#C8A2C8]" />
                  )}
                </div>
                <span className={`text-xs ${isActive ? '' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
      
      <Toaster position="top-center" />
    </div>
  );
}
