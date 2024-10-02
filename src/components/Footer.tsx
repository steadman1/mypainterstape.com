import { useLocomotiveScroll } from "../hooks/useLocomotiveScroll";
import { useEffect } from "react";
import { Arrow, Direction } from "./Icons/Arrow";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Footer = ({ height }: { height: React.CSSProperties }) => {
  const { width } = useWindowDimensions();
  const scrollRef = useLocomotiveScroll();
  const handleClick = (src: string) => {
    window.open(src, "_blank");
  }

  useEffect(() => {
    const updateOnLoad = () => {
      if (!scrollRef.current) return;
      setTimeout(() => {
        console.log('Updating scroll');
        scrollRef.current.update();
      }, 50);
    }

    window.addEventListener('locomotive-scroll-initialized', updateOnLoad);

    return () => {
      window.removeEventListener('locomotive-scroll-initialized', updateOnLoad);
    }
  }, [scrollRef]);

  return (
    <>
      <div 
          data-scroll-sticky
          data-scroll-target="#footer-scroll-section"
          data-scroll-position=""
          id="footer"
          style={ height }
        >
          <div id="footer-contact-details" className="vstack space-between leading" style={{ padding: "0 10px", ...height }}>
            {
              width < 600 ? (
                <div>
                  <div className="vstack leading">
                  <div className="hstack leading">
                    <h1 className="footer-text" style={{ fontSize: "3.6rem" }}>Connect</h1>
                  </div>
                  <div className="hstack space-between leading" style={{ width: "calc(100vw - 20px)" }}>
                    <h1 className="footer-text" style={{ fontSize: "3.6rem" }}>With</h1>
                    <h1 className="footer-text" style={{ fontSize: "3.6rem" }}>Our</h1>
                  </div>
                  <div className="hstack space-between" style={{ width: "calc(100vw - 20px)" }}>
                    <div className="hstack show-skills pointer" onClick={() => handleClick("mailto:hello@mypainterstape.com")} style={{ borderColor: "#fff" }}>
                      <Arrow color={"#ffffff"} direction={Direction.NORTHEAST} />
                      <h4 className="meet-us-description" style={{ fontFamily: "integral", marginTop: "0px", color: "#fff" }}>Contact</h4>
                    </div>
                    <h1 className="footer-text" style={{ fontSize: "3.6rem" }}>Team</h1>
                  </div>
                  
                </div>
                </div>
              ) : (
                <div className="vstack leading">
                  <div className="hstack space-between">
                    <h1 className="footer-text">Connect</h1>
                    <div className="hstack show-skills pointer" onClick={() => handleClick("mailto:hello@mypainterstape.com")} style={{ borderColor: "#fff" }}>
                      <Arrow color={"#ffffff"} direction={Direction.NORTHEAST} />
                      <h4 className="meet-us-description" style={{ fontFamily: "integral", marginTop: "0px", color: "#fff" }}>Contact</h4>
                    </div>
                  </div>
                  <div className="hstack space-between" style={{ width: "calc(100vw - 20px)" }}>
                    <h1 className="footer-text">With</h1>
                    <h1 className="footer-text">Us</h1>
                  </div>
                </div>
              )
            }
            <div className="hstack space-between" style={{ width: "calc(100vw - 20px)", marginBottom: "5px" }}>
              <button onClick={() => handleClick("https://www.instagram.com/mypainterstape/")}>
                <h3 className="footer-text animated">Instagram</h3>
              </button>
              <h4 className="footer-text" style={{ margin: 0 }}>
                <span className='italic'>Made with Love. (2024)</span>
              </h4>
              <button onClick={() => handleClick("https://www.linkedin.com/company/ptstudios/")}>
                <h3 className="footer-text animated">LinkedIn</h3>
              </button>
            </div>
          </div>
        </div>
    </>
  );
}

export default Footer;
