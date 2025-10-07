import React from "react";
import { useSlate } from "slate-react";
import { Button } from "./ui/button";

const RichTextToolbar = () => {
  const editor = useSlate();
  return (
    <div className="">
      <Button active={isBoldActive(editor)}>B</Button>
    </div>
  );
};

export default RichTextToolbar;
