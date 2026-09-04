import React from 'react';
import { DiagramConfig } from '../types';

interface DiagramRendererProps {
  diagram: DiagramConfig;
  className?: string;
}

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({ diagram, className = '' }) => {
  if (!diagram || diagram.type === 'none') return null;

  return (
    <div className={`my-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center max-w-xl mx-auto shadow-inner ${className}`}>
      {diagram.title && (
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3 text-center">
          Fig: {diagram.title}
        </div>
      )}
      
      <div className="w-full flex items-center justify-center overflow-x-auto">
        {diagram.type === 'circuit' && <CircuitDiagram data={diagram.data} />}
        {diagram.type === 'lens' && <LensDiagram data={diagram.data} />}
        {diagram.type === 'circle_theorem' && <CircleTheoremDiagram data={diagram.data} />}
        {diagram.type === 'bearing' && <BearingDiagram data={diagram.data} />}
        {diagram.type === 'titration' && <TitrationDiagram data={diagram.data} />}
        {diagram.type === 'galvanic' && <GalvanicDiagram data={diagram.data} />}
        {diagram.type === 'nephron' && <NephronDiagram data={diagram.data} />}
        {diagram.type === 'flower' && <FlowerDiagram data={diagram.data} />}
        {diagram.type === 'eye' && <EyeDiagram data={diagram.data} />}
        {diagram.type === 'pulley' && <PulleyDiagram data={diagram.data} />}
        {diagram.type === 'trigonometry' && <TrigDiagram data={diagram.data} />}
      </div>
      
      <span className="text-[11px] text-slate-400 mt-2 italic">
        [100% Bundled Vector Diagram Asset — Zero Network Required]
      </span>
    </div>
  );
};

// --- SVG Diagram Implementations ---

const CircuitDiagram: React.FC<{ data?: any }> = ({ data }) => {
  const r1 = data?.r1 || '6 Ω';
  const r2 = data?.r2 || '3 Ω';
  const rSeries = data?.rSeries || '4 Ω';
  const voltage = data?.voltage || '12 V';

  return (
    <svg viewBox="0 0 380 180" className="w-full max-w-md h-auto text-slate-200">
      {/* Top series loop */}
      <line x1="30" y1="90" x2="80" y2="90" stroke="#38bdf8" strokeWidth="2.5" />
      
      {/* Cell Battery */}
      <line x1="80" y1="70" x2="80" y2="110" stroke="#10b981" strokeWidth="3" />
      <line x1="90" y1="80" x2="90" y2="100" stroke="#f43f5e" strokeWidth="4" />
      <text x="85" y="60" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">{voltage}</text>
      <text x="68" y="85" fill="#10b981" fontSize="10" fontWeight="bold">+</text>
      <text x="96" y="85" fill="#f43f5e" fontSize="10" fontWeight="bold">-</text>

      <line x1="90" y1="90" x2="130" y2="90" stroke="#38bdf8" strokeWidth="2.5" />

      {/* Series Resistor */}
      <rect x="130" y="78" width="50" height="24" rx="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
      <text x="155" y="94" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="bold">{rSeries}</text>

      <line x1="180" y1="90" x2="210" y2="90" stroke="#38bdf8" strokeWidth="2.5" />

      {/* Parallel Split Node */}
      <circle cx="210" cy="90" r="3.5" fill="#38bdf8" />
      <line x1="210" y1="90" x2="210" y2="45" stroke="#38bdf8" strokeWidth="2.5" />
      <line x1="210" y1="90" x2="210" y2="135" stroke="#38bdf8" strokeWidth="2.5" />

      {/* Top parallel branch */}
      <line x1="210" y1="45" x2="240" y2="45" stroke="#38bdf8" strokeWidth="2.5" />
      <rect x="240" y="33" width="50" height="24" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <text x="265" y="49" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">{r1}</text>
      <line x1="290" y1="45" x2="320" y2="45" stroke="#38bdf8" strokeWidth="2.5" />

      {/* Bottom parallel branch */}
      <line x1="210" y1="135" x2="240" y2="135" stroke="#38bdf8" strokeWidth="2.5" />
      <rect x="240" y="123" width="50" height="24" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <text x="265" y="139" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">{r2}</text>
      <line x1="290" y1="135" x2="320" y2="135" stroke="#38bdf8" strokeWidth="2.5" />

      {/* Recombine Node */}
      <line x1="320" y1="45" x2="320" y2="135" stroke="#38bdf8" strokeWidth="2.5" />
      <circle cx="320" cy="90" r="3.5" fill="#38bdf8" />

      {/* Return loop */}
      <line x1="320" y1="90" x2="350" y2="90" stroke="#38bdf8" strokeWidth="2.5" />
      <line x1="350" y1="90" x2="350" y2="165" stroke="#38bdf8" strokeWidth="2.5" />
      <line x1="350" y1="165" x2="30" y2="165" stroke="#38bdf8" strokeWidth="2.5" />
      <line x1="30" y1="165" x2="30" y2="90" stroke="#38bdf8" strokeWidth="2.5" />

      {/* Current Direction Arrow */}
      <polygon points="55,160 45,165 55,170" fill="#10b981" />
      <text x="65" y="160" fill="#10b981" fontSize="10" fontWeight="bold">I</text>
    </svg>
  );
};

