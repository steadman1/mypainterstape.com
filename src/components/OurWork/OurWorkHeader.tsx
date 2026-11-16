import { useEffect, useRef } from "react";
import { Work } from "../../objects/Work";
import { Arrow, Direction } from "../Icons/Arrow";

type OurWorkHeaderProps = {
  works: Work[],
  workIndex: number,
  isInside: boolean,
  onSelectWork: (index: number) => void,
  onExit: () => void,
  onEnter: () => void,
};

// Top of the Our Work card: the section label, a tab for each work, and a way past it all.
// On narrow screens the tabs scroll sideways and keep the current work in view.
function OurWorkHeader({ works, workIndex, isInside, onSelectWork, onExit, onEnter }: OurWorkHeaderProps) {
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tabs = tabsRef.current;
    const active = tabs?.children[workIndex] as HTMLElement | undefined;
    if (!tabs || !active || tabs.scrollWidth <= tabs.clientWidth) return;
    tabs.scrollTo({ left: active.offsetLeft - (tabs.clientWidth - active.offsetWidth) / 2, behavior: "smooth" });
  }, [workIndex]);

  return (
    <header className="ow-header">
      <p className="ow-brand" aria-hidden="true">
        <span className="ow-brand-mark">*</span>Our Work
      </p>
      <nav className="ow-tabs" aria-label="Our work" ref={tabsRef}>
        {
          works.map((work, index) => (
            <button
              key={work.name}
              className={`ow-tab ${index === workIndex ? "is-active" : ""}`}
              aria-current={index === workIndex ? "true" : undefined}
              onClick={() => onSelectWork(index)}
            >
              {work.name}
            </button>
          ))
        }
      </nav>
      <button className="ow-skip" onClick={isInside ? onExit : onEnter}>
        <span>{isInside ? "Skip" : "Enter"}</span>
        <Arrow color="currentColor" direction={isInside ? Direction.SOUTH : Direction.NORTHEAST} />
      </button>
    </header>
  );
}

export default OurWorkHeader;
