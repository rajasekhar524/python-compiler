import React, { useEffect, useState,useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { runCode, setEngine, setOptions } from 'client-side-python-runner';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import { AiFillCaretRight } from "react-icons/ai";

const myTheme = createTheme({
  dark: 'light',
  settings: {
    background: '#282a36',
    backgroundImage: '',
    foreground: '#f8f8ff',
    caret: '#ffffff',
    selection: '#44475a',
    selectionMatch: '#44475a',
    gutterBackground: '#282a36',
    gutterForeground: '#f8f8ff',
    gutterBorder: '#323444',
    gutterActiveForeground: '',
    lineHighlight: '#44475a',
  },
  styles: [
    { tag: t.comment, color: '#888cca' },
    { tag: t.definition(t.typeName), color: '#f92672' },
    { tag: t.typeName, color: '#f92672' },
    { tag: t.tagName, color: '#a6e22e' },
    { tag: t.variableName, color: '#66d9ef' },
  ],
});

const PythonCompiler = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOptions({
      output: (message) => {
        setConsoleLogs((prevLogs) => [...prevLogs, message]);
        setLoading(false);
      },
      error: (error) => {
        // Handle the error here
        console.log(error.message);
        setConsoleLogs((prevLogs) => ['error:',error.message]);
        setLoading(false);
      },
    });
  }, []);

  const handleChange = (val, viewUpdate) => {
    setCode(val);
  };

  const handleClick = async () => {
    setConsoleLogs([]);
    setLoading(true);
    try {
      await setEngine('pyodide');
      await runCode(code);
    } catch (err) {
      setError(err.message);
      setOutput('');
    }
  };
  
  const handleClean = () =>{
    setCode('')
    setError(null); 
    setOutput('');
    setConsoleLogs([]);
  }

  const ConsoleEmulator = () => {
    const [consoleLines, setConsoleLines] = useState([]);

    useEffect(() => {
      setConsoleLines(consoleLogs);
    }, [consoleLogs]);

    return (
      <div className="console-emulator">
       
        {code&&loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}

        {consoleLines.map((line, index) => (
          <div
          key={index}
          className={`console-line ${line.startsWith('Error:') ? 'error' : ''}`}
        >
          {line}
        </div>
        ))}
      </div>
    );
  };
  

  return (
    <div>
      <div className='headingcode'><div className='headingcode__text'> Main.py</div></div>
      <CodeMirror
        value={code}
        height='300px'
        onChange={handleChange}
        theme={myTheme}
        extensions={[python()]}
      />
      <div className='button__layout'>
        <button onClick={handleClick} className="button"><AiFillCaretRight />Run</button>
        <button onClick={handleClean} className="button">Clear</button>
      </div>
      
       <div className='heading'>output</div>
      <ConsoleEmulator />

      {!error && <pre>{output}</pre>}
    </div>
  );
};

export default PythonCompiler;