const LensDiagram: React.FC<{ data?: any }> = () => {
  return (
    <svg viewBox="0 0 360 160" className="w-full max-w-md h-auto">
      {/* Principal Axis */}
      <line x1="10" y1="80" x2="350" y2="80" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 2" />

      {/* Convex Lens */}
      <ellipse cx="180" cy="80" rx="8" ry="65" fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2" />
      <line x1="180" y1="10" x2="180" y2="150" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />

      {/* Focal points */}
      <circle cx="120" cy="80" r="2.5" fill="#f59e0b" />
      <text x="120" y="96" textAnchor="middle" fill="#f59e0b" fontSize="10">F (15cm)</text>
      
      <circle cx="60" cy="80" r="2.5" fill="#f59e0b" />
      <text x="60" y="96" textAnchor="middle" fill="#f59e0b" fontSize="10">2F (30cm)</text>

      <circle cx="240" cy="80" r="2.5" fill="#f59e0b" />
      <text x="240" y="96" textAnchor="middle" fill="#f59e0b" fontSize="10">F'</text>
      
      <circle cx="300" cy="80" r="2.5" fill="#f59e0b" />
      <text x="300" y="96" textAnchor="middle" fill="#f59e0b" fontSize="10">2F'</text>

      {/* Object Arrow at 2F */}
      <line x1="60" y1="80" x2="60" y2="35" stroke="#10b981" strokeWidth="2.5" />
      <polygon points="56,38 60,30 64,38" fill="#10b981" />
      <text x="60" y="24" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Object</text>

      {/* Ray 1: Parallel to axis then through F' */}
      <line x1="60" y1="35" x2="180" y2="35" stroke="#ec4899" strokeWidth="1.5" />
      <line x1="180" y1="35" x2="300" y2="125" stroke="#ec4899" strokeWidth="1.5" />

      {/* Ray 2: Through optical center O */}
      <line x1="60" y1="35" x2="300" y2="125" stroke="#3b82f6" strokeWidth="1.5" />

      {/* Real Inverted Image at 2F' */}
      <line x1="300" y1="80" x2="300" y2="125" stroke="#f43f5e" strokeWidth="2.5" />
      <polygon points="296,120 300,128 304,120" fill="#f43f5e" />
      <text x="300" y="145" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">Image (Real)</text>
    </svg>
  );
};

