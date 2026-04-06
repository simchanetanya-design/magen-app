"use client";

import { useEffect, useState } from "react";

interface PandaBabyProps {
  phaseType: "inhale" | "hold-in" | "exhale" | "hold-out";
  duration: number;
  running: boolean;
}

export default function PandaBaby({ phaseType, duration, running }: PandaBabyProps) {
  const [animDur, setAnimDur] = useState(4);

  useEffect(() => {
    if (running) setAnimDur(duration);
  }, [phaseType, duration, running]);

  const active = running;
  const isInhale = phaseType === "inhale";
  const isHoldIn = phaseType === "hold-in";
  const isExhale = phaseType === "exhale";
  const isHoldOut = phaseType === "hold-out";

  // Belly: big on inhale+hold, small on exhale
  const bellyScaleX = active
    ? (isInhale || isHoldIn) ? 1.3 : isExhale ? 0.78 : 1
    : 1;
  const bellyScaleY = active
    ? (isInhale || isHoldIn) ? 1.25 : isExhale ? 0.82 : 1
    : 1;

  // Cheeks blush: intense red on hold-in
  const blushOpacity = active
    ? isHoldIn ? 0.85 : isInhale ? 0.4 : isExhale ? 0.25 : 0.15
    : 0.15;
  const blushScale = active
    ? isHoldIn ? 1.5 : isInhale ? 1.15 : 0.9
    : 1;

  // Eyes: wide on inhale, squeezed shut on hold, happy curve on exhale, normal on rest
  const eyeSquint = active
    ? isHoldIn ? true : false
    : false;
  const eyeHappy = active
    ? isExhale || isHoldOut ? true : false
    : false;

  // Mouth: O on inhale, puffed on hold, BIG smile on exhale, gentle smile on rest
  const mouthState = active
    ? isInhale ? "inhale" : isHoldIn ? "hold" : isExhale ? "bigsmile" : "smile"
    : "smile";

  // Stars: only on exhale
  const showStars = active && isExhale;

  // Body gentle bounce
  const bodyY = active
    ? isInhale ? -3 : isExhale ? 3 : 0
    : 0;

  // Ear wiggle
  const earRotate = active
    ? isInhale ? -5 : isExhale ? 5 : 0
    : 0;

  const t = `${animDur}s`;
  const ease = "ease-in-out";

  return (
    <div style={{ width: 300, height: 380, position: "relative" }}>
      <svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <defs>
          {/* Panda white fur */}
          <radialGradient id="pandaWhite" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F0EDE8" />
          </radialGradient>
          {/* Panda dark fur */}
          <radialGradient id="pandaDark" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#2D2D2D" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </radialGradient>
          {/* Belly white */}
          <radialGradient id="bellyGrad" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F5F0EA" />
          </radialGradient>
          {/* Pink blush */}
          <radialGradient id="pandaBlush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF8A8A" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF8A8A" stopOpacity="0" />
          </radialGradient>
          {/* Nose shine */}
          <radialGradient id="noseShine" cx="35%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#555" />
            <stop offset="100%" stopColor="#222" />
          </radialGradient>
          {/* Star glow */}
          <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Soft shadow */}
          <filter id="pandaShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* ═══ GROUND SHADOW ═══ */}
        <ellipse cx="150" cy="365" rx="70" ry="10" fill="#00000010" />

        {/* ═══ WHOLE BODY GROUP (bounce) ═══ */}
        <g style={{ transform: `translateY(${bodyY}px)`, transition: `transform ${t} ${ease}` }}>

          {/* ── FEET ── */}
          <ellipse cx="120" cy="345" rx="22" ry="14" fill="url(#pandaDark)" />
          <ellipse cx="180" cy="345" rx="22" ry="14" fill="url(#pandaDark)" />
          {/* Toe beans */}
          <circle cx="110" cy="342" r="4" fill="#3D3D3D" />
          <circle cx="120" cy="339" r="4" fill="#3D3D3D" />
          <circle cx="130" cy="342" r="4" fill="#3D3D3D" />
          <circle cx="170" cy="342" r="4" fill="#3D3D3D" />
          <circle cx="180" cy="339" r="4" fill="#3D3D3D" />
          <circle cx="190" cy="342" r="4" fill="#3D3D3D" />
          {/* Pink paw pads */}
          <circle cx="110" cy="342" r="2.5" fill="#FFAAAA" opacity="0.6" />
          <circle cx="120" cy="339" r="2.5" fill="#FFAAAA" opacity="0.6" />
          <circle cx="130" cy="342" r="2.5" fill="#FFAAAA" opacity="0.6" />
          <circle cx="170" cy="342" r="2.5" fill="#FFAAAA" opacity="0.6" />
          <circle cx="180" cy="339" r="2.5" fill="#FFAAAA" opacity="0.6" />
          <circle cx="190" cy="342" r="2.5" fill="#FFAAAA" opacity="0.6" />

          {/* ── BODY ── */}
          <ellipse cx="150" cy="290" rx="68" ry="72" fill="url(#pandaDark)" filter="url(#pandaShadow)" />

          {/* ── BELLY (animated) ── */}
          <ellipse cx="150" cy="295" rx="48" ry="52"
            fill="url(#bellyGrad)"
            style={{
              transform: `scale(${bellyScaleX}, ${bellyScaleY})`,
              transformOrigin: "150px 295px",
              transition: `transform ${t} ${ease}`,
            }}
          />
          {/* Belly button */}
          <ellipse cx="150" cy="310" rx="4" ry="5" fill="#E8DDD5" opacity="0.5"
            style={{
              transform: `scale(${bellyScaleX}, ${bellyScaleY})`,
              transformOrigin: "150px 310px",
              transition: `transform ${t} ${ease}`,
            }}
          />

          {/* ── ARMS ── */}
          {/* Left arm */}
          <ellipse cx="90" cy="275" rx="22" ry="36" fill="url(#pandaDark)" transform="rotate(15, 90, 275)" />
          {/* Right arm */}
          <ellipse cx="210" cy="275" rx="22" ry="36" fill="url(#pandaDark)" transform="rotate(-15, 210, 275)" />
          {/* Arm paw pads */}
          <circle cx="82" cy="300" r="8" fill="#3D3D3D" />
          <circle cx="218" cy="300" r="8" fill="#3D3D3D" />
          <circle cx="82" cy="300" r="5" fill="#FFAAAA" opacity="0.5" />
          <circle cx="218" cy="300" r="5" fill="#FFAAAA" opacity="0.5" />

          {/* ── HEAD ── */}
          <g filter="url(#pandaShadow)">
            {/* Head base */}
            <ellipse cx="150" cy="170" rx="62" ry="58" fill="url(#pandaWhite)" />

            {/* ── EARS (animated wiggle) ── */}
            <g style={{ transform: `rotate(${earRotate}deg)`, transformOrigin: "108px 118px", transition: `transform ${t} ${ease}` }}>
              <circle cx="96" cy="112" r="28" fill="url(#pandaDark)" />
              <circle cx="96" cy="112" r="16" fill="#3D3D3D" />
              <circle cx="96" cy="112" r="10" fill="#FFAAAA" opacity="0.35" />
            </g>
            <g style={{ transform: `rotate(${-earRotate}deg)`, transformOrigin: "192px 118px", transition: `transform ${t} ${ease}` }}>
              <circle cx="204" cy="112" r="28" fill="url(#pandaDark)" />
              <circle cx="204" cy="112" r="16" fill="#3D3D3D" />
              <circle cx="204" cy="112" r="10" fill="#FFAAAA" opacity="0.35" />
            </g>

            {/* ── EYE PATCHES (dark circles) ── */}
            <ellipse cx="122" cy="167" rx="24" ry="22" fill="url(#pandaDark)" transform="rotate(-8, 122, 167)" />
            <ellipse cx="178" cy="167" rx="24" ry="22" fill="url(#pandaDark)" transform="rotate(8, 178, 167)" />

            {/* ── EYES ── */}
            {eyeSquint ? (
              <>
                {/* Squeezed shut eyes - hold breath */}
                <path d="M110 167 Q122 160 134 167" stroke="#FFF" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M166 167 Q178 160 190 167" stroke="#FFF" strokeWidth="3" fill="none" strokeLinecap="round" />
              </>
            ) : eyeHappy ? (
              <>
                {/* Happy curved eyes - exhale smile */}
                <path d="M110 165 Q122 156 134 165" stroke="#FFF" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M166 165 Q178 156 190 165" stroke="#FFF" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                {/* Little sparkles near happy eyes */}
                <text x="138" y="158" fontSize="8" opacity="0.7">✦</text>
                <text x="158" y="158" fontSize="8" opacity="0.7">✦</text>
              </>
            ) : (
              <>
                {/* Normal open eyes */}
                <ellipse cx="122" cy="167" rx="11" ry="12" fill="#FFFFFF" />
                <ellipse cx="178" cy="167" rx="11" ry="12" fill="#FFFFFF" />
                {/* Pupils */}
                <ellipse cx="122" cy="169" rx="6.5" ry="7.5" fill="#1A1A1A" />
                <ellipse cx="178" cy="169" rx="6.5" ry="7.5" fill="#1A1A1A" />
                {/* Eye highlights */}
                <circle cx="118" cy="164" r="3" fill="#FFFFFF" />
                <circle cx="174" cy="164" r="3" fill="#FFFFFF" />
                <circle cx="125" cy="171" r="1.5" fill="#FFFFFF" opacity="0.6" />
                <circle cx="181" cy="171" r="1.5" fill="#FFFFFF" opacity="0.6" />
              </>
            )}

            {/* ── NOSE ── */}
            <ellipse cx="150" cy="186" rx="10" ry="7" fill="url(#noseShine)" />
            <ellipse cx="147" cy="184" rx="3" ry="2" fill="#444" opacity="0.3" />

            {/* ── CHEEK BLUSH (animated) ── */}
            <ellipse cx="108" cy="190" rx="16" ry="12"
              fill="url(#pandaBlush)"
              style={{
                opacity: blushOpacity,
                transform: `scale(${blushScale})`,
                transformOrigin: "108px 190px",
                transition: `opacity ${t} ${ease}, transform ${t} ${ease}`,
              }}
            />
            <ellipse cx="192" cy="190" rx="16" ry="12"
              fill="url(#pandaBlush)"
              style={{
                opacity: blushOpacity,
                transform: `scale(${blushScale})`,
                transformOrigin: "192px 190px",
                transition: `opacity ${t} ${ease}, transform ${t} ${ease}`,
              }}
            />

            {/* ── MOUTH ── */}
            {mouthState === "inhale" && (
              <>
                {/* O shape - breathing in */}
                <ellipse cx="150" cy="200" rx="8" ry="10" fill="#FF9999" />
                <ellipse cx="150" cy="200" rx="5" ry="7" fill="#E07777" />
              </>
            )}
            {mouthState === "hold" && (
              <>
                {/* Puffed cheeks - tiny closed mouth */}
                <ellipse cx="150" cy="198" rx="5" ry="3" fill="#FF9999" />
                <line x1="145" y1="198" x2="155" y2="198" stroke="#D07070" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
            {mouthState === "bigsmile" && (
              <>
                {/* Big peaceful smile */}
                <path d="M132 196 Q142 212 150 212 Q158 212 168 196" stroke="#E07777" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Tongue peek */}
                <ellipse cx="150" cy="208" rx="6" ry="4" fill="#FF9999" opacity="0.7" />
              </>
            )}
            {mouthState === "smile" && (
              <>
                {/* Gentle resting smile */}
                <path d="M138 196 Q144 204 150 204 Q156 204 162 196" stroke="#D09090" strokeWidth="2" fill="none" strokeLinecap="round" />
              </>
            )}

            {/* Whisker dots */}
            <circle cx="135" cy="190" r="1.2" fill="#AAAAAA" opacity="0.4" />
            <circle cx="165" cy="190" r="1.2" fill="#AAAAAA" opacity="0.4" />
          </g>

          {/* ═══ GLOWING STARS (exhale only) ═══ */}
          {showStars && (
            <g filter="url(#starGlow)">
              {[
                { x: 55, y: 140, size: 18, delay: 0, color: "#FFD700" },
                { x: 245, y: 120, size: 16, delay: 0.3, color: "#FFA500" },
                { x: 40, y: 240, size: 14, delay: 0.5, color: "#FFE44D" },
                { x: 260, y: 220, size: 17, delay: 0.2, color: "#FFD700" },
                { x: 70, y: 80, size: 13, delay: 0.7, color: "#FFC107" },
                { x: 230, y: 60, size: 15, delay: 0.4, color: "#FFE44D" },
                { x: 30, y: 180, size: 12, delay: 0.9, color: "#FFA500" },
                { x: 270, y: 170, size: 14, delay: 0.1, color: "#FFD700" },
                { x: 150, y: 50, size: 20, delay: 0.6, color: "#FFE44D" },
                { x: 85, y: 320, size: 11, delay: 0.8, color: "#FFC107" },
                { x: 215, y: 330, size: 13, delay: 0.35, color: "#FFD700" },
              ].map((star, i) => (
                <text key={i} x={star.x} y={star.y} fontSize={star.size} fill={star.color} textAnchor="middle" opacity="0.8">
                  ⭐
                  <animate attributeName="opacity" values="0;0.9;0.5;0.9;0" dur="2.5s" begin={`${star.delay}s`} repeatCount="indefinite" />
                  <animate attributeName="y" from={star.y} to={star.y - 30} dur="2.5s" begin={`${star.delay}s`} repeatCount="indefinite" />
                  <animateTransform attributeName="transform" type="rotate" values="0;15;-15;0" dur="3s" begin={`${star.delay}s`} repeatCount="indefinite" />
                </text>
              ))}
              {/* Extra sparkle particles */}
              {[
                { x: 100, y: 100, delay: 0.2 },
                { x: 200, y: 90, delay: 0.5 },
                { x: 60, y: 200, delay: 0.8 },
                { x: 240, y: 260, delay: 0.1 },
                { x: 150, y: 30, delay: 0.6 },
              ].map((sp, i) => (
                <circle key={`sp${i}`} cx={sp.x} cy={sp.y} r="3" fill="#FFE44D" opacity="0">
                  <animate attributeName="opacity" values="0;0.8;0" dur="1.8s" begin={`${sp.delay}s`} repeatCount="indefinite" />
                  <animate attributeName="r" values="1;4;1" dur="1.8s" begin={`${sp.delay}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </g>
          )}

          {/* ═══ HOLD BREATH EFFECT — steam/pressure lines ═══ */}
          {active && isHoldIn && (
            <g>
              {/* Pressure wavy lines near cheeks */}
              <path d="M78 180 Q72 175 78 170" stroke="#FF8A8A" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.5s" repeatCount="indefinite" />
              </path>
              <path d="M72 190 Q66 185 72 180" stroke="#FF8A8A" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round">
                <animate attributeName="opacity" values="0.1;0.5;0.1" dur="1.8s" repeatCount="indefinite" />
              </path>
              <path d="M222 180 Q228 175 222 170" stroke="#FF8A8A" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
              </path>
              <path d="M228 190 Q234 185 228 180" stroke="#FF8A8A" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round">
                <animate attributeName="opacity" values="0.1;0.5;0.1" dur="1.8s" begin="0.3s" repeatCount="indefinite" />
              </path>
              {/* Sweat drop */}
              <path d="M96 130 Q94 122 96 118 Q98 122 96 130Z" fill="#8ED8F8" opacity="0.6">
                <animate attributeName="opacity" values="0;0.7;0" dur="2s" repeatCount="indefinite" />
                <animate attributeName="d" values="M96 130 Q94 125 96 122 Q98 125 96 130Z;M96 136 Q94 128 96 124 Q98 128 96 136Z;M96 130 Q94 125 96 122 Q98 125 96 130Z" dur="2s" repeatCount="indefinite" />
              </path>
            </g>
          )}

        </g>
      </svg>
    </div>
  );
}
