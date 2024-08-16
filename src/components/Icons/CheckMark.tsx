function CheckMark({ color }: { color: string }) {
    return (
        <svg className="icon" style={{ width: "20px", height: "20px", fill: color, color: color,  stroke: color, strokeLinecap: "square", strokeWidth: "12px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.69 34.78">
            <path className="cls-1" d="m35.21,8.49l-17.81,17.81m0,0l-8.91-8.91"/>
        </svg>
    );
}

export default CheckMark;