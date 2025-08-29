export const createHttpClient = (baseUrl, fetchImpl = fetch) => {
    const buildUrl = (path, params = {}) => {
        const url = new URL(path, baseUrl);
        Object.entries(params).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
        });
        return url;
    };


    return {
        async get(path, { params, headers } = {}) {
            const res = await fetchImpl(buildUrl(path, params), {
                method: "GET",
                headers: { Accept: "application/json", ...(headers || {}) },
            });
            if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
            return res.json();
        },
    };
};