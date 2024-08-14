import React from 'react';

function replaceSpecialCharacters(text: string) {
    const parts = text.split(/(_.*?_)/);

    return parts.map((part, index) => {
        if (part.startsWith('_') && part.endsWith('_')) {
            const content = part.slice(1, -1);
            return (
                <span key={index} className="specialCharacters">
                    {content}
                </span>
            );
        } else {
            return part;
        }
    });
}

export default replaceSpecialCharacters;