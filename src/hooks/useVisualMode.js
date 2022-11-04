import { useState } from "react";
export default function useVisualMode(initMode) {
  const [history, setHistory] = useState([initMode]);

  const transition = (newMode) => {
    setHistory(prev => ([...prev, newMode]));
  }

  const mode = history[history.length - 1];



  const back = () => {

    const newHistory = [...history]

    if(history.length > 1) {
      newHistory.pop();
    }
    console.log(history);
    setHistory(newHistory);

  };

  return { mode, transition, back };

};