"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface UseInfiniteScrollOptions {
  threshold?: number;
  enabled?: boolean;
}

export function usePagination(
  options: UseInfiniteScrollOptions = {},
) {
  const { threshold = 300, enabled = true } = options;
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (hasMore && enabled) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: `${threshold}px` },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [loadMore, hasMore, enabled, threshold]);

  const reset = useCallback(() => {
    setPage(0);
    setHasMore(true);
  }, []);

  return {
    observerTarget,
    currentPage: page,
    loadMore,
    reset,
    hasMore,
    setHasMore,
  };
}
