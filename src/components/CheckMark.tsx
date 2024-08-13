function CheckMark({ color }: { color: string }) {
    return (
        <svg className="icon" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.69 34.78" width="20px" height="20px">
            <defs>
                <style>
                {`.cls-1 { fill: ${ color }; stroke: ${ color }; stroke-linecap: square; stroke-width: 12px;}`}
                </style>
            </defs>
            <path className="cls-1" d="m35.21,8.49l-17.81,17.81m0,0l-8.91-8.91"/>
            </svg>
    );
}

export default CheckMark;