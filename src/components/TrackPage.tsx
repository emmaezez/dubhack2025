import { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, Lock, Mic, Hash, Calendar, Filter, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';
import { HappyIcon, CalmIcon, NeutralIcon, AnxiousIcon, SadIcon, AngryIcon } from './MoodIcons';

export function TrackPage() {
  const [currentMonth, setCurrentMonth] = useState('October 2025');
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayDetailOpen, setDayDetailOpen] = useState(false);
  const [addEntryOpen, setAddEntryOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Mood Tracker State
  const [selectedMood, setSelectedMood] = useState('');
  const [moodJournal, setMoodJournal] = useState('');

  // Symptom Tracker State
  const [symptoms, setSymptoms] = useState({
    hotFlashes: { severity: 0, notes: '' },
    insomnia: { severity: 0, notes: '' },
    moodSwings: { severity: 0, notes: '' },
    fatigue: { severity: 0, notes: '' },
    nightSweats: { severity: 0, notes: '' },
    anxiety: { severity: 0, notes: '' },
  });

  // Period Tracker State
  const [isPeriodDay, setIsPeriodDay] = useState(false);

  // Sexual Activity Tracker State
  const [sexualActivity, setSexualActivity] = useState(null);

  // Voice Journal State
  const [isRecording, setIsRecording] = useState(false);
  const [voiceEmotion, setVoiceEmotion] = useState('');
  const [voiceSummary, setVoiceSummary] = useState('');

  // Free-text Journal State
  const [journalText, setJournalText] = useState('');
  const [journalTags, setJournalTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  // Mock data for calendar
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDay = 3; // October 1st is on Wednesday (3)

  const moodData = {
    5: 'calm',
    6: 'happy',
    8: 'angry',
    12: 'calm',
    13: 'calm',
    15: 'happy',
    19: 'calm'
  };

  const symptomData = {
    5: 2,
    8: 3,
    12: 1,
    13: 2,
    19: 1
  };

  const periodData = [5, 6, 7, 8, 9];

  const sexualActivityData = {
    5: 'yes',
    8: 'no',
    13: 'yes',
    19: 'yes'
  };

  const notesData = {
    5: 'Felt really good today, energy levels were high.',
    8: 'Had some trouble sleeping last night.',
    13: 'Great day overall!',
    19: 'Practiced meditation in the morning, felt calm.'
  };

  const moods = [
    { icon: HappyIcon, label: 'Happy', value: 'happy', color: '#F9D3B4' },
    { icon: CalmIcon, label: 'Calm', value: 'calm', color: '#C8A2C8' },
    { icon: NeutralIcon, label: 'Neutral', value: 'neutral', color: '#F9D3B4' },
    { icon: AnxiousIcon, label: 'Anxious', value: 'anxious', color: '#F5D6D6' },
    { icon: SadIcon, label: 'Sad', value: 'sad', color: '#C8A2C8' },
    { icon: AngryIcon, label: 'Angry', value: 'angry', color: '#F5D6D6' },
  ];

  const symptomsList = [
    { id: 'hotFlashes', label: 'Hot Flashes' },
    { id: 'insomnia', label: 'Insomnia' },
    { id: 'moodSwings', label: 'Mood Swings' },
    { id: 'fatigue', label: 'Fatigue' },
    { id: 'nightSweats', label: 'Night Sweats' },
    { id: 'anxiety', label: 'Anxiety' },
  ];

  const suggestedTags = ['#sleep', '#energy', '#stress', '#exercise', '#diet', '#socializing'];
  const filterOptions = ['Mood', 'Symptoms', 'Date', 'Tags'];

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'calm': return 'bg-[#C8A2C8]';
      case 'happy': return 'bg-[#F9D3B4]';
      case 'neutral': return 'bg-[#F9D3B4]';
      case 'anxious': return 'bg-[#F5D6D6]';
      case 'sad': return 'bg-[#C8A2C8]';
      case 'angry': return 'bg-[#F5D6D6]';
      default: return 'bg-gray-300';
    }
  };

  const getSymptomColor = (severity) => {
    if (severity === 3) return 'bg-[#F5D6D6]';
    if (severity === 2) return 'bg-[#F5D6D6]/70';
    return 'bg-[#F5D6D6]/40';
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setDayDetailOpen(true);
  };

  const handleAddEntry = () => {
    setAddEntryOpen(true);
  };

  const handleSymptomChange = (symptomId, field, value) => {
    setSymptoms(prev => ({
      ...prev,
      [symptomId]: { ...prev[symptomId], [field]: value }
    }));
  };



  const handleRecordToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.info('Recording started...');
      setTimeout(() => {
        setIsRecording(false);
        setVoiceEmotion('Calm & Reflective');
        toast.success('Recording analyzed');
      }, 3000);
    }
  };

  const handleAddTag = () => {
    if (currentTag && !journalTags.includes(currentTag)) {
      setJournalTags([...journalTags, currentTag]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tag) => {
    setJournalTags(journalTags.filter(t => t !== tag));
  };

  const toggleFilter = (filter) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const handleSaveEntry = () => {
    toast.success('Entry saved successfully');
    setAddEntryOpen(false);
    // Reset all states
    setSelectedMood('');
    setMoodJournal('');
    setSymptoms({
      hotFlashes: { severity: 0, notes: '' },
      insomnia: { severity: 0, notes: '' },
      moodSwings: { severity: 0, notes: '' },
      fatigue: { severity: 0, notes: '' },
      nightSweats: { severity: 0, notes: '' },
      anxiety: { severity: 0, notes: '' },
    });
    setIsPeriodDay(false);
    setSexualActivity(null);
    setVoiceEmotion('');
    setVoiceSummary('');
    setJournalText('');
    setJournalTags([]);
  };

  const handlePrevMonth = () => {
    toast.info('Previous month');
  };

  const handleNextMonth = () => {
    toast.info('Next month');
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[#554B4B]">Track</h1>
            <p className="text-[#554B4B]/60 mt-1">Monitor your wellness journey</p>
          </div>
          <Button
            size="icon"
            variant="outline"
            onClick={() => setSearchOpen(true)}
            className="rounded-xl border-[#C8A2C8]/40"
          >
            <Search className="w-5 h-5 text-[#C8A2C8]" />
          </Button>
        </div>
      </div>

      {/* Calendar Card with Month Toggle */}
      <div className="px-5 mb-6">
        <Card className="p-5 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          {/* Month Toggle */}
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#C8A2C8]/30">
            <button 
              onClick={handlePrevMonth}
              className="w-10 h-10 rounded-full hover:bg-[#C8A2C8]/30 flex items-center justify-center transition-all active:scale-90"
            >
              <ChevronLeft className="w-5 h-5 text-[#554B4B]/60" />
            </button>
            <span className="text-[#554B4B]">{currentMonth}</span>
            <button 
              onClick={handleNextMonth}
              className="w-10 h-10 rounded-full hover:bg-[#C8A2C8]/30 flex items-center justify-center transition-all active:scale-90"
            >
              <ChevronRight className="w-5 h-5 text-[#554B4B]/60" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-3">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-[#554B4B]/60 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: startDay }, (_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Days of the month */}
            {daysInMonth.map(day => {
              const hasMood = moodData[day];
              const hasSymptom = symptomData[day];
              const hasPeriod = periodData.includes(day);
              const isToday = day === 19;

              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`relative aspect-square rounded-xl p-2 transition-all hover:scale-110 active:scale-95 ${
                    isToday 
                      ? 'bg-[#C8A2C8] shadow-lg' 
                      : hasMood || hasSymptom || hasPeriod
                      ? 'bg-[#F9D3B4]/30 hover:shadow-md'
                      : 'bg-[#FDF8F5] hover:bg-[#C8A2C8]/20'
                  }`}
                >
                  <div className={`${isToday ? 'text-white' : 'text-[#554B4B]/60'}`}>
                    {day}
                  </div>
                  {/* Indicator Dots */}
                  {(hasMood || hasSymptom || hasPeriod) && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {hasMood && (
                        <div className={`w-2 h-2 rounded-full ${getMoodColor(hasMood)} shadow-sm`} />
                      )}
                      {hasSymptom && (
                        <div className={`w-2 h-2 rounded-full ${getSymptomColor(hasSymptom)} shadow-sm`} />
                      )}
                      {hasPeriod && (
                        <div className="w-2 h-2 rounded-full bg-[#F5D6D6] shadow-sm" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="px-5 mb-6">
        <Card className="p-4 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <h3 className="text-[#554B4B] mb-2">This Month</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-xl bg-[#C8A2C8]/20">
              <div className="text-[#554B4B]">7</div>
              <div className="text-[#554B4B]/60 text-xs">Mood Logs</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-[#F5D6D6]/20">
              <div className="text-[#554B4B]">5</div>
              <div className="text-[#554B4B]/60 text-xs">Symptoms</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-[#F9D3B4]/20">
              <div className="text-[#554B4B]">12</div>
              <div className="text-[#554B4B]/60 text-xs">Journal</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Floating + Button */}
      <button 
        onClick={handleAddEntry}
        className="fixed bottom-28 right-6 w-16 h-16 rounded-full bg-[#C8A2C8] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-10"
      >
        <Plus className="w-7 h-7 text-white" />
      </button>

      {/* Search Sheet */}
      <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl bg-[#FDF8F5] border-0">
          <SheetHeader>
            <SheetTitle className="text-[#554B4B]">Search Past Logs</SheetTitle>
            <SheetDescription className="text-[#554B4B]/60">
              Find entries by keyword, date, or tags
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#554B4B]/40" />
                <Input
                  placeholder="Search past logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl border-[#C8A2C8]/40 bg-white/80"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {filterOptions.map(filter => (
                <Badge
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`cursor-pointer ${
                    activeFilters.includes(filter)
                      ? 'bg-[#C8A2C8] text-white'
                      : 'bg-[#C8A2C8]/20 text-[#554B4B] hover:bg-[#C8A2C8]/40'
                  }`}
                >
                  {filter}
                </Badge>
              ))}
            </div>

            <div className="space-y-3 mt-6">
              <p className="text-[#554B4B]/60">Recent Entries</p>
              {[
                { date: 'Oct 19, 2025', mood: 'Calm', tags: '#sleep #energy' },
                { date: 'Oct 15, 2025', mood: 'Happy', tags: '#exercise' },
                { date: 'Oct 13, 2025', mood: 'Calm', tags: '#stress' },
              ].map((entry, i) => (
                <Card key={i} className="p-3 bg-white/80 border-[#C8A2C8]/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[#554B4B]">{entry.date}</p>
                      <p className="text-[#554B4B]/60">{entry.mood} · {entry.tags}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Day Detail Sheet */}
      <Sheet open={dayDetailOpen} onOpenChange={setDayDetailOpen}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl bg-white border-0 overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-[#554B4B]">
              October {selectedDay}, 2025
            </SheetTitle>
            <SheetDescription className="text-[#554B4B]/60">
              View your daily tracking summary
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {selectedDay && moodData[selectedDay] && (
              <Card className="p-4 bg-white/80 border-[#C8A2C8]/30">
                <h3 className="text-[#554B4B] mb-3">Mood</h3>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${getMoodColor(moodData[selectedDay])}`} />
                  <span className="text-[#554B4B]/60 capitalize">{moodData[selectedDay]}</span>
                </div>
              </Card>
            )}

            {selectedDay && symptomData[selectedDay] && (
              <Card className="p-4 bg-white/80 border-[#C8A2C8]/30">
                <h3 className="text-[#554B4B] mb-3">Symptoms</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#554B4B]/60">Hot flashes</span>
                    <div className={`w-6 h-6 rounded-full ${getSymptomColor(symptomData[selectedDay])}`} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#554B4B]/60">Night sweats</span>
                    <div className={`w-6 h-6 rounded-full ${getSymptomColor(symptomData[selectedDay])}`} />
                  </div>
                </div>
              </Card>
            )}

            {selectedDay && periodData.includes(selectedDay) && (
              <Card className="p-4 bg-white/80 border-[#C8A2C8]/30">
                <h3 className="text-[#554B4B] mb-2">Period Tracker</h3>
                <p className="text-[#554B4B]/60">Period day marked</p>
              </Card>
            )}

            {selectedDay && sexualActivityData[selectedDay] && (
              <Card className="p-4 bg-white/80 border-[#C8A2C8]/30">
                <h3 className="text-[#554B4B] mb-3">Sexual Activity</h3>
                <div className="flex items-center gap-2">
                  <div className={`px-4 py-2 rounded-xl ${
                    sexualActivityData[selectedDay] === 'yes' 
                      ? 'bg-[#C8A2C8] text-white' 
                      : 'bg-[#F9D3B4]/30 text-[#554B4B]'
                  }`}>
                    {sexualActivityData[selectedDay].toUpperCase()}
                  </div>
                </div>
              </Card>
            )}

            {selectedDay && notesData[selectedDay] && (
              <Card className="p-4 bg-white/80 border-[#C8A2C8]/30">
                <h3 className="text-[#554B4B] mb-3">Notes</h3>
                <p className="text-[#554B4B]/60">{notesData[selectedDay]}</p>
              </Card>
            )}

            {(!selectedDay || (!moodData[selectedDay] && !symptomData[selectedDay] && !periodData.includes(selectedDay) && !sexualActivityData[selectedDay] && !notesData[selectedDay])) && (
              <div className="text-center py-8">
                <p className="text-[#554B4B]/60">No entries for this day</p>
                <Button
                  onClick={() => {
                    setDayDetailOpen(false);
                    setAddEntryOpen(true);
                  }}
                  className="mt-4 bg-[#C8A2C8] text-white hover:shadow-lg rounded-2xl"
                >
                  Add Entry
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Add Entry Sheet with Tabs */}
      <Sheet open={addEntryOpen} onOpenChange={setAddEntryOpen}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl bg-white border-0 overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-[#554B4B]">New Entry</SheetTitle>
            <SheetDescription className="text-[#554B4B]/60">
              Log your wellness data for today
            </SheetDescription>
          </SheetHeader>

          <Tabs defaultValue="mood" className="mt-4">
            <TabsList className="grid grid-cols-3 w-full bg-[#F9D3B4]/20">
              <TabsTrigger value="mood">Mood</TabsTrigger>
              <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
              <TabsTrigger value="more">More</TabsTrigger>
            </TabsList>

            {/* Mood Tab */}
            <TabsContent value="mood" className="space-y-4 mt-4">
              <div>
                <h3 className="text-[#554B4B] mb-3">How are you feeling?</h3>
                <div className="grid grid-cols-3 gap-3">
                  {moods.map(mood => {
                    const IconComponent = mood.icon;
                    return (
                      <button
                        key={mood.value}
                        onClick={() => setSelectedMood(mood.value)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          selectedMood === mood.value
                            ? 'border-[#C8A2C8] bg-[#C8A2C8]/30 shadow-md'
                            : 'border-[#C8A2C8]/30 bg-white hover:bg-[#F9D3B4]/20'
                        }`}
                      >
                        <IconComponent 
                          className="w-10 h-10 mx-auto mb-1" 
                          color={mood.color}
                        />
                        <p className="text-[#554B4B]">{mood.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-[#554B4B] mb-3">Notes (Optional)</h3>
                <Textarea
                  placeholder="How are you feeling? Add optional notes..."
                  value={moodJournal}
                  onChange={(e) => setMoodJournal(e.target.value)}
                  className="min-h-[100px] resize-none rounded-xl border-[#C8A2C8]/40 bg-white/80"
                />
              </div>
            </TabsContent>

            {/* Symptoms Tab */}
            <TabsContent value="symptoms" className="mt-4">
              <div className="grid grid-cols-2 gap-3">
                {symptomsList.map(symptom => {
                  const severityLevel = symptoms[symptom.id].severity;
                  const getSymptomBgColor = () => {
                    if (severityLevel === 0) return 'bg-white/80';
                    if (severityLevel <= 2) return 'bg-[#F9D3B4]/20';
                    if (severityLevel <= 4) return 'bg-[#F5D6D6]/30';
                    return 'bg-[#F5D6D6]/50';
                  };
                  
                  return (
                    <Card 
                      key={symptom.id} 
                      className={`p-3 border-[#C8A2C8]/30 transition-all ${getSymptomBgColor()}`}
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-[#554B4B] text-sm">{symptom.label}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            severityLevel === 0 
                              ? 'bg-[#C8A2C8]/20 text-[#554B4B]/60' 
                              : 'bg-[#C8A2C8] text-white'
                          }`}>
                            {severityLevel === 0 ? 'None' : severityLevel}
                          </span>
                        </div>
                        <Slider
                          value={[severityLevel]}
                          onValueChange={(value) => handleSymptomChange(symptom.id, 'severity', value[0])}
                          max={5}
                          step={1}
                          className="mb-1"
                        />
                        <div className="flex justify-between text-[#554B4B]/40">
                          <span className="text-xs">0</span>
                          <span className="text-xs">5</span>
                        </div>
                        {severityLevel > 0 && (
                          <Input
                            placeholder="Notes..."
                            value={symptoms[symptom.id].notes}
                            onChange={(e) => handleSymptomChange(symptom.id, 'notes', e.target.value)}
                            className="rounded-lg border-[#C8A2C8]/40 bg-white/80 mt-1 text-sm h-8"
                          />
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* More Tab */}
            <TabsContent value="more" className="space-y-4 mt-4">
              {/* Period Tracker */}
              <Card className="p-4 bg-[#F9D3B4]/10 border-[#C8A2C8]/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C8A2C8]" />
                    <span className="text-[#554B4B]">Mark Period Day</span>
                  </div>
                  <Switch
                    checked={isPeriodDay}
                    onCheckedChange={setIsPeriodDay}
                  />
                </div>
              </Card>

              {/* Sexual Activity */}
              <Card className="p-4 bg-[#F9D3B4]/10 border-[#C8A2C8]/30">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#C8A2C8]" />
                    <span className="text-[#554B4B]">Sexual Activity</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSexualActivity('yes')}
                      className={`flex-1 py-2 px-4 rounded-xl transition-all ${
                        sexualActivity === 'yes'
                          ? 'bg-[#C8A2C8] text-white shadow-md'
                          : 'bg-white text-[#554B4B] border border-[#C8A2C8]/30 hover:bg-[#C8A2C8]/20'
                      }`}
                    >
                      YES
                    </button>
                    <button
                      onClick={() => setSexualActivity('no')}
                      className={`flex-1 py-2 px-4 rounded-xl transition-all ${
                        sexualActivity === 'no'
                          ? 'bg-[#C8A2C8] text-white shadow-md'
                          : 'bg-white text-[#554B4B] border border-[#C8A2C8]/30 hover:bg-[#C8A2C8]/20'
                      }`}
                    >
                      NO
                    </button>
                  </div>
                </div>
              </Card>

              {/* Voice Journal */}
              <Card className="p-4 bg-[#F9D3B4]/10 border-[#C8A2C8]/30">
                <h3 className="text-[#554B4B] mb-3">Voice Journal</h3>
                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={handleRecordToggle}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
                      isRecording
                        ? 'bg-[#F5D6D6] animate-pulse'
                        : 'bg-[#C8A2C8] hover:shadow-xl hover:scale-105'
                    }`}
                  >
                    <Mic className="w-6 h-6 text-white" />
                  </button>
                  <p className="text-[#554B4B]/60">
                    {isRecording ? 'Recording...' : 'Tap to record'}
                  </p>
                  {voiceEmotion && (
                    <div className="w-full">
                      <div className="bg-[#C8A2C8]/20 rounded-xl p-3">
                        <p className="text-[#554B4B]/60">AI Emotion:</p>
                        <p className="text-[#C8A2C8]">{voiceEmotion}</p>
                      </div>
                      <Textarea
                        placeholder="Add summary (optional)"
                        value={voiceSummary}
                        onChange={(e) => setVoiceSummary(e.target.value)}
                        className="mt-2 min-h-[60px] resize-none rounded-xl border-[#C8A2C8]/40 bg-white/80"
                      />
                    </div>
                  )}
                </div>
              </Card>

              {/* Journal & Tags */}
              <Card className="p-4 bg-[#F9D3B4]/10 border-[#C8A2C8]/30">
                <h3 className="text-[#554B4B] mb-3">Journal & Tags</h3>
                <Textarea
                  placeholder="Write your thoughts..."
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  className="min-h-[100px] resize-none rounded-xl border-[#C8A2C8]/40 bg-white/80 mb-3"
                />

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-[#C8A2C8]" />
                    <Input
                      placeholder="Add tag"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      className="flex-1 rounded-xl border-[#C8A2C8]/40"
                    />
                    <Button
                      onClick={handleAddTag}
                      size="sm"
                      className="bg-[#C8A2C8] text-white hover:shadow-lg rounded-xl"
                    >
                      Add
                    </Button>
                  </div>

                  {journalTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {journalTags.map(tag => (
                        <Badge
                          key={tag}
                          className="bg-[#C8A2C8] text-white cursor-pointer hover:bg-[#C8A2C8]/80"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-2">
                    {suggestedTags.map(tag => (
                      <Badge
                        key={tag}
                        onClick={() => {
                          if (!journalTags.includes(tag)) {
                            setJournalTags([...journalTags, tag]);
                          }
                        }}
                        className="bg-[#F9D3B4]/40 text-[#554B4B] cursor-pointer hover:bg-[#F9D3B4]/60"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex gap-3 mt-6 pb-6">
            <Button
              onClick={() => setAddEntryOpen(false)}
              variant="outline"
              className="flex-1 rounded-xl border-[#C8A2C8]/40"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEntry}
              className="flex-1 bg-[#C8A2C8] text-white hover:shadow-lg rounded-xl"
            >
              Save Entry
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
