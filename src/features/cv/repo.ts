'use server';

import { wrapper } from '#/features/core/lib/wrapper';
import { minioClient } from '#/features/core/minio';
import { isPDF } from '#/features/cv/lib/isPDF';

const upload = wrapper(
  async (cv: File) => {
    const isValid = await isPDF(cv);
    if (!isValid) throw new Error('Invalid file');

    const buffer = Buffer.from(await cv.arrayBuffer());
    minioClient.putObject('jobspot', cv.name, buffer, buffer.length);
  }
);

export { upload };
