import type { NoteContent } from "@/types/Note";

export function getPreviewText(content: NoteContent) {
  return content
    ?.map((block) => {
      if (!Array.isArray(block.content)) return "";

      return block.content
        .map((item) => {
          if (typeof item === "string") return item;
          return "text" in item && typeof item.text === "string"
            ? item.text
            : "";
        })
        .join("");
    })
    .join(" ")
    .slice(0, 180);
}
