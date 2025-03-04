'use client';

import { authClient } from '#/features/core/auth/auth-client';

const HomePage = () => {
  const { data } = authClient.useSession();

  // return <div>{JSON.stringify(data)}</div>;
};

export default HomePage;
