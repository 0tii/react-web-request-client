/*
Web Request Client Widget
© Daniel H. Rauhut 2022
*/

import './Requests.css';
import { useState } from 'react';
import RequestClient from './RequestClient';

/**
 * Web Request Client Widget. Target API must allow CORS or CORS proxy must be supplied.
 * @param {*} proxy A CORS proxy URL
 * @returns React Component
 */
export default function Requests(props) {

    const [uri, setUri] = useState('');
    const [header, setHeader] = useState('');
    const [body, setBody] = useState('');
    const [output, setOutput] = useState('');
    const [requestMethod, setRequestMethod] = useState('get');
    const [responseTime, setResponseTime] = useState(0);
    const [statusCode, setStatusCode] = useState(0);

    const onSend = async () => {
        let client = new RequestClient(props.proxy, uri, requestMethod, header, body);
        let response = await client.makeRequest();

        //update field states
        setOutput(JSON.stringify(response.message, null, 1));
        setResponseTime(response.time);
        setStatusCode(response.status);
    };

    return (
        <div id='main-container'>
            <div id='type-uri-send'>
                <select name='request-type' id='req-type' className='dropdown type-dropdown' onChange={(e) => setRequestMethod(e.target.value)} value={requestMethod}>
                    <option value='get'>GET</option>
                    <option value='post'>POST</option>
                    <option value='put'>PUT</option>
                    <option value='delete'>DELETE</option>
                </select>
                <input type='text' placeholder='Request URI' name='uri' className='req-uri' value={uri} onChange={(e) => setUri(e.target.value)} />
                <input type='submit' name='send' className='send' value='Send' onClick={onSend} />
            </div>
            <div id='header-container' className='textarea-container'>
                <label id='header-label'>Header</label>
                <textarea placeholder='Content-Type: application/json&#10;Your-Key: Your value' id='header-textarea' value={header} onChange={(e) => setHeader(e.target.value)} />
            </div>
            {
                requestMethod !== 'get' ?
                    <div id='request-body' className='textarea-container'>
                        <label id='body-label'>Request Body</label>
                        <textarea placeholder='{}' id='body-textarea' className='mono-font' value={body} onChange={(e) => setBody(e.target.value)} />
                    </div>
                    :
                    null
            }
            <div id='output-container' className='textarea-container'>
                <div id="output-labels">
                    <label id='output-label'>Output</label>
                    <div id="status-labels">
                        {
                            statusCode !== 0 ? <label style={statusCode < 300? {color: 'rgb(17, 197, 17)'}: {color: 'rgb(252, 65, 65)'}} className="status-label" id="status-code">{statusCode}</label> : null
                        }
                        {
                            responseTime !== 0 ? <label style={statusCode < 300? {color: 'rgb(17, 197, 17)'}: {color: 'rgb(252, 65, 65)'}} className="status-label" id="response-time">{responseTime} ms.</label> : null
                        }
                    </div>
                </div>
                <textarea placeholder='Output' id='output-textarea' className='mono-font' readOnly value={output} />
            </div>
        </div>
    );
};