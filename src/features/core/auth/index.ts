import { betterAuth } from 'better-auth';
import { customSession, organization } from 'better-auth/plugins';

import { db } from '#/features/core/db';

const auth = betterAuth({
  database: {
    db,
    type: 'postgres',
  },

  plugins: [
    customSession(async ({ user, session }) => {
      return {
        user,
        session,
      };
    }),

    organization()
  ],

  emailAndPassword: {
    enabled: true,
  },
});

export { auth };
