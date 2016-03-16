# zt-panel

> A Vue.js project

created for self hosted zerotier controller node management

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Access The Zerotier API

the zerotier behave badly when be directly used with browser, and I recommended
to use something like nginx to proxy the requests. A example nginx config file is like this:

    server {
    	listen 9994;
    	location / {
    		proxy_pass http://127.0.0.1:9993;
    		add_header 'Access-Control-Allow-Origin' '*';
    		add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    		add_header 'Access-Control-Allow-Headers' 'X-ZT1-AUTH,Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Mx-ReqToken,X-Requested-With';
    		add_header 'Access-Control-Allow-Credentials' 'true';
    		if ($request_method = 'OPTIONS') {
    			return 204;
    		}
    	}
    }

And then, we can use the 9994 port to make the proper operation.
