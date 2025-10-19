export function HappyIcon({ className = "w-8 h-8", color = "#F9D3B4" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circle outline */}
      <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="6" fill="none"/>
      {/* Happy eyes - curved upward */}
      <path d="M 30 35 Q 35 28 40 35" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 60 35 Q 65 28 70 35" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Wide smile */}
      <path d="M 28 55 Q 50 70 72 55" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function CalmIcon({ className = "w-8 h-8", color = "#C8A2C8" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circle outline */}
      <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="6" fill="none"/>
      {/* Calm eyes - gentle curves */}
      <path d="M 30 38 Q 35 33 40 38" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 60 38 Q 65 33 70 38" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Gentle smile */}
      <path d="M 32 60 Q 50 68 68 60" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function NeutralIcon({ className = "w-8 h-8", color = "#F9D3B4" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circle outline */}
      <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="6" fill="none"/>
      {/* Round eyes */}
      <circle cx="35" cy="42" r="6" fill={color}/>
      <circle cx="65" cy="42" r="6" fill={color}/>
      {/* Straight mouth */}
      <line x1="32" y1="65" x2="68" y2="65" stroke={color} strokeWidth="6" strokeLinecap="round"/>
    </svg>
  );
}

export function AnxiousIcon({ className = "w-8 h-8", color = "#F5D6D6" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circle outline */}
      <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="6" fill="none"/>
      {/* Worried eyebrows - curved upward */}
      <path d="M 26 36 Q 32 30 38 34" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
      <path d="M 74 36 Q 68 30 62 34" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
      {/* Wide worried eyes */}
      <circle cx="35" cy="46" r="7" fill={color}/>
      <circle cx="65" cy="46" r="7" fill={color}/>
      {/* Wavy nervous mouth */}
      <path d="M 32 66 Q 38 62 44 66 Q 50 70 56 66 Q 62 62 68 66" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function SadIcon({ className = "w-8 h-8", color = "#C8A2C8" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circle outline */}
      <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="6" fill="none"/>
      {/* Round eyes */}
      <circle cx="35" cy="42" r="6" fill={color}/>
      <circle cx="65" cy="42" r="6" fill={color}/>
      {/* Frown */}
      <path d="M 32 70 Q 50 60 68 70" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function AngryIcon({ className = "w-8 h-8", color = "#F5D6D6" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circle outline */}
      <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="6" fill="none"/>
      {/* Sharp angry eyebrows - strong downward angle */}
      <path d="M 22 28 L 42 40" stroke={color} strokeWidth="7" strokeLinecap="round"/>
      <path d="M 78 28 L 58 40" stroke={color} strokeWidth="7" strokeLinecap="round"/>
      {/* Squinting eyes - horizontal lines instead of circles */}
      <line x1="28" y1="48" x2="42" y2="48" stroke={color} strokeWidth="6" strokeLinecap="round"/>
      <line x1="58" y1="48" x2="72" y2="48" stroke={color} strokeWidth="6" strokeLinecap="round"/>
      {/* Sharp angry mouth */}
      <path d="M 30 68 L 50 60 L 70 68" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
