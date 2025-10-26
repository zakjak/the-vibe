"use client";
import { type Value, TrailingBlockPlugin } from "platejs";
import { type TPlateEditor, useEditorRef } from "platejs/react";
import { AIKit } from "@/components/TextEditor/plugins/ai-kit";
import { AlignKit } from "@/components/TextEditor/plugins/align-kit";
import { AutoformatKit } from "@/components/TextEditor/plugins/autoformat-kit";
import { BasicBlocksKit } from "@/components/TextEditor/plugins/basic-blocks-kit";
import { BasicMarksKit } from "@/components/TextEditor/plugins/basic-marks-kit";
import { BlockMenuKit } from "@/components/TextEditor/plugins/block-menu-kit";
import { BlockPlaceholderKit } from "@/components/TextEditor/plugins/block-placeholder-kit";
import { CalloutKit } from "@/components/TextEditor/plugins/callout-kit";
import { CodeBlockKit } from "@/components/TextEditor/plugins/code-block-kit";
import { ColumnKit } from "@/components/TextEditor/plugins/column-kit";
import { CommentKit } from "@/components/TextEditor/plugins/comment-kit";
import { CursorOverlayKit } from "@/components/TextEditor/plugins/cursor-overlay-kit";
import { DateKit } from "@/components/TextEditor/plugins/date-kit";
import { DiscussionKit } from "@/components/TextEditor/plugins/discussion-kit";
import { DndKit } from "@/components/TextEditor/plugins/dnd-kit";
import { DocxKit } from "@/components/TextEditor/plugins/docx-kit";
import { EmojiKit } from "@/components/TextEditor/plugins/emoji-kit";
import { ExitBreakKit } from "@/components/TextEditor/plugins/exit-break-kit";
import { FixedToolbarKit } from "@/components/TextEditor/plugins/fixed-toolbar-kit";
import { FloatingToolbarKit } from "@/components/TextEditor/plugins/floating-toolbar-kit";
import { FontKit } from "@/components/TextEditor/plugins/font-kit";
import { LineHeightKit } from "@/components/TextEditor/plugins/line-height-kit";
import { LinkKit } from "@/components/TextEditor/plugins/link-kit";
import { ListKit } from "@/components/TextEditor/plugins/list-kit";
import { MarkdownKit } from "@/components/TextEditor/plugins/markdown-kit";
import { MathKit } from "@/components/TextEditor/plugins/math-kit";
import { MediaKit } from "@/components/TextEditor/plugins/media-kit";
import { MentionKit } from "@/components/TextEditor/plugins/mention-kit";
import { SlashKit } from "@/components/TextEditor/plugins/slash-kit";
import { SuggestionKit } from "@/components/TextEditor/plugins/suggestion-kit";
import { TableKit } from "@/components/TextEditor/plugins/table-kit";
import { TocKit } from "@/components/TextEditor/plugins/toc-kit";
import { ToggleKit } from "@/components/TextEditor/plugins/toggle-kit";
export const EditorKit = [
  ...AIKit,
  ...BlockMenuKit,
  // Elements
  ...BasicBlocksKit,
  ...CodeBlockKit,
  ...TableKit,
  ...ToggleKit,
  ...TocKit,
  ...MediaKit,
  ...CalloutKit,
  ...ColumnKit,
  ...MathKit,
  ...DateKit,
  ...LinkKit,
  ...MentionKit,
  // Marks
  ...BasicMarksKit,
  ...FontKit,
  // Block Style
  ...ListKit,
  ...AlignKit,
  ...LineHeightKit,
  // Collaboration
  ...DiscussionKit,
  ...CommentKit,
  ...SuggestionKit,
  // Editing
  ...SlashKit,
  ...AutoformatKit,
  ...CursorOverlayKit,
  ...DndKit,
  ...EmojiKit,
  ...ExitBreakKit,
  TrailingBlockPlugin,
  // Parsers
  ...DocxKit,
  ...MarkdownKit,
  // UI
  ...BlockPlaceholderKit,
  ...FixedToolbarKit,
  ...FloatingToolbarKit,
];
export type MyEditor = TPlateEditor<Value, (typeof EditorKit)[number]>;
export const useEditor = () => useEditorRef<MyEditor>();
