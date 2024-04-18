import httpProxy from 'http-proxy';
import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';

const proxy = httpProxy.createProxyServer();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    
  });
}
