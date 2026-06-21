import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllLikeNotesOfUser = createAsyncThunk(
  "likes/fetchLikedNotes",
  async () => {
    const res = await axios.get("/api/likes");
    return res.data.data;
  }
);

type LikesState = {
  likedNoteIds: string[];
  loading: boolean;
  error: string | null;
};

const initialState: LikesState = {
  likedNoteIds: [],
  loading: false,
  error: null,
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setLikedNotes: (state, action: PayloadAction<string[]>) => {
      state.likedNoteIds = action.payload;
    },
    removeLikeNote: (state, action: PayloadAction<string>) => {
      state.likedNoteIds = state.likedNoteIds.filter(
        (noteId) => noteId !== action.payload
      );
    },
    addLikeNote: (state, action: PayloadAction<string>) => {
      if (!state.likedNoteIds.includes(action.payload)) {
        state.likedNoteIds.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLikeNotesOfUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllLikeNotesOfUser.fulfilled, (state, action) => {
        state.loading = false;
        state.likedNoteIds = action.payload;
      })
      .addCase(fetchAllLikeNotesOfUser.rejected, (state) => {
        state.loading = false;
        state.error = "Failed fetching notes";
      });
  },
});

export const { setLikedNotes, addLikeNote, removeLikeNote } = likeSlice.actions;

export default likeSlice.reducer;
