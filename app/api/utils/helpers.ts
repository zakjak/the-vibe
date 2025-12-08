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

export function isToday(date: Date) {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

export function startOfWeek() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(now.setDate(diff));
}

export function startOfMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}
