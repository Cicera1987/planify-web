import { useSchedulingContext } from "../context";
import { useGetContactsQuery, useSearchContactsQuery } from "../services/contactService";

function useQueryHook(params: { page: number; size: number }) {
    const { search } = useSchedulingContext();

    const searchResult = useSearchContactsQuery(
        { name: search ?? "", ...params },
        { skip: !search || !search.trim() }
    );

    const allResult = useGetContactsQuery(params, {
        skip: !!search && !!search.trim() 
    });

    return search && search.trim() ? searchResult : allResult;
}

export default useQueryHook;
