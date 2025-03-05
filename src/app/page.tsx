'use client';

import { useRef } from 'react';
import { authClient } from '#/features/core/auth/auth-client';
import { Button } from '#/features/core/components/ui/button';
import { Input } from '#/features/core/components/ui/input';
import { upload } from '#/features/cv/repo';

const HomePage = () => {
  const { data } = authClient.useSession();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileSubmit = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.pdf')) return;

    await upload(file);
  };

  return (
    <div>
      {JSON.stringify(data)}

      <Input type="file" className="w-72" ref={fileRef} />
      <Button onClick={handleFileSubmit}>Click me</Button>
    </div>
  );
};

export default HomePage;
