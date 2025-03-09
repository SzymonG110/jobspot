import { createAuthClient } from 'better-auth/react';
import {
  customSessionClient,
  organizationClient,
} from 'better-auth/client/plugins';
import { auth } from '#/features/core/auth';

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [customSessionClient<typeof auth>(), organizationClient()],
});

export { authClient };
