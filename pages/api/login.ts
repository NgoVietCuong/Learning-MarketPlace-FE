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
    // Don't forward cookies to the API:
    req.headers.cookie = '';

    proxy.once('proxyRes', handleLoginResponse);

    proxy.web(req, res, {
      target: process.env.SERVER_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });

    function handleLoginResponse(proxyRes, req, res) {
      let body = '';
      
      try {
        const { accessToken, refreshToken } = JSON.parse()
      } catch (e) {

      }
    }
  });
}
