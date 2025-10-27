import ArticleComponent from "@/components/ArticleComponent";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/article/${id}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    return {
      title: "Article Not Found | NewsAfrika",
      description: "The article you are looking for, does not exist.",
    };
  }

  const article = await res.json();
  const siteUrl = "http://localhost:3000";
  const articleUrl = `${siteUrl}/${
    article[0]?.category
  }/${article[0]?.title.replaceAll(" ", "-")}`;

  return {
    title: `${article[0]?.title}`,
    description: article[0]?.title,
    openGraph: {
      title: `${article[0]?.title}`,
      description: article[0]?.title,
      url: articleUrl,
      siteName: "NewsAfrika",
      images: [
        {
          url: article[0]?.image,
          width: 1200,
          height: 630,
          alt: article[0].title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article[0]?.title,
      description: article[0]?.title,
      images: [article[0]?.image],
    },
    facebook: {
      appId: process.env.FB_APP_ID!,
    },
  };
}

const ArticlePage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;

  return (
    <div className="">
      <ArticleComponent id={id} />
    </div>
  );
};

export default ArticlePage;
