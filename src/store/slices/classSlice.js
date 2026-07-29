import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeClasses: 0,
  studentsOnline: 0,
  avgUnderstanding: 0,
  aiInsightsCount: 0,
  liveMetrics: {
    energy: 50,
    engaged: 33,
    neutral: 33,
    distracted: 34
  },
  currentTopic: "Binary Trees"
};

const classSlice = createSlice({
  name: 'classroom',
  initialState,
  reducers: {
    setDashboardData: (state, action) => {
      state.activeClasses = action.payload.activeClasses;
      state.studentsOnline = action.payload.studentsOnline;
      state.avgUnderstanding = action.payload.avgUnderstanding;
      state.aiInsightsCount = action.payload.aiInsights;
    },
    updateLiveMetrics: (state, action) => {
      state.liveMetrics = { ...state.liveMetrics, ...action.payload };
    },
    setCurrentTopic: (state, action) => {
      state.currentTopic = action.payload;
    }
  }
});

export const { setDashboardData, updateLiveMetrics, setCurrentTopic } = classSlice.actions;
export default classSlice.reducer;
