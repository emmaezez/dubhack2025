import { useState } from 'react';
import { Play, Pause, Wind, Activity, Search } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CarePage() {
  const [breathDuration, setBreathDuration] = useState(5);
  const [isBreathing, setIsBreathing] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const meditations = [
    {
      title: 'Sleep Deeply',
      duration: '15 min',
      image: 'https://images.unsplash.com/photo-1691076198378-124d0985c851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlcCUyMHBlYWNlZnVsJTIwY2FsbXxlbnwxfHx8fDE3NjA4NTU0ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-[#C8A2C8] to-[#C8A2C8]'
    },
    {
      title: 'Stress Relief',
      duration: '10 min',
      image: 'https://images.unsplash.com/photo-1659087374131-6707281eba1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlc3MlMjByZWxpZWYlMjBuYXR1cmV8ZW58MXx8fHwxNzYwNzk4MjI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-[#F9D3B4] to-[#F9D3B4]'
    },
    {
      title: 'Cooling Meditation',
      duration: '12 min',
      image: 'https://images.unsplash.com/photo-1739057632617-6151cc85afa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjB3b21hbnxlbnwxfHx8fDE3NjA4MzkxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-[#F5D6D6] to-[#F5D6D6]'
    }
  ];

  const playlist = [
    { title: 'Ocean Waves', artist: 'Nature Sounds', duration: '20:00' },
    { title: 'Forest Rain', artist: 'Ambient Collection', duration: '15:30' },
    { title: 'Gentle Piano', artist: 'Calm Studio', duration: '18:45' }
  ];

  // Filter content based on search query
  const filteredMeditations = meditations.filter(med =>
    med.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlaylist = playlist.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showBreathwork = searchQuery === '' || 
    'breathwork'.includes(searchQuery.toLowerCase()) ||
    'breath'.includes(searchQuery.toLowerCase()) ||
    'timer'.includes(searchQuery.toLowerCase());

  const showMeditations = filteredMeditations.length > 0;
  const showMusic = filteredPlaylist.length > 0;

  return (
    <div className="min-h-screen bg-[#FDF8F5] pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-6">
        <h1 className="text-[#554B4B]">Care</h1>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#554B4B]/40" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/90 backdrop-blur-sm border-0 shadow-md text-[#554B4B] placeholder:text-[#554B4B]/40 focus:outline-none focus:ring-2 focus:ring-[#C8A2C8]/30 transition-all"
          />
        </div>
      </div>

      {/* Guided Meditations Carousel */}
      {showMeditations && (
        <div className="mb-8">
          <div className="px-4 mb-4">
            <h2 className="text-[#554B4B]">Guided Meditations</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {filteredMeditations.map((meditation, idx) => (
            <Card
              key={idx}
              className="flex-shrink-0 w-64 overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <div className="relative h-40">
                <ImageWithFallback
                  src={meditation.image}
                  alt={meditation.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#C8A2C8]/40" />
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-xl">
                  <Play className="w-6 h-6 text-[#554B4B] ml-1" />
                </button>
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-[#554B4B] mb-1">{meditation.title}</h3>
                <p className="text-[#554B4B]/60">{meditation.duration}</p>
              </div>
            </Card>
            ))}
          </div>
        </div>
      )}

      {/* Breathwork Timer */}
      {showBreathwork && (
        <div className="px-4 mb-8">
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <h2 className="text-[#554B4B] mb-4">Breathwork Timer</h2>
          <div className="flex flex-col items-center">
            {/* Circular Animation */}
            <div className="relative w-52 h-52 mb-6">
              <div className={`w-full h-full rounded-full bg-[#C8A2C8] flex items-center justify-center shadow-2xl transition-all duration-1000 ${
                isBreathing ? 'scale-110 shadow-[#C8A2C8]/50' : 'scale-100'
              }`}>
                <div className="text-center">
                  <div className="text-white mb-1 flex items-center justify-center gap-2">
                    {isBreathing ? (
                      <>
                        <Wind className="w-5 h-5" />
                        <span>Breathe</span>
                      </>
                    ) : (
                      <>
                        <Activity className="w-5 h-5" />
                        <span>Ready</span>
                      </>
                    )}
                  </div>
                  <div className="text-white/80">{breathDuration} min</div>
                </div>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="flex gap-3 mb-4">
              {[5, 10, 20].map(duration => (
                <button
                  key={duration}
                  onClick={() => setBreathDuration(duration)}
                  className={`px-6 py-3 rounded-full transition-all ${
                    breathDuration === duration
                      ? 'bg-[#C8A2C8] text-white shadow-lg scale-105'
                      : 'bg-[#F5D6D6] text-white hover:bg-[#C8A2C8] shadow-md'
                  }`}
                >
                  {duration} min
                </button>
              ))}
            </div>

            {/* Start/Pause Button */}
            <Button
              onClick={() => setIsBreathing(!isBreathing)}
              className={`w-full rounded-2xl h-14 shadow-lg hover:shadow-xl active:scale-95 transition-all ${
                isBreathing
                  ? 'bg-[#F5D6D6] hover:bg-[#F5D6D6]/90 text-white'
                  : 'bg-[#C8A2C8] hover:bg-[#C8A2C8]/90 text-white'
              }`}
            >
              {isBreathing ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Breathwork
                </>
              )}
            </Button>
          </div>
        </Card>
        </div>
      )}

      {/* Calm Music Player */}
      {showMusic && (
        <div className="px-4 mb-8">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <h2 className="text-[#554B4B] mb-4">Calm Music</h2>
            <div className="space-y-3">
              {filteredPlaylist.map((track, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                  idx === 0 && isMusicPlaying ? 'bg-[#C8A2C8]/30' : 'hover:bg-[#F9D3B4]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMusicPlaying(!isMusicPlaying)}
                    className="w-10 h-10 rounded-full bg-[#C8A2C8] flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                  >
                    {idx === 0 && isMusicPlaying ? (
                      <Pause className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    )}
                  </button>
                  <div>
                    <div className="text-[#554B4B]">{track.title}</div>
                    <div className="text-[#554B4B]/60">{track.artist}</div>
                  </div>
                </div>
                <div className="text-[#554B4B]/60">{track.duration}</div>
              </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* No Results Message */}
      {searchQuery && !showMeditations && !showBreathwork && !showMusic && (
        <div className="px-4 py-12 text-center">
          <p className="text-[#554B4B]/60">No activities found matching "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-6 py-2 rounded-full bg-[#C8A2C8] text-white hover:bg-[#C8A2C8]/90 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
