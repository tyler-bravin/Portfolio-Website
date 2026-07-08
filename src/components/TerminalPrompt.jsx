/**
 * @file TerminalPrompt.jsx
 * @description The interactive prompt at the bottom of the hero readout panel.
 * A handful of real commands (help, cv, contact, cd...) plus a couple of
 * easter eggs. Output is capped and scrollable so it can't blow up the layout.
 * @author Tyler Bravin
 */

import React, { useState, useRef, useEffect } from 'react';
import './TerminalPrompt.css';

const PROMPT = 'tyler@bravin:~$';

const HELP = [
    'available commands:',
    '  help       show this list',
    '  whoami     who am i talking to',
    '  ls         list site sections',
    '  cd <dir>   jump to a section (e.g. cd projects)',
    '  stack      what i build with',
    '  cv         download my cv',
    '  contact    email me',
    '  clear      clear the terminal',
];

const TerminalPrompt = () => {
    const [history, setHistory] = useState([]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const bodyRef = useRef(null);

    // Keep the newest output in view.
    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [history]);

    const run = (raw) => {
        const cmd = raw.trim();
        if (!cmd) return [];

        const [name, ...args] = cmd.toLowerCase().split(/\s+/);

        switch (name) {
            case 'help':
                return HELP;
            case 'whoami':
                return ['Tyler Bravin — graduate software engineer, Falkirk, Scotland.'];
            case 'ls':
                return ['about/  projects/  experience/  contact/'];
            case 'cd': {
                const target = (args[0] || '').replace(/\/$/, '');
                const sections = ['about', 'projects', 'experience', 'contact', 'hero'];
                if (sections.includes(target)) {
                    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
                    return [`moved to ~/${target}`];
                }
                return [`cd: no such directory: ${args[0] || ''} — try 'ls'`];
            }
            case 'stack':
                return ['React · TypeScript · Java · Python · FastAPI · PostgreSQL · Redis'];
            case 'cv': {
                const a = document.createElement('a');
                a.href = '/downloads/Tyler-Bravin-CV.pdf';
                a.download = '';
                document.body.appendChild(a);
                a.click();
                a.remove();
                return ['fetching Tyler-Bravin-CV.pdf ... done.'];
            }
            case 'contact':
                window.location.href = 'mailto:tylerbravin02@gmail.com';
                return ['opening mail client — or reach me at tylerbravin02@gmail.com'];
            case 'clear':
                setHistory([]);
                return null; // handled: history already reset
            case 'sudo':
                return ['tyler is not in the sudoers file. This incident will be reported.'];
            case 'fastfetch':
            case 'neofetch':
                return ["you're already looking at it."];
            case 'vim':
            case 'nvim':
                return [':q! — you\'re free. this time.'];
            case 'rm':
                return ['nice try.'];
            default:
                return [`command not found: ${name} — try 'help'`];
        }
    };

    const onKeyDown = (e) => {
        if (e.key !== 'Enter') return;
        const output = run(input);
        if (output !== null) {
            setHistory((h) => [
                ...h.slice(-40), // cap history
                { type: 'cmd', text: input },
                ...output.map((line) => ({ type: 'out', text: line })),
            ]);
        }
        setInput('');
    };

    return (
        /* Clicking anywhere in the prompt area focuses the input. */
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <div className="terminal" onClick={() => inputRef.current?.focus()}>
            {history.length > 0 && (
                <div className="terminal-history" ref={bodyRef}>
                    {history.map((line, i) =>
                        line.type === 'cmd' ? (
                            <div className="terminal-line terminal-cmd" key={i}>
                                <span className="terminal-ps1">{PROMPT}</span> {line.text}
                            </div>
                        ) : (
                            <div className="terminal-line" key={i}>{line.text}</div>
                        )
                    )}
                </div>
            )}
            <div className="terminal-input-row">
                <span className="terminal-ps1">{PROMPT}</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="terminal-input"
                    aria-label="Terminal prompt — type 'help' for commands"
                    placeholder="type 'help'"
                    spellCheck="false"
                    autoComplete="off"
                    autoCapitalize="off"
                />
            </div>
        </div>
    );
};

export default TerminalPrompt;
