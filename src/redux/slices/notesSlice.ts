import { Note } from "@/types/Note";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const res = await axios.get("/api/notes");

  return res.data.data;
});

type NoteState = {
  notes: Note[];
  loading: boolean;
  error: string | null;
};

const initialState: NoteState = {
  notes: [],
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    editLikeCount: (state, action) => {
      state.notes = state.notes.map((note) =>
        note._id === action.payload.noteId
          ? { ...note, likesCount: action.payload.likesCount }
          : note
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state) => {
        state.loading = false;
        state.error = "Failed fetching notes";
      });
  },
});

export const { editLikeCount } = noteSlice.actions;
export default noteSlice.reducer;
