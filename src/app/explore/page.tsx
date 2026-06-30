import Explore from "./ExploreClient";
import { getPublicNotes } from "@/lib/notes/publicNotes";
export default async function ExplorePage() {
  const res = await getPublicNotes();

  console.log("res", res);

  return <Explore notes={res} />;
}
