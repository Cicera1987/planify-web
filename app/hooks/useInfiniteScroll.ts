"use client"

import { useCallback, useEffect, useRef, useState } from "react";

interface UseInfiniteScrollProps<T> {
  fetchFn: (page: number) => Promise<T[]>;
  initialPage?: number;
}

export function useInfiniteScroll<T>({
  fetchFn,
  initialPage = 0,
}: UseInfiniteScrollProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerTarget = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const mounted = useRef(true);

  const fetchData = useCallback(async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);

    try {
      const newData = await fetchFn(page);

      if (!mounted.current) return;

      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setData((prev) => [...prev, ...newData]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      setHasMore(false);
    } finally {
      if (mounted.current) setIsFetching(false);
    }
  }, [fetchFn, page, isFetching, hasMore]);

 
  useEffect(() => {
    if (!observerTarget.current) return;

    observer.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isFetching && hasMore) {
        fetchData();
      }
    });

    const currentTarget = observerTarget.current;
    observer.current.observe(currentTarget);

    return () => {
      observer.current?.disconnect();
    };
  }, [fetchData, hasMore, isFetching]);

  useEffect(() => {
    mounted.current = true;
    setData([]);
    setPage(initialPage);
    setHasMore(true);

    (async () => {
      setIsFetching(true);
      try {
        const firstData = await fetchFn(initialPage);
        setData(firstData);
        setPage(initialPage + 1);
        setHasMore(firstData.length > 0);
      } finally {
        setIsFetching(false);
      }
    })();

    return () => {
      mounted.current = false;
    };
  }, [fetchFn, initialPage]);

  return {
    data,
    isFetching,
    hasMore,
    observerTarget,
  };
}
