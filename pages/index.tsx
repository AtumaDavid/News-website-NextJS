import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import NewsArticleEntry from "@/components/NewsArticleEntry";
import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { Alert } from "react-bootstrap";

//typescript
interface BreakingNewsPageProps {
  newsArticles: NewsArticle[];
}

//server side rendering. fetching from API//

//export const getServerSideProps: This is a function that is exported so that it can be used by
//...Next.js to pre-render the page on the server before sending it to the client.
//The function returns an object with the props that should be passed to the page component.
export const getServerSideProps: GetServerSideProps<
  BreakingNewsPageProps
> = async () => {
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=" +
      process.env.NEWS_API_KEY
  );
  const newsResponse: NewsResponse = await response.json();
  return {
    //define the props that will be passed to the corresponding page component.
    // The page component can then access this array of news articles through
    //... props.newsArticles in order to display them to the user.
    props: { newsArticles: newsResponse.articles },
  };
  //let error go to 500 page
};

export default function BreakingNewsPage({
  newsArticles,
}: BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key="title">Breaking News - NextJS News App</title>
      </Head>
      <main>
        <h1>Breaking News</h1>
        <Alert>
          This page uses <b>getServerSideProps</b> to fetch data server-side on
          every request. This allows search engines to crawl the page content
          and improves SEO
        </Alert>
        {/* {JSON.stringify(newsArticles)} */}
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  );
}
