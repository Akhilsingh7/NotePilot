import type {
  BlockNoteEditor,
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
} from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { SuggestionMenuController } from "@blocknote/react";
import { getCustomSlashMenuItems } from "./CustomSlash";

export default function NoteEditor<
  BSchema extends BlockSchema,
  ISchema extends InlineContentSchema,
  SSchema extends StyleSchema,
>({
  // initialContent,
  editor,
  editable,
}: {
  editor: BlockNoteEditor<BSchema, ISchema, SSchema>;
  editable: boolean;
}) {
  return (
    <BlockNoteView
      editor={editor}
      className="w-full min-w-0 max-w-full break-words"
      formattingToolbar={false}
      sideMenu={false}
      slashMenu={false}
      editable={editable}
      // onChange={() => {
      //   console.log({ title, content: editor.document });
      // }}
    >
      <SuggestionMenuController
        triggerCharacter="/"
        getItems={async (query) =>
          getCustomSlashMenuItems(editor).filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          )
        }
      />
    </BlockNoteView>
  );
}
