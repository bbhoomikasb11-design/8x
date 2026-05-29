export const getLog = () => {
  try {
    const saved = localStorage.getItem('affirmme_log');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Failed to load streak log', e);
    return [];
  }
};

const saveLog = (log) => {
  try {
    localStorage.setItem('affirmme_log', JSON.stringify(log));
  } catch (e) {
    console.error('Failed to save streak log', e);
  }
};

const getTodayStr = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const hasLoggedToday = () => {
  const log = getLog();
  const todayStr = getTodayStr();
  return log.includes(todayStr);
};

export const logToday = () => {
  const log = getLog();
  const todayStr = getTodayStr();
  if (!log.includes(todayStr)) {
    log.push(todayStr);
    log.sort(); // keep it sorted
    saveLog(log);
  }
};

export const getTotalDays = () => {
  return getLog().length;
};

export const getStreak = () => {
  const log = getLog();
  if (log.length === 0) return 0;
  
  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check backwards day by day, starting from today or yesterday
  let checkDate = new Date(today);
  const logSet = new Set(log);

  // If haven't logged today, the streak is maintained if logged yesterday
  // We can start checking from today. If today is logged, it counts. If not, it doesn't count.
  // Actually, standard streak mechanics: if not logged today, streak is still active if logged yesterday.
  const todayStr = getTodayStr();
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (!logSet.has(todayStr) && !logSet.has(yesterdayStr)) {
    return 0; // Streak broken
  }

  // Iterate backwards to count consecutive days
  let countDate = new Date(today);
  // If not logged today, start counting from yesterday
  if (!logSet.has(todayStr)) {
    countDate.setDate(countDate.getDate() - 1);
  }

  while (true) {
    const dateStr = countDate.toISOString().split('T')[0];
    if (logSet.has(dateStr)) {
      currentStreak++;
      countDate.setDate(countDate.getDate() - 1);
    } else {
      break;
    }
  }

  return currentStreak;
};

export const getLongestStreak = () => {
  const log = getLog();
  if (log.length === 0) return 0;

  let maxStreak = 0;
  let currentStreak = 1;

  for (let i = 1; i < log.length; i++) {
    const prevDate = new Date(log[i - 1]);
    const currDate = new Date(log[i]);
    const diffTime = Math.abs(currDate - prevDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      currentStreak++;
    } else if (diffDays > 1) {
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
      currentStreak = 1;
    }
  }

  if (currentStreak > maxStreak) {
    maxStreak = currentStreak;
  }

  return maxStreak;
};

export const getLast35Days = () => {
  const logSet = new Set(getLog());
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // We want the grid to end on the current week's Sunday to align with M-S columns.
  // getDay() returns 0 for Sunday, 1 for Monday.
  const jsDay = today.getDay();
  const offsetToSunday = jsDay === 0 ? 0 : 7 - jsDay;
  
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + offsetToSunday);

  const last35 = [];
  const todayStr = getTodayStr();

  // Create array of 35 days ending on endDate
  for (let i = 34; i >= 0; i--) {
    const d = new Date(endDate);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    last35.push({
      date: dateStr,
      logged: logSet.has(dateStr),
      isToday: dateStr === todayStr,
      isFuture: d > today
    });
  }

  return last35;
};
