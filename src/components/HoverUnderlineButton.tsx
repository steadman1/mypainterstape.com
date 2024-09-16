import { useState } from 'react';
import { Color } from '../objects/Color';

type HoverUnderlineButtonProps = {
  text: string;
  onClick: () => void;
  primaryColor: Color;
}

const HoverUnderlineButton = ({ text, onClick, primaryColor }: HoverUnderlineButtonProps) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      className="call-to-action-secondary"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        textDecorationColor: primaryColor.transparentize(hover ? 1 : 0).toRgbaString(),
      }}
    >
      <div className="hstack">
        <h3 className="text-width call-to-action-text" style={{ color: primaryColor.toRgbaString() }}>
          {text}
        </h3>
      </div>
    </button>
  );
};

export default HoverUnderlineButton;
