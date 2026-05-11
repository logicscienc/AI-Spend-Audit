const toolStyles = {
  chatgpt:
    "bg-emerald-500/20 text-emerald-300",

  claude:
    "bg-orange-500/20 text-orange-300",

  cursor:
    "bg-purple-500/20 text-purple-300",

  copilot:
    "bg-blue-500/20 text-blue-300",

  gemini:
    "bg-sky-500/20 text-sky-300",

  windsurf:
    "bg-cyan-500/20 text-cyan-300",
};

const ToolIcon = ({ tool }) => {

  return (
    <div
      className={`
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        text-sm
        font-semibold
        uppercase
        ${toolStyles[tool]
          || "bg-white/10 text-white"}
      `}
    >
      {tool?.charAt(0)}
    </div>
  );
};

export default ToolIcon;