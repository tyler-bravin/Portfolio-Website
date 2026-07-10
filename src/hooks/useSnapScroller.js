/**
 * @file useSnapScroller.js
 * @description Shared logic for the horizontal scroll-snap carousels: tracks
 * whether the scroller is at either end (for disabling arrows), whether it
 * overflows at all (for hiding arrows entirely), and scrolls by one item.
 *
 * Uses a CALLBACK ref rather than useRef + useEffect: the scroller elements
 * mount conditionally (e.g. only after a fetch resolves), and effect-based
 * setup races against that — the state that should re-trigger the effect can
 * settle while the element is still unmounted, leaving it unobserved forever.
 * A callback ref runs setup the instant the node exists and teardown the
 * instant it doesn't, which also handles StrictMode's double-mount cleanly.
 * @author Tyler Bravin
 */

import { useRef, useState, useCallback } from 'react';

export const useSnapScroller = () => {
    const elRef = useRef(null);
    const cleanupRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(true); // true until measured, so arrows start hidden

    const measure = useCallback(() => {
        const el = elRef.current;
        if (!el) return;
        setAtStart(el.scrollLeft <= 2);
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    }, []);

    const ref = useCallback((el) => {
        // Tear down whatever was attached to the previous node (or on unmount).
        if (cleanupRef.current) {
            cleanupRef.current();
            cleanupRef.current = null;
        }
        elRef.current = el;
        if (!el) return;

        measure();
        el.addEventListener('scroll', measure, { passive: true });

        // Layout can change without a window resize — most notably when web
        // fonts finish loading and reflow the text.
        const resizes = new ResizeObserver(measure);
        resizes.observe(el);
        Array.from(el.children).forEach((child) => resizes.observe(child));

        // Content can arrive/leave after mount; observe new children too.
        const mutations = new MutationObserver((muts) => {
            muts.forEach((m) =>
                m.addedNodes.forEach((n) => {
                    if (n instanceof Element) resizes.observe(n);
                })
            );
            measure();
        });
        mutations.observe(el, { childList: true });

        if (document.fonts?.ready) {
            document.fonts.ready.then(measure).catch(() => {});
        }

        cleanupRef.current = () => {
            el.removeEventListener('scroll', measure);
            mutations.disconnect();
            resizes.disconnect();
        };
    }, [measure]);

    // Scroll by one item, using the real layout stride (item width + gap).
    const scrollByItem = useCallback((direction) => {
        const el = elRef.current;
        if (!el || el.children.length === 0) return;
        const stride = el.children[1]
            ? el.children[1].offsetLeft - el.children[0].offsetLeft
            : el.clientWidth;
        el.scrollBy({ left: direction * stride, behavior: 'smooth' });
    }, []);

    const scrollable = !(atStart && atEnd);

    return { ref, atStart, atEnd, scrollable, scrollByItem };
};
