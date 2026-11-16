import { ReactNode } from "react";
import { CallToActionType, Work } from "../../objects/Work";
import { Arrow, Direction } from "../Icons/Arrow";
import CheckMark from "../Icons/CheckMark";

type OurWorkFooterProps = {
    work: Work,
    detailIndex: number,
    isFirst: boolean,
    isFinal: boolean,
    isInside: boolean,
    onNext: () => void,
    onBack: () => void,
};

const linkLabels: Partial<Record<CallToActionType, string>> = {
    [CallToActionType.DOWNLOAD_URL_WITH_NEXT]: "Download",
    [CallToActionType.VISIT_SHOP_URL_WITH_NEXT]: "Visit Shop",
    [CallToActionType.VIEW_SOURCE_URL_WITH_NEXT]: "View on GitHub",
};

// Pill button whose label rolls up on hover.
function OurWorkButton({ variant, icon, label, onClick }: { variant: "primary" | "secondary", icon: ReactNode, label: string, onClick: () => void }) {
    return (
        <button className={`ow-button ${variant}`} onClick={onClick}>
            <span className="ow-button-roll" data-label={label}>
                <span>{label}</span>
            </span>
            <span className="ow-button-icon">{icon}</span>
        </button>
    );
}

// Bottom of the Our Work card: Back on the left, progress through the current work in the
// middle, and the next step (plus the work's link, when it has one) on the right.
function OurWorkFooter({ work, detailIndex, isFirst, isFinal, isInside, onNext, onBack }: OurWorkFooterProps) {
    const detail = work.details[detailIndex];
    const linkLabel = linkLabels[detail.ctaType];
    const total = work.details.length;

    const nextLabel = !isInside && isFirst ? "Explore" : isFinal ? "Finish" : linkLabel ? "Next" : "Continue";
    const nextIcon = isFinal ? <CheckMark color="currentColor" /> : <Arrow color="currentColor" direction={Direction.EAST} />;

    const openLink = () => {
        if (detail.URL) window.open(detail.URL, "_blank", "noopener")?.focus();
    };

    return (
        <footer className="ow-footer">
            <div className="ow-footer-back">
                {
                    isFirst ? null : (
                        <button className="ow-back" onClick={onBack}>
                            <Arrow color="currentColor" direction={Direction.WEST} />
                            <span>Back</span>
                        </button>
                    )
                }
            </div>

            <div className="ow-progress" aria-label={`${work.name}, ${detailIndex + 1} of ${total}`}>
                <span className="ow-progress-count">
                    {String(detailIndex + 1).padStart(2, "0")}<span className="ow-progress-total"> / {String(total).padStart(2, "0")}</span>
                </span>
                <span className="ow-progress-track" aria-hidden="true">
                    {
                        work.details.map((_, index) => (
                            <span key={index} className={`ow-progress-segment ${index <= detailIndex ? "is-done" : ""}`} />
                        ))
                    }
                </span>
            </div>

            <div className="ow-footer-actions">
                {
                    linkLabel ? (
                        <>
                            <OurWorkButton variant="primary" label={linkLabel} icon={<Arrow color="currentColor" direction={Direction.NORTHEAST} />} onClick={openLink} />
                            <OurWorkButton variant="secondary" label={nextLabel} icon={nextIcon} onClick={onNext} />
                        </>
                    ) : (
                        <OurWorkButton variant="primary" label={nextLabel} icon={nextIcon} onClick={onNext} />
                    )
                }
            </div>
        </footer>
    );
}

export default OurWorkFooter;
