import React from 'react';

interface TrustCharactersProps {
  className?: string;
}

export const TrustCharacters: React.FC<TrustCharactersProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-sm mx-auto flex items-end justify-center select-none ${className}`}>
      {/* Background ambient warm glow */}
      <div className="absolute inset-0 -m-6 rounded-full bg-gradient-to-r from-orange-500/15 via-purple-500/15 to-transparent blur-2xl pointer-events-none" />

      {/* Main SVG Scene with both characters */}
      <svg
        viewBox="0 0 460 270"
        className="w-full h-auto max-h-56 sm:max-h-64 drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Skin Gradient */}
          <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF0E3" />
            <stop offset="100%" stopColor="#F5BE98" />
          </linearGradient>

          {/* Orange Hoodie Gradient */}
          <linearGradient id="orangeHoodie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFA14A" />
            <stop offset="60%" stopColor="#FF6024" />
            <stop offset="100%" stopColor="#D93E0B" />
          </linearGradient>

          {/* Purple Hoodie Gradient */}
          <linearGradient id="purpleHoodie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9674FF" />
            <stop offset="60%" stopColor="#6D43EA" />
            <stop offset="100%" stopColor="#4523B0" />
          </linearGradient>

          {/* Hair Gradient */}
          <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A2E1B" />
            <stop offset="100%" stopColor="#2A170C" />
          </linearGradient>

          {/* Shadow filters */}
          <filter id="softCharShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Ambient background blob behind characters */}
        <ellipse cx="230" cy="190" rx="190" ry="70" fill="#201C24" opacity="0.6" />

        {/* Sweet little innocent sparkles near Left Character */}
        <g stroke="#FFA63D" strokeWidth="2.5" strokeLinecap="round" opacity="0.9">
          <line x1="38" y1="120" x2="24" y2="114" />
          <line x1="44" y1="102" x2="32" y2="92" />
          <circle cx="28" cy="80" r="1.5" fill="#FFEAA7" />
        </g>

        {/* Snarky / arrogant sparkle marks near Right Character */}
        <g stroke="#A88BFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.9">
          <line x1="420" y1="116" x2="434" y2="110" />
          <line x1="416" y1="98" x2="428" y2="88" />
        </g>

        {/* ========================================================
            CHARACTER 1: LEFT (ORANGE HOODIE - PURE SWEET INNOCENT)
           ======================================================== */}
        <g id="orange-character" className="animate-char-bob-1">
          {/* Orange Torso / Hoodie Body */}
          <path
            d="M50 270 C50 215 75 185 115 180 C155 185 180 215 180 270 Z"
            fill="url(#orangeHoodie)"
          />

          {/* Dark Undershirt Collar */}
          <path d="M102 182 Q115 198 128 182 Z" fill="#1C1820" />

          {/* Cute Hoodie Drawstrings */}
          <path
            d="M86 182 C98 200 132 200 144 182 C148 188 136 210 115 210 C94 210 82 188 86 182 Z"
            fill="#E04615"
          />
          <path d="M105 204 L104 225" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <path d="M125 204 L126 223" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

          {/* Neck */}
          <rect x="103" y="160" width="24" height="26" rx="6" fill="#F0B58D" />

          {/* Head & Face */}
          <ellipse cx="115" cy="130" rx="38" ry="42" fill="url(#skinGrad)" filter="url(#softCharShadow)" />

          {/* Ears */}
          <ellipse cx="76" cy="132" rx="7" ry="10" fill="#F0B58D" />
          <ellipse cx="154" cy="132" rx="7" ry="10" fill="#F0B58D" />

          {/* Fluffy Soft Brown Hair */}
          <path
            d="M74 126 C72 88 92 63 120 63 C148 63 160 86 158 120 C154 94 140 83 122 83 C98 83 82 98 74 126 Z"
            fill="url(#hairGrad)"
          />
          <path
            d="M80 95 C90 76 110 72 125 74 C136 76 148 84 154 96 C144 88 130 85 118 88 C104 91 92 102 88 114 C84 106 81 99 80 95 Z"
            fill="#382113"
          />
          <path d="M112 65 Q120 48 130 58 Q122 62 116 68 Z" fill="#5A3721" />

          {/* High, Gentle, Inquisitive Innocent Eyebrows */}
          <path d="M88 104 Q98 97 108 104" stroke="#331A0C" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M122 104 Q132 97 142 104" stroke="#331A0C" strokeWidth="3.5" strokeLinecap="round" />

          {/* Ultra-Innocent Big Sparkle Eyes */}
          <g id="innocent-eyes">
            <ellipse cx="98" cy="119" rx="8.5" ry="9.5" fill="#FFFFFF" />
            <ellipse cx="132" cy="119" rx="8.5" ry="9.5" fill="#FFFFFF" />
            <circle cx="98" cy="120" r="6.5" fill="#422212" />
            <circle cx="132" cy="120" r="6.5" fill="#422212" />
            <circle cx="98" cy="120" r="4" fill="#140804" />
            <circle cx="132" cy="120" r="4" fill="#140804" />
            <circle cx="96" cy="117.5" r="2.8" fill="#FFFFFF" />
            <circle cx="130" cy="117.5" r="2.8" fill="#FFFFFF" />
            <circle cx="100.5" cy="122.5" r="1.4" fill="#FFFFFF" opacity="0.9" />
            <circle cx="134.5" cy="122.5" r="1.4" fill="#FFFFFF" opacity="0.9" />
            <circle cx="97" cy="122" r="0.8" fill="#FFEAA7" />
            <circle cx="131" cy="122" r="0.8" fill="#FFEAA7" />
          </g>

          {/* Cute Tiny Button Nose */}
          <ellipse cx="115" cy="127" rx="2.5" ry="2" fill="#E89B72" />

          {/* Rosy Innocent Blushing Cheeks */}
          <ellipse cx="86" cy="132" rx="9" ry="5.5" fill="#FF7878" opacity="0.45" />
          <ellipse cx="144" cy="132" rx="9" ry="5.5" fill="#FF7878" opacity="0.45" />

          {/* Pure Joyful Childlike Smile */}
          <path d="M102 138 C102 154 128 154 128 138 Z" fill="#8B1E12" />
          <path d="M104 138 Q115 143 126 138 Z" fill="#FFFFFF" />
          <ellipse cx="115" cy="148" rx="6.5" ry="3.5" fill="#FF7080" />

          {/* Left Arm / Shoulder */}
          <path d="M50 270 C52 235 62 215 75 205 L60 270 Z" fill="#D63D0D" />

          {/* Reaching Hand: Sweet Inviting Beckon */}
          <g id="orange-reaching-hand" className="animate-innocent-hand">
            <path
              d="M135 210 C145 205 170 215 195 230 C190 245 160 250 140 235 Z"
              fill="url(#orangeHoodie)"
            />
            <ellipse cx="188" cy="226" rx="9" ry="14" fill="#C23205" transform="rotate(-15 188 226)" />

            <path
              d="M185 220 C195 210 220 215 228 230 C232 238 225 252 205 254 C190 255 182 242 185 220 Z"
              fill="url(#skinGrad)"
              filter="url(#softCharShadow)"
            />
            <path d="M190 218 Q198 210 205 216 Q200 224 193 224 Z" fill="#FFF0E3" />
            <path d="M205 220 Q222 215 228 223 Q222 229 208 228 Z" fill="#FFF0E3" />
            <path d="M208 228 Q228 226 230 234 Q224 240 210 236 Z" fill="#FFF0E3" />
            <path d="M206 236 Q224 238 225 245 Q218 249 205 244 Z" fill="#F5BE98" />
            <path d="M200 244 Q215 248 214 254 Q205 255 197 249 Z" fill="#E8AA82" />
          </g>
        </g>

        {/* ========================================================
            CHARACTER 2: RIGHT (PURPLE HOODIE UP, NO SPECS, SMUG ATTITUDE)
           ======================================================== */}
        <g id="purple-character" className="animate-char-bob-2">
          {/* Purple Torso */}
          <path
            d="M280 270 C280 215 305 185 345 180 C385 185 410 215 410 270 Z"
            fill="url(#purpleHoodie)"
          />

          {/* Undershirt Collar */}
          <path d="M332 182 Q345 198 358 182 Z" fill="#1C1820" />

          {/* ============================================
              HOOD PULLED UP AROUND HEAD (Backing Layer)
             ============================================ */}
          {/* Outer Hood Contour (High arc over head) */}
          <path
            d="M296 175 C292 110 304 52 345 52 C386 52 398 110 394 175 C378 190 312 190 296 175 Z"
            fill="url(#purpleHoodie)"
            filter="url(#softCharShadow)"
          />
          {/* Hood Inner Dark Shadow Cavity */}
          <path
            d="M304 165 C302 115 312 66 345 66 C378 66 388 115 386 165 C370 178 320 178 304 165 Z"
            fill="#32177D"
          />

          {/* Neck */}
          <rect x="333" y="156" width="24" height="26" rx="6" fill="#F0B58D" />

          {/* Head & Face (Framed inside the hood) */}
          <ellipse cx="345" cy="128" rx="35" ry="39" fill="url(#skinGrad)" filter="url(#softCharShadow)" />

          {/* Ears (partially tucked inside hood) */}
          <ellipse cx="311" cy="130" rx="5" ry="8" fill="#F0B58D" />
          <ellipse cx="379" cy="130" rx="5" ry="8" fill="#F0B58D" />

          {/* Dark Hair Tufts peeking from under hood rim */}
          <path
            d="M316 102 C325 86 345 84 355 86 C368 88 376 98 378 106 C368 96 352 92 342 96 C332 100 322 108 316 102 Z"
            fill="url(#hairGrad)"
          />
          {/* Sleek fringe bangs across forehead */}
          <path d="M324 96 Q335 110 344 98" fill="#2A170C" />
          <path d="M346 95 Q358 112 368 102" fill="#3D2010" />

          {/* ============================================
              HOODIE FRONT FABRIC OVERHANG / RIM
             ============================================ */}
          {/* Hood front edge framing the face */}
          <path
            d="M300 172 C298 112 310 60 345 60 C380 60 392 112 390 172 C382 165 384 116 345 116 C306 116 308 165 300 172 Z"
            fill="none"
            stroke="#8157F5"
            strokeWidth="3.5"
            opacity="0.6"
          />

          {/* Hood Collar & Hanging Drawstrings */}
          <path
            d="M314 182 C326 202 364 202 376 182 C380 188 368 212 345 212 C322 212 310 188 314 182 Z"
            fill="#522BBF"
          />
          <path d="M334 204 L333 230" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <path d="M356 204 L357 228" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

          {/* ============================================
              BARE FACE (NO SPECS) WITH SMUG ATTITUDE
             ============================================ */}
          {/* Asymmetrical Condescending Eyebrows */}
          {/* Left Brow: Arched high in skeptical superiority ("You really think so?") */}
          <path d="M319 96 Q328 86 339 96" stroke="#1C0D05" strokeWidth="4" strokeLinecap="round" />
          {/* Right Brow: Narrowed, sharp, cool judgment */}
          <path d="M351 106 L371 103" stroke="#1C0D05" strokeWidth="4" strokeLinecap="round" />

          {/* Smug, Half-Lidded Eyes (No Specs!) */}
          <g id="smug-eyes-no-specs">
            {/* Left Eye: Cool, amused, hooded */}
            <path d="M322 116 Q330 110 338 116" stroke="#140804" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="330" cy="119" rx="6" ry="4.5" fill="#FFFFFF" />
            <circle cx="331" cy="119" r="3.4" fill="#2E1B10" />
            <circle cx="330" cy="118" r="1.3" fill="#FFFFFF" />

            {/* Right Eye: Arrogant squint looking down */}
            <path d="M352 115 L368 114" stroke="#140804" strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="360" cy="118" rx="5.5" ry="3.5" fill="#FFFFFF" />
            <circle cx="360" cy="118" r="3" fill="#2E1B10" />
            <circle cx="359" cy="117" r="1.1" fill="#FFFFFF" />
          </g>

          {/* Nose */}
          <path d="M344 125 Q346 129 348 125" stroke="#D99468" strokeWidth="2.5" strokeLinecap="round" />

          {/* Smug, Asymmetrical Side Smirk */}
          <path
            d="M336 142 Q344 141 355 134"
            stroke="#63140C"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Smirk corner tuck */}
          <path d="M354 132 L358 136" stroke="#63140C" strokeWidth="3" strokeLinecap="round" />

          {/* LEFT HAND: DISMISSIVE "STOP RIGHT THERE" PALM */}
          <g id="purple-left-hand" className="animate-smug-palm" filter="url(#softCharShadow)">
            <path d="M305 240 Q310 205 320 185" stroke="url(#purpleHoodie)" strokeWidth="22" strokeLinecap="round" />
            <circle cx="318" cy="178" r="14" fill="#FFDFC4" />
            <rect x="306" y="152" width="6" height="18" rx="3" fill="#FFDFC4" />
            <rect x="313" y="148" width="6.5" height="22" rx="3" fill="#FFDFC4" />
            <rect x="321" y="150" width="6" height="20" rx="3" fill="#FFDFC4" />
            <rect x="328" y="155" width="5.5" height="15" rx="3" fill="#F5BE98" />
            <path d="M308 178 Q300 172 304 165 Q310 167 312 174 Z" fill="#FFDFC4" />
          </g>

          {/* RIGHT HAND: CONDESCENDING INDEX FINGER WAG */}
          <g id="purple-right-hand" className="animate-smug-finger" filter="url(#softCharShadow)">
            <path d="M385 240 Q380 205 370 185" stroke="url(#purpleHoodie)" strokeWidth="22" strokeLinecap="round" />
            <circle cx="370" cy="180" r="12" fill="#FFDFC4" />
            <rect x="366" y="142" width="7" height="26" rx="3.5" fill="#FFF0E3" />
            <circle cx="363" cy="176" r="4.5" fill="#F5BE98" />
            <circle cx="372" cy="178" r="4.5" fill="#F5BE98" />
            <circle cx="378" cy="176" r="4.5" fill="#E8AA82" />
            <path d="M362 172 Q368 168 375 174 Z" fill="#FFDFC4" />
          </g>
        </g>
      </svg>
    </div>
  );
};
