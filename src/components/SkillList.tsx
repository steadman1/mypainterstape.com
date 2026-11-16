import { Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Employee from '../objects/Employee';
import { Skill } from '../objects/Skill';
import { useLocomotiveScrollEvent } from '../hooks/useLocomotiveScrollEvent';
import skillIcons from '../objects/skillIcons';

const MASTERY_LABELS = ["Minimal", "Low", "Medium", "High", "Master"];
// Light to dark, ending on the PT accent blue.
const MASTERY_BLUES = ["#C9D8FA", "#9CB8F3", "#6F97EC", "#4276E7", "#1A57E3"];

const CARD_OFFSET_X = 28;  // gap between the pointer and the card
const CARD_OFFSET_Y = 24;
const EDGE_MARGIN = 12;

// A skill's logo, a solid shape in the text colour like the portfolio site. `--brand` is the
// colour it turns on hover; Figma's shapes each carry their own (`--c`).
const SkillIcon = ({ name, className }: { name: string, className: string }) => {
    const icon = skillIcons[name];
    if (!icon) return null;
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false" style={{ "--brand": icon.color } as React.CSSProperties}>
            {
                icon.paths.map((shape, index) => (
                    <path
                        key={index}
                        d={shape.d}
                        fillRule={shape.evenOdd ? "evenodd" : undefined}
                        style={shape.color ? { "--c": shape.color } as React.CSSProperties : undefined}
                    />
                ))
            }
        </svg>
    );
};

const SkillCard = ({ skill, visible, pinned, cardRef }: { skill: Skill, visible: boolean, pinned: boolean, cardRef: React.RefObject<HTMLDivElement> }) => {
    const level = skill.getLevel();
    const related = skill.getRelatedNames();
    const years = skill.yearsExperience();

    return (
        <div ref={cardRef} className={`skill-card ${visible ? "is-visible" : ""} ${pinned ? "is-pinned" : ""}`} role="tooltip" aria-hidden={!visible}>
            <div className="skill-card-head">
                <SkillIcon name={skill.name} className="skill-card-icon" />
                <div>
                    <p className="skill-card-name">{skill.name}</p>
                    { related ? <p className="skill-card-related">with {related}</p> : null }
                </div>
            </div>
            <div className="skill-card-stats">
                <div>
                    <p className="skill-card-label">Mastery</p>
                    <div className="skill-card-dots" aria-label={`${level} of 5`}>
                        {
                            MASTERY_BLUES.map((color, index) => (
                                <span key={color} className={index < level ? "is-filled" : ""} style={index < level ? { backgroundColor: color } : undefined} />
                            ))
                        }
                    </div>
                    <p className="skill-card-value">{MASTERY_LABELS[level - 1] ?? "N/A"}</p>
                </div>
                <div className="skill-card-experience">
                    <p className="skill-card-label">{skill.getFieldExperience() ? "Field experience" : "Experience"}</p>
                    <p className="skill-card-value">{years} yr{years === 1 ? "" : "s"}</p>
                </div>
            </div>
        </div>
    );
};

