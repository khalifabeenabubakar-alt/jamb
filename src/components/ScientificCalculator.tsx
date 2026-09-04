import React, { useState } from 'react';
import { Calculator as CalcIcon, X, Minimize2, Maximize2, Move, RotateCcw } from 'lucide-react';

interface ScientificCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScientificCalculator: React.FC<ScientificCalculatorProps> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  const [angleMode, setAngleMode] = useState<'DEG' | 'RAD'>('DEG');
  const [memory, setMemory] = useState<number>(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSecondFunc, setIsSecondFunc] = useState(false);

  if (!isOpen) return null;

  const handleNumber = (digit: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(digit);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleOperator = (op: string) => {
    setFormula(formula + ' ' + display + ' ' + op);
    setDisplay('0');
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setFormula('');
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleCalculate = () => {
    try {
      let expression = (formula + ' ' + display)
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**');

      // evaluate safely with JS Math
      // eslint-disable-next-line no-eval
      const res = Function(`"use strict"; return (${expression})`)();
      if (isNaN(res) || !isFinite(res)) {
        setDisplay('Error');
      } else {
        // Round to reasonable precision
        const formatted = Number(res.toFixed(8)).toString();
        setDisplay(formatted);
        setFormula('');
      }
    } catch (err) {
      setDisplay('Error');
    }
  };

  const handleScientific = (func: string) => {
    try {
      const val = parseFloat(display);
      if (isNaN(val)) return;

      let result = 0;
      const angleMultiplier = angleMode === 'DEG' ? (Math.PI / 180) : 1;
      const invAngleMultiplier = angleMode === 'DEG' ? (180 / Math.PI) : 1;

      switch (func) {
        case 'sin':
          result = isSecondFunc ? Math.asin(val) * invAngleMultiplier : Math.sin(val * angleMultiplier);
          break;
        case 'cos':
          result = isSecondFunc ? Math.acos(val) * invAngleMultiplier : Math.cos(val * angleMultiplier);
          break;
        case 'tan':
          result = isSecondFunc ? Math.atan(val) * invAngleMultiplier : Math.tan(val * angleMultiplier);
          break;
        case 'log':
          result = Math.log10(val);
          break;
        case 'ln':
          result = Math.log(val);
          break;
        case 'sqrt':
          result = Math.sqrt(val);
          break;
        case 'cbrt':
          result = Math.cbrt(val);
          break;
        case 'sqr':
          result = Math.pow(val, 2);
          break;
        case 'cube':
          result = Math.pow(val, 3);
          break;
        case 'inv':
          result = 1 / val;
          break;
        case 'fact':
          result = factorial(Math.floor(val));
          break;
        case 'exp':
          result = Math.exp(val);
          break;
        case 'pi':
          result = Math.PI;
          break;
        case 'e':
          result = Math.E;
          break;
        case 'negate':
          result = -val;
          break;
        case 'percent':
          result = val / 100;
          break;
        default:
          return;
      }

      if (isNaN(result) || !isFinite(result)) {
        setDisplay('Error');
      } else {
        const formatted = Number(result.toFixed(8)).toString();
        setDisplay(formatted);
      }
    } catch (e) {
      setDisplay('Error');
    }
  };

  const factorial = (n: number): number => {
    if (n < 0 || n > 170) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  const handleMemory = (action: 'MC' | 'MR' | 'M+' | 'M-') => {
    const val = parseFloat(display) || 0;
    if (action === 'MC') setMemory(0);
    if (action === 'MR') setDisplay(memory.toString());
    if (action === 'M+') setMemory(memory + val);
    if (action === 'M-') setMemory(memory - val);
  };

  return (
    <div 
      className="fixed z-50 bottom-4 right-4 md:bottom-8 md:right-8 bg-slate-900 border-2 border-emerald-500/60 rounded-2xl shadow-2xl shadow-black/80 w-[95vw] sm:w-[380px] max-w-full overflow-hidden transition-all duration-200"
      id="cbt-scientific-calculator"
    >
      {/* Header Bar */}
      <div className="bg-slate-800 px-3.5 py-2.5 flex items-center justify-between border-b border-slate-700 cursor-move">
        <div className="flex items-center space-x-2">
          <CalcIcon className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-slate-100 uppercase tracking-wider">
            JAMB CBT Standard Calculator
          </span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-1.5 py-0.5 rounded border border-emerald-500/30">
            {angleMode}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-slate-100 transition"
            title={isMinimized ? "Expand" : "Minimize"}
            id="calc-btn-minimize"
          >
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-rose-500/20 hover:text-rose-400 rounded text-slate-400 transition"
            title="Close Calculator"
            id="calc-btn-close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="p-3 bg-slate-950 space-y-2.5">
          {/* LCD Screen */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-right font-mono select-all">
            <div className="text-[11px] text-slate-400 h-4 truncate">
              {formula || '\u00A0'}
            </div>
            <div className="text-2xl font-bold text-emerald-400 tracking-wider overflow-x-auto whitespace-nowrap">
              {display}
            </div>
          </div>

          {/* Mode & Memory row */}
          <div className="grid grid-cols-6 gap-1 text-xs">
            <button
              onClick={() => setAngleMode(angleMode === 'DEG' ? 'RAD' : 'DEG')}
              className={`py-1 rounded font-semibold transition ${
                angleMode === 'DEG' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
              id="calc-btn-deg-rad"
            >
              {angleMode}
            </button>
            <button
              onClick={() => setIsSecondFunc(!isSecondFunc)}
              className={`py-1 rounded font-semibold transition ${
                isSecondFunc ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
              id="calc-btn-2nd"
            >
              2nd
            </button>
            <button onClick={() => handleMemory('MC')} className="py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono">MC</button>
            <button onClick={() => handleMemory('MR')} className="py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono">MR</button>
            <button onClick={() => handleMemory('M+')} className="py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono">M+</button>
            <button onClick={() => handleMemory('M-')} className="py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono">M-</button>
          </div>

          {/* Scientific Keypad Grid */}
          <div className="grid grid-cols-5 gap-1 text-xs font-mono">
            <button onClick={() => handleScientific('sin')} className="py-1.5 bg-slate-800/90 hover:bg-slate-700 text-sky-400 rounded">
              {isSecondFunc ? 'sin⁻¹' : 'sin'}
            </button>
            <button onClick={() => handleScientific('cos')} className="py-1.5 bg-slate-800/90 hover:bg-slate-700 text-sky-400 rounded">
              {isSecondFunc ? 'cos⁻¹' : 'cos'}
            </button>
            <button onClick={() => handleScientific('tan')} className="py-1.5 bg-slate-800/90 hover:bg-slate-700 text-sky-400 rounded">
              {isSecondFunc ? 'tan⁻¹' : 'tan'}
            </button>
            <button onClick={() => handleScientific('log')} className="py-1.5 bg-slate-800/90 hover:bg-slate-700 text-sky-400 rounded">log</button>
            <button onClick={() => handleScientific('ln')} className="py-1.5 bg-slate-800/90 hover:bg-slate-700 text-sky-400 rounded">ln</button>

            <button onClick={() => handleScientific('sqrt')} className="py-1.5 bg-slate-800/90 hover:bg-slate-700 text-sky-400 rounded">√</button>
            <button onClick={() => handleScientific('sqr')} className="py-1.5 bg-slate-800/90 hover:bg-slate-700 text-sky-400 rounded">x²</button>
            <button onClick={() => handleOperator('^')} className="py-1.5 bg-slate-800/90 hover:bg-slate-700 text-sky-400 rounded">xʸ</button>
            <button onClick={() => handleScientific('inv')} className="py-1.5 bg-slate-800/90 hover:bg-slate-700 text-sky-400 rounded">1/x</button>
            <button onClick={() => handleScientific('fact')} className="py-1.5 bg-slate-800/90 hover:bg-slate-700 text-sky-400 rounded">n!</button>

            <button onClick={() => handleScientific('pi')} className="py-1.5 bg-slate-800/90 hover:bg-slate-700 text-emerald-400 rounded">π</button>
            <button onClick={() => handleScientific('e')} className="py-1.5 bg-slate-800/90 hover:bg-slate-700 text-emerald-400 rounded">e</button>
            <button onClick={() => handleOperator('(')} className="py-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-300 rounded">(</button>
            <button onClick={() => handleOperator(')')} className="py-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-300 rounded">)</button>
            <button onClick={handleClear} className="py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 font-bold rounded">AC</button>
          </div>

          {/* Standard Numeric Grid */}
          <div className="grid grid-cols-4 gap-1.5 text-sm font-semibold">
            <button onClick={() => handleNumber('7')} className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg">7</button>
            <button onClick={() => handleNumber('8')} className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg">8</button>
            <button onClick={() => handleNumber('9')} className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg">9</button>
            <button onClick={() => handleOperator('÷')} className="py-2.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 rounded-lg">÷</button>

            <button onClick={() => handleNumber('4')} className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg">4</button>
            <button onClick={() => handleNumber('5')} className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg">5</button>
            <button onClick={() => handleNumber('6')} className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg">6</button>
            <button onClick={() => handleOperator('×')} className="py-2.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 rounded-lg">×</button>

            <button onClick={() => handleNumber('1')} className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg">1</button>
            <button onClick={() => handleNumber('2')} className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg">2</button>
            <button onClick={() => handleNumber('3')} className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg">3</button>
            <button onClick={() => handleOperator('-')} className="py-2.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 rounded-lg">-</button>

            <button onClick={() => handleNumber('0')} className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg">0</button>
            <button onClick={handleDecimal} className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg">.</button>
            <button onClick={handleBackspace} className="py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg">⌫</button>
            <button onClick={() => handleOperator('+')} className="py-2.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 rounded-lg">+</button>
          </div>

          {/* Equals Row */}
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            <button 
              onClick={() => handleScientific('negate')} 
              className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded-lg"
            >
              ±
            </button>
            <button 
              onClick={() => handleScientific('percent')} 
              className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded-lg"
            >
              %
            </button>
            <button 
              onClick={handleCalculate} 
              className="col-span-2 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base rounded-lg transition shadow-lg shadow-emerald-500/20"
              id="calc-btn-equals"
            >
              =
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
