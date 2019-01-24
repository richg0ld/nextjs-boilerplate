/**
 * Client
 */

import axios from 'axios';

export default ({uri, method, params = null, data = null, headers = null}) => {
    return axios({
        url: `${process.env.URL}/api${uri}`,
        method: method,
        params: params,
        data: data,
        headers: headers
    })
};