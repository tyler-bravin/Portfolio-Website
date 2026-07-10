/**
 * @file useSnapScroller.js
 * @description Shared logic for the horizontal scroll-snap carousels: tracks
 * whether the scroller is at either end (for disabling arrows), whether it
 * overflows at all (for hiding arrows entirely), and scrolls by one item.
 * @author Tyler Bravin
 */

import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * @param {*} watch — optional value (e.g. item count) that re-runs setup when
 * it changes. Needed when the scroller element mounts conditionally: the
 * effect otherwise fires once with a null ref and never attaches listeners.
 */
export const useSnapScroller = (watch) => {
    const ref = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(true); // true until measured, so arrows start hidden

    const measure = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        setAtStart(el.scrollLeft <= 2);
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        measure();
        el.addEventListener('scroll', measure, { passive: true });
        window.addEventListener('resize', measure);
        // Content (e.g. fetched cards) can arrive after mount.
        const observer = new MutationObserver(measure);
        observer.observe(el, { childList: true });
        return () => {
            el.removeEventListener('scroll', measure);
            window.removeEventListener('resize', measure);
            observer.disconnect();
        };
    }, [measure, watch]);

    // Scroll by one item, using the real layout stride (item width + gap).
    const scrollByItem = useCallback((direction) => {
        const el = ref.current;
        if (!el || el.children.length === 0) return;
        const stride = el.children[1]
            ? el.children[1].offsetLeft - el.children[0].offsetLeft
            : el.clientWidth;
        el.scrollBy({ left: direction * stride, behavior: 'smooth' });
    }, []);

    const scrollable = !(atStart && atEnd);

    return { ref, atStart, atEnd, scrollable, scrollByItem };
};
