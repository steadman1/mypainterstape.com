function replaceSpecialCharacters(text: string) {
    const parts = text.split(/(_.*?_)/);

    return parts.map((part, index) => {
        if (part.startsWith('_*') && part.endsWith('*_') || part.startsWith('*_') && part.endsWith('_*')) {
            const content = part.slice(2, -2);
            return (
                <span key={index} className="bold italic">
                    {content}
                </span>
            );
        } else if (part.startsWith('*') && part.endsWith('*')) {
            const content = part.slice(1, -1);
            return (
                <span key={index} className="bold">
                    {content}
                </span>
            );
        } else if (part.startsWith('_') && part.endsWith('_')) {
            const content = part.slice(1, -1);
            return (
                <span key={index} className="italic">
                    {content}
                </span>
            );
        } else {
            return part;
        }
    });
}

export default replaceSpecialCharacters;