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
  },
});

export const { setLikedNotes } = likeSlice.actions;

export default likeSlice.reducer;
