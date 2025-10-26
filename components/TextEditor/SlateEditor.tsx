"use client";

import { Plate, usePlateEditor } from "platejs/react";
import { Editor, EditorContainer } from "@/components/ui/editor";
import { EditorKit } from "@/components/editor/editor-kit";
import { UseFormSetValue } from "react-hook-form";
import { ArticleFormData } from "../ArticleForm";

interface EditorProps {
  setValue: UseFormSetValue<ArticleFormData>;
  value: string;
}

const SlateEditor = ({ value, setValue }: EditorProps) => {
  const editor = usePlateEditor({ plugins: EditorKit });

  return (
    <Plate
      editor={editor}
      onValueChange={({ value }) => setValue("story", JSON.stringify(value))}
    >
      <EditorContainer>
        <Editor
          value={value}
          onChange={(val) => {
            setValue("story", JSON.stringify(val));
          }}
          placeholder="Type your amazing content here..."
        />
      </EditorContainer>
    </Plate>
  );
};

export default SlateEditor;
