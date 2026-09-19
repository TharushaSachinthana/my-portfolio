import { useEffect, useState } from 'react';
import { useWeather } from './WeatherContext';

export function WeatherOverlay() {
  const { weather } = useWeather();
  const [particles, setParticles] = useState<Array<{ 
    id: number; 
    left: string; 
    top?: string;
    animationDuration: string; 
    animationDelay: string; 
    opacity: number; 
    size: number;
  }>>([]);
  
  const [lightning, setLightning] = useState(false);

  // Lightning effect for storm
  useEffect(() => {
    if (weather !== 'storm') {
      setLightning(false);
      return;
    }

    const triggerLightning = () => {
      setLightning(true);
      setTimeout(() => setLightning(false), 100 + Math.random() * 200);
      
      // Sometimes double flash
      if (Math.random() > 0.7) {
        setTimeout(() => {
          setLightning(true);
          setTimeout(() => setLightning(false), 50 + Math.random() * 100);
        }, 300);
      }
      
      const nextFlash = 3000 + Math.random() * 7000; // 3-10 seconds
      timeout = setTimeout(triggerLightning, nextFlash);
    };

    let timeout = setTimeout(triggerLightning, 2000);
    return () => clearTimeout(timeout);
  }, [weather]);

  useEffect(() => {
    if (weather === 'clear') {
      setParticles([]);
      return;
    }

    // Configuration per weather type
    let count = 0;
    if (weather === 'rain') count = 100;
    if (weather === 'snow') count = 70;
    if (weather === 'storm') count = 200; // heavier rain
    if (weather === 'sakura') count = 40;
    if (weather === 'desert') count = 60;
    if (weather === 'meteor') count = 20;
    if (weather === 'underwater') count = 50;

    const newParticles = Array.from({ length: count }).map((_, i) => {
      const isHorizontal = weather === 'desert';
      const isMeteor = weather === 'meteor';
      const isBubble = weather === 'underwater';
      
      return {
        id: i,
        // Desert blows horizontally, so distribute along Y axis. Meteor starts scattered.
        left: isHorizontal ? '-10vw' : isMeteor ? `${-20 + Math.random() * 100}vw` : `${Math.random() * 100}%`,
        top: isHorizontal ? `${Math.random() * 100}%` : isBubble ? '110vh' : isMeteor ? `${-20 + Math.random() * 50}vh` : '-10vh',
        
        animationDuration: 
          weather === 'rain' ? `${0.4 + Math.random() * 0.4}s` :
          weather === 'storm' ? `${0.2 + Math.random() * 0.3}s` :
          weather === 'meteor' ? `${1 + Math.random() * 1}s` :
          weather === 'desert' ? `${2 + Math.random() * 3}s` :
          weather === 'underwater' ? `${4 + Math.random() * 6}s` :
          `${3 + Math.random() * 5}s`, // snow, sakura
          
        animationDelay: `-${Math.random() * 5}s`,
        
        opacity: 
          weather === 'storm' ? 0.4 + Math.random() * 0.5 :
          weather === 'meteor' ? 0.7 + Math.random() * 0.3 :
          weather === 'underwater' ? 0.2 + Math.random() * 0.4 :
          weather === 'rain' ? 0.3 + Math.random() * 0.4 : 
          0.4 + Math.random() * 0.6,
          
        size: 
          weather === 'rain' || weather === 'storm' ? 1 : 
          weather === 'meteor' ? 2 + Math.random() * 2 :
          weather === 'sakura' ? 10 + Math.random() * 10 :
          weather === 'underwater' ? 5 + Math.random() * 15 :
          2 + Math.random() * 4,
      };
    });
    
    setParticles(newParticles);
  }, [weather]);

  if (weather === 'clear') return null;

  const getOverlayClass = () => {
    switch (weather) {
      case 'storm': return 'bg-slate-900/40';
      case 'desert': return 'bg-amber-700/10 mix-blend-color-burn';
      case 'underwater': return 'bg-blue-900/20 backdrop-blur-[1px]';
      case 'meteor': return 'bg-indigo-950/20';
      default: return '';
    }
  };

  const getParticleClass = () => {
    switch (weather) {
      case 'rain': 
      case 'storm': return 'weather-rain';
      case 'snow': return 'weather-snow';
      case 'sakura': return 'weather-sakura';
      case 'desert': return 'weather-desert';
      case 'meteor': return 'weather-meteor';
      case 'underwater': return 'weather-bubble';
      default: return '';
    }
  };

  return (
    <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-1000 ${getOverlayClass()}`}>
      
      {/* Lightning Flash Overlay */}
      {weather === 'storm' && (
        <div 
          className={`absolute inset-0 bg-white transition-opacity duration-75 ${lightning ? 'opacity-30' : 'opacity-0'}`} 
        />
      )}

      <style>
        {`
          @keyframes rain-fall {
            0% { transform: translateY(-10vh) rotate(5deg); }
            100% { transform: translateY(110vh) rotate(5deg); }
          }
          @keyframes storm-fall {
            0% { transform: translateY(-10vh) rotate(10deg); }
            100% { transform: translateY(110vh) rotate(10deg); }
          }
          @keyframes snow-fall {
            0% { transform: translateY(-10vh) translateX(0); }
            50% { transform: translateY(50vh) translateX(20px); }
            100% { transform: translateY(110vh) translateX(-20px); }
          }
          @keyframes sakura-fall {
            0% { transform: translateY(-10vh) translateX(0) rotate(0deg) scale(1); }
            50% { transform: translateY(50vh) translateX(30px) rotate(180deg) scale(0.9); }
            100% { transform: translateY(110vh) translateX(-30px) rotate(360deg) scale(1.1); }
          }
          @keyframes desert-blow {
            0% { transform: translateX(-10vw) translateY(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(110vw) translateY(-5vh); opacity: 0; }
          }
          @keyframes meteor-fall {
            0% { transform: translate(0, 0); opacity: 1; }
            100% { transform: translate(100vw, 100vh); opacity: 0; }
          }
          @keyframes bubble-rise {
            0% { transform: translateY(10vh) translateX(0) scale(0.5); opacity: 0; }
            20% { opacity: 1; }
            50% { transform: translateY(-40vh) translateX(15px) scale(1); }
            100% { transform: translateY(-110vh) translateX(-15px) scale(1.5); opacity: 0; }
          }

          .weather-particle {
            position: absolute;
          }
          
          .weather-rain {
            width: 2px;
            height: 35px;
            background: linear-gradient(transparent, rgba(255,255,255,0.8));
            animation: rain-fall linear infinite;
          }
          .weather-snow {
            border-radius: 50%;
            background: white;
            box-shadow: 0 0 5px white;
            animation: snow-fall linear infinite;
          }
          .weather-sakura {
            background-color: #ffb7c5;
            border-radius: 100% 0 100% 0;
            box-shadow: 0 0 5px rgba(255, 183, 197, 0.5);
            animation: sakura-fall linear infinite;
          }
          .weather-desert {
            border-radius: 50%;
            background: #d4a373;
            box-shadow: 0 0 4px #d4a373;
            animation: desert-blow linear infinite;
          }
          .weather-meteor {
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8), -10px -10px 20px 2px rgba(255, 255, 255, 0.4);
            animation: meteor-fall linear infinite;
          }
          .weather-meteor::before {
            content: '';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 1px;
            background: linear-gradient(90deg, rgba(255,255,255,1), transparent);
            left: -50px;
          }
          .weather-bubble {
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.6);
            background: rgba(255, 255, 255, 0.1);
            animation: bubble-rise ease-in infinite;
          }
        `}
      </style>
      
      {particles.map((p) => {
        // Only apply width/height styles where needed so it doesn't break CSS-defined dimensions like rain and meteor.
        let dynamicStyles: React.CSSProperties = {
          left: p.left,
          top: p.top,
          animationDuration: p.animationDuration,
          animationDelay: p.animationDelay,
          opacity: p.opacity,
        };

        if (weather === 'snow' || weather === 'sakura' || weather === 'desert' || weather === 'underwater') {
          dynamicStyles.width = `${p.size}px`;
          dynamicStyles.height = `${p.size}px`;
        }

        // Adjust animation name for storm (faster rain, tilted more)
        if (weather === 'storm') {
          dynamicStyles.animationName = 'storm-fall';
        }

        return (
          <div
            key={p.id}
            className={`weather-particle ${getParticleClass()}`}
            style={dynamicStyles}
          />
        );
      })}
    </div>
  );
}
