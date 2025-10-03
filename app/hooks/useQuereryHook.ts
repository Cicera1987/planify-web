import { useState, useEffect } from "react";
import { useSchedulingContext } from "../context/schedulingProvaider";
import * as contactApi from "../services/contactService";
import { Contact, PageResponse } from "../services/contactService";

export default function useQueryHook(params: { page: number; size: number }): {
    data?: PageResponse<Contact>;
    isLoading: boolean;
    isFetching: boolean;
    error: string | null;
} {
    const { search } = useSchedulingContext();
    const [data, setData] = useState<PageResponse<Contact> | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        const fetchData = async () => {
            try {
                const result = search?.trim()
                    ? await contactApi.searchContacts(search, params.page, params.size)
                    : await contactApi.getContacts(params.page, params.size);

                if (isMounted) setData(result);
            } catch {
                if (isMounted) setData(undefined);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, [search, params.page, params.size]);

    return {
        data,
        isLoading,
        isFetching: isLoading,
        error: null,
    };
}