const CircleTheoremDiagram: React.FC<{ data?: any }> = ({ data }) => {
  const angleCenter = data?.angleCenter || 130;
  const angleCircumference = data?.angleCircumference || 65;

  return (
    <svg viewBox="0 0 240 240" className="w-48 h-48">
      {/* Circle */}
      <circle cx="120" cy="120" r="90" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
      <circle cx="120" cy="120" r="4" fill="#f59e0b" />
      <text x="120" y="112" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">O</text>

      {/* Points A, B, C */}
      {/* C at top */}
      <circle cx="120" cy="30" r="3.5" fill="#10b981" />
      <text x="120" y="20" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">C ({angleCircumference}°)</text>

      {/* A bottom left */}
      <circle cx="50" cy="175" r="3.5" fill="#e2e8f0" />
      <text x="35" y="185" fill="#e2e8f0" fontSize="12" fontWeight="bold">A</text>

      {/* B bottom right */}
      <circle cx="190" cy="175" r="3.5" fill="#e2e8f0" />
      <text x="200" y="185" fill="#e2e8f0" fontSize="12" fontWeight="bold">B</text>

      {/* Lines to Center O */}
      <line x1="50" y1="175" x2="120" y2="120" stroke="#f59e0b" strokeWidth="2" />
      <line x1="190" y1="175" x2="120" y2="120" stroke="#f59e0b" strokeWidth="2" />
      <text x="120" y="150" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="bold">{angleCenter}°</text>

      {/* Lines to Circumference C */}
      <line x1="50" y1="175" x2="120" y2="30" stroke="#10b981" strokeWidth="2" />
      <line x1="190" y1="175" x2="120" y2="30" stroke="#10b981" strokeWidth="2" />

      {/* Base Chord */}
      <line x1="50" y1="175" x2="190" y2="175" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
};

const BearingDiagram: React.FC<{ data?: any }> = ({ data }) => {
  return (
    <svg viewBox="0 0 260 200" className="w-56 h-44">
      {/* North Arrow at A */}
      <line x1="60" y1="140" x2="60" y2="40" stroke="#e2e8f0" strokeWidth="2" />
      <polygon points="56,45 60,35 64,45" fill="#e2e8f0" />
      <text x="60" y="28" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">N</text>

      {/* Point A */}
      <circle cx="60" cy="140" r="4" fill="#38bdf8" />
      <text x="45" y="155" fill="#38bdf8" fontSize="12" fontWeight="bold">Point A</text>

      {/* Bearing Line to Point B (60 degrees) */}
      <line x1="60" y1="140" x2="200" y2="60" stroke="#10b981" strokeWidth="2.5" />
      <circle cx="200" cy="60" r="4" fill="#10b981" />
      <text x="210" y="55" fill="#10b981" fontSize="12" fontWeight="bold">Point B</text>
      <text x="130" y="90" fill="#10b981" fontSize="11" fontWeight="bold">120 km</text>

      {/* Angle Arc 60 deg */}
      <path d="M 60,100 A 40,40 0 0,1 94,115" fill="none" stroke="#f59e0b" strokeWidth="2" />
      <text x="80" y="95" fill="#fcd34d" fontSize="11" fontWeight="bold">060°</text>

      {/* Horizontal East Component */}
      <line x1="60" y1="140" x2="200" y2="140" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="200" y1="140" x2="200" y2="60" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="130" y="158" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">East = 103.9 km</text>
    </svg>
  );
};

const TitrationDiagram: React.FC<{ data?: any }> = () => {
  return (
    <svg viewBox="0 0 200 200" className="w-44 h-44">
      {/* Burette stand */}
      <line x1="40" y1="180" x2="100" y2="180" stroke="#64748b" strokeWidth="4" />
      <line x1="60" y1="180" x2="60" y2="20" stroke="#64748b" strokeWidth="3" />
      <line x1="60" y1="60" x2="100" y2="60" stroke="#64748b" strokeWidth="2" />

      {/* Burette tube */}
      <rect x="94" y="20" width="12" height="90" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <rect x="96" y="40" width="8" height="68" fill="#38bdf8" fillOpacity="0.5" />
      <line x1="97" y1="110" x2="103" y2="120" stroke="#38bdf8" strokeWidth="2" />
      {/* Stopcock */}
      <circle cx="100" cy="115" r="3" fill="#f43f5e" />
      <text x="120" y="55" fill="#38bdf8" fontSize="10">Burette (Acid)</text>

      {/* Conical Flask */}
      <path d="M 92,130 L 108,130 L 125,175 L 75,175 Z" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
      <path d="M 80,160 L 120,160 L 123,173 L 77,173 Z" fill="#ec4899" fillOpacity="0.5" />
      <text x="100" y="195" textAnchor="middle" fill="#10b981" fontSize="10">25.0 cm³ Base + Indicator</text>
    </svg>
  );
};

const GalvanicDiagram: React.FC<{ data?: any }> = () => {
  return (
    <svg viewBox="0 0 280 160" className="w-56 h-36">
      {/* Beaker 1 Anode Zn */}
      <rect x="30" y="60" width="70" height="70" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
      <rect x="32" y="80" width="66" height="48" fill="#38bdf8" fillOpacity="0.3" />
      <rect x="45" y="40" width="12" height="60" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
      <text x="51" y="32" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Zn (-)</text>

      {/* Beaker 2 Cathode Cu */}
      <rect x="180" y="60" width="70" height="70" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
      <rect x="182" y="80" width="66" height="48" fill="#3b82f6" fillOpacity="0.4" />
      <rect x="223" y="40" width="12" height="60" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
      <text x="229" y="32" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Cu (+)</text>

      {/* Salt Bridge */}
      <path d="M 75,90 L 75,50 L 205,50 L 205,90" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
      <text x="140" y="42" textAnchor="middle" fill="#10b981" fontSize="10">Salt Bridge (KNO₃)</text>

      {/* Voltmeter wire */}
      <path d="M 51,40 L 51,20 L 130,20" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
      <circle cx="140" cy="20" r="10" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="140" y="24" textAnchor="middle" fill="#f43f5e" fontSize="10" fontWeight="bold">V</text>
      <path d="M 150,20 L 229,20 L 229,40" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
    </svg>
  );
};

const NephronDiagram: React.FC<{ data?: any }> = () => {
  return (
    <svg viewBox="0 0 260 180" className="w-56 h-40">
      {/* Glomerulus / Bowman's Capsule */}
      <circle cx="50" cy="50" r="22" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
      <circle cx="50" cy="50" r="12" fill="#f43f5e" fillOpacity="0.4" />
      <text x="50" y="20" textAnchor="middle" fill="#f43f5e" fontSize="9" fontWeight="bold">Bowman's Capsule</text>

      {/* Proximal Tubule */}
      <path d="M 70,55 Q 100,40 110,70 T 120,90" fill="none" stroke="#38bdf8" strokeWidth="4" />
      <text x="110" y="45" fill="#38bdf8" fontSize="9">Proximal Tubule</text>

      {/* Loop of Henle */}
      <path d="M 120,90 L 120,150 Q 135,165 150,150 L 150,80" fill="none" stroke="#f59e0b" strokeWidth="4" />
      <text x="135" y="175" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Loop of Henle</text>

      {/* Distal & Collecting Duct */}
      <path d="M 150,80 Q 170,70 190,85 L 210,85" fill="none" stroke="#38bdf8" strokeWidth="4" />
      <line x1="210" y1="40" x2="210" y2="160" stroke="#10b981" strokeWidth="6" />
      <text x="210" y="30" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">Collecting Duct</text>
    </svg>
  );
};

const EyeDiagram: React.FC<{ data?: any }> = () => {
  return (
    <svg viewBox="0 0 280 150" className="w-56 h-36">
      {/* Eyeball outer */}
      <path d="M 70,75 C 70,30 220,30 220,75 C 220,120 70,120 70,75 Z" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
      
      {/* Cornea & Lens */}
      <path d="M 70,55 C 55,65 55,85 70,95" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
      <ellipse cx="85" cy="75" rx="5" ry="18" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1.5" />

      {/* Retina back */}
      <path d="M 200,45 C 220,60 220,90 200,105" fill="none" stroke="#f59e0b" strokeWidth="3" />
      <text x="235" y="80" fill="#f59e0b" fontSize="9" fontWeight="bold">Retina</text>

      {/* Myopia: rays converge in FRONT of retina */}
      <line x1="20" y1="65" x2="85" y2="65" stroke="#f43f5e" strokeWidth="1.5" />
      <line x1="20" y1="85" x2="85" y2="85" stroke="#f43f5e" strokeWidth="1.5" />
      
      <line x1="85" y1="65" x2="165" y2="75" stroke="#f43f5e" strokeWidth="1.5" />
      <line x1="85" y1="85" x2="165" y2="75" stroke="#f43f5e" strokeWidth="1.5" />
      
      <circle cx="165" cy="75" r="3" fill="#f43f5e" />
      <text x="165" y="98" textAnchor="middle" fill="#f43f5e" fontSize="8" fontWeight="bold">Focal Point (Front of Retina)</text>
    </svg>
  );
};

const FlowerDiagram: React.FC<{ data?: any }> = () => {
  return (
    <svg viewBox="0 0 220 180" className="w-48 h-40">
      {/* Receptacle & Stem */}
      <line x1="110" y1="140" x2="110" y2="175" stroke="#10b981" strokeWidth="4" />
      <ellipse cx="110" cy="140" rx="20" ry="8" fill="#10b981" />

      {/* Petals */}
      <ellipse cx="75" cy="95" rx="25" ry="35" transform="rotate(-30 75 95)" fill="#ec4899" fillOpacity="0.3" stroke="#ec4899" strokeWidth="1.5" />
      <ellipse cx="145" cy="95" rx="25" ry="35" transform="rotate(30 145 95)" fill="#ec4899" fillOpacity="0.3" stroke="#ec4899" strokeWidth="1.5" />

      {/* Carpel / Pistil (Center) */}
      <path d="M 105,80 L 105,120 C 95,125 95,135 110,135 C 125,135 125,125 115,120 L 115,80 Z" fill="#10b981" stroke="#059669" strokeWidth="1.5" />
      <circle cx="110" cy="76" r="6" fill="#f59e0b" />
      <text x="110" y="65" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Stigma</text>
      <text x="110" y="130" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">Ovary</text>

      {/* Stamens */}
      <path d="M 90,130 Q 75,90 70,80" fill="none" stroke="#fcd34d" strokeWidth="1.5" />
      <ellipse cx="70" cy="78" rx="4" ry="2.5" fill="#f59e0b" />

      <path d="M 130,130 Q 145,90 150,80" fill="none" stroke="#fcd34d" strokeWidth="1.5" />
      <ellipse cx="150" cy="78" rx="4" ry="2.5" fill="#f59e0b" />
    </svg>
  );
};

const PulleyDiagram: React.FC<{ data?: any }> = () => {
  return (
    <svg viewBox="0 0 200 200" className="w-44 h-44">
      {/* Top Beam */}
      <line x1="30" y1="20" x2="170" y2="20" stroke="#94a3b8" strokeWidth="4" />
      
      {/* Top Fixed Pulleys */}
      <circle cx="85" cy="45" r="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="115" cy="45" r="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />

      {/* Bottom Movable Pulleys */}
      <circle cx="85" cy="120" r="14" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
      <circle cx="115" cy="120" r="14" fill="#1e293b" stroke="#10b981" strokeWidth="2" />

      {/* Hanging Load */}
      <rect x="80" y="150" width="40" height="26" fill="#f59e0b" rx="2" />
      <text x="100" y="167" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">Load 750N</text>
      <line x1="100" y1="134" x2="100" y2="150" stroke="#f59e0b" strokeWidth="2" />

      {/* Effort String */}
      <line x1="131" y1="45" x2="150" y2="140" stroke="#f43f5e" strokeWidth="2" />
      <polygon points="147,135 150,145 153,135" fill="#f43f5e" />
      <text x="165" y="145" fill="#f43f5e" fontSize="9" fontWeight="bold">Effort 250N</text>
    </svg>
  );
};

const TrigDiagram: React.FC<{ data?: any }> = () => {
  return (
    <svg viewBox="0 0 200 160" className="w-44 h-36">
      {/* Right triangle */}
      <polygon points="30,130 160,130 160,30" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <rect x="145" y="115" width="15" height="15" fill="none" stroke="#64748b" strokeWidth="1.5" />
      
      <text x="95" y="145" textAnchor="middle" fill="#38bdf8" fontSize="10">Base (Adjacent)</text>
      <text x="175" y="80" fill="#10b981" fontSize="10">Height</text>
      <text x="80" y="70" textAnchor="middle" fill="#f59e0b" fontSize="10">Hypotenuse (r)</text>
      
      <text x="50" y="125" fill="#fcd34d" fontSize="11" fontWeight="bold">θ</text>
    </svg>
  );
};
