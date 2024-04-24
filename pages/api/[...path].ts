import http from 'http';
import Cookies from 'cookies';
import httpProxy from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    req.headers.cookie = '';

    const newUrl = req.url!.replace(/^\/api/, '');
    req.url = newUrl
    console.log('ahihi',req.url);

    const cookies = new Cookies(req, res, {
      secure: process.env.NODE_ENV !== 'development',
    });
    
    const accessToken = cookies.get('access_token');
    if (accessToken) {
      req.headers.authorization = `Bearer ${accessToken}`;
    }

    proxy.on('proxyRes', function (proxyRes: http.IncomingMessage) {
      handleResponse(proxyRes, req, res);
    });
		
    proxy.web(req, res, {
      target: process.env.SERVER_URL,
      autoRewrite: false,
      changeOrigin: true,
      selfHandleResponse: true
    });

		function handleResponse(
      proxyRes: http.IncomingMessage,
      req: NextApiRequest,
      res: NextApiResponse,
    ) {
      let responseBody: Uint8Array[] = [];
      proxyRes.on('data', function (chunk: Uint8Array) {
        responseBody.push(chunk);
      });
      
      proxyRes.on('end', function () {
        try {
          const data = JSON.parse(Buffer.concat(responseBody).toString());
          res.status(data.statusCode).json({ ...data });
          resolve(data)
        } catch (e) {
          res.status(500).json({ message: 'Internal Server Error' });
          reject(e);
        }
      });
    }
  });
}
