import { create } from 'zustand';

// 오늘 날짜
interface TodayStoreState {
  year: number;
  month: number;
  date: number;
  day: number;
}

export const useTodayStore = create<TodayStoreState>(() => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
  day: new Date().getDay(),
}));

// 월간 달력에서 선택한 연도
interface SelectedYearStoreState {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export const useSelectedYearStore = create<SelectedYearStoreState>((set) => ({
  selectedYear: new Date().getFullYear(),
  setSelectedYear: (year: number) => set({ selectedYear: year }),
}));

// 월간 달력에서 선택한 달
interface SelectedMonthStoreState {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
}

export const useSelectedMonthStore = create<SelectedMonthStoreState>((set) => ({
  selectedMonth: new Date().getMonth() + 1,
  setSelectedMonth: (month: number) => set({ selectedMonth: month }),
}));

// 연간 달력에서 선택한 연도
interface PickYearStoreState {
  pickYear: number;
  setPickYear: (year: number) => void;
}

export const usePickYearStore = create<PickYearStoreState>((set) => ({
  pickYear: new Date().getFullYear(),
  setPickYear: (year: number) => set({ pickYear: year }),
}));
