import { betterAuth } from 'better-auth';
import { customSession } from 'better-auth/plugins';

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
  ],

  emailAndPassword: {
    enabled: true,
  },
});

export { auth };
