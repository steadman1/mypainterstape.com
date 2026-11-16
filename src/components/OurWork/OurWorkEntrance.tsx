import { useLayoutEffect, useRef } from 'react';
import { Work, WorkDetailType } from '../../objects/Work';
import DescriptionWorkDetail from './Entrances/DescriptionWorkDetail';
import DescriptionWithLogoWorkDetail from './Entrances/DescriptionWithLogoWorkDetail';
import ImageStackWorkDetail from './Entrances/ImageStackWorkDetail';
import DescriptionWithCodeWorkDetail from './Entrances/DescriptionWithCodeWorkDetail';
import CallToActionWorkDetail from './Entrances/CallToActionWorkDetail';
import DescriptionWithImageWorkDetail from './Entrances/DescriptionWithImageWorkDetail';

type OurWorkEntranceProps = {
    work: Work,
    detailIndex: number,
    imageIndex: number,
    subscribeImagePosition: (listener: (position: number) => void) => () => void,
    onSelectImage: (index: number) => void,
    direction: "forward" | "backward",
};

function OurWorkEntrance({ work, detailIndex, imageIndex, subscribeImagePosition, onSelectImage, direction }: OurWorkEntranceProps) {
    const detail = work.details[detailIndex];
    const fitRef = useRef<HTMLDivElement>(null);

    // Shrink the slide to fit when it is taller than the space between the header and the
    // footer (short phones, long descriptions), rather than clipping it.
    useLayoutEffect(() => {
        const content = fitRef.current;
        const area = content?.parentElement?.parentElement;
        if (!content || !area) return;

        const fit = () => {
            const available = area.clientHeight;
            const needed = content.scrollHeight;
            const scale = needed > available && needed > 0 ? Math.max(0.6, available / needed) : 1;
            content.style.transform = scale < 1 ? `scale(${scale})` : "";
        };

        fit();
        const observer = new ResizeObserver(fit);
        observer.observe(content);
        observer.observe(area);
        return () => observer.disconnect();
    }, []);

    let slide;
    switch (detail.type) {
        case WorkDetailType.DESCRIPTION_WITH_LOGO:
            slide = <DescriptionWithLogoWorkDetail work={work} detailIndex={detailIndex} />;
            break;
        case WorkDetailType.DESCRIPTION_WITH_IMAGE:
            slide = <DescriptionWithImageWorkDetail work={work} detailIndex={detailIndex} />;
            break;
        case WorkDetailType.DESCRIPTION_WITH_MANY_IMAGES:
            slide = (
                <ImageStackWorkDetail
                    work={work}
                    detailIndex={detailIndex}
                    imageIndex={imageIndex}
                    subscribeImagePosition={subscribeImagePosition}
                    onSelectImage={onSelectImage}
                />
            );
            break;
        case WorkDetailType.DESCRIPTION_WITH_CODE:
            slide = <DescriptionWithCodeWorkDetail work={work} detailIndex={detailIndex} />;
            break;
        case WorkDetailType.CALL_TO_ACTION:
            slide = <CallToActionWorkDetail work={work} detailIndex={detailIndex} />;
            break;
        default:
            slide = <DescriptionWorkDetail work={work} detailIndex={detailIndex} />;
            break;
    }

    return (
        <div className={`ow-transition ${direction}`}>
            <div ref={fitRef} className="ow-fit">
                { slide }
            </div>
        </div>
    );
}

export default OurWorkEntrance;
