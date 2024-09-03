import React, { useState } from 'react';
import { Color } from '../objects/Color';

type HoverTranslateButtonProps = {
  text: string;
  onClick: () => void;
  primaryColor: Color;
};

const HoverTranslateButton: React.FC<HoverTranslateButtonProps> = ({ text, onClick, primaryColor }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      className="call-to-action-top-bar"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <div className="zstack" style={{ height: "2rem", overflowY: "clip" }}>
        <h3 className="text-width call-to-action-text animated" style={{ transform: `translateY(${hover ? 0 : -100}%)`, color: primaryColor.toRgbaString() }}>
          {text}
        </h3>
        <h3 className="text-width call-to-action-text animated" style={{ transform: `translateY(${hover ? 100 : 0}%)`, color: primaryColor.toRgbaString() }}>
          {text}
        </h3>
      </div>
    </button>
  );
};

export default HoverTranslateButton;
