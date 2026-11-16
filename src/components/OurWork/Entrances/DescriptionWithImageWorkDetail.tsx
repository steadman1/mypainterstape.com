import { useState } from 'react';
import { Work } from '../../../objects/Work';
import SlideLayout from './SlideLayout';

function DescriptionWithImageWorkDetail({ work, detailIndex }: { work: Work, detailIndex: number }) {
    const [loaded, setLoaded] = useState(false);
    const detail = work.details[detailIndex];

    const image = (
        <img
            className={`ow-image ${loaded ? "is-loaded" : ""}`}
            src={`/${detail.images[0]}`}
            alt={`${work.name}: ${detail.title}`}
            onLoad={() => setLoaded(true)}
            draggable={false}
        />
    );

    return <SlideLayout media={image} title={detail.title} subtitle={detail.subtitle} description={detail.description} />;
}

export default DescriptionWithImageWorkDetail;
