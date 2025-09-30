"use client";

import React, { useState, useEffect, useCallback, ReactNode } from "react";

interface InfiniteScrollProps<T> {
    fetchFunction: (page: number, size: number) => Promise<{ content: T[] }>;
    renderItem: (item: T, index: number) => ReactNode;
    pageSize?: number;
    threshold?: number; // distância do final para disparar load
    containerHeight?: number; // altura do container (se for scroll em div)
    scrollContainer?: "div" | "window"; // qual scroll escutar
}

export function InfiniteScroll<T>({
    fetchFunction,
    renderItem,
    pageSize = 10,
    threshold = 100,
    containerHeight = 400,
    scrollContainer = "div",
}: InfiniteScrollProps<T>) {
    const [page, setPage] = useState(0);
    const [items, setItems] = useState < T[] > ([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadPage = useCallback(async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const data = await fetchFunction(page, pageSize);
            setItems((prev) => [...prev, ...data.content]);
            setHasMore(data.content.length === pageSize);
            setPage((prev) => prev + 1);
        } catch (err) {
            console.error("Erro ao carregar dados:", err);
        } finally {
            setIsLoading(false);
        }
    }, [fetchFunction, isLoading, hasMore, page, pageSize]);

    const handleDivScroll = useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            const target = e.currentTarget;
            if (target.scrollHeight - target.scrollTop <= target.clientHeight + threshold) {
                loadPage();
            }
        },
        [loadPage, threshold]
    );

    const handleWindowScroll = useCallback(() => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold &&
            !isLoading &&
            hasMore
        ) {
            loadPage();
        }
    }, [loadPage, threshold, isLoading, hasMore]);

    useEffect(() => {
        // carrega primeira página
        loadPage();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (scrollContainer === "window") {
            window.addEventListener("scroll", handleWindowScroll);
            return () => window.removeEventListener("scroll", handleWindowScroll);
        }
    }, [handleWindowScroll, scrollContainer]);

    if (scrollContainer === "div") {
        return (
            <div
                onScroll={handleDivScroll}
                style={{ height: containerHeight, overflowY: "auto" }}
            >
                {items.map((item, index) => renderItem(item, index))}
                {isLoading && <p>Carregando...</p>}
                {!hasMore && <p>Não há mais itens</p>}
            </div>
        );
    }

    // scroll no window
    return (
        <>
            {items.map((item, index) => renderItem(item, index))}
            {isLoading && <p>Carregando...</p>}
            {!hasMore && <p>Não há mais itens</p>}
        </>
    );
}
