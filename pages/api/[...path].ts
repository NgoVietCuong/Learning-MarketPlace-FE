import url from 'url';
import Cookies from 'cookies';
import httpProxy from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';



export const config = {
	api: {
		bodyParser: false,
	},
}

const proxy = httpProxy.createProxyServer();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// const SERVER_URL = process.env.SERVER_URL;
  // console.log('test', typeof SERVER_URL)
  return new Promise((resolve, reject) => {
		proxy.web(req, res, { target: 'http://localhost:46501', changeOrigin: true }, (err) => {
			if (err) {
				return reject(err)
			}
			resolve(1)
		})
	})
}
