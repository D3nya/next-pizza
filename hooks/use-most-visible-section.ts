import { useEffect, useRef, useState } from "react";

/**
 * useMostVisibleSection
 *
 * A custom React hook that uses IntersectionObserver to determine which DOM element
 * (from a given list of references) is currently the most visible in the viewport.
 *
 * Useful for things like dynamic section-based navigation, scrollspy menus, or updating
 * UI state based on scroll position (e.g. category slider or sidebar highlight).
 *
 * @param refs - A mapping of numeric IDs to HTML elements you want to observe.
 *               Each element must have a data attribute `data-category-id` matching its key.
 * @param observedIds - The list of active IDs to observe. Changing this will reinitialize the observer.
 * @param options - Optional IntersectionObserver options (root, rootMargin, threshold, etc.)
 *
 * @returns The ID of the element with the highest intersection ratio (most visible).
 */
export function useMostVisibleSection(
  refs: Record<number, HTMLElement | null>,
  observedIds: number[],
  options?: IntersectionObserverInit
): number | null {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    // Disconnect existing observer to prevent memory leaks or duplicate tracking
    observerRef.current?.disconnect();

    // Internal map to track visibility ratio per ID
    const visibilityMap: Record<number, number> = {};

    // Initialize new IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = Number(entry.target.getAttribute("data-category-id"));
          if (!isNaN(id)) {
            visibilityMap[id] = entry.intersectionRatio;
          }
        }

        // Find the ID with the highest intersection ratio
        const mostVisible = Object.entries(visibilityMap).sort(([, a], [, b]) => b - a)[0];

        if (mostVisible) {
          setActiveId(Number(mostVisible[0]));
        }
      },
      {
        threshold: Array.from({ length: 11 }, (_, i) => i / 10), // [0.0, 0.1, ..., 1.0]
        ...options,
      }
    );

    // Start observing elements based on the current observedIds
    observedIds.forEach((id) => {
      const el = refs[id];
      if (el) {
        observerRef.current?.observe(el);
      }
    });

    // Cleanup observer on unmount or dependencies change
    return () => {
      observerRef.current?.disconnect();
    };
  }, [refs, options, observedIds]);

  return activeId;
}
