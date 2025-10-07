"use client";

import { Plate, usePlateEditor } from "platejs/react";
import { Editor, EditorContainer } from "@/components/ui/editor";
import { EditorKit } from "@/components/editor/editor-kit";
import { UseFormSetValue } from "react-hook-form";

type FormValue = {
  story: string;
};

const SlateEditor = ({
  value,
  setValue,
}: {
  value: string;
  setValue: UseFormSetValue<FormValue>;
}) => {
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
