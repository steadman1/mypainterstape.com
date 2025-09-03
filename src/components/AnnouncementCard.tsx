import useWindowDimensions from '../hooks/useWindowDimensions';
import HoverTranslateButton from './HoverTranslateButton';
import { Arrow, Direction } from "./Icons/Arrow";
import { Color } from "../objects/Color";

function AnnouncementCard() {
    const { width } = useWindowDimensions();

    const shopURL = "https://shop.mypainterstape.com";

    const primaryColor = new Color("#1A57E3");
    const secondaryColor = new Color("#C9E1F2");

    const handleVisitShop = () => {
        if (shopURL) {
            window.open(shopURL, "_blank").focus();
        }
    }
    return (
        <>
            <div data-scroll data-scroll-speed="0.5" data-scroll-position="top" id="announcement-card">
                <div className={ `announcement-card ${ width > 600 ? '' : 'vstack leading'}` }>
                    <div className="vstack leading" style={{ marginLeft: "5px" }}>
                        <div style={{ padding: "3px 6px", backgroundColor: "red", borderRadius: "4px"}}>
                            <h5 style={{ fontFamily: "integral", color: "white", margin: 0 }}>NEW</h5>
                        </div>
                        <h2 className="call-to-action-text" style={{ margin: 0 }}>
                            Shop Painter
                            <span className="asterisk" style={{ marginTop: "7px" }}>*</span>
                            s Tape Merch!
                        </h2>
                    </div>

                    <button className="call-to-action-shop animated" onClick={() => handleVisitShop()} style={{ backgroundColor: secondaryColor.toRgbString(), width: `${ width > 600 ? '' : 'calc(100% - 40px)'}`, marginTop: `${ width > 600 ? '0' : '20px'}` }}>
                        <div className="hstack bottom-alignment">
                            <div style={{ marginRight: "5px", marginBottom: "3px" }}>{ <Arrow color={ primaryColor.toRgbString() } direction={ Direction.NORTHEAST } /> }</div>
                            <HoverTranslateButton text={ "Visit Shop" } onClick={() => handleVisitShop()} primaryColor={primaryColor}  /> 
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
}

export default AnnouncementCard;