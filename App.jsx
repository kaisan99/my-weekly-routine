import React, { useState, useEffect, useMemo } from 'react';
import {
  CalendarDays,
  GraduationCap,
  Briefcase,
  Dumbbell,
  BookOpen,
  FileText,
  Calculator,
  Languages,
  Code,
  Footprints,
  CalendarCheck,
  RotateCcw,
  Copy,
  Check,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

// ==========================================
// CONSTANTS & INITIAL DATA SCHEMA
// ==========================================

const COLOR_MAP = {
  Arbeit: '#64748B',
  Klausurvorbereitung: '#5278CC',
  Hausarbeit: '#5278CC',
  GMAT: '#15988B',
  TOEFL: '#15988B',
  Java: '#9672CF',
  Fitnessstudio: '#DC9149',
  Joggen: '#DC9149',
  Lesen: '#B18C62',
  Wochenplanung: '#9399A3',
  Allgemein: '#15988B'
};

const INITIAL_SCHEDULE = [
  {
    dayId: 'montag',
    dayName: 'Montag',
    dayShort: 'MO',
    subtitle: 'Arbeit & Studium',
    tasks: [
      { id: 'monday-gmat', name: 'GMAT', category: 'GMAT', durationMinutes: 30, displayTime: '30 min', icon: 'Calculator', color: COLOR_MAP.GMAT },
      { id: 'monday-toefl', name: 'TOEFL', category: 'TOEFL', durationMinutes: 30, displayTime: '30 min', icon: 'Languages', color: COLOR_MAP.TOEFL },
      { id: 'monday-work', name: 'Arbeit', category: 'Arbeit', durationMinutes: 450, displayTime: '7,5 h', icon: 'Briefcase', color: COLOR_MAP.Arbeit },
      { id: 'monday-exam', name: 'Klausurvorbereitung', category: 'Klausurvorbereitung', durationMinutes: 90, displayTime: '1,5 h', icon: 'GraduationCap', color: COLOR_MAP.Klausurvorbereitung },
      { id: 'monday-reading', name: 'Lesen', category: 'Lesen', durationMinutes: 30, displayTime: '30 min', icon: 'BookOpen', color: COLOR_MAP.Lesen }
    ]
  },
  {
    dayId: 'dienstag',
    dayName: 'Dienstag',
    dayShort: 'DI',
    subtitle: 'Arbeit & Studium',
    tasks: [
      { id: 'tuesday-gmat', name: 'GMAT', category: 'GMAT', durationMinutes: 30, displayTime: '30 min', icon: 'Calculator', color: COLOR_MAP.GMAT },
      { id: 'tuesday-toefl', name: 'TOEFL', category: 'TOEFL', durationMinutes: 30, displayTime: '30 min', icon: 'Languages', color: COLOR_MAP.TOEFL },
      { id: 'tuesday-work', name: 'Arbeit', category: 'Arbeit', durationMinutes: 450, displayTime: '7,5 h', icon: 'Briefcase', color: COLOR_MAP.Arbeit },
      { id: 'tuesday-exam', name: 'Klausurvorbereitung', category: 'Klausurvorbereitung', durationMinutes: 90, displayTime: '1,5 h', icon: 'GraduationCap', color: COLOR_MAP.Klausurvorbereitung },
      { id: 'tuesday-reading', name: 'Lesen', category: 'Lesen', durationMinutes: 30, displayTime: '30 min', icon: 'BookOpen', color: COLOR_MAP.Lesen }
    ]
  },
  {
    dayId: 'mittwoch',
    dayName: 'Mittwoch',
    dayShort: 'MI',
    subtitle: 'Arbeit, Fitness & Java',
    tasks: [
      { id: 'wednesday-gmat', name: 'GMAT', category: 'GMAT', durationMinutes: 30, displayTime: '30 min', icon: 'Calculator', color: COLOR_MAP.GMAT },
      { id: 'wednesday-toefl', name: 'TOEFL', category: 'TOEFL', durationMinutes: 30, displayTime: '30 min', icon: 'Languages', color: COLOR_MAP.TOEFL },
      { id: 'wednesday-work', name: 'Arbeit', category: 'Arbeit', durationMinutes: 300, displayTime: '5 h', icon: 'Briefcase', color: COLOR_MAP.Arbeit },
      { id: 'wednesday-gym', name: 'Ganzkörper A', category: 'Fitnessstudio', durationMinutes: 75, displayTime: '1,25 h', icon: 'Dumbbell', color: COLOR_MAP.Fitnessstudio },
      { id: 'wednesday-exam', name: 'Klausurvorbereitung', category: 'Klausurvorbereitung', durationMinutes: 60, displayTime: '1 h', icon: 'GraduationCap', color: COLOR_MAP.Klausurvorbereitung },
      { id: 'wednesday-java', name: 'Java', category: 'Java', durationMinutes: 90, displayTime: '1,5 h', icon: 'Code', color: COLOR_MAP.Java },
      { id: 'wednesday-reading', name: 'Lesen', category: 'Lesen', durationMinutes: 30, displayTime: '30 min', icon: 'BookOpen', color: COLOR_MAP.Lesen }
    ]
  },
  {
    dayId: 'donnerstag',
    dayName: 'Donnerstag',
    dayShort: 'DO',
    subtitle: 'Intensiver Studientag',
    tasks: [
      { id: 'thursday-gmat', name: 'GMAT', category: 'GMAT', durationMinutes: 30, displayTime: '30 min', icon: 'Calculator', color: COLOR_MAP.GMAT },
      { id: 'thursday-toefl', name: 'TOEFL', category: 'TOEFL', durationMinutes: 30, displayTime: '30 min', icon: 'Languages', color: COLOR_MAP.TOEFL },
      { id: 'thursday-exam', name: 'Klausurvorbereitung', category: 'Klausurvorbereitung', durationMinutes: 120, displayTime: '2 h', icon: 'GraduationCap', color: COLOR_MAP.Klausurvorbereitung },
      { id: 'thursday-paper', name: 'Hausarbeit', category: 'Hausarbeit', durationMinutes: 120, displayTime: '2 h', icon: 'FileText', color: COLOR_MAP.Hausarbeit },
      { id: 'thursday-java', name: 'Java', category: 'Java', durationMinutes: 90, displayTime: '1,5 h', icon: 'Code', color: COLOR_MAP.Java },
      { id: 'thursday-reading', name: 'Lesen', category: 'Lesen', durationMinutes: 30, displayTime: '30 min', icon: 'BookOpen', color: COLOR_MAP.Lesen }
    ]
  },
  {
    dayId: 'freitag',
    dayName: 'Freitag',
    dayShort: 'FR',
    subtitle: 'Studium & Fitness',
    tasks: [
      { id: 'friday-gmat', name: 'GMAT', category: 'GMAT', durationMinutes: 30, displayTime: '30 min', icon: 'Calculator', color: COLOR_MAP.GMAT },
      { id: 'friday-toefl', name: 'TOEFL', category: 'TOEFL', durationMinutes: 30, displayTime: '30 min', icon: 'Languages', color: COLOR_MAP.TOEFL },
      { id: 'friday-exam', name: 'Klausurvorbereitung', category: 'Klausurvorbereitung', durationMinutes: 120, displayTime: '2 h', icon: 'GraduationCap', color: COLOR_MAP.Klausurvorbereitung },
      { id: 'friday-java', name: 'Java', category: 'Java', durationMinutes: 90, displayTime: '1,5 h', icon: 'Code', color: COLOR_MAP.Java },
      { id: 'friday-gym', name: 'Ganzkörper B', category: 'Fitnessstudio', durationMinutes: 75, displayTime: '1,25 h', icon: 'Dumbbell', color: COLOR_MAP.Fitnessstudio },
      { id: 'friday-reading', name: 'Lesen', category: 'Lesen', durationMinutes: 30, displayTime: '30 min', icon: 'BookOpen', color: COLOR_MAP.Lesen }
    ]
  },
  {
    dayId: 'samstag',
    dayName: 'Samstag',
    dayShort: 'SA',
    subtitle: 'Hausarbeit & Java',
    tasks: [
      { id: 'saturday-gmat', name: 'GMAT', category: 'GMAT', durationMinutes: 30, displayTime: '30 min', icon: 'Calculator', color: COLOR_MAP.GMAT },
      { id: 'saturday-toefl', name: 'TOEFL', category: 'TOEFL', durationMinutes: 30, displayTime: '30 min', icon: 'Languages', color: COLOR_MAP.TOEFL },
      { id: 'saturday-paper', name: 'Hausarbeit', category: 'Hausarbeit', durationMinutes: 120, displayTime: '2 h', icon: 'FileText', color: COLOR_MAP.Hausarbeit },
      { id: 'saturday-exam', name: 'Klausurvorbereitung', category: 'Klausurvorbereitung', durationMinutes: 90, displayTime: '1,5 h', icon: 'GraduationCap', color: COLOR_MAP.Klausurvorbereitung },
      { id: 'saturday-java', name: 'Java', category: 'Java', durationMinutes: 90, displayTime: '1,5 h', icon: 'Code', color: COLOR_MAP.Java },
      { id: 'saturday-reading', name: 'Lesen', category: 'Lesen', durationMinutes: 30, displayTime: '30 min', icon: 'BookOpen', color: COLOR_MAP.Lesen }
    ]
  },
  {
    dayId: 'sonntag',
    dayName: 'Sonntag',
    dayShort: 'SO',
    subtitle: 'Hausarbeit & Wiederholung',
    tasks: [
      { id: 'sunday-gmat', name: 'GMAT', category: 'GMAT', durationMinutes: 30, displayTime: '30 min', icon: 'Calculator', color: COLOR_MAP.GMAT },
      { id: 'sunday-toefl', name: 'TOEFL', category: 'TOEFL', durationMinutes: 30, displayTime: '30 min', icon: 'Languages', color: COLOR_MAP.TOEFL },
      { id: 'sunday-exam-review', name: 'Klausurwiederholung', category: 'Klausurvorbereitung', durationMinutes: 60, displayTime: '1 h', icon: 'GraduationCap', color: COLOR_MAP.Klausurvorbereitung },
      { id: 'sunday-paper', name: 'Hausarbeit', category: 'Hausarbeit', durationMinutes: 120, displayTime: '2 h', icon: 'FileText', color: COLOR_MAP.Hausarbeit },
      { id: 'sunday-run', name: 'Joggen', category: 'Joggen', durationMinutes: 45, displayTime: '45 min', icon: 'Footprints', color: COLOR_MAP.Joggen },
      { id: 'sunday-planning', name: 'Wochenplanung', category: 'Wochenplanung', durationMinutes: 30, displayTime: '30 min', icon: 'CalendarCheck', color: COLOR_MAP.Wochenplanung },
      { id: 'sunday-reading', name: 'Lesen', category: 'Lesen', durationMinutes: 30, displayTime: '30 min', icon: 'BookOpen', color: COLOR_MAP.Lesen }
    ]
  }
];

// Helper to render dynamic Lucide Icons
const IconRenderer = ({ name, className = '', size = 18, style = {} }) => {
  const props = { className, size, style };
  switch (name) {
    case 'Briefcase': return <Briefcase {...props} />;
    case 'GraduationCap': return <GraduationCap {...props} />;
    case 'FileText': return <FileText {...props} />;
    case 'Calculator': return <Calculator {...props} />;
    case 'Languages': return <Languages {...props} />;
    case 'Code': return <Code {...props} />;
    case 'Dumbbell': return <Dumbbell {...props} />;
    case 'Footprints': return <Footprints {...props} />;
    case 'BookOpen': return <BookOpen {...props} />;
    case 'CalendarCheck': return <CalendarCheck {...props} />;
    case 'CalendarDays': return <CalendarDays {...props} />;
    case 'RotateCcw': return <RotateCcw {...props} />;
    case 'Copy': return <Copy {...props} />;
    case 'Check': return <Check {...props} />;
    default: return <BookOpen {...props} />;
  }
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  // State for task completion (IDs mapped to boolean)
  const [completedMap, setCompletedMap] = useState(() => {
    try {
      const saved = localStorage.getItem('my_weekly_routine_completed');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Filter State: 'all' | 'open' | 'completed'
  const [filterMode, setFilterMode] = useState(() => {
    try {
      const saved = localStorage.getItem('my_weekly_routine_filter');
      return saved || 'all';
    } catch (e) {
      return 'all';
    }
  });

  // Modal State for reset confirmation
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  
  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('my_weekly_routine_completed', JSON.stringify(completedMap));
    } catch (e) {
      // LocalStorage might be restricted
    }
  }, [completedMap]);

  useEffect(() => {
    try {
      localStorage.setItem('my_weekly_routine_filter', filterMode);
    } catch (e) {
      // LocalStorage fallback
    }
  }, [filterMode]);

  // Toast trigger helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Toggle single task completed state
  const toggleTask = (taskId) => {
    setCompletedMap((prev) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Reset all tasks
  const handleResetAll = () => {
    setCompletedMap({});
    setIsResetModalOpen(false);
    showToast('Alle Aufgaben wurden erfolgreich zurückgesetzt.');
  };

  // Extract all flat tasks array
  const allTasks = useMemo(() => {
    const list = [];
    INITIAL_SCHEDULE.forEach((day) => {
      day.tasks.forEach((task) => {
        list.push({ ...task, dayName: day.dayName });
      });
    });
    return list;
  }, []);

  // Total count of tasks
  const totalTaskCount = allTasks.length; // 42

  // Calculation metrics derived from completedMap
  const stats = useMemo(() => {
    let completedCount = 0;
    let workMinutes = 0;
    let learningMinutes = 0;
    let sportUnits = 0;
    let readingDays = 0;

    // Detailed minutes per goal category
    const learningCategoryMinutes = {
      Klausurvorbereitung: 0,
      Hausarbeit: 0,
      Java: 0,
      GMAT: 0,
      TOEFL: 0
    };

    allTasks.forEach((task) => {
      const isDone = !!completedMap[task.id];
      if (isDone) {
        completedCount++;

        // Work
        if (task.category === 'Arbeit') {
          workMinutes += task.durationMinutes;
        }

        // Academic Learning (Klausurvorbereitung, Hausarbeit, Java, GMAT, TOEFL)
        if (
          ['Klausurvorbereitung', 'Hausarbeit', 'Java', 'GMAT', 'TOEFL'].includes(task.category)
        ) {
          learningMinutes += task.durationMinutes;
          learningCategoryMinutes[task.category] += task.durationMinutes;
        }

        // Sport (Fitnessstudio, Joggen)
        if (task.category === 'Fitnessstudio' || task.category === 'Joggen') {
          sportUnits += 1;
        }

        // Reading
        if (task.category === 'Lesen') {
          readingDays += 1;
        }
      }
    });

    const openCount = totalTaskCount - completedCount;
    const progressPercent = Math.round((completedCount / totalTaskCount) * 100);

    // KPI values
    const learningHours = (learningMinutes / 60).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
    const workHours = (workMinutes / 60).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 1 });

    return {
      completedCount,
      openCount,
      progressPercent,
      learningMinutes,
      learningHours,
      workMinutes,
      workHours,
      sportUnits,
      readingDays,
      learningCategoryMinutes
    };
  }, [completedMap, allTasks, totalTaskCount]);

  // Clipboard export function
  const copyScheduleToClipboard = () => {
    let exportText = 'MY WEEKLY ROUTINE – STATUS\n';
    exportText += '====================================\n\n';

    INITIAL_SCHEDULE.forEach((day) => {
      exportText += `${day.dayName}\n`;
      day.tasks.forEach((t) => {
        const checkMark = completedMap[t.id] ? '☑' : '☐';
        exportText += `${checkMark} ${t.name} – ${t.displayTime}\n`;
      });
      exportText += '\n';
    });

    exportText += '====================================\n';
    exportText += `Wochenfortschritt: ${stats.progressPercent}% (${stats.completedCount}/${totalTaskCount} Aufgaben)\n`;
    exportText += `Absolvierte Lernzeit: ${stats.learningHours} / 29,5 h\n`;
    exportText += `Geleistete Arbeitszeit: ${stats.workHours} / 20 h\n`;
    exportText += `Sporteinheiten: ${stats.sportUnits} / 3\n`;
    exportText += `Lesetage: ${stats.readingDays} / 7\n`;

    navigator.clipboard.writeText(exportText).then(() => {
      showToast('Wochenplan mit Fortschritt in die Zwischenablage kopiert!');
    }).catch(() => {
      showToast('Kopieren fehlgeschlagen. Bitte manuell auswählen.');
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans pb-16 selection:bg-[#15988B]/20">
      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E293B] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 transition-all transform animate-bounce">
          <CheckCircle className="text-[#15988B]" size={20} />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">

        {/* ==========================================
            1. DASHBOARD HEADER
            ========================================== */}
        <header className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#15988B]/10 flex items-center justify-center text-[#15988B] shrink-0">
              <CalendarDays size={26} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1E293B]">
                My Weekly Routine
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] font-medium mt-0.5">
                Study · Career · Health · Growth
              </p>
            </div>
          </div>
          <div className="text-right flex items-center gap-2 self-end sm:self-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]">
              IU Wirtschaftsinformatik
            </span>
          </div>
        </header>

        {/* ==========================================
            2. KPI-ÜBERSICHT (2x2 Grid)
            ========================================== */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* KPI 1: Lernzeit */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#5278CC]/10 flex items-center justify-center text-[#5278CC]">
                  <GraduationCap size={20} />
                </div>
                <span className="text-sm font-semibold text-[#1E293B]">Lernzeit</span>
              </div>
              <span className="text-xs font-medium text-[#64748B]">Ziel: 29,5 Stunden</span>
            </div>
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl font-semibold text-[#1E293B]">
                  {stats.learningHours} <span className="text-sm font-normal text-[#64748B]">/ 29,5 h</span>
                </span>
                <span className="text-xs font-semibold text-[#5278CC]">
                  {Math.round((stats.learningMinutes / 1770) * 100)}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-[#E9EDF2] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#5278CC] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(100, (stats.learningMinutes / 1770) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* KPI 2: Arbeit */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#64748B]/10 flex items-center justify-center text-[#64748B]">
                  <Briefcase size={20} />
                </div>
                <span className="text-sm font-semibold text-[#1E293B]">Arbeit</span>
              </div>
              <span className="text-xs font-medium text-[#64748B]">Ziel: 20 Stunden</span>
            </div>
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl font-semibold text-[#1E293B]">
                  {stats.workHours} <span className="text-sm font-normal text-[#64748B]">/ 20 h</span>
                </span>
                <span className="text-xs font-semibold text-[#64748B]">
                  {Math.round((stats.workMinutes / 1200) * 100)}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-[#E9EDF2] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#64748B] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(100, (stats.workMinutes / 1200) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* KPI 3: Sport */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#DC9149]/10 flex items-center justify-center text-[#DC9149]">
                  <Dumbbell size={20} />
                </div>
                <span className="text-sm font-semibold text-[#1E293B]">Sport</span>
              </div>
              <span className="text-xs font-medium text-[#64748B]">Ziel: 3 Einheiten</span>
            </div>
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl font-semibold text-[#1E293B]">
                  {stats.sportUnits} <span className="text-sm font-normal text-[#64748B]">/ 3 Einheiten</span>
                </span>
                <span className="text-xs font-semibold text-[#DC9149]">
                  {Math.round((stats.sportUnits / 3) * 100)}%
                </span>
              </div>
              {/* 3 segmented bars */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((seg) => (
                  <div
                    key={seg}
                    className="h-2.5 rounded-full bg-[#E9EDF2] overflow-hidden"
                  >
                    <div
                      className={`h-full bg-[#DC9149] transition-all duration-500 ease-out ${
                        stats.sportUnits >= seg ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KPI 4: Lesen */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#B18C62]/10 flex items-center justify-center text-[#B18C62]">
                  <BookOpen size={20} />
                </div>
                <span className="text-sm font-semibold text-[#1E293B]">Lesen</span>
              </div>
              <span className="text-xs font-medium text-[#64748B]">Ziel: 7 Tage</span>
            </div>
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl font-semibold text-[#1E293B]">
                  {stats.readingDays} <span className="text-sm font-normal text-[#64748B]">/ 7 Tage</span>
                </span>
                <span className="text-xs font-semibold text-[#B18C62]">
                  {Math.round((stats.readingDays / 7) * 100)}%
                </span>
              </div>
              {/* 7 segmented bars */}
              <div className="grid grid-cols-7 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7].map((seg) => (
                  <div
                    key={seg}
                    className="h-2.5 rounded-full bg-[#E9EDF2] overflow-hidden"
                  >
                    <div
                      className={`h-full bg-[#B18C62] transition-all duration-500 ease-out ${
                        stats.readingDays >= seg ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            3. GESAMTFORTSCHRITT DER WOCHE
            ========================================== */}
        <section className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          {/* Circular SVG Donut Gauge */}
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#E9EDF2]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#15988B] transition-all duration-500 ease-out"
                strokeDasharray={`${stats.progressPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-[#1E293B]">
                {stats.progressPercent}%
              </span>
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <h2 className="text-lg font-semibold text-[#1E293B]">Wochenfortschritt</h2>
            <p className="text-sm text-[#64748B]">
              <span className="font-semibold text-[#1E293B]">{stats.completedCount}</span> von{' '}
              <span className="font-semibold text-[#1E293B]">{totalTaskCount}</span> Aufgaben erledigt
            </p>
            <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-4 text-xs font-medium text-[#64748B]">
              <span className="inline-flex items-center gap-1.5 bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                <span className="w-2 h-2 rounded-full bg-[#15988B]" />
                {stats.openCount} Aufgaben offen
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                <span className="w-2 h-2 rounded-full bg-[#5278CC]" />
                {stats.learningHours} / 29,5 h Gelernt
              </span>
            </div>
          </div>
        </section>

        {/* ==========================================
            4. WOCHENÜBERSICHT & FILTER
            ========================================== */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-[#1E293B]">Wochenübersicht</h2>

            {/* Segmented Control */}
            <div className="bg-[#E9EDF2] p-1 rounded-xl flex items-center gap-1 self-start sm:self-auto">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  filterMode === 'all'
                    ? 'bg-white text-[#1E293B] shadow-sm'
                    : 'text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                Alle Aufgaben
              </button>
              <button
                onClick={() => setFilterMode('open')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  filterMode === 'open'
                    ? 'bg-white text-[#1E293B] shadow-sm'
                    : 'text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                Offen
              </button>
              <button
                onClick={() => setFilterMode('completed')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  filterMode === 'completed'
                    ? 'bg-white text-[#1E293B] shadow-sm'
                    : 'text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                Erledigt
              </button>
            </div>
          </div>

          {/* ==========================================
              5. SIEBEN TAGESKARTEN (Montag - Sonntag)
              ========================================== */}
          <div className="space-y-4">
            {INITIAL_SCHEDULE.map((day) => {
              // Calculate day stats
              const dayTasks = day.tasks;
              const dayTotal = dayTasks.length;
              const dayCompletedTasks = dayTasks.filter((t) => !!completedMap[t.id]);
              const dayCompletedCount = dayCompletedTasks.length;
              const dayProgressPct = Math.round((dayCompletedCount / dayTotal) * 100);

              // Filter tasks to show inside card
              const filteredTasks = dayTasks.filter((task) => {
                const isDone = !!completedMap[task.id];
                if (filterMode === 'open') return !isDone;
                if (filterMode === 'completed') return isDone;
                return true; // 'all'
              });

              return (
                <div
                  key={day.dayId}
                  className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4 hover:border-[#CBD5E1] transition-all"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center font-semibold text-xs text-[#1E293B]">
                        {day.dayShort}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-semibold text-[#1E293B]">{day.dayName}</h3>
                          <span className="text-xs text-[#64748B] font-normal">· {day.subtitle}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#64748B]">
                        {dayCompletedCount}/{dayTotal}
                      </span>
                      <div className="w-24 h-2 bg-[#E9EDF2] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#15988B] rounded-full transition-all duration-300"
                          style={{ width: `${dayProgressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Activity Rows */}
                  <div className="space-y-2">
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((task) => {
                        const isDone = !!completedMap[task.id];

                        return (
                          <div
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={`group flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer select-none ${
                              isDone ? 'bg-[#F8FAFC]' : 'hover:bg-[#F8FAFC]'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0 pr-2">
                              {/* Checkbox */}
                              <input
                                type="checkbox"
                                checked={isDone}
                                onChange={() => {}} // Handled by container click
                                className="w-4 h-4 rounded border-[#CBD5E1] text-[#15988B] focus:ring-[#15988B] cursor-pointer"
                              />

                              {/* Icon Container with subtle tinted background */}
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                                style={{
                                  backgroundColor: `${task.color}15`,
                                  color: task.color
                                }}
                              >
                                <IconRenderer name={task.icon} size={16} />
                              </div>

                              {/* Activity Name */}
                              <span
                                className={`text-sm font-medium transition-all truncate ${
                                  isDone
                                    ? 'line-through text-[#94A3B8]'
                                    : 'text-[#1E293B]'
                                }`}
                              >
                                {task.name}
                              </span>
                            </div>

                            {/* Duration */}
                            <span
                              className={`text-xs font-normal shrink-0 ml-2 ${
                                isDone ? 'text-[#94A3B8]' : 'text-[#64748B]'
                              }`}
                            >
                              {task.displayTime}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      /* Empty state message when filtered */
                      <div className="py-4 text-center text-xs text-[#94A3B8] italic flex items-center justify-center gap-2">
                        {filterMode === 'open' && dayCompletedCount === dayTotal ? (
                          <>
                            <CheckCircle size={15} className="text-[#15988B]" />
                            <span className="text-[#15988B] font-medium not-italic">Tagesziel erreicht</span>
                          </>
                        ) : filterMode === 'completed' && dayCompletedCount === 0 ? (
                          <span>Noch keine erledigten Aufgaben.</span>
                        ) : (
                          <span>Keine Aufgaben vorhanden.</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==========================================
            6. WÖCHENTLICHE LERNZIELE
            ========================================== */}
        <section className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-5">
          <h2 className="text-lg font-semibold text-[#1E293B]">Wöchentliche Lernziele</h2>

          <div className="space-y-4">
            {[
              { name: 'Klausurvorbereitung inkl. Wiederholung', cat: 'Klausurvorbereitung', targetMin: 630, displayTarget: '10,5 h', icon: 'GraduationCap', color: COLOR_MAP.Klausurvorbereitung },
              { name: 'Hausarbeit', cat: 'Hausarbeit', targetMin: 360, displayTarget: '6 h', icon: 'FileText', color: COLOR_MAP.Hausarbeit },
              { name: 'Java', cat: 'Java', targetMin: 360, displayTarget: '6 h', icon: 'Code', color: COLOR_MAP.Java },
              { name: 'GMAT', cat: 'GMAT', targetMin: 210, displayTarget: '3,5 h', icon: 'Calculator', color: COLOR_MAP.GMAT },
              { name: 'TOEFL', cat: 'TOEFL', targetMin: 210, displayTarget: '3,5 h', icon: 'Languages', color: COLOR_MAP.TOEFL }
            ].map((goal) => {
              const doneMin = stats.learningCategoryMinutes[goal.cat] || 0;
              const doneHours = (doneMin / 60).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
              const goalPct = Math.min(100, Math.round((doneMin / goal.targetMin) * 100));

              return (
                <div key={goal.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${goal.color}15`, color: goal.color }}
                      >
                        <IconRenderer name={goal.icon} size={14} />
                      </div>
                      <span className="font-medium text-[#1E293B]">{goal.name}</span>
                    </div>
                    <span className="text-[#64748B] font-medium">
                      <strong className="text-[#1E293B] font-semibold">{doneHours}</strong> / {goal.displayTarget}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#E9EDF2] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${goalPct}%`,
                        backgroundColor: goal.color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==========================================
            7. WÖCHENTLICHES ZEITBUDGET (Static comparison)
            ========================================== */}
        <section className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-[#1E293B]">Wöchentliches Zeitbudget</h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Geplante Soll-Stunden pro Kernkategorie (relativ zum Maximum von 20h Arbeit)
            </p>
          </div>

          <div className="space-y-3.5">
            {[
              { name: 'Arbeit', displayHours: '20 h', pct: 100, color: COLOR_MAP.Arbeit },
              { name: 'Klausurvorbereitung', displayHours: '10,5 h', pct: 52.5, color: COLOR_MAP.Klausurvorbereitung },
              { name: 'Hausarbeit', displayHours: '6 h', pct: 30, color: COLOR_MAP.Hausarbeit },
              { name: 'Java', displayHours: '6 h', pct: 30, color: COLOR_MAP.Java },
              { name: 'GMAT', displayHours: '3,5 h', pct: 17.5, color: COLOR_MAP.GMAT },
              { name: 'TOEFL', displayHours: '3,5 h', pct: 17.5, color: COLOR_MAP.TOEFL },
              { name: 'Fitnessstudio', displayHours: '2,5 h', pct: 12.5, color: COLOR_MAP.Fitnessstudio },
              { name: 'Lesen', displayHours: '3,5 h', pct: 17.5, color: COLOR_MAP.Lesen },
              { name: 'Joggen', displayHours: '0,75 h', pct: 3.75, color: COLOR_MAP.Joggen },
              { name: 'Wochenplanung', displayHours: '0,5 h', pct: 2.5, color: COLOR_MAP.Wochenplanung }
            ].map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium text-[#1E293B]">{item.name}</span>
                  <span className="font-semibold text-[#1E293B]">{item.displayHours}</span>
                </div>
                <div className="w-full h-2 bg-[#E9EDF2] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.pct}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            8. ZUSAMMENFASSENDE KENNZAHLEN (2x2 Grid)
            ========================================== */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-sm text-center">
            <span className="text-xs text-[#64748B] block mb-1">Lernzeit pro Woche</span>
            <span className="text-2xl font-bold text-[#1E293B]">29,5 h</span>
          </div>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-sm text-center">
            <span className="text-xs text-[#64748B] block mb-1">IU-Studium pro Woche</span>
            <span className="text-2xl font-bold text-[#1E293B]">16,5 h</span>
          </div>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-sm text-center">
            <span className="text-xs text-[#64748B] block mb-1">Lernzeit in 4 Wochen</span>
            <span className="text-2xl font-bold text-[#1E293B]">118 h</span>
          </div>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-sm text-center">
            <span className="text-xs text-[#64748B] block mb-1">Gesamte Kernaktivitäten</span>
            <span className="text-2xl font-bold text-[#1E293B]">56,75 h</span>
          </div>
        </section>

        {/* ==========================================
            9. EXPORT- UND RESET-FUNKTIONEN
            ========================================== */}
        <section className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={copyScheduleToClipboard}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#1E293B] text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-98"
          >
            <Copy size={16} className="text-[#64748B]" />
            Wochenplan mit Fortschritt kopieren
          </button>

          <button
            onClick={() => setIsResetModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs sm:text-sm font-semibold transition-all active:scale-98"
          >
            <RotateCcw size={16} />
            Neue Woche beginnen
          </button>
        </section>

      </main>

      {/* ==========================================
          RESET CONFIRMATION MODAL
          ========================================== */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-[#E2E8F0]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <AlertCircle size={22} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#1E293B]">
                    Neue Woche beginnen?
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Fortschritt zurücksetzen
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="text-[#94A3B8] hover:text-[#1E293B] p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-[#64748B] leading-relaxed">
              Möchtest du alle erledigten Aufgaben zurücksetzen? Dein Wochenplan bleibt erhalten.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#1E293B] rounded-xl hover:bg-[#F8FAFC] transition-all"
              >
                Abbrechen
              </button>
              <button
                onClick={handleResetAll}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-sm transition-all"
              >
                Fortschritt zurücksetzen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
