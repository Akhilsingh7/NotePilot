import { Loader } from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="flex flex-1 w-screen items-center justify-center">
      <Loader text="Loading Notes..." />
    </div>
  );
}
