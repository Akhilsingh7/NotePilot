import {
  type BlockNoteEditor,
  type BlockSchema,
  getDefaultSlashMenuItems,
  type InlineContentSchema,
  type StyleSchema,
  type DefaultSuggestionItem,
} from "@blocknote/core";

export const getCustomSlashMenuItems = <
  BSchema extends BlockSchema,
  ISchema extends InlineContentSchema,
  SSchema extends StyleSchema,
>(
  editor: BlockNoteEditor<BSchema, ISchema, SSchema>
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
