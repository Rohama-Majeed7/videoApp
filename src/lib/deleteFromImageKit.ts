import axios from "axios";

export const deleteFromImageKit = async (fileId: string) => {
  const IMAGEKIT_PRIVATE_API_KEY = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!fileId || !IMAGEKIT_PRIVATE_API_KEY) {
    throw new Error("Missing fileId or API key");
  }

  await axios.delete(
    `https://upload.imagekit.io/api/v1/files/${fileId}`,
    {
      auth: {
        username: IMAGEKIT_PRIVATE_API_KEY,
        password: "", // not required
      },
    }
  );
};
