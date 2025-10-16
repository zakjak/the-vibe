import { NextResponse } from "next/server";
import { uploadToCloudflare } from "../utils/helpers";

export const config = {
  api: {
    bodyParser: false,
  },
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
