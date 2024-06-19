// src/components/CodeEditor.js
import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // You can choose a different theme if you prefer
import './CodeEditor.css';

import { themes } from 'prism-react-renderer';
import { Highlight } from 'prism-react-renderer';

const codeSnippet = `import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <h1>Hello world</h1>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
`;

const CodeEditor = () => {
  const [code, setCode] = useState(codeSnippet);
  const textareaRef = useRef(null);
  const preRef = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  // Synchronize scroll positions of textarea and pre
  const syncScroll = () => {
    if (textareaRef.current && preRef.current) {
      const textarea = textareaRef.current;
      const pre = preRef.current;
      pre.scrollTop = textarea.scrollTop;
      pre.scrollLeft = textarea.scrollLeft;
    }
  };

  const handleTextareaScroll = () => {
    syncScroll();
  };

 /* const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto'; // Reset textarea height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set new height based on content
  };
  */
  return (
    <div className="code-editor-container">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleCodeChange}
          //onInput={handleTextareaInput}
          onScroll={handleTextareaScroll}
          spellCheck="false"
          className="code-input"
          placeholder='Type your code here...'
        />
        <div>
        <Highlight theme={themes.github} Prism={Prism} code={code} language="js">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      </div>
    </div>
  );
};

export default CodeEditor;
