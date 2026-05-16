import {
  getDefaultSlashMenuItems,
  type DefaultSuggestionItem,
} from "@blocknote/core";

export const getCustomSlashMenuItems = (
  editor: any
): DefaultSuggestionItem[] => {
  const items = getDefaultSlashMenuItems(editor);

  return items.filter((item) =>
    [
      "Paragraph",
      "Heading",
      "Bullet List",
      "Numbered List",
      "Code Block",
    ].includes(item.title)
  );
};
