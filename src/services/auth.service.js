import fs from 'fs';
import { sign, verify, decode } from 'jsonwebtoken';

import { authKeysDir, authTokenLife } from '../config';

const privateKey = fs.readFileSync(`${authKeysDir}/private.key`, 'utf8');
const publicKey = fs.readFileSync(`${authKeysDir}/public.key`, 'utf8');

// SIGNING OPTIONS
const options = {
  issuer: 'ABC Company',
  subject: 'some@user.com',
  audience: 'http://example.com',
  expiresIn: authTokenLife,
  algorithm: 'RS256',
};

const JWTService = {
  sign: (payload) => {
    const signResult = sign({ payload }, privateKey, options);
    return signResult;
  },
  verify: (token, callback) => {
    const verifyResult = verify(token, publicKey, options, callback);
    return verifyResult;
  },
  decode: (token) => {
    const decodeResult = decode(token, { complete: true });
    return decodeResult;
  },
};

export default JWTService;
