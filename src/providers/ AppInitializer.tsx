import { useAppDispatch } from "@/redux/hooks";
// import { setLikedNotes } from "@/redux/slices/likesSlice";
import { fetchNotes } from "@/redux/slices/notesSlice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function AppInitializer() {
  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!session) return;

    dispatch(fetchNotes());
    // dispatch(setLikedNotes());
  }, [session, dispatch]);

  return null;
}
export default AppInitializer;
