class SeekRequest {
    defaults = {
        baseUrl: '',
        method: 'GET',
        credentials: 'omit',
        headers: {
            common: {
                Accept: 'application/json',
            },
            post: {
                'Content-Type': 'application/json',
            },
        },
    };

    getOptions = (options, isModification = false) => {
        const defaultOptions = {
            method: this.defaults.method,
            credentials: this.defaults.credentials,
            headers: {
                ...this.defaults.headers.common,
                ...(isModification ? this.defaults.headers.post : {}),
            },
        };
        const fetchOptions = deepMerge(defaultOptions, options);

        return fetchOptions;
    };
}

const httpRequest = () => {
    const seek = new SeekRequest();
    const defaults = seek.defaults;

    const get = async (url, options = {}) => {
        const endpoint = seek.defaults.baseUrl ? seek.defaults.baseUrl + url : url;
        const httpOptions = { ...options, method: 'GET' };

        const response = await fetch(endpoint, seek.getOptions(httpOptions));
        return response;
    };

    const post = async (url, options = {}) => {
        const endpoint = seek.defaults.baseUrl ? seek.defaults.baseUrl + url : url;
        const httpOptions = { ...options, method: 'POST' };
        const response = await fetch(endpoint, seek.getOptions(httpOptions, true));

        return response;
    };

    return {
        defaults,
        get,
        post,
    };
};

export default httpRequest();

// helper functions
// https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
// https://stackoverflow.com/users/3748498/pravdomil
function deepMerge(...sources) {
    let acc = {};
    for (const source of sources) {
        if (source instanceof Array) {
            if (!(acc instanceof Array)) {
                acc = [];
            }
            acc = [...acc, ...source];
        } else if (source instanceof Object) {
            for (let [key, value] of Object.entries(source)) {
                if (value instanceof Object && key in acc) {
                    value = deepMerge(acc[key], value);
                }
                acc = { ...acc, [key]: value };
            }
        }
    }
    return acc;
}
