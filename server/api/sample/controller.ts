import service from "../service";

export const api = (req, res) => {

    const options = {
        method: 'get',
        uri: `/repos/zeit/next.js`,
        params: req.query,
    };

    service(options, res)

};