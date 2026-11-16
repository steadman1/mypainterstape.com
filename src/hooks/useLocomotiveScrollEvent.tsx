import { useEffect, useRef } from 'react';
import { useLocomotiveScroll } from './useLocomotiveScroll';

export type ScrollArgs = { scroll: { x: number; y: number }; limit?: number };

// Locomotive v3 keeps its live state on `instance.scroll.instance`.
type LocomotiveInternals = { scroll?: { instance?: ScrollArgs } };

export function getScrollY(scroll: unknown): number {
    const internals = scroll as LocomotiveInternals | null;
    return internals?.scroll?.instance?.scroll.y ?? window.scrollY;
}

// Distance from the top of the document, ignoring transforms (Locomotive's smooth
// mode moves sections with transforms, so getBoundingClientRect is not stable).
export function getLayoutTop(element: HTMLElement | null): number {
    let top = 0;
    let node: HTMLElement | null = element;
    while (node) {
        top += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
    }
    return top;
}

// Subscribes to Locomotive's scroll event, attaching once the instance exists and
// detaching on unmount. The handler is also called once with the current position.
export function useLocomotiveScrollEvent(handler: (args: ScrollArgs) => void) {
    const scrollRef = useLocomotiveScroll();
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    });

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let attached: any = null;
        const listener = (args: ScrollArgs) => handlerRef.current(args);

        const attach = () => {
            if (attached || !scrollRef?.current) return;
            attached = scrollRef.current;
            attached.on('scroll', listener);
            listener({ scroll: { x: 0, y: getScrollY(attached) } });
        };

        attach();
        window.addEventListener('locomotive-scroll-initialized', attach);

        return () => {
            window.removeEventListener('locomotive-scroll-initialized', attach);
            if (attached) attached.off('scroll', listener);
        };
    }, [scrollRef]);

    return scrollRef;
}
