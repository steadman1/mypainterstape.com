import { useState } from 'react';
import { Work } from '../../../objects/Work';
import SlideLayout from './SlideLayout';

function DescriptionWithLogoWorkDetail({ work, detailIndex }: { work: Work, detailIndex: number }) {
    const [loaded, setLoaded] = useState(false);
    const detail = work.details[detailIndex];

    const logo = (
        <img
            className={`ow-logo ${loaded ? "is-loaded" : ""}`}
            src={`/${detail.images[0]}`}
            alt=""
            onLoad={() => setLoaded(true)}
            draggable={false}
        />
    );

    return <SlideLayout centered media={logo} title={detail.title} subtitle={detail.subtitle} description={detail.description} />;
}

export default DescriptionWithLogoWorkDetail;
