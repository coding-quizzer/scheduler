import { useState } from "react";
export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);

  return { mode, transition: setMode };

};