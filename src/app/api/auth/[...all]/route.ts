import { toNextJsHandler } from 'better-auth/next-js';
import { auth } from '#/features/core/auth';

export const { POST, GET } = toNextJsHandler(auth);
