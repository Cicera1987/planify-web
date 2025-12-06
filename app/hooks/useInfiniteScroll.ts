"use client";

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

  const pageRef = useRef(page);
  const isFetchingRef = useRef(isFetching);
  const hasMoreRef = useRef(hasMore);
  const fetchFnRef = useRef(fetchFn);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { pageRef.current = page; }, [page]);
  useEffect(() => { isFetchingRef.current = isFetching; }, [isFetching]);
  useEffect(() => { hasMoreRef.current = hasMore; }, [hasMore]);
  useEffect(() => { fetchFnRef.current = fetchFn; }, [fetchFn]);

  const doFetch = useCallback(async (requestedPage: number) => {
    if (isFetchingRef.current || !hasMoreRef.current) return;
    if (timeoutRef.current) return;
    timeoutRef.current = setTimeout(() => {
      if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    }, 200);

    setIsFetching(true);
    try {
      const newData = await fetchFnRef.current(requestedPage);
      if (!mounted.current) return;

      if (!Array.isArray(newData) || newData.length === 0) {
        setHasMore(false);
      } else {
        setData(prev => requestedPage === initialPage ? newData : [...prev, ...newData]);
        setPage(prev => prev + 1);
      }
    } catch {
      setHasMore(false);
    } finally {
      if (mounted.current) setIsFetching(false);
    }
  }, [initialPage]);

  useEffect(() => {
    if (!observerTarget.current) return;
    observer.current?.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting) return;
      if (isFetchingRef.current || !hasMoreRef.current) return;

      doFetch(pageRef.current);
    }, { threshold: 0.1 });

    const currentTarget = observerTarget.current;
    observer.current.observe(currentTarget);

    return () => {
      observer.current?.disconnect();
    };
  }, [doFetch]);

  const reset = useCallback(async () => {
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }

    setIsFetching(true);
    setHasMore(true);
    setData([]);
    setPage(initialPage);

    try {
      const firstData = await fetchFnRef.current(initialPage);
      if (!mounted.current) return;

      setData(Array.isArray(firstData) ? firstData : []);
      setPage(initialPage + 1);
      setHasMore(Array.isArray(firstData) ? firstData.length > 0 : false);
    } finally {
      if (mounted.current) setIsFetching(false);
    }
  }, [initialPage]);

  useEffect(() => {
    mounted.current = true;
    reset();
    return () => {
      mounted.current = false;
      observer.current?.disconnect();
      if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    };
  }, [reset]);

  return {
    data,
    isFetching,
    hasMore,
    observerTarget,
    reset,
  };
}