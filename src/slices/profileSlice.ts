import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from '../types/types';

const initialState: InitialState = {
  entities: [],
  status: 'Idle',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addRepos: (state, { payload }) => {
      state.entities.push(payload)
    },
    removeRepos: (state) => {
      state.entities = [];
    },
    changeStatus: (state, { payload }) => {
      state.status = payload;
    }
  }
});

export const { addRepos, removeRepos, changeStatus } = profileSlice.actions; 
export default profileSlice.reducer;
