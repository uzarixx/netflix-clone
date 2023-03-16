import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ContentService from '../../services/fetchServices/contentService';


export const fetchMainContent = createAsyncThunk(
  'contentSlice/account',
  async function() {
    try {
      const { data } = await ContentService.getContentAll();
      return data;
    } catch (e) {
      localStorage.removeItem('token');
    }
  },
);


export interface CounterState {
  isPendingContent: boolean;
  content: [{
    contentCategory: string,
    content: [{
      createdAt: string,
      description: string,
      id: number,
      isFilm: boolean,
      name: string,
      previewImage: string,
      previewVideo: string,
      publicationDate: string,
      rating: number,
      updatedAt: string,
      yearCategory: number
    }]
  }] | null;
}

const initialState: CounterState = {
  isPendingContent: true,
  content: null,
};

const contentSlice = createSlice({
  name: 'contentSlice',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CounterState>) => {
    builder.addCase(fetchMainContent.pending, (state) => {
      state.isPendingContent = true;
    });
    builder.addCase(fetchMainContent.fulfilled, (state, action) => {
      state.isPendingContent = false;
      state.content = action.payload;
    });
  },
});


export default contentSlice.reducer;

export const {} = contentSlice.actions;

