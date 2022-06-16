
/**
 * Given an object containing all the required data for a given page, fetch all the needed data and return it as properties to pass to a view.
 * @param state
 * @param request
 * @returns {Promise<{}>}
 */
export default function fetchData(state, request) {
    const promises = [];
    //TODO: this needs to be moved to a prop file or env variable
    const baseUri = "http://localhost:8080";

    // console.log("got to fetch data");
    for (let pieceOfState of Object.keys(state)) {
        promises.push(
            fetch(baseUri + state[pieceOfState], request)
                .then(function (res) {
                    if (request.method === "POST" && typeof request.body === "string" && request.body.includes("grant")) {
                        return res.json()
                    } else if (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" ||request.method === "DELETE") {
                        console.log(res)
                        return res
                    } else {
                        return res.json()
                    }
                }));
    }
    return Promise.all(promises).then(propsData => {
        const props = {};
        Object.keys(state).forEach((key, index) => {
            props[key] = propsData[index];
        });
        return props;
    });
}
