import type { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { SuggestionMenuController } from "@blocknote/react";
import { getCustomSlashMenuItems } from "./CustomSlash";

type Props = {
  // initialContent?: any;
  editor: BlockNoteEditor;
  editable: boolean;
};

export default function NoteEditor({
  // initialContent,
  editor,
  editable,
}: Props) {
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
