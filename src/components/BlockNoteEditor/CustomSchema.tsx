// CustomSchema.ts

import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    paragraph: defaultBlockSpecs.paragraph,
    heading: defaultBlockSpecs.heading,
    bulletListItem: defaultBlockSpecs.bulletListItem,
    numberedListItem: defaultBlockSpecs.numberedListItem,
    codeBlock: defaultBlockSpecs.codeBlock,
  },
});
