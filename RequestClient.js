/*
Web Request Client Widget
© Daniel H. Rauhut 2022
*/

/**
 * Minimalist request client wrapping fetch
 */
export default class RequestClient {
    constructor(proxy, uri, method, header, body) {
        this.proxy = proxy || '';
        this.uri = uri;
        this.method = method;
        this.header = header;
        this.body = body;
        this.time = 0; //request duration in ms
        this.status = 0;
    }

    /**
     * Make a request from the parameters supplied to the constructor
     * @returns \{ response, status, time \}
     */
    async makeRequest() {
        let startTime = Date.now();

        let reqHeader = this._buildHeader();

        let uri = this._validateUri(this.uri);
        let proxy;
        if (this.proxy)
            proxy = this._validateUri(this.proxy);

        try {
            var response = await fetch(
                (this.proxy) ? proxy + uri : uri, {
                    method: this.method.toUpperCase(),
                    headers: reqHeader,
                    body: (this.method === 'get') ? null : this.body,
                    mode: 'cors'
                }
            );

            this.status = response.status;
            this.time = Date.now() - startTime;

            return {
                message: await response.json(),
                status: this.status,
                time: this.time
            };
        } catch (err) {
            this.time = Date.now() - startTime;
            return {
                message: { error: "404 status encountered. Invalid host, path or target is not CORS-enabled." },
                status: 404,
                time: this.time
            };
        }
    }

    _validateUri(str) {
        return (!str.startsWith('http://') && !str.startsWith('https://')) ?
            'https://' + str : //redirect to https if no protocol is specified
            str;
    }

    /**
     * Build the header array from the header string
     * @returns array of key-value arrays
     */
    _buildHeader() {
        if (!this.header)
            return [];

        let arr = this.header.split('\n');

        let headerArray = [];
        arr.forEach(item => {
            const stub = item.split(':');
            const pair = [stub[0].trim(), stub[1].trim()];
            headerArray.push(pair);
        });
        return headerArray;
    }
}