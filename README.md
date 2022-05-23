# 🌐 Web Requests Widget

A react component to make web requests from the front-end.

## About

This is a fun-project consciously ignoring the responsibility-premises of front- and backend and therefore very limited in its functionality as an all-purpose web request client.

## Limitation

As this component logic is running on the client/browser, requests can only be made to APIs which explicitly allow CORS requests. A CORS proxy (such as `cors-anywhere`) can be supplied as a parameter to allow for general web requests.

## CORS proxy

To allow for general requests, the target must either have CORS enabled explicitly or the request must be routed through a CORS proxy such as `cors-anywhere`. The `proxy` prop of this component can be supplied the host of the CORS proxy. That will route all requests through the proxy.

```jsx
<Requests proxy="http://examplecorsproxy.com/" />
```


## Screenshots

![screenshot1](https://i.imgur.com/r0PwNi4.png)

![screenshot2](https://i.imgur.com/Nub9rAb.png)