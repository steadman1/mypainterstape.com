import { Work } from "../../objects/Work";
import { WorkDetail } from "../../objects/WorkDetail";
import { Color } from "../../objects/Color";
import { useState } from "react";
import { Arrow, Direction } from "../Icons/Arrow";

function OurWorkNavigation({ works, workIndex, setWorkIndex, detailIndex, setDetailIndex, lockScroll, setLockScroll }: { works: Work[], workIndex: number, setWorkIndex: React.Dispatch<React.SetStateAction<number>>, detailIndex: number, setDetailIndex: React.Dispatch<React.SetStateAction<number>>, lockScroll: boolean, setLockScroll: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [hover, setHover] = useState(false);
  const work = works[workIndex];
  const details = work.details;

  const handleHover = (entering) => {
    setHover(entering);
  }
  const handleClick = (index: number) => { 
    if (!lockScroll) {
      setLockScroll(true);
    }
    setWorkIndex(index);
    setDetailIndex(0);
  }
  const handleExit = () => {
    setLockScroll(!lockScroll);
  }

  const primaryColor = work.primaryTextColor.toRgbString();
  const secondaryColor = work.backgroundColor.toRgbString();

  const border = `2px solid ${primaryColor}`;
  const getButtonHeight = () => {
    const button = document.getElementById("exit-navigation-button");
    return button ? button.clientHeight : 0;
  }

  return (
    <>
      <div id="our-work-navigation" onMouseEnter={() => { handleHover(true) } } onMouseLeave={() => { handleHover(false) }}>
        <div className="vstack leading">
        
          {
            works.map((work: Work, index: number) => (
              <div key={index} className="our-work-navigation-item animated">
                <button className="call-to-action-primary animated" onClick={() => handleClick(index)} style={{ width: hover ? "fit-content" : getButtonHeight(), paddingLeft: `${hover ? "" : 0}`, paddingRight: `${hover ? "" : 0}`, backgroundColor: hover || index !== workIndex ? secondaryColor : primaryColor, border: border }}>
                  <div className="hstack bottom-alignment animated-width">
                    {
                      index === workIndex ? (
                      <div style={{ margin: `${hover ? "0 5px 3px 0" : "auto"}` }}>
                        <Arrow color={ hover ? primaryColor : secondaryColor } direction={Direction.EAST} />
                      </div>) : null
                    }
                    <h4 className={ `text-width call-to-action-text animated-width ${hover ? "active" : "inactive"}` } style={{ opacity: hover ? 1 : 0, transform: `scale(${ hover ? 1 : 0.8 }`, color: primaryColor }}>
                      {work.name}
                    </h4>
                  </div>
                </button>
              </div>
            ))
          }
          <button className="call-to-action-primary animated" id="exit-navigation-button" onClick={() => handleExit()} style={{ width: hover ? "fit-content" : getButtonHeight(), paddingLeft: `${hover ? "" : 0}`, paddingRight: `${hover ? "" : 0}`, backgroundColor: hover || lockScroll ? secondaryColor : primaryColor, border: border }}>
              <div className={ `hstack bottom-alignment` }>
                  <div style={{ margin: `${hover ? "0 5px 3px 0" : "auto"}` }}><Arrow color={ hover || lockScroll ? primaryColor : secondaryColor } direction={lockScroll ? Direction.NORTHEAST : Direction.SOUTHWEST} /></div>
                  <h4 className={ `text-width call-to-action-text animated-width ${hover ? "active" : "inactive"}` } style={{ opacity: hover ? 1 : 0, transform: `scale(${ hover ? 1 : 0.8 }`, color: primaryColor }}>{ lockScroll ? "Exit" : "Enter"} Work</h4>
              </div>
            </button>
        </div>
      </div>
    </>
  );
}

export default OurWorkNavigation;