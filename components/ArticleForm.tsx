"use client";

import { Button } from "./ui/button";
import React, { useState } from "react";
import { User } from "@/lib/types/users";
import { Dialog, DialogTrigger } from "./ui/dialog";

import ArticleDialogContent from "./ArticleDialogContent";

const ArticleForm = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog modal={false} onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>Create Article</Button>
      </DialogTrigger>
      <ArticleDialogContent user={user} setOpenEdit={setOpen} />
    </Dialog>
  );
};

export default ArticleForm;
