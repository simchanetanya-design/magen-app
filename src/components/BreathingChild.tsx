"use client";

import { useEffect, useState } from "react";

interface BreathingChildProps {
  phaseType: "inhale" | "hold-in" | "exhale" | "hold-out";
  duration: number;
  running: boolean;
  color: string;
  emoji: string;
}

export default function BreathingChild({ phaseType, duration, running, color, emoji }: BreathingChildProps) {
  const [animDur, setAnimDur] = useState(4);

  useEffect(() => {
    if (running) setAnimDur(duration);
  }, [phaseType, duration, running]);

  const isInhale = phaseType === "inhale";
  const isExhale = phaseType === "exhale";
  const isHold = phaseType === "hold-in" || phaseType === "hold-out";
  const isActive = running;

  // Cheek puff: big when inhaling/holding air, small when exhaling
  const cheekScale = isActive
    ? isInhale || phaseType === "hold-in" ? 1.35 : 0.85
    : 1;

  // Chest rise
  const chestY = isActive
    ? isInhale || phaseType === "hold-in" ? -4 : 4
    : 0;

  // Mouth shape: O when inhaling, small when exhaling, smile when idle
  const mouthWidth = isActive
    ? isInhale ? 10 : isExhale ? 14 : 8
    : 12;
  const mouthHeight = isActive
    ? isInhale ? 12 : isExhale ? 6 : 5
    : 3;
  const mouthRx = isActive
    ? isInhale ? 5 : isExhale ? 7 : 4
    : 6;

  // Eye blink on exhale
  const eyeHeight = isActive
    ? isExhale ? 3 : 7
    : 7;

  // Balloon size
  const balloonScale = isActive
    ? isInhale || phaseType === "hold-in" ? 1.4 : 0.7
    : 1;

  // Air particles (only on exhale)
  const showAir = isActive && isExhale;

  // Hair bounce
  const hairBounce = isActive
    ? isInhale ? -3 : isExhale ? 2 : 0
    : 0;

  const t = `${animDur}s`;
  const ease = "ease-in-out";

  return (
    <div style={{ width: 280, height: 340, position: "relative" }}>
      <svg viewBox="0 0 280 340" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <defs>
          {/* Skin gradient */}
          <radialGradient id="skinGrad" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFE0C2" />
            <stop offset="100%" stopColor="#F5C8A0" />
          </radialGradient>
          {/* Blush gradient */}
          <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB5B5" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFB5B5" stopOpacity="0" />
          </radialGradient>
          {/* Balloon gradient */}
          <radialGradient id="balloonGrad" cx="35%" cy="30%" r="60%">
            <stop offset="0%" stopColor={color + "CC"} />
            <stop offset="100%" stopColor={color} />
          </radialGradient>
          {/* Balloon shine */}
          <radialGradient id="balloonShine" cx="30%" cy="25%" r="30%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          {/* Shadow */}
          <filter id="shadow1" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.15" />
          </filter>
          <filter id="glow1" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── BALLOON ── */}
        <g style={{ transform: `scale(${balloonScale})`, transformOrigin: "160px 60px", transition: `transform ${t} ${ease}` }}>
          {/* String */}
          <path d="M155 130 Q150 150 148 170 Q146 185 150 195" stroke="#AAA" strokeWidth="1.5" fill="none" strokeDasharray="3,2" />
          {/* Balloon body */}
          <ellipse cx="160" cy="75" rx="42" ry="52" fill="url(#balloonGrad)" filter="url(#shadow1)" />
          <ellipse cx="160" cy="75" rx="42" ry="52" fill="url(#balloonShine)" />
          {/* Balloon knot */}
          <polygon points="155,125 160,132 165,125" fill={color} />
          {/* Emoji on balloon */}
          <text x="160" y="82" textAnchor="middle" fontSize="28" dominantBaseline="middle">{emoji}</text>
        </g>

        {/* ── BODY / SHIRT ── */}
        <g style={{ transform: `translateY(${chestY}px)`, transition: `transform ${t} ${ease}` }}>
          {/* Neck */}
          <rect x="128" y="228" width="24" height="18" rx="5" fill="url(#skinGrad)" />
          {/* Body / shirt */}
          <path d="M100 248 Q100 240 115 238 L165 238 Q180 240 180 248 L185 320 Q185 330 175 330 L105 330 Q95 330 95 320 Z" fill="#5B9BD5" />
          {/* Shirt stripes */}
          <line x1="105" y1="260" x2="175" y2="260" stroke="#4A8BC4" strokeWidth="2" strokeOpacity="0.4" />
          <line x1="103" y1="280" x2="177" y2="280" stroke="#4A8BC4" strokeWidth="2" strokeOpacity="0.3" />
          <line x1="100" y1="300" x2="180" y2="300" stroke="#4A8BC4" strokeWidth="2" strokeOpacity="0.2" />
          {/* Collar */}
          <path d="M122 238 L140 252 L158 238" fill="none" stroke="#4A8BC4" strokeWidth="2" />

          {/* Arms */}
          {/* Left arm (holding balloon string) */}
          <path d="M100 250 Q80 260 85 285 Q88 300 95 305" stroke="url(#skinGrad)" strokeWidth="16" fill="none" strokeLinecap="round" />
          {/* Left hand */}
          <circle cx="93" cy="302" r="9" fill="url(#skinGrad)" />
          {/* Right arm */}
          <path d="M180 250 Q200 265 195 290 Q192 305 185 310" stroke="url(#skinGrad)" strokeWidth="16" fill="none" strokeLinecap="round" />
          {/* Right hand - waving */}
          <circle cx="187" cy="308" r="9" fill="url(#skinGrad)" />

          {/* String from hand to balloon */}
          <line x1="93" y1="296" x2="150" y2="195" stroke="#AAA" strokeWidth="1.5" />
        </g>

        {/* ── HEAD ── */}
        <g filter="url(#shadow1)">
          {/* Head shape */}
          <ellipse cx="140" cy="195" rx="52" ry="56" fill="url(#skinGrad)" />

          {/* Ears */}
          <ellipse cx="88" cy="195" rx="10" ry="14" fill="#F5C8A0" />
          <ellipse cx="88" cy="195" rx="6" ry="9" fill="#EEBA8E" />
          <ellipse cx="192" cy="195" rx="10" ry="14" fill="#F5C8A0" />
          <ellipse cx="192" cy="195" rx="6" ry="9" fill="#EEBA8E" />

          {/* ── HAIR ── */}
          <g style={{ transform: `translateY(${hairBounce}px)`, transition: `transform ${t} ${ease}` }}>
            {/* Main hair */}
            <ellipse cx="140" cy="155" rx="56" ry="32" fill="#5C3D2E" />
            {/* Hair puff top */}
            <ellipse cx="130" cy="142" rx="30" ry="18" fill="#6B4C3B" />
            <ellipse cx="155" cy="145" rx="25" ry="16" fill="#5C3D2E" />
            {/* Side hair */}
            <ellipse cx="95" cy="172" rx="14" ry="22" fill="#5C3D2E" />
            <ellipse cx="185" cy="172" rx="14" ry="22" fill="#5C3D2E" />
            {/* Fringe / bangs */}
            <path d="M100 165 Q110 148 125 152 Q135 140 150 150 Q160 142 175 155 Q185 160 188 170" fill="#6B4C3B" />
            {/* Hair highlights */}
            <ellipse cx="125" cy="148" rx="12" ry="6" fill="#7D5E4B" opacity="0.5" />
          </g>

          {/* ── FACE ── */}

          {/* Eyebrows */}
          <path d="M112 178 Q118 173 126 176" stroke="#5C3D2E" strokeWidth="2.5" fill="none" strokeLinecap="round"
            style={{ transform: isActive && isInhale ? "translateY(-2px)" : "translateY(0)", transition: `transform ${t} ${ease}` }} />
          <path d="M154 176 Q162 173 168 178" stroke="#5C3D2E" strokeWidth="2.5" fill="none" strokeLinecap="round"
            style={{ transform: isActive && isInhale ? "translateY(-2px)" : "translateY(0)", transition: `transform ${t} ${ease}` }} />

          {/* Eyes */}
          <ellipse cx="119" cy="190" rx="8" ry={eyeHeight}
            fill="#FFFFFF"
            style={{ transition: `ry ${t} ${ease}` }} />
          <ellipse cx="119" cy="190" rx="4.5" ry={Math.min(4.5, eyeHeight - 1)}
            fill="#3D2E1F"
            style={{ transition: `ry ${t} ${ease}` }} />
          <circle cx="117" cy="188" r="1.8" fill="#FFFFFF" />

          <ellipse cx="161" cy="190" rx="8" ry={eyeHeight}
            fill="#FFFFFF"
            style={{ transition: `ry ${t} ${ease}` }} />
          <ellipse cx="161" cy="190" rx="4.5" ry={Math.min(4.5, eyeHeight - 1)}
            fill="#3D2E1F"
            style={{ transition: `ry ${t} ${ease}` }} />
          <circle cx="159" cy="188" r="1.8" fill="#FFFFFF" />

          {/* Eyelashes */}
          <path d="M110 184 Q112 181 114 183" stroke="#5C3D2E" strokeWidth="1" fill="none" />
          <path d="M124 183 Q126 181 128 184" stroke="#5C3D2E" strokeWidth="1" fill="none" />
          <path d="M152 184 Q154 181 156 183" stroke="#5C3D2E" strokeWidth="1" fill="none" />
          <path d="M166 183 Q168 181 170 184" stroke="#5C3D2E" strokeWidth="1" fill="none" />

          {/* Nose */}
          <ellipse cx="140" cy="204" rx="5" ry="4" fill="#EEBA8E" opacity="0.6" />

          {/* ── CHEEKS (animated puff) ── */}
          <ellipse cx="105" cy="206" rx="16" ry="13"
            fill="url(#blushGrad)"
            style={{ transform: `scale(${cheekScale})`, transformOrigin: "105px 206px", transition: `transform ${t} ${ease}` }} />
          <ellipse cx="175" cy="206" rx="16" ry="13"
            fill="url(#blushGrad)"
            style={{ transform: `scale(${cheekScale})`, transformOrigin: "175px 206px", transition: `transform ${t} ${ease}` }} />

          {/* ── MOUTH (animated shape) ── */}
          <ellipse cx="140" cy="218" rx={mouthWidth} ry={mouthHeight}
            fill={isActive && isInhale ? "#E88" : "#E8A0A0"}
            rx-transition={`${t}`}
            style={{ transition: `rx ${t} ${ease}, ry ${t} ${ease}, fill ${t} ${ease}` }} />
          {/* Inner mouth darkness for O shape */}
          {isActive && isInhale && (
            <ellipse cx="140" cy="218" rx={mouthWidth * 0.6} ry={mouthHeight * 0.6} fill="#C06060"
              style={{ transition: `rx ${t} ${ease}, ry ${t} ${ease}` }} />
          )}

          {/* ── AIR PARTICLES (exhale only) ── */}
          {showAir && (
            <g>
              {[0, 1, 2, 3, 4, 5].map(i => (
                <circle key={i} r={2 + i * 0.5} fill={color} opacity={0.4 - i * 0.05}
                  cx={140 + (i % 2 === 0 ? -1 : 1) * (4 + i * 3)}
                  cy={228 + i * 8}>
                  <animate attributeName="cy" from={228} to={228 + 50 + i * 10} dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from={0.5} to={0} dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
                  <animate attributeName="r" from={2} to={4 + i} dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </g>
          )}

          {/* Freckles */}
          <circle cx="112" cy="200" r="1.2" fill="#D4A574" opacity="0.4" />
          <circle cx="116" cy="202" r="1" fill="#D4A574" opacity="0.3" />
          <circle cx="109" cy="203" r="1.1" fill="#D4A574" opacity="0.35" />
          <circle cx="164" cy="200" r="1.2" fill="#D4A574" opacity="0.4" />
          <circle cx="168" cy="202" r="1" fill="#D4A574" opacity="0.3" />
          <circle cx="171" cy="203" r="1.1" fill="#D4A574" opacity="0.35" />
        </g>

        {/* ── SPARKLES when holding breath ── */}
        {isActive && isHold && (
          <g>
            {[
              { x: 60, y: 100, d: 0 },
              { x: 220, y: 80, d: 0.3 },
              { x: 45, y: 200, d: 0.6 },
              { x: 235, y: 180, d: 0.9 },
              { x: 80, y: 300, d: 0.4 },
              { x: 200, y: 290, d: 0.7 },
            ].map((s, i) => (
              <text key={i} x={s.x} y={s.y} fontSize="14" opacity="0.6" textAnchor="middle">
                ✨
                <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2s" begin={`${s.d}s`} repeatCount="indefinite" />
                <animate attributeName="y" from={s.y} to={s.y - 10} dur="2s" begin={`${s.d}s`} repeatCount="indefinite" />
              </text>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
