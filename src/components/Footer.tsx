import { isMobile } from "react-device-detect";
import HoverTranslateButton from "./HoverTranslateButton";

function Footer() {
  const handleClick = (src) => {
    window.open(src, "_blank");
  }

  const height = isMobile ? { height: "100vh" } : { height: "50vh" };

  return (
    <>
        <section data-scroll-section>
          <div id="footer" style={ height }>
            <div className="hstack leading">
              <img 
                id="footer-poster" 
                src="/poster.jpg" 
                alt="Painter*s Tape Poster"
                style={ isMobile ? { height: "calc(50vh - 20px)" } : { height: "calc(50vh - 20px)" }}
              />
              <div id="footer-contact-details" className="vstack space-between leading" style={ height }>
                <h1 className="footer-text" style={{ marginRight: "10px" }}>Connect With Us</h1>
                
                <div className="vstack leading">
                  <button
                    onClick={() => handleClick("https://www.instagram.com/")}
                  >
                    <h3 className="footer-text animated">
                        Instagram
                      </h3>
                  </button>
                  <button
                    onClick={() => handleClick("https://www.linkedin.com/")}
                  >
                    <h3 className="footer-text animated">
                        LinkedIn
                      </h3>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}

export default Footer;