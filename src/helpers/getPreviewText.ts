export function getPreviewText(content: any[]) {
  return content
    ?.map((block) => {
      if (!block.content) return "";

      return block.content.map((item: any) => item.text || "").join("");
    })
    .join(" ")
    .slice(0, 180);
}
