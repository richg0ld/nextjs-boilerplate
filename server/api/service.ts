/**
 * Server
 */

import axios from 'axios';

export default ({uri, method, params = null, data = null, headers = null}, res) => {

    const respond = (response) => {
        res.json(response.data);
    };

    const onNetworkError = (error) => {
        res.status(error.response.status).json({
            message: error.message
        });
    };

    axios({
        url: `${process.env.API_URL}${encodeURI(uri)}`,
        method: method,
        params: params,
        data: data,
        headers: headers
    }).then(respond).catch(onNetworkError);

};