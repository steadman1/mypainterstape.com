enum Direction {
    NORTH,
    NORTHEAST,
    EAST,
    SOUTH,
    SOUTHWEST,
    WEST
}

function Arrow({ color, direction }: { color: string, direction: Direction }) {
    let angle;
    switch (direction) {
        case Direction.NORTH: {
            angle = 180;
            break;
        }
        case Direction.NORTHEAST: {
            angle = 225;
            break;
        }
        case Direction.EAST: {
            angle = 270;
            break;
        }
        case Direction.SOUTH: {
            angle = 0;
            break;
        }
        case Direction.SOUTHWEST: {
            angle = 45;
            break;
        }
        case Direction.WEST: {
            angle = 90;
            break;
        }
        default: {
            angle = 180;
            break;
        }
    }

    return (
        <>
        <div>
            <svg key={ color } className="icon" style={{ width: "17px", height: "17px", transform: `rotate(${angle}deg)`, fill: color, color: color,  stroke: color, strokeLinecap: "square", strokeWidth: "12px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.6 54.03">
                <path style={{ color: color, fill: color, stroke: color }} className="cls-1" d="m44.11,27.73l-17.81,17.81m0,0L8.49,27.73m17.81,12.11V6"/>
            </svg>
        </div>
        </>
    );
}

export { Arrow, Direction };