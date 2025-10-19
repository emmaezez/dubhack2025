import { useState } from 'react';
import { Send, Mic, Bookmark, Search, Filter, ChevronRight, PlayCircle, FileText, Image } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

export function LearnPage() {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      text: 'Hello! I\'m here to help answer your questions about menopause, perimenopause, and your wellness journey. How can I support you today?'
    }
  ]);

  const suggestedQuestions = [
    'What are common hot flash triggers?',
    'How to improve sleep quality?',
    'Nutrition tips for menopause',
    'Exercise during perimenopause',
    'How can I manage mood swings?',
    'What foods help with bone health?'
  ];

  const contentLibrary = [
    {
      title: 'Understanding Hot Flashes',
      type: 'article',
      category: 'Perimenopause',
      duration: '5 min read',
      icon: FileText,
      color: 'bg-[#C8A2C8]'
    },
    {
      title: 'Sleep & Menopause',
      type: 'video',
      category: 'Menopause',
      duration: '8 min',
      icon: PlayCircle,
      color: 'bg-[#C8A2C8]'
    },
    {
      title: 'Hormone Changes Guide',
      type: 'infographic',
      category: 'Post-Menopause',
      duration: '3 min',
      icon: Image,
      color: 'bg-[#F9D3B4]'
    },
    {
      title: 'Nutrition & Wellness',
      type: 'article',
      category: 'Perimenopause',
      duration: '6 min read',
      icon: FileText,
      color: 'bg-[#F5D6D6]'
    },
    {
      title: 'Managing Stress',
      type: 'video',
      category: 'Menopause',
      duration: '10 min',
      icon: PlayCircle,
      color: 'bg-[#C8A2C8]'
    },
    {
      title: 'Exercise Benefits',
      type: 'article',
      category: 'Perimenopause',
      duration: '4 min read',
      icon: FileText,
      color: 'bg-[#F9D3B4]'
    }
  ];

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setMessages([...messages, { type: 'user', text: chatInput }]);
      setChatInput('');
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'ai',
          text: 'That\'s a great question! Regular exercise can help reduce hot flashes by improving your overall circulation and helping regulate body temperature. Even gentle activities like walking, yoga, or swimming can make a significant difference.'
        }]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-6">
        <h1 className="text-[#554B4B]">Learn and Ask AI</h1>
      </div>

      <Tabs defaultValue="ai" className="w-full">
        <div className="px-4 mb-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/90 backdrop-blur-sm shadow-lg rounded-[20px] p-1.5">
            <TabsTrigger value="ai" className="rounded-[16px] data-[state=active]:bg-white data-[state=active]:text-[#554B4B] data-[state=active]:shadow-md">AI Companion</TabsTrigger>
            <TabsTrigger value="library" className="rounded-[16px] data-[state=active]:bg-white data-[state=active]:text-[#554B4B] data-[state=active]:shadow-md">Library</TabsTrigger>
          </TabsList>
        </div>

        {/* AI Companion Tab */}
        <TabsContent value="ai" className="space-y-4">
          {/* Ask Me Anything Input */}
          <div className="px-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-[24px] shadow-lg p-3 flex items-center gap-2.5">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border-none focus:outline-none text-[#554B4B] placeholder:text-[#554B4B]/60"
              />
              <button 
                className="w-[40px] h-[40px] rounded-full bg-[#F9D3B4] hover:bg-[#F9D3B4]/90 flex items-center justify-center transition-all shadow-md hover:scale-105 active:scale-95"
                aria-label="Voice input"
              >
                <Mic className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={handleSendMessage}
                className="w-[40px] h-[40px] rounded-full bg-[#C8A2C8] hover:bg-[#C8A2C8]/90 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="px-4 mb-4">
            <Card className="p-5 bg-white/90 backdrop-blur-sm border-0 shadow-xl max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl shadow-md ${
                        message.type === 'user'
                          ? 'bg-[#C8A2C8] text-white'
                          : 'bg-[#F9D3B4]/50 text-[#554B4B] border-2 border-[#C8A2C8]/20'
                      }`}
                    >
                      <p>{message.text}</p>
                      {message.type === 'ai' && (
                        <button className="mt-3 text-[#C8A2C8] hover:text-[#F9D3B4] transition-colors flex items-center gap-1 hover:scale-105 active:scale-95">
                          <Bookmark className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Suggested Questions */}
          <div className="px-4 mb-4">
            <div className="mb-3 text-[#554B4B]/60">💭 Suggested questions:</div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {suggestedQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => setChatInput(question)}
                  className="flex-shrink-0 px-5 py-3 rounded-full bg-white text-[#554B4B] hover:bg-[#C8A2C8]/30 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border-2 border-[#C8A2C8]/30"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

        </TabsContent>

        {/* Educational Library Tab */}
        <TabsContent value="library" className="space-y-4">
          {/* Search and Filter */}
          <div className="px-4 mb-4">
            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#554B4B]/60" />
                <input
                  type="text"
                  placeholder="Search articles, videos..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#C8A2C8]/30 focus:border-[#C8A2C8] focus:outline-none text-[#554B4B] placeholder:text-[#554B4B]/60 shadow-md"
                />
              </div>
              <button className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-[#C8A2C8]/30 transition-colors">
                <Filter className="w-5 h-5 text-[#554B4B]/60" />
              </button>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['All', 'Perimenopause', 'Menopause', 'Post-Menopause'].map((category, idx) => (
                <Badge
                  key={idx}
                  variant={idx === 0 ? 'default' : 'outline'}
                  className={`px-5 py-2 rounded-full flex-shrink-0 shadow-md hover:scale-105 active:scale-95 transition-all ${
                    idx === 0
                      ? 'bg-[#C8A2C8] text-white hover:bg-[#C8A2C8]/90'
                      : 'bg-white/90 text-[#554B4B]/60 border-[#C8A2C8]/30 hover:bg-[#C8A2C8]/20'
                  }`}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Recent/Bookmarked Carousel */}
          <div className="mb-4">
            <div className="px-4 mb-3">
              <h3 className="text-[#554B4B]">Recently Viewed</h3>
            </div>
            <div className="flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide">
              {contentLibrary.slice(0, 3).map((item, idx) => (
                <Card
                  key={idx}
                  className="flex-shrink-0 w-56 p-5 border-0 shadow-xl hover:shadow-2xl transition-all bg-white/90 backdrop-blur-sm hover:scale-105"
                >
                  <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-3 shadow-md`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-[#554B4B] mb-2">{item.title}</h4>
                  <div className="flex items-center">
                    <Badge variant="outline" className="text-[#554B4B]/60 border-[#C8A2C8]/30">
                      {item.category}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="px-4">
            <h3 className="text-[#554B4B] mb-3">All Content</h3>
            <div className="grid grid-cols-1 gap-3">
              {contentLibrary.map((item, idx) => (
                <Card
                  key={idx}
                  className="p-5 border-0 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] bg-white/90 backdrop-blur-sm active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#554B4B] mb-2">{item.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[#554B4B]/60 border-[#C8A2C8]/30">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-[#554B4B]/60" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
