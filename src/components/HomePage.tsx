import { useState } from 'react';
import { User, Heart, Activity, Droplets, Wind, Flower2, Moon, Stethoscope, NotebookPen, Music, MessageCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { HappyIcon, CalmIcon, NeutralIcon, AnxiousIcon, SadIcon, AngryIcon } from './MoodIcons';

export function HomePage({ onNavigate }) {
  const [moodSheetOpen, setMoodSheetOpen] = useState(false);
  const [symptomSheetOpen, setSymptomSheetOpen] = useState(false);
  const [journalSheetOpen, setJournalSheetOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');
  const [journalNote, setJournalNote] = useState('');
  const [symptoms, setSymptoms] = useState({
    hotFlashes: false,
    nightSweats: false,
    moodSwings: false,
    anxiety: false,
    fatigue: false,
    sleepIssues: false,
    jointPain: false,
    headaches: false,
  });

  const moods = [
    { icon: HappyIcon, label: 'Happy', value: 'happy', color: '#F9D3B4' },
    { icon: CalmIcon, label: 'Calm', value: 'calm', color: '#C8A2C8' },
    { icon: NeutralIcon, label: 'Neutral', value: 'neutral', color: '#F9D3B4' },
    { icon: AnxiousIcon, label: 'Anxious', value: 'anxious', color: '#F5D6D6' },
    { icon: SadIcon, label: 'Sad', value: 'sad', color: '#C8A2C8' },
    { icon: AngryIcon, label: 'Angry', value: 'angry', color: '#F5D6D6' },
  ];

  const handleMoodSave = () => {
    if (selectedMood) {
      toast.success('Mood logged successfully');
      setMoodSheetOpen(false);
      setSelectedMood('');
    }
  };

  const handleSymptomSave = () => {
    const selectedSymptoms = Object.entries(symptoms)
      .filter(([_, checked]) => checked)
      .map(([key, _]) => key);
    
    if (selectedSymptoms.length > 0) {
      toast.success(`${selectedSymptoms.length} symptom(s) logged`);
      setSymptomSheetOpen(false);
      setSymptoms({
        hotFlashes: false,
        nightSweats: false,
        moodSwings: false,
        anxiety: false,
        fatigue: false,
        sleepIssues: false,
        jointPain: false,
        headaches: false,
      });
    }
  };

  const handleJournalSave = () => {
    if (journalNote.trim()) {
      toast.success('Journal entry saved');
      setJournalSheetOpen(false);
      setJournalNote('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] pb-24">
      {/* Gentle Header */}
      <div className="px-5 pt-12 pb-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[#554B4B]/60 mb-1">Sunday, October 19</p>
            <h1 className="text-[#554B4B]">Good Morning, Sarah</h1>
          </div>
          <button 
            onClick={() => onNavigate('settings')}
            className="w-11 h-11 rounded-full bg-white/80 border border-[#C8A2C8]/40 flex items-center justify-center shadow-sm hover:shadow-md transition-all"
          >
            <User className="w-5 h-5 text-[#C8A2C8]" />
          </button>
        </div>
      </div>

      {/* Wellness Moments - Compact Stats */}
      <div className="px-5 mb-6">
        <p className="text-[#554B4B] mb-3 font-medium">Today's Wellness</p>
        <Card className="p-4 bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm">
          <div className="space-y-3">
            {/* Sleep */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C8A2C8]/30 flex items-center justify-center flex-shrink-0">
                <Moon className="w-5 h-5 text-[#C8A2C8]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1">
                  <p className="text-[#554B4B]/60">Sleep</p>
                  <p className="text-[#554B4B]">6.5 hrs</p>
                </div>
                <Progress value={75} className="h-1.5 bg-[#C8A2C8]/30" />
              </div>
            </div>

            {/* Hydration */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#99AFD7]/40 flex items-center justify-center flex-shrink-0">
                <Droplets className="w-5 h-5 text-[#99AFD7]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1">
                  <p className="text-[#554B4B]/60">Hydration</p>
                  <p className="text-[#554B4B]">5/8</p>
                </div>
                <Progress value={62} className="h-1.5 bg-[#99AFD7]/30" indicatorClassName="bg-[#99AFD7]" />
              </div>
            </div>

            {/* Mood */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F9D3B4]/40 flex items-center justify-center flex-shrink-0">
                <Flower2 className="w-5 h-5 text-[#F9D3B4]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1">
                  <p className="text-[#554B4B]/60">Mood</p>
                  <p className="text-[#554B4B]">Calm</p>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 flex-1 rounded-full ${i <= 4 ? 'bg-[#F9D3B4]' : 'bg-[#F9D3B4]/20'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Gentle Actions */}
      <div className="px-5 mb-6">
        <p className="text-[#554B4B] mb-3 font-medium">Quick Check-in</p>
        <div className="space-y-2.5">
          <Button 
            onClick={() => setMoodSheetOpen(true)}
            className="w-full bg-white/80 hover:bg-white border border-[#F9D3B4]/40 text-[#554B4B] rounded-2xl h-auto py-3.5 shadow-sm hover:shadow-md transition-all justify-start"
          >
            <span className="flex items-center gap-3 w-full">
              <HappyIcon className="w-5 h-5" color="#F9D3B4" />
              <span className="flex-1 text-left">How are you feeling?</span>
            </span>
          </Button>
          
          <Button 
            onClick={() => setSymptomSheetOpen(true)}
            className="w-full bg-white/80 hover:bg-white border border-[#C8A2C8]/40 text-[#554B4B] rounded-2xl h-auto py-3.5 shadow-sm hover:shadow-md transition-all justify-start"
          >
            <span className="flex items-center gap-3 w-full">
              <Stethoscope className="w-5 h-5 text-[#C8A2C8]" strokeWidth={1.5} />
              <span className="flex-1 text-left">Symptom log</span>
            </span>
          </Button>

          <Button 
            onClick={() => setJournalSheetOpen(true)}
            className="w-full bg-white/80 hover:bg-white border border-[#F5D6D6]/40 text-[#554B4B] rounded-2xl h-auto py-3.5 shadow-sm hover:shadow-md transition-all justify-start"
          >
            <span className="flex items-center gap-3 w-full">
              <NotebookPen className="w-5 h-5 text-[#F5D6D6]" strokeWidth={1.5} />
              <span className="flex-1 text-left">Add a journal note</span>
            </span>
          </Button>
        </div>
      </div>

      {/* This Week's Journey - Gentle Progress */}
      <div className="px-5 mb-6">
        <p className="text-[#554B4B] mb-3 font-medium">Your Week at a Glance</p>
        <Card className="p-4 bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm">
          <div className="space-y-4">
            {/* Mood Journey */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#554B4B]">Emotional Balance</span>
                <span className="text-[#C8A2C8]">Mostly Calm</span>
              </div>
              <div className="flex gap-1.5">
                {[
                  { mood: 'calm', color: '#C8A2C8' },
                  { mood: 'happy', color: '#C8A2C8' },
                  { mood: 'neutral', color: '#C8A2C8' },
                  { mood: 'anxious', color: '#C8A2C8' },
                  { mood: 'calm', color: '#C8A2C8' },
                  { mood: 'sad', color: '#C8A2C8' },
                  { mood: 'happy', color: '#C8A2C8' }
                ].map((day, i) => {
                  const MoodIcon = moods.find(m => m.value === day.mood)?.icon;
                  return (
                    <div 
                      key={i}
                      className="flex-1 h-10 rounded-lg bg-[#C8A2C8]/30 flex items-center justify-center border border-[#C8A2C8]/30 bg-[rgba(249,211,180,0.3)]"
                    >
                      {MoodIcon && <MoodIcon className="w-6 h-6" color={day.color} />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Symptom Pattern */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#554B4B]">Symptom Tracking</span>
                <span className="text-[#C8A2C8]">Manageable</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#554B4B]/60 w-24">Hot Flashes</span>
                  <div className="flex-1 bg-[#C8A2C8]/20 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#C8A2C8] h-full rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <span className="text-[#554B4B]/60">3d</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#554B4B]/60 w-24">Sleep Issues</span>
                  <div className="flex-1 bg-[#C8A2C8]/20 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#C8A2C8] h-full rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="text-[#554B4B]/60">2d</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Supportive Resources */}
      <div className="px-5 mb-6">
        <p className="text-[#554B4B] mb-3 font-medium">For You Today</p>
        <div className="grid grid-cols-2 gap-2.5">
          <Card className="p-3 bg-white/60 border border-white/80 shadow-sm text-center">
            <div className="flex justify-center mb-1">
              <Wind className="w-6 h-6 text-[#C8A2C8]" />
            </div>
            <p className="text-[#554B4B]">5-Min Breathing</p>
          </Card>
          <Card className="p-3 bg-white/60 border border-white/80 shadow-sm text-center">
            <div className="flex justify-center mb-1">
              <NotebookPen className="w-6 h-6 text-[#C8A2C8]" />
            </div>
            <p className="text-[#554B4B]">Journal Prompt</p>
          </Card>
          <Card className="p-3 bg-white/60 border border-white/80 shadow-sm text-center">
            <div className="flex justify-center mb-1">
              <Music className="w-6 h-6 text-[#C8A2C8]" />
            </div>
            <p className="text-[#554B4B]">Calming Music</p>
          </Card>
          <Card className="p-3 bg-white/60 border border-white/80 shadow-sm text-center">
            <div className="flex justify-center mb-1">
              <MessageCircle className="w-6 h-6 text-[#C8A2C8]" />
            </div>
            <p className="text-[#554B4B]">Ask AI</p>
          </Card>
        </div>
      </div>

      {/* Mood Check-in Sheet */}
      <Sheet open={moodSheetOpen} onOpenChange={setMoodSheetOpen}>
        <SheetContent side="bottom" className="bg-[#FDF8F5] border-t border-[#C8A2C8]/40 rounded-t-3xl">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-[#554B4B]">How are you feeling?</SheetTitle>
            <SheetDescription className="text-[#554B4B]/60">
              Select your current mood to track your emotional wellness
            </SheetDescription>
          </SheetHeader>
          
          <div className="grid grid-cols-3 gap-3 mb-6">
            {moods.map((mood) => {
              const IconComponent = mood.icon;
              return (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    selectedMood === mood.value
                      ? 'border-[#C8A2C8] bg-[#C8A2C8]/30 shadow-md'
                      : 'border-[#C8A2C8]/40 bg-white hover:bg-[#F9D3B4]/30'
                  }`}
                >
                  <IconComponent 
                    className="w-12 h-12 mx-auto mb-2" 
                    color={mood.color}
                  />
                  <p className="text-[#554B4B] text-center text-[18px] leading-tight break-words">{mood.label}</p>
                </button>
              );
            })}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setMoodSheetOpen(false)}
              variant="outline"
              className="flex-1 rounded-xl border-[#C8A2C8]/40"
            >
              Cancel
            </Button>
            <Button
              onClick={handleMoodSave}
              disabled={!selectedMood}
              className="flex-1 rounded-xl bg-[#C8A2C8] hover:bg-[#C8A2C8]/90 text-white"
            >
              Save Mood
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Symptom Log Sheet */}
      <Sheet open={symptomSheetOpen} onOpenChange={setSymptomSheetOpen}>
        <SheetContent side="bottom" className="bg-[#FDF8F5] border-t border-[#C8A2C8]/40 rounded-t-3xl max-h-[85vh] overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-[#554B4B]">Symptom Log</SheetTitle>
            <SheetDescription className="text-[#554B4B]/60">
              Track your symptoms to better understand your patterns
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-4 mb-6">
            {[
              { key: 'hotFlashes', label: 'Hot Flashes' },
              { key: 'nightSweats', label: 'Night Sweats' },
              { key: 'moodSwings', label: 'Mood Swings' },
              { key: 'anxiety', label: 'Anxiety' },
              { key: 'fatigue', label: 'Fatigue' },
              { key: 'sleepIssues', label: 'Sleep Issues' },
              { key: 'jointPain', label: 'Joint Pain' },
              { key: 'headaches', label: 'Headaches' },
            ].map((symptom) => (
              <div
                key={symptom.key}
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#C8A2C8]/30"
              >
                <Checkbox
                  id={symptom.key}
                  checked={symptoms[symptom.key]}
                  onCheckedChange={(checked) =>
                    setSymptoms((prev) => ({ ...prev, [symptom.key]: checked === true }))
                  }
                  className="border-[#C8A2C8] data-[state=checked]:bg-[#C8A2C8] data-[state=checked]:border-[#C8A2C8]"
                />
                <label
                  htmlFor={symptom.key}
                  className="flex items-center flex-1 cursor-pointer"
                >
                  <span className="text-[#554B4B]">{symptom.label}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="flex gap-3 sticky bottom-0 bg-[#FDF8F5] py-4">
            <Button
              onClick={() => setSymptomSheetOpen(false)}
              variant="outline"
              className="flex-1 rounded-xl border-[#C8A2C8]/40"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSymptomSave}
              disabled={!Object.values(symptoms).some(v => v)}
              className="flex-1 rounded-xl bg-[#C8A2C8] hover:bg-[#C8A2C8]/90 text-white"
            >
              Save Symptoms
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Journal Note Sheet */}
      <Sheet open={journalSheetOpen} onOpenChange={setJournalSheetOpen}>
        <SheetContent side="bottom" className="bg-[#FDF8F5] border-t border-[#C8A2C8]/40 rounded-t-3xl">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-[#554B4B]">Journal Note</SheetTitle>
            <SheetDescription className="text-[#554B4B]/60">
              Write down your thoughts, feelings, or anything on your mind
            </SheetDescription>
          </SheetHeader>
          
          <Textarea
            value={journalNote}
            onChange={(e) => setJournalNote(e.target.value)}
            placeholder="How are you feeling today? What's on your mind?"
            className="min-h-[180px] mb-6 rounded-2xl border-[#C8A2C8]/30 bg-white text-[#554B4B] placeholder:text-[#554B4B]/40 resize-none"
          />

          <div className="flex gap-3">
            <Button
              onClick={() => setJournalSheetOpen(false)}
              variant="outline"
              className="flex-1 rounded-xl border-[#C8A2C8]/40"
            >
              Cancel
            </Button>
            <Button
              onClick={handleJournalSave}
              disabled={!journalNote.trim()}
              className="flex-1 rounded-xl bg-[#F5D6D6] hover:bg-[#F5D6D6]/90 text-white"
            >
              Save Note
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
