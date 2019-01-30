import service from "../service";

export const api = (req, res) => {

    const options = {
        method: 'get',
        uri: `/shows/1/episodes?specials=1`,
        params: req.query,
    };

    service(options, res)

};