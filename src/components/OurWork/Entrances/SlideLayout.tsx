import { ReactNode } from 'react';
import replaceSpecialCharacters from '../../../replaceSpecialCharacters';

type SlideLayoutProps = {
    // Shown beside the copy on wide screens and above it on narrow ones; centred slides put
    // it above the copy at every size.
    media?: ReactNode,
    title: string,
    subtitle?: string,
    description?: string,
    // A centred, larger title with the media above it, for intros and closing slides.
    centered?: boolean,
};

// The layout every Our Work slide shares, so titles, body text and media line up the same way
// from slide to slide.
function SlideLayout({ media, title, subtitle, description, centered = false }: SlideLayoutProps) {
    return (
        <div className={`ow-slide ${centered ? "is-centered" : ""} ${media ? "has-media" : ""}`}>
            { media ? <div className="ow-slide-media">{media}</div> : null }
            <div className="ow-slide-copy">
                <h3 className="ow-slide-title">{replaceSpecialCharacters(title)}</h3>
                { subtitle ? <p className="ow-slide-subtitle">{replaceSpecialCharacters(subtitle)}</p> : null }
                { description ? <p className="ow-slide-body">{replaceSpecialCharacters(description)}</p> : null }
            </div>
        </div>
    );
}

export default SlideLayout;
