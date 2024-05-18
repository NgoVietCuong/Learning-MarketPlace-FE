import Cookies from 'cookies';
import httpProxy from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

proxy.on('proxyRes', function (proxyRes, req, res) {
  let responseBody: Uint8Array[] = [];
  proxyRes.on('data', function (chunk: Uint8Array) {
    responseBody.push(chunk);
  });

  proxyRes.on('end', function () {
    handleResponse(req as NextApiRequest, res as NextApiResponse, Buffer.concat(responseBody).toString());
  });
});

async function handleResponse(
  req: NextApiRequest,
  res: NextApiResponse,
  responseBody: string
) {
  const cookies = new Cookies(req, res);
  try {
    const body = JSON.parse(responseBody);

    if (req.url?.includes('login') && !body.error) {
      cookies.set('access_token', body.data.accessToken, {
        httpOnly: true,
        sameSite: 'lax',
      });
      cookies.set('refresh_token', body.data.refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
      });
    }

    if (req.url === '/auth/logout') {
      cookies.set('access_token');
      cookies.set('refresh_token');
    }

    res.status(body.statusCode).json(body);
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get('access_token');

    if (accessToken) {
      req.headers.authorization = `Bearer ${accessToken}`;
    }

    req.headers.cookie = '';
    req.url = req.url!.replace(/^\/api/, '');

    proxy.web(req, res, {
      target: process.env.SERVER_URL,
      autoRewrite: false,
      changeOrigin: true,
      selfHandleResponse: true
    });

    res.on('close', resolve);
    res.on('finish', resolve);
    res.on('error', reject);
  });
}
