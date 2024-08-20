import React from 'react';

function AsteriskLoadingScreen({ loadingProgress, setUserEntered }: { loadingProgress: number, setUserEntered: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className="asterisk-loading-screen">
        <img src="/asterisk.png" alt="asterisk" style={{ width: "30dvw", height: "30dvh", objectFit: "contain" }} />
      <p>Loading: {loadingProgress}%</p>
      {loadingProgress === 100 && (
        <button onClick={() => setUserEntered(true)}>Enter</button>
      )}
    </div>
  );
}

export default AsteriskLoadingScreen;
