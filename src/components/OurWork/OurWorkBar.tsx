import Divider from "../Divider";
import { Work, WorkType } from "../../objects/Work";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function OurWorkBar({ work, color }: { work: Work, color: string }) {
  const { width, height } = useWindowDimensions();

  let workTypeText = "";
  switch (work.workType) {
    case WorkType.INTRO: {
      workTypeText = "Sincerely, PT Studios";
      break;
    }
    case WorkType.IOSAPP: {
      workTypeText = "iOS App";
      break;
      
    }
    case WorkType.WEBAPP: {
      workTypeText = "Web App";
      break;
    }
    case WorkType.DESIGN: {
      workTypeText = "Design";
      break;
    }
  }

  return (
    <div className="vstack expanding" id="our-work-bar" style={{ background: `linear-gradient(to bottom, ${work.backgroundColor.transparentize(1).toRgbaString()} 60%, ${work.backgroundColor.transparentize(0).toRgbaString()} 100%)`}}>
      <div className="hstack space-between-row" style={{ opacity: width > 500 ? 1 : 0 }}>
        <h2 className="our-work-text" style={{ color: color }}>*</h2>
        <h3 className="our-work-text one" style={{ color: color }}>Our Work</h3>
        <h2 className="our-work-text" style={{ color: color }}>*</h2>
        <h3 className="our-work-text two" style={{ color: color }}>Our Work</h3>
        <h2 className="our-work-text" style={{ color: color }}>*</h2>
        <h3 className="our-work-text three" style={{ color: color }}>Our Work</h3>
        <h2 className="our-work-text" style={{ color: color }}>*</h2>
      </div>
      <div className="hstack space-between-row">
        <h3 className="text-width subtitle stroked" style={{ color: work.primaryTextColor.toRgbString(), WebkitTextStrokeColor: work.primaryTextColor.toRgbString() }}>{ work.name }</h3>
        <Divider color={work.primaryTextColor.toRgbString()} />
        <h3 className="text-width subtitle stroked" style={{ color: work.primaryTextColor.toRgbString(), WebkitTextStrokeColor: work.primaryTextColor.toRgbString() }}>{ workTypeText }</h3>
      </div>
    </div>
  );
}

export default OurWorkBar