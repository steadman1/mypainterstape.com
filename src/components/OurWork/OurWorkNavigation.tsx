import { Work } from "../../objects/Work";
import { WorkDetail } from "../../objects/WorkDetail";
import { Color } from "../../objects/Color";
import { useState } from "react";
import { Arrow, Direction } from "../Icons/Arrow";

enum NavigationDirection {
  HORIZONTAL = "hstack space-between",
  VERTICAL = "vstack"
}

function OurWorkNavigation({ direction, works, workIndex, setWorkIndex, detailIndex, setDetailIndex, lockScroll, setLockScroll }: { direction: NavigationDirection, works: Work[], workIndex: number, setWorkIndex: React.Dispatch<React.SetStateAction<number>>, detailIndex: number, setDetailIndex: React.Dispatch<React.SetStateAction<number>>, lockScroll: boolean, setLockScroll: React.Dispatch<React.SetStateAction<boolean>> }) {
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
    setLockScroll(_ => !lockScroll);
  }

  const primaryColor = work.primaryTextColor.toRgbString();
  const secondaryColor = work.backgroundColor.toRgbString();

  const border = `2px solid ${primaryColor}`;
  const getButtonHeight = () => {
    const button = document.getElementById("exit-navigation-button");
    return button ? button.clientHeight : 50;
  }

  const horizontalStyling = {
    top: 0,
    width: "100vw",
    zIndex: 1,
    overflowX: "auto",
  }
  const verticalStyling = { 
    height: "100vh"
  }

  return (
    <>
      <div id="our-work-navigation" style={ direction === NavigationDirection.HORIZONTAL ? horizontalStyling : verticalStyling} onMouseEnter={() => { handleHover(true) } } onMouseLeave={() => { handleHover(false) }}>
        <div className={ `${direction} leading` }>
          {
            works.map((work: Work, index: number) => (
              <div key={index} className="our-work-navigation-item animated">
                <button className="call-to-action-primary animated" onClick={() => handleClick(index)} style={{ width: hover ? "fit-content" : getButtonHeight(), paddingLeft: `${hover ? "" : 0}`, paddingRight: `${hover ? "" : 0}`, backgroundColor: hover || index !== workIndex ? secondaryColor : primaryColor, border: border }}>
                  <div className="hstack bottom-alignment animated-width">
                    {
                      index === workIndex ? (
                      <div style={{ margin: `${hover ? "0 5px 3px 0" : "auto"}` }}>
                        {
                          hover ? (
                            <Arrow color={ primaryColor } direction={Direction.EAST} />
                          ) : (
                            <h2 className="animated" style={{ color: secondaryColor, margin: "3px 0 0 0" }}>
                              <span className="asterisk">*</span>
                            </h2>
                          )
              }
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
          <div key="exit" className="our-work-navigation-item animated">
            <button className="call-to-action-primary animated" id="exit-navigation-button" onClick={() => handleExit()} style={{ width: hover ? "fit-content" : getButtonHeight(), paddingLeft: `${hover ? "" : 0}`, paddingRight: `${hover ? "" : 0}`, backgroundColor: hover || !lockScroll ? secondaryColor : primaryColor, border: border }}>
              <div className={ `hstack` }>
                  <div style={{ margin: `${hover ? "0 5px 3px 0" : "0px auto"}` }}><Arrow color={ hover || !lockScroll ? primaryColor : secondaryColor } direction={lockScroll ? Direction.SOUTHWEST : Direction.NORTHEAST} /></div>
                  <h4 className={ `text-width call-to-action-text animated-width ${hover ? "active" : "inactive"}` } style={{ opacity: hover ? 1 : 0, transform: `scale(${ hover ? 1 : 0.8 }`, color: primaryColor }}>{ lockScroll ? "Exit" : "Enter"}</h4>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { OurWorkNavigation, NavigationDirection };