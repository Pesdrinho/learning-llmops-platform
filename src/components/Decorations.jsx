/**
 * Componentes decorativos SVG para backgrounds e elementos visuais
 */

export function GridPattern({ className = '' }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x="0"
          y="0"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
}

export function DotPattern({ className = '' }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="dot-pattern"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="currentColor" fillOpacity="0.1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>
  );
}

export function WavePattern({ className = '' }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      preserveAspectRatio="none"
      viewBox="0 0 1440 320"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillOpacity="0.05"
        d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
  );
}

export function GradientBlur({ className = '', color = 'red' }) {
  const colorMap = {
    red: 'rgba(220, 38, 38, 0.1)',
    beige: 'rgba(212, 196, 176, 0.1)',
    gray: 'rgba(156, 163, 175, 0.1)',
  };

  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{
        background: `radial-gradient(circle, ${colorMap[color] || colorMap.red} 0%, transparent 70%)`,
        filter: 'blur(80px)',
      }}
      aria-hidden="true"
    />
  );
}

export function FloatingShapes({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Shape 1 - Top Right */}
      <div
        className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-red-500/10 to-orange-500/10 blur-3xl animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      
      {/* Shape 2 - Bottom Left */}
      <div
        className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-beige-300/10 to-beige-500/10 blur-3xl animate-pulse"
        style={{ animationDuration: '10s', animationDelay: '2s' }}
      />
      
      {/* Shape 3 - Center */}
      <div
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-gray-400/5 to-gray-600/5 blur-3xl animate-pulse"
        style={{ animationDuration: '12s', animationDelay: '4s' }}
      />
    </div>
  );
}