// Skills as one comma-separated paragraph, with a small label leading each type, in the
// black-and-white style of the portfolio site. Hovering a skill wipes a black fill down behind it and shows a black card
// beside the cursor; on touch screens a tap does the same with the card next to the skill.
const SkillList = ({ employee, sideScrolling }: { employee: Employee, index: number, sideScrolling: boolean }) => {
    const [skill, setSkill] = useState<Skill | null>(null);
    const [visible, setVisible] = useState(false);
    const [pinned, setPinned] = useState(false);

    const cardRef = useRef<HTMLDivElement>(null);
    const anchorRef = useRef<HTMLElement | null>(null);
    const pointer = useRef({ x: 0, y: 0 });
    const lastPointerType = useRef("mouse");

    const groups = Skill.skillTypes
        .map((type) => ({ type, skills: employee.filterType(type) }))
        .filter((group) => group.skills.length > 0);

    const show = (next: Skill, anchor: HTMLElement, pin: boolean) => {
        anchorRef.current = anchor;
        setSkill(next);
        setPinned(pin);
        setVisible(true);
    };

    const hide = useCallback(() => {
        setVisible(false);
        setPinned(false);
        anchorRef.current = null;
    }, []);

    // Mouse: right of the pointer, or left of it near the right edge. Touch and keyboard: centred
    // under the skill, or above it when there is more room there.
    const place = useCallback(() => {
        const card = cardRef.current;
        if (!card) return;
        const width = card.offsetWidth;
        const height = card.offsetHeight;
        let x: number;
        let y: number;

        if (pinned && anchorRef.current) {
            const row = anchorRef.current.getBoundingClientRect();
            const below = window.innerHeight - row.bottom >= height + 16 || row.top < height + 16;
            x = row.left + row.width / 2 - width / 2;
            y = below ? row.bottom + 10 : row.top - 10 - height;
        } else {
            const { x: px, y: py } = pointer.current;
            x = px + CARD_OFFSET_X + width > window.innerWidth - EDGE_MARGIN ? px - CARD_OFFSET_X - width : px + CARD_OFFSET_X;
            y = py - CARD_OFFSET_Y;
        }

        x = Math.max(EDGE_MARGIN, Math.min(x, window.innerWidth - width - EDGE_MARGIN));
        y = Math.max(EDGE_MARGIN, Math.min(y, window.innerHeight - height - EDGE_MARGIN));
        card.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }, [pinned]);

    useLayoutEffect(() => {
        if (visible) place();
    }, [visible, skill, place]);

    useEffect(() => {
        if (!visible) return;

        const handleMove = (event: PointerEvent) => {
            pointer.current = { x: event.clientX, y: event.clientY };
            if (!pinned) place();
        };
        const handleDown = (event: PointerEvent) => {
            const target = event.target as Element;
            if (target.closest?.(".skill-item") || cardRef.current?.contains(target)) return;
            hide();
        };
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") hide();
        };

        window.addEventListener("pointermove", handleMove, { passive: true });
        document.addEventListener("pointerdown", handleDown);
        document.addEventListener("keydown", handleKey);
        return () => {
            window.removeEventListener("pointermove", handleMove);
            document.removeEventListener("pointerdown", handleDown);
            document.removeEventListener("keydown", handleKey);
        };
    }, [visible, pinned, place, hide]);

    // The page scrolls with transforms, so a still pointer can end up off the skill without any
    // pointer event. Follow a tapped skill; close a hovered one the pointer has left.
    useLocomotiveScrollEvent(() => {
        if (!visible || !anchorRef.current) return;
        if (pinned) {
            place();
            return;
        }
        const under = document.elementFromPoint(pointer.current.x, pointer.current.y);
        if (!anchorRef.current.contains(under)) hide();
    });

    const renderItem = (item: Skill, isLast: boolean) => {
        const isActive = visible && skill === item;
        return (
            <Fragment key={item.name}>
                <button
                    className={`skill-item ${isActive ? "is-active" : ""}`}
                    aria-expanded={isActive}
                    onPointerDown={(event) => { lastPointerType.current = event.pointerType; }}
                    onPointerEnter={(event) => {
                        if (event.pointerType !== "mouse") return;
                        pointer.current = { x: event.clientX, y: event.clientY };
                        show(item, event.currentTarget, false);
                    }}
                    onPointerLeave={(event) => {
                        if (event.pointerType === "mouse" && !pinned) hide();
                    }}
                    onClick={(event) => {
                        if (lastPointerType.current === "mouse") return;
                        if (isActive) hide();
                        else show(item, event.currentTarget, true);
                    }}
                    onFocus={(event) => {
                        if (event.currentTarget.matches(":focus-visible")) show(item, event.currentTarget, true);
                    }}
                    onBlur={() => hide()}
                >
                    <SkillIcon name={item.name} className="skill-icon" />
                    {item.name}
                </button>
                { isLast ? null : <span className="skills-comma">, </span> }
            </Fragment>
        );
    };

    return (
        <>
            {/* One paragraph: each type's small label leads its skills, and the groups run on
                inline. The label is kept on a line with its first skill so it never dangles. */}
            <p className={`skills ${sideScrolling ? "is-stacked" : ""}`}>
                {
                    groups.map((group) => (
                        <span key={group.type} className="skills-group">
                            <span className="skills-lead">
                                <span className="skills-type">{group.type}<span className="skills-sr">: </span></span>
                                {renderItem(group.skills[0], group.skills.length === 1)}
                            </span>
                            { group.skills.slice(1).map((item, index) => renderItem(item, index === group.skills.length - 2)) }
                        </span>
                    ))
                }
            </p>
            {
                skill ? createPortal(
                    <SkillCard skill={skill} visible={visible} pinned={pinned} cardRef={cardRef} />,
                    document.body,
                ) : null
            }
        </>
    );
};

export { SkillList };
