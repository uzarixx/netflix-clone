import { createSlice } from '@reduxjs/toolkit';


export interface CounterState {
  moreInfoOpen: boolean;
  moreInfoData: {
    previewVideo: string;
    createdAt: string;
    description: string;
    id: number;
    isFilm: boolean;
    name: string;
    previewImage: string;
    publicationDate: string;
    rating: number;
    yearCategory: number;
  } | null;
}

const initialState: CounterState = {
  moreInfoOpen: false,
  moreInfoData: null,
};

const popupsSlice = createSlice({
  name: 'popupsSlice',
  initialState,
  reducers: {
    setMoreInfoOpen: (state, action) => {
      state.moreInfoOpen = action.payload;
    },
    setMoreInfoData: (state, action) => {
      state.moreInfoData = action.payload
    }
  },
});


export default popupsSlice.reducer;

export const { setMoreInfoOpen, setMoreInfoData } = popupsSlice.actions;

