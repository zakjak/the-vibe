import React, { JSX } from "react";

type SlateNode = {
  type?: string;
  children: SlateNode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  align?: string;
  lineHeight?: string;
};

export const plateToHtml = (nodes: SlateNode[]): string => {
  return nodes
    .map((node) => {
      if (node.text !== undefined) {
        let text = node.text;
        if (node.bold) text = `<strong>${text}</strong>`;
        if (node.italic) text = `<em>${text}</em>`;
        if (node.underline) text = `<u>${text}</u>`;
        return text;
      }

      const children = plateToHtml(node.children || []);

      switch (node.type) {
        case "p":
          return `<p style="line-height:${
            node.lineHeight || "normal"
          }; text-align:${
            node.align || "start"
          }; margin-top: 0.6rem">${children}</p>`;
        case "blockquote":
          return `<blockquote style="font-family:${
            node.fontFamily || "inherit"
          }; font-size:${node.fontSize || "inherit"}; color:${
            node.color || "inherit"
          };">${children}</blockquote>`;
        case "h1":
          return `<h1>${children}</h1>`;
        case "h2":
          return `<h2>${children}</h2>`;
        case "ul":
          return `<ul>${children}</ul>`;
        case "li":
          return `<li>${children}</li>`;
        default:
          return children;
      }
    })
    .join("");
};
