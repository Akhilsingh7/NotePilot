import { Note } from "@/types/Note";
import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const res = await axios.get("/api/notes");

  return res.data.data;
});

const notesAdapter = createEntityAdapter<Note, string>({
  selectId: (note) => note._id,
});

const initialState = notesAdapter.getInitialState({
  loading: false,
  error: null as string | null,
});

const noteSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    editLikeCount: (state, action) => {
      notesAdapter.updateOne(state, {
        id: action.payload.noteId,
        changes: {
          likesCount: action.payload.likesCount,
        },
      });
    },
    updateNote: (state, action) => {
      notesAdapter.upsertOne(state, action.payload);
    },
    deleteNote: (state, action) => {
      notesAdapter.removeOne(state, action.payload);
    },
    upsertManyNotes: (state, action) => {
      notesAdapter.upsertMany(state, action.payload);
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
        notesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchNotes.rejected, (state) => {
        state.loading = false;
        state.error = "Failed fetching notes";
      });
  },
});

export const notesSelectors = notesAdapter.getSelectors(
  (state: RootState) => state.notes
);

export const { editLikeCount, updateNote, deleteNote, upsertManyNotes } =
  noteSlice.actions;
export default noteSlice.reducer;
