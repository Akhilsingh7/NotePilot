import {
  type BlockNoteEditor,
  getDefaultSlashMenuItems,
  type DefaultSuggestionItem,
} from "@blocknote/core";

export const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
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
