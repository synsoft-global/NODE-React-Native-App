// reducers/userSlice.js
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getMovieList} from '../actions/getMovieList';
import {MoviesItemType} from 'src/types'; // Adjust as per your types file

interface MoviesState {
  data: MoviesItemType[];
  totalCount: number;
  isLoading: boolean;
  errorMessage: string;
}

const initialState: MoviesState = {
  data: [],
  totalCount: 0,
  isLoading: false,
  errorMessage: '',
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearData: state => {
      state.data = [];
      state.errorMessage = '';
      state.totalCount = 0;
    },
    updateMovieList: (state, action: PayloadAction<MoviesItemType[]>) => {
      action.payload.forEach(newMovie => {
        const index = state.data.findIndex(movie => movie.id === newMovie.id);
        if (index !== -1) {
          // Update existing movie
          state.data[index] = newMovie;
        } else {
          // Add new movie
          state.data.push(newMovie);
        }
      });
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getMovieList.pending, state => {
      state.isLoading = true;
      state.errorMessage = '';
    });

    builder.addCase(
      getMovieList.fulfilled,
      (
        state,
        action: PayloadAction<{
          currentPage: number;
          movies: MoviesItemType[];
          totalPages: number;
        }>,
      ) => {
        state.isLoading = false;
        const {totalPages, currentPage, movies} = action.payload;
        state.totalCount = totalPages;
        state.data = currentPage === 1 ? movies : [...state.data, ...movies];
      },
    );

    builder.addCase(
      getMovieList.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.errorMessage = action.payload || 'Unknown error occurred.';
      },
    );
  },
});

export const {clearData, updateMovieList, setTotalCount} = movieSlice.actions;
export default movieSlice.reducer;
