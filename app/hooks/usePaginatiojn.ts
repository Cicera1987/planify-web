"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

interface UseInfiniteScrollOptions {
  threshold?: number;
  enabled?: boolean;
}

export function usePagination<T>(
  queryHook: (params: { page: number; size: number }) => {
    data?: PageResponse<T>;
    isLoading: boolean;
    isFetching: boolean;
  },
  pageSize = 10,
  options: UseInfiniteScrollOptions = {},
) {
  const { threshold = 300, enabled = true } = options;
  const [page, setPage] = useState(0);
  const [allItems, setAllItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const { data, isLoading, isFetching } = queryHook({ page, size: pageSize });

  useEffect(() => {
    if (data?.content) {
      setAllItems((prev) => {
        const newItems = page === 0 ? data.content : [...prev, ...data.content];
        const unique = Array.from(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          new Map(newItems.map((item: any) => [item.id, item])).values(),
        );
        return unique;
      });
      setHasMore(data.content.length > 0 && page < data.totalPages - 1);
    }
  }, [data, page]);

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore && enabled) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, hasMore, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && hasMore) {
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
  }, [loadMore, isFetching, hasMore, enabled, threshold]);

  const reset = useCallback(() => {
    setPage(0);
    setAllItems([]);
    setHasMore(true);
  }, []);

  return {
    items: allItems,
    isLoading: isLoading && page === 0,
    isFetching: isFetching && page > 0,
    hasMore,
    loadMore,
    reset,
    observerTarget,
    totalElements: data?.totalElements ?? 0,
    totalPages: data?.totalPages ?? 0,
    currentPage: page,
  };
}
