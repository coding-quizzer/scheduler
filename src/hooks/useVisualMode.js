import { useState } from "react";
export default function useVisualMode(initMode) {
  const [history, setHistory] = useState([initMode]);

  const transition = (newMode, replace) => {
    const newHistory = [...history];
    if (replace) {
      newHistory.pop()
    }
    newHistory.push(newMode);
    setHistory(newHistory);
  }

  const mode = history[history.length - 1];



  const back = () => {

    const newHistory = [...history]

    if(history.length > 1) {
      newHistory.pop();
    }
    setHistory(newHistory);

  };

  return { mode, transition, back };

};