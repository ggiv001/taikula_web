import {useEffect, useState} from "react";

export const useFetch = (method?: Function, ...params: any) => {
    const [data, setData] = useState<any>();

    useEffect(() => {
        request(method!, params);
    }, [method])

    async function request(method: Function, ...params: any) {
        const result = await method(params);
        const {data} = result;
        setData(data);
        return data;
    }

    function refresh() {
        request(method!, params);
    }

    return {data, request, refresh}

}
