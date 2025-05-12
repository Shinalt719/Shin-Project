import React, { useState, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { useAnimatedElement } from '../hooks/useAnimatedElement';

const tracks = [
  { 
    id: 1, 
    title: 'Gentle Rain', 
    duration: '5:30', 
    category: 'Ambient', 
    imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/30/audio_347289a634.mp3'
  },
  { 
    id: 2, 
    title: 'Forest Rain', 
    duration: '4:45', 
    category: 'Nature', 
    imageUrl: 'https://images.pexels.com/photos/3944104/pexels-photo-3944104.jpeg?auto=compress&cs=tinysrgb&w=600',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0fd6a9d1c.mp3'
  },
  { 
    id: 3, 
    title: 'Rain Meditation', 
    duration: '6:15', 
    category: 'Relaxation', 
    imageUrl: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=600',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/04/27/audio_2a1fec8f02.mp3'
  },
];

const MusicPlayerSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [activeTrack, setActiveTrack] = useState(tracks[0]);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const sectionRef = useAnimatedElement<HTMLDivElement>();
  const contentRef = useAnimatedElement<HTMLDivElement>();
  const playerRef = useAnimatedElement<HTMLDivElement>();

  const togglePlay = () => {
    if (audioRef.current) {
      setError(null);
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          setError("Unable to play audio. Please try again.");
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const changeTrack = (track: typeof tracks[0]) => {
    setActiveTrack(track);
    setIsPlaying(false);
    setError(null);
    if (audioRef.current) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          setError("Unable to play audio. Please try again.");
        });
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section className="section" id="music">
      <div className="container-custom" ref={sectionRef}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="fade-in">
            <h2 className="mb-4">Enhance Focus with <span className="gradient-text">Study Music</span></h2>
            <p className="text-xl text-gray-600 mb-6">
              Access curated playlists designed to boost concentration, block distractions, and put your mind in the perfect study state.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Curated playlists for different study needs</p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Background noise and ambient sound options</p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Timer integration to automatically pause music</p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Offline playback for uninterrupted studying</p>
              </li>
            </ul>
            <a href="#get-started" className="btn btn-primary">Try Focus Music</a>
          </div>
          
          <div ref={playerRef} className="slide-in-right">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <audio 
                ref={audioRef}
                src={activeTrack.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                onError={() => {
                  setError("Error loading audio. Please try another track.");
                  setIsPlaying(false);
                }}
              />
              
              <div className="relative mb-8">
                <img 
                  src={activeTrack.imageUrl} 
                  alt={activeTrack.title}
                  className="w-full h-56 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <div className="text-sm font-medium text-indigo-300">{activeTrack.category}</div>
                  <h4 className="text-2xl font-bold">{activeTrack.title}</h4>
                </div>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{activeTrack.duration}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full"
                    style={{ width: `${(currentTime / (parseInt(activeTrack.duration.split(':')[0]) * 60 + parseInt(activeTrack.duration.split(':')[1]))) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-center items-center gap-6 mb-8">
                <button 
                  className="text-gray-400 hover:text-gray-800 transition-colors"
                  onClick={() => {
                    const currentIndex = tracks.findIndex(t => t.id === activeTrack.id);
                    const prevTrack = tracks[currentIndex - 1] || tracks[tracks.length - 1];
                    changeTrack(prevTrack);
                  }}
                >
                  <SkipBack size={24} />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-500/30"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button 
                  className="text-gray-400 hover:text-gray-800 transition-colors"
                  onClick={() => {
                    const currentIndex = tracks.findIndex(t => t.id === activeTrack.id);
                    const nextTrack = tracks[currentIndex + 1] || tracks[0];
                    changeTrack(nextTrack);
                  }}
                >
                  <SkipForward size={24} />
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <Volume2 size={18} className="text-gray-500" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div className="mt-8 border-t border-gray-100 pt-6">
                <h4 className="text-gray-700 font-medium mb-4">Recommended Tracks</h4>
                <div className="space-y-3">
                  {tracks.map(track => (
                    <div 
                      key={track.id}
                      onClick={() => changeTrack(track)}
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                        activeTrack.id === track.id ? 'bg-indigo-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <img 
                        src={track.imageUrl} 
                        alt={track.title} 
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className={`font-medium ${activeTrack.id === track.id ? 'text-indigo-600' : 'text-gray-800'}`}>
                          {track.title}
                        </p>
                        <p className="text-xs text-gray-500">{track.category} • {track.duration}</p>
                      </div>
                      {activeTrack.id === track.id && isPlaying && (
                        <div className="flex space-x-0.5">
                          <div className="w-1 h-6 bg-indigo-600 rounded-full animate-pulse"></div>
                          <div className="w-1 h-3 bg-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-1 h-5 bg-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicPlayerSection;