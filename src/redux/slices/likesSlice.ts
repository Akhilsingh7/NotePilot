import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LikesState = {
  likedNoteIds: string[];
};

const initialState: LikesState = {
  likedNoteIds: [],
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
});

export const { setLikedNotes, addLikeNote, removeLikeNote } = likeSlice.actions;

export default likeSlice.reducer;
