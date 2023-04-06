import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle } from "@/models/NewsArticles";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";

export default function search() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(
    null
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("searchQuery")?.toString().trim();

    // if (searchQuery){
    //   // alert(searchQuery);
    // }
    if (searchQuery) {
      try {
        setSearchResults(null);
        setSearchResultsLoadingIsError(false);
        setSearchResultsLoading(true);
        const response = await fetch("/api/search-news?q=" + searchQuery);
        const articles: NewsArticle[] = await response.json();
        setSearchResults(articles);
      } catch (error) {
        console.error(error);
        setSearchResultsLoadingIsError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }

  return (
    <>
      <Head>
        <title key="title">Search News - NextJS News App</title>
      </Head>
      <main>
        <h1>search items</h1>
        <Alert>
          This page uses <b>client-side data fetching</b> to fetch data fresh
          data for every search. Requests are handled by our backend via{" "}
          <a>API routs</a>
          and improves SEO
        </Alert>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="search-input">
            <Form.Label>search query</Form.Label>
            <Form.Control
              name="searchQuery"
              placeholder="E.g. politics, sports, ... "
            />
          </Form.Group>
          <Button
            type="submit"
            className="mb-3"
            disabled={searchResultsLoading}
          >
            search
          </Button>
        </Form>
        <div className="d-flex flex-column align-items-center">
          {searchResultsLoading && <Spinner animation="border" />}
          {searchResultsLoadingIsError && (
            <p>Something went wrong. Please try again</p>
          )}
          {searchResults?.length === 0 && (
            <p>Nothing found. Try a different query</p>
          )}
          {searchResults && <NewsArticlesGrid articles={searchResults} />}
        </div>
      </main>
    </>
  );
}
