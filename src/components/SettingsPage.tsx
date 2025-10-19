import { useState } from 'react';
import { ChevronRight, ChevronLeft, Moon, Sun, Lock, Download, Trash2, Bell, Users } from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Separator } from './ui/separator';

export function SettingsPage({ onNavigate }) {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState([16]);
  const [journalLock, setJournalLock] = useState(false);
  const [familyMode, setFamilyMode] = useState(false);
  const [aiTone, setAiTone] = useState('Nurse');
  const [notifications, setNotifications] = useState({
    hydration: true,
    symptomCheckin: true,
    customReminders: false
  });

  return (
    <div className="min-h-screen bg-[#FDF8F5] pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-[#554B4B]/60" />
          </button>
          <h1 className="text-[#554B4B]">Settings</h1>
        </div>
      </div>

      {/* Accessibility Section */}
      <div className="px-4 mb-6">
        <h2 className="text-[#554B4B] mb-3">Accessibility</h2>
        <Card className="p-5 bg-white/90 backdrop-blur-sm border-0 shadow-xl space-y-5">
          {/* Font Size */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[#554B4B]">Font Size</span>
              <span className="text-[#554B4B]/60">{fontSize[0]}px</span>
            </div>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              min={12}
              max={20}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-[#554B4B]/60">
              <span>Smaller</span>
              <span>Larger</span>
            </div>
          </div>

          <Separator className="bg-[#C8A2C8]/30" />

          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="w-5 h-5 text-[#C8A2C8]" />
              ) : (
                <Sun className="w-5 h-5 text-[#F9D3B4]" />
              )}
              <div>
                <div className="text-[#554B4B]">Dark Mode</div>
                <div className="text-[#554B4B]/60">Switch to dark theme</div>
              </div>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
        </Card>
      </div>

      {/* AI Tone Section */}
      <div className="px-4 mb-6">
        <h2 className="text-[#554B4B] mb-3">AI Companion</h2>
        <Card className="p-5 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <div className="mb-3 text-[#554B4B]">AI Tone</div>
          <div className="space-y-3">
            {['Coach', 'Nurse', 'Companion'].map((tone) => (
              <button
                key={tone}
                onClick={() => setAiTone(tone)}
                className={`w-full p-4 rounded-xl text-left transition-all shadow-md hover:shadow-lg ${
                  aiTone === tone
                    ? 'bg-[#C8A2C8] scale-105'
                    : 'bg-[#F9D3B4]/30 hover:bg-[#C8A2C8]/20'
                }`}
              >
                <div className="text-[#554B4B] mb-1">{tone}</div>
                <div className="text-[#554B4B]/60">
                  {tone === 'Coach' && 'Motivational and encouraging approach'}
                  {tone === 'Nurse' && 'Professional and caring medical guidance'}
                  {tone === 'Companion' && 'Warm and friendly conversational style'}
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Privacy Section */}
      <div className="px-4 mb-6">
        <h2 className="text-[#554B4B] mb-3">Privacy & Data</h2>
        <Card className="p-5 bg-white/90 backdrop-blur-sm border-0 shadow-xl space-y-4">
          {/* Journal Lock */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C8A2C8]/30 flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#C8A2C8]" />
              </div>
              <div>
                <div className="text-[#554B4B]">Lock Journal</div>
                <div className="text-[#554B4B]/60">Require PIN to access</div>
              </div>
            </div>
            <Switch
              checked={journalLock}
              onCheckedChange={setJournalLock}
            />
          </div>

          <Separator className="bg-[#C8A2C8]/30" />

          {/* Export Data */}
          <button className="w-full flex items-center justify-between rounded-xl hover:bg-[#F9D3B4]/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C8A2C8]/30 flex items-center justify-center">
                <Download className="w-5 h-5 text-[#C8A2C8]" />
              </div>
              <div className="text-left">
                <div className="text-[#554B4B]">Export Data</div>
                <div className="text-[#554B4B]/60">Download all your logs</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#554B4B]/60" />
          </button>

          <Separator className="bg-[#C8A2C8]/30" />

          {/* Delete Data */}
          <button className="w-full flex items-center justify-between rounded-xl hover:bg-[#FFE4E4]/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5D6D6]/40 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-[#DC3545]" />
              </div>
              <div className="text-left">
                <div className="text-[#DC3545]">Delete All Data</div>
                <div className="text-[#554B4B]/60">This cannot be undone</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#554B4B]/60" />
          </button>
        </Card>
      </div>

      {/* Notifications Section */}
      <div className="px-4 mb-6">
        <h2 className="text-[#554B4B] mb-3">Notifications</h2>
        <Card className="p-5 bg-white/90 backdrop-blur-sm border-0 shadow-xl space-y-4">
          {/* Hydration Reminders */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C8A2C8]/30 flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#C8A2C8]" />
              </div>
              <div>
                <div className="text-[#554B4B]">Hydration Reminders</div>
                <div className="text-[#554B4B]/60">Every 2 hours</div>
              </div>
            </div>
            <Switch
              checked={notifications.hydration}
              onCheckedChange={(checked) => 
                setNotifications({ ...notifications, hydration: checked })
              }
            />
          </div>

          <Separator className="bg-[#C8A2C8]/30" />

          {/* Symptom Check-ins */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C8A2C8]/30 flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#C8A2C8]" />
              </div>
              <div>
                <div className="text-[#554B4B]">Symptom Check-ins</div>
                <div className="text-[#554B4B]/60">Daily at 8:00 PM</div>
              </div>
            </div>
            <Switch
              checked={notifications.symptomCheckin}
              onCheckedChange={(checked) => 
                setNotifications({ ...notifications, symptomCheckin: checked })
              }
            />
          </div>

          <Separator className="bg-[#C8A2C8]/30" />

          {/* Custom Reminders */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F9D3B4] flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#F9D3B4]" />
              </div>
              <div>
                <div className="text-[#554B4B]">Custom Reminders</div>
                <div className="text-[#554B4B]/60">Medication, appointments</div>
              </div>
            </div>
            <Switch
              checked={notifications.customReminders}
              onCheckedChange={(checked) => 
                setNotifications({ ...notifications, customReminders: checked })
              }
            />
          </div>
        </Card>
      </div>

      {/* Family Mode Section */}
      <div className="px-4 mb-6">
        <h2 className="text-[#554B4B] mb-3">Family & Sharing</h2>
        <Card className="p-5 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#F5D6D6] flex items-center justify-center shadow-md">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-[#554B4B]">Family Mode</div>
                <div className="text-[#554B4B]/60">Share wellness summaries with loved ones</div>
              </div>
            </div>
            <Switch
              checked={familyMode}
              onCheckedChange={setFamilyMode}
            />
          </div>
        </Card>
      </div>

      {/* App Info */}
      <div className="px-4 mb-6">
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl text-center">
          <div className="text-xl mb-2">🌸</div>
          <div className="text-[#554B4B] mb-1">Bloom – Menopause</div>
          <div className="text-[#554B4B]/60">Version 1.0.0</div>
          <div className="text-[#554B4B]/60 mt-2">E-Nursing Home</div>
        </Card>
      </div>
    </div>
  );
}
