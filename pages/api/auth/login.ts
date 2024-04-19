import http from 'http';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    req.headers.cookie = '';
    req.url = req.url!.replace(/^\/api/, '');
    console.log(req.url);

    proxy.once('proxyRes', function (proxyRes: http.IncomingMessage) {
      handleLoginResponse(proxyRes, req, res);
    });

    proxy.once('error', reject);

    proxy.web(req, res, {
      target: "http://localhost:46501",
      autoRewrite: false,
      changeOrigin: true,
      selfHandleResponse: true,
    });

    function handleLoginResponse(
      proxyRes: http.IncomingMessage,
      req: NextApiRequest,
      res: NextApiResponse,
    ) {
      let responseBody = '';

      proxyRes.on('data', (chunk: string) => {
        responseBody += chunk;
      });

      console.log(responseBody);

      proxyRes.on('end', () => {
        try {
          console.log('test', JSON.parse(responseBody));
          const { data } = JSON.parse(responseBody);
          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV !== 'development',
          });

          cookies.set('access_token', data.accessToken, {
            httpOnly: true,
            sameSite: 'lax',
          });
          cookies.set('refresh_token', data.refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
          });

          res.status(200).json({ message: 'Login successfully' });
          resolve(1);
        } catch (e) {
          console.log('e', e)
          res.status(500).json({ message: 'Internal Server Error' });
          reject(e);
        }
      });
    }
  });
}
