import { statelessSessions } from '@keystone-6/core/session';

// ToDO: Implement Session with Redis Server? Maybe?

// Use Empty String bc build will fail when no env is available
const sessionSecret = process.env.COOKIE_SECRET || '';

export const session = statelessSessions({
    secret: sessionSecret,
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
    secure: true,
    path: '/',
    domain: 'localhost'
  });