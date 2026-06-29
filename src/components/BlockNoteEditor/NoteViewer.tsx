"use client";
import { BlockNoteView } from "@blocknote/mantine";
import { SuggestionMenuController, useCreateBlockNote } from "@blocknote/react";
import type { NoteContent } from "@/types/Note";
import { useEffect } from "react";
import { getCustomSlashMenuItems } from "./CustomSlash";

type Props = {
  content: NoteContent;
  isOwner: boolean;
};

function NoteViewer({ content, isOwner }: Props) {
  const editor = useCreateBlockNote();

  useEffect(() => {
    if (!content) return;

    editor.replaceBlocks(editor.document, content);
  }, [content, editor]);

  return (
    <BlockNoteView
      editor={editor}
      formattingToolbar={false}
      slashMenu={false}
      sideMenu={false}
      editable={isOwner}
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

export default NoteViewer;
