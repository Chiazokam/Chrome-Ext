import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ChromeMessage, Sender } from "./types";

function App() {
  const [url, setUrl] = useState<string | undefined>('');

  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      const derivedUrl = tabs[0].url;
      setUrl(derivedUrl);
    });
  }, []);

  /**
       * Send message to the content script
       */
  const sendTestMessage = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "Hello from React",
    }

    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            URL:
          </p>
          <p>{url}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

  export default App;
