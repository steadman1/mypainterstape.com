import React from 'react';

function AsteriskLoadingScreen({ loadingProgress, setUserEntered }: { loadingProgress: number, setUserEntered: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className="asterisk-loading-screen">
      <p>Loading: {loadingProgress}%</p>
      {loadingProgress === 100 && (
        <button onClick={() => setUserEntered(true)}>Enter</button>
      )}
    </div>
  );
}

export default AsteriskLoadingScreen;
