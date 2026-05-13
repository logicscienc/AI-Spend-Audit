import React from "react";

import chatgpt from "../../../assets/chatgpt.png";
import claude from "../../../assets/claude.png";
import cursor from "../../../assets/Cursor.png";
import copilot from "../../../assets/Copilot.png";
import gemini from "../../../assets/gemini.png";
import windsurf from "../../../assets/windsurf.png";

const toolIcons = {
  chatgpt,
  claude,
  cursor,
  copilot,
  gemini,
  windsurf,
};

const ToolIcon = ({ tool }) => {
  const icon = toolIcons[tool];

  if (!icon) return null;

  return (
    <div className="flex h-10 w-10 items-center justify-center">
      <img
        src={icon}
        alt={tool}
        className="h-full w-full object-contain"
      />
    </div>
  );
};

export default ToolIcon;