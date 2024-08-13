import Divider from "./Divider";
import { Work, WorkType } from "../objects/Work";

function OurWorkBar({ work, color }: { work: Work, color: string }) {
  let workTypeText = "";
  switch (work.workType) {
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
    <div className="vstack expanding" id="our-work-bar">
        <div className="hstack space-between-row">
          <h2 className="our-work-text" style={{ color: color }}>*</h2>
          <h3 className="our-work-text one" style={{ color: color }}>Our Work</h3>
          <h2 className="our-work-text" style={{ color: color }}>*</h2>
          <h3 className="our-work-text two" style={{ color: color }}>Our Work</h3>
          <h2 className="our-work-text" style={{ color: color }}>*</h2>
          <h3 className="our-work-text three" style={{ color: color }}>Our Work</h3>
          <h2 className="our-work-text" style={{ color: color }}>*</h2>
      </div>
      <div className="hstack space-between-row">
        <h3 className="text-width subtitle stroked" style={{ color: work.primaryTextColor, WebkitTextStrokeColor: work.primaryTextColor }}>{ work.name }</h3>
        <Divider color={work.primaryTextColor} />
        <h3 className="text-width subtitle stroked" style={{ color: work.primaryTextColor, WebkitTextStrokeColor: work.primaryTextColor }}>{ workTypeText }</h3>
    </div>
    </div>
  );
}

export default OurWorkBar