export const uploadToCloudflare = async (file: File) => {
  const formData = new FormData();

  const blob = new Blob([file]);
  formData.append("file", blob, file.name);

  const result = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
      },
      body: formData,
    }
  );

  return result.json();
};
