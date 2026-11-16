import { Fragment, ReactNode } from 'react';
import { Work } from '../../../objects/Work';
import SlideLayout from './SlideLayout';

// Just enough Swift highlighting for a short snippet: strings, `.member` access and type names.
const TOKEN = /("(?:[^"\\]|\\.)*"|\.[a-z][A-Za-z0-9]*|\b[A-Z][A-Za-z0-9]*\b)/;

function highlightSwift(code: string): ReactNode[] {
    return code.split(TOKEN).map((part, index) => {
        if (!part) return null;
        if (part.startsWith('"')) return <span key={index} className="code-string">{part}</span>;
        if (part.startsWith('.')) return <span key={index} className="code-member">{part}</span>;
        if (/^[A-Z]/.test(part)) return <span key={index} className="code-type">{part}</span>;
        return <Fragment key={index}>{part}</Fragment>;
    });
}

function DescriptionWithCodeWorkDetail({ work, detailIndex }: { work: Work, detailIndex: number }) {
    const detail = work.details[detailIndex];

    const code = (
        <pre className="ow-code" aria-label="Swift code example">
            <code>{highlightSwift(detail.code ?? "")}</code>
        </pre>
    );

    return <SlideLayout media={code} title={detail.title} subtitle={detail.subtitle} description={detail.description} />;
}

export default DescriptionWithCodeWorkDetail;
