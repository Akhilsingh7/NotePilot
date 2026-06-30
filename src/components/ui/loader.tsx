import { Spinner } from "./spinner";

type LoaderProps = {
  text?: string;
  direction?: "row" | "column";
  className?: string;
};

export function Loader({
  text,
  direction = "column",
  className = "",
}: LoaderProps) {
  return (
    <div
      className={`flex ${
        direction === "row"
          ? "items-center gap-2"
          : "flex-col items-center gap-3"
      } ${className}`}
    >
      <Spinner className="h-4 w-4" />

      {text && <span className="text-sm">{text}</span>}
    </div>
  );
}
