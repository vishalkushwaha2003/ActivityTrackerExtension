import React, { useState, useEffect } from 'react';


const Test = () => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [tabData, setTabData] = useState(null);
  const tabData = {
    "userId": "513a3660-257d-45f9-94eb-5e51d5cdfbaf",
    "active": true,
    "audible": false,
    "autoDiscardable": true,
    "discarded": false,
    "favIconUrl": "https://cdn.oaistatic.com/_next/static/media/favicon-32x32.630a2b99.png",
    "groupId": -1,
    "height": 598,
    "highlighted": true,
    "id": 51446600,
    "incognito": false,
    "index": 2,
    "lastAccessed": 1716630828169.211,
    "mutedInfo": {
      "muted": false
    },
    "pendingUrl": "https://chatgpt.com/c/39fd2a9e-131f-4a19-b630-9c1373d9070b",
    "pinned": false,
    "selected": true,
    "status": "loading",
    "title": "ChatGPT",
    "url": "https://chatgpt.com/c/39fd2a9e-131f-4a19-b630-9c1373d9070b",
    "width": 818,
    "windowId": 51446597
  };

  const sendHandler = (e) => {
    e.preventDefault();
    chrome.runtime.sendMessage({ action: "getData", data: "message received" });
  };

  useEffect(() => {
    const messageListener = (message, sender, sendResponse) => {
      if (message.action === "sendDataToPopup") {
        // setTabData(message.data);
        console.log(message.data);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    // Cleanup the listener on component unmount
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://192.168.29.141:8080/tabs/activeTab', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tabData)
      });

      const contentType = response.headers.get('Content-Type');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Success:', data);
        setResponseData(data);
      } else {
        const text = await response.text();
        console.log('Received text:', text);
        setResponseData(text); // Store plain text response
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='text-white'>
      <h1>Send Data to API</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Send</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {responseData && (
        <div>
          <h2>Get Response from API</h2>
          {typeof responseData === 'string' ? (
            <pre>{responseData}</pre> // Display plain text response
          ) : (
            <pre>{JSON.stringify(responseData, null, 2)}</pre> // Display JSON response
          )}
        </div>
      )}

      <form onSubmit={sendHandler}>
        <h1>Get message from background js</h1>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Test;
