
function ArrowSVG({ color }: { color: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={color}
            className="arrow-svg"
            width="54px" height="54px"
            viewBox="0 0 54 54"
        >
            <path
            fillRule="evenodd"
            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
            />
        </svg>
    );
}

    

export default ArrowSVG;