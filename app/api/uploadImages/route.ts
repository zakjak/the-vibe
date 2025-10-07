import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadToCloudflare = async (file: File) => {
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

export async function POST(req: Request, res: Response) {
  const formData = await req.formData();

  try {
    const image = formData.get("image");
    const images = formData.getAll("images");

    const uploadPromises = [];
    if (image && image instanceof File) {
      uploadPromises.push(uploadToCloudflare(image));
    }

    if (images) {
      for (const imageFile of images) {
        if (imageFile instanceof File) {
          uploadPromises.push(uploadToCloudflare(imageFile));
        }
      }
    }

    const results = await Promise.all(uploadPromises);

    // console.log(results[1].result.variants);

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(error);
  }
}
