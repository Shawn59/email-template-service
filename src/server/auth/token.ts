import { SignJWT, jwtVerify } from 'jose';
import { env } from '../../config/env.ts';

export interface AuthTokenPayload {
  login: string;
}

const secretKey = () => new TextEncoder().encode(env.JWT_SECRET);

/** Парсит значения вроде 7d / 24h / 3600s в секунды для JWT exp */
function parseExpiresIn(value: string): number {
  const match = /^(\d+)([smhd])$/.exec(value.trim());
  if (!match) return 60 * 60 * 24 * 7;

  const amount = Number(match[1]);
  const unit = match[2];

  const multipliers: Record<string, number> = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 60 * 60 * 24,
  };

  return amount * (multipliers[unit] ?? 60 * 60 * 24 * 7);
}

export const jwtExpiresInSeconds = parseExpiresIn(env.JWT_EXPIRES_IN);

export async function signAuthToken(payload: AuthTokenPayload): Promise<string> {
  return new SignJWT({ login: payload.login })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.login)
    .setIssuedAt()
    .setExpirationTime(`${jwtExpiresInSeconds}s`)
    .sign(secretKey());
}

export async function verifyAuthToken(token: string): Promise<AuthTokenPayload> {
  const { payload } = await jwtVerify(token, secretKey(), {
    algorithms: ['HS256'],
  });

  const login = typeof payload.login === 'string' ? payload.login : payload.sub;

  if (!login || typeof login !== 'string') {
    throw new Error('Invalid token payload');
  }

  return { login };
}
