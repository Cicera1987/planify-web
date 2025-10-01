"use client"

import React from "react"
import Icon from "../assets/icons"

interface InfiniteScrollLoaderProps {
    observerTarget: RefObject<HTMLDivElement>
    isFetching: boolean
    hasMore: boolean
}

export function InfiniteScrollLoader({ observerTarget, isFetching, hasMore }: InfiniteScrollLoaderProps) {
    return (
        <div ref={observerTarget} className="flex basis-full justify-center py-4">
            {isFetching && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center py-8">
                        <Icon.Loading size="sm"borderWidth="sm" />
                    </div>
                </div>
            )}
            {!hasMore && !isFetching && <p className="text-sm text-muted-foreground"></p>}
        </div>
    )
}