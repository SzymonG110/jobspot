"use server";

import { minioClient } from "#/features/core/minio";

const upload = async (cv: File) => {
  const buffer = Buffer.from(await cv.arrayBuffer());

  minioClient.putObject("jobspot", cv.name, buffer, buffer.length);
};

export { upload };
