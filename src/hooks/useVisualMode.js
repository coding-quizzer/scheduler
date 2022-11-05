import { useState } from "react";
export default function useVisualMode(initMode) {
  const [history, setHistory] = useState([initMode]);

  const mode = history[history.length - 1];
  
  const transition = (newMode, replace) => {
    setHistory(prev => {
      const next = [...prev];
      if(replace) {
        next.pop();
      };
      next.push(newMode);
      return next;
    });
  }

  const back = () => (
    setHistory(prev => (
      prev.length <= 1 
        ? prev 
        : prev.slice(0, -1)
      )
    )
  );

  return { mode, transition, back };

};