import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Alert } from "react-bootstrap";

interface CategoryNewsPageProps {
  newsArticles: NewsArticle[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categorySlugs = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const paths = categorySlugs.map((slug) => ({ params: { category: slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({
  params,
}) => {
  const category = params?.category?.toString();
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.NEWS_API_KEY}`
  );
  const newsResponse: NewsResponse = await response.json();
  return {
    props: { newsArticles: newsResponse.articles },
    //fetch data every 5 minutes
    revalidate: 5 * 60,
  };
  //let error go to 500 page
};

export default function CategoryNewsPage({
  newsArticles,
}: CategoryNewsPageProps) {
  const router = useRouter();
  const categoryName = router.query.category?.toString();
  const title = "category: " + categoryName;
  return (
    <>
      <Head>
        <title key="title">{`${title} - NextJS News App`}</title>
      </Head>
      <main>
        <h1>{title}</h1>
        <Alert>
          this page uses <b>getStaticProps</b> for very high page loading speed
          and <b>incremental static regeneration</b> to show data not older that
          <b>5 minutes</b>
        </Alert>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  );
}
