'use client';

import { useState, useRef, useEffect } from 'react';

const HELP_MESSAGE = `AetherOS Terminal - Available commands:
- help: Show this help message
- date: Display the current date and time
- whoami: Display the current user
- ls: List files in the current directory (mock)
- clear: Clear the terminal screen
`;

export default function TerminalApp() {
  const [history, setHistory] = useState<string[]>(['Welcome to AetherOS Terminal! Type "help" for commands.']);
  const [input, setInput] = useState('');
  const endOfHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (command: string) => {
    let output = '';
    const newHistory = [...history, `> ${command}`];
    
    switch (command.toLowerCase()) {
      case 'help':
        output = HELP_MESSAGE;
        break;
      case 'date':
        output = new Date().toLocaleString();
        break;
      case 'whoami':
        output = 'guest';
        break;
      case 'ls':
        output = 'Documents  Projects  Pictures';
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        output = `command not found: ${command}`;
    }
    setHistory([...newHistory, output]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input.trim());
    } else {
      setHistory([...history, '>']);
    }
    setInput('');
  };

  return (
    <div className="w-full h-full bg-black text-white font-mono text-sm p-2" onClick={() => document.getElementById('terminal-input')?.focus()}>
      <div className="overflow-y-auto h-full">
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">{line}</div>
        ))}
        <form onSubmit={handleSubmit} className="flex">
          <span>&gt;&nbsp;</span>
          <input
            id="terminal-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none text-white w-full"
            autoFocus
          />
        </form>
        <div ref={endOfHistoryRef} />
      </div>
    </div>
  );
}
