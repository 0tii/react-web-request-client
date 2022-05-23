/*
Web Request Client Widget
© Daniel H. Rauhut 2022
*/

/**
 * Minimalist request client wrapping fetch
 */
export default class RequestClient {
    constructor(uri, method, header, body, proxy) {
        this.proxy = proxy;
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

        try {
            var response = await fetch(
                (this.proxy) ? this.proxy + this.uri : this.uri, {
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
                message: { error: "connection failed." },
                status: 404,
                time: this.time
            };
        }
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