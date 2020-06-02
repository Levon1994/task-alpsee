import { BASE_URL, ONLINE_COURSES_URL } from 'configs';

export default class Fetch {
    static async request(options) {
        const ACCESS_TOKEN = window.localStorage.getItem('token');
        const { method, path, headers, body, forLogin, data, withAuthToken, onlineCourses } = options;
        let requestConfig = {
            method,
            headers: {
                'Accept': 'application/json',
                ...headers
            },
        };

        if((method !== 'GET' && !forLogin) || withAuthToken) {
          requestConfig.headers['x-auth-token'] = ACCESS_TOKEN;
        }

        if (body) {
            requestConfig.body = JSON.stringify(body);
            requestConfig.headers['Content-Type'] = 'application/json';
        } else if(data) {
            requestConfig.body = data;
        }

        const url = onlineCourses ? ONLINE_COURSES_URL : BASE_URL;

        const response = await fetch(new Request(`${url}${path}`, requestConfig)).then(res => res);
        if (response.status >= 200 && response.status <= 299) {
          return await response.json();
        } else {
          return response;
        };
    }

    /* GET (retrieve) */
    static get = options => Fetch.request({ ...options, method: 'GET' });

    /* POST (create) */
    static post = options => Fetch.request({ ...options, method: 'POST' });

    /* POST (create) */
    static patch = options => Fetch.request({ ...options, method: 'PATCH' });

    /* DELETE (remove) */
    static delete = options => Fetch.request({ ...options, method: 'DELETE' });
}
