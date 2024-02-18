import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log('handler');

  const cookie = serialize('accessToken', '123', {
    path: '/',
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === 'production',
  });
  res.setHeader('Set-Cookie', cookie);

  return res.status(200).send({ message: 'Cookie has been set.' });
}
