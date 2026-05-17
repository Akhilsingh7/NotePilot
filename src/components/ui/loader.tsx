import { Spinner } from "./spinner";

export function Loader({
  text,
  direction = "column",
}: {
  text?: string;
  direction?: "row" | "column";
}) {
  return (
    <div
      className={`flex ${
        direction === "row"
          ? "items-center gap-2"
          : "flex-col items-center gap-3"
      } text-gray-500`}
    >
      <Spinner className="h-5 w-5" />
      {text && <span className="text-sm">{text}</span>}
    </div>
  );
}
