import { betterAuth } from 'better-auth';

import { db } from '#/features/core/db';

export const auth = betterAuth({
  database: {
    db,
    type: 'postgres',
  },

  emailAndPassword: {
    enabled: true,
  },
});
