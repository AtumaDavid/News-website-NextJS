import { NewsArticle } from "@/models/NewsArticles";
import { Row, Col } from "react-bootstrap";
import NewsArticleEntry from "./NewsArticleEntry";

interface NewsArticleGridProps {
  articles: NewsArticle[];
}

export default function NewsArticlesGrid({ articles }: NewsArticleGridProps) {
  return (
    <div>
      <Row xs={1} sm={2} xl={3} className="g-3">
        {articles.map((article) => (
          <Col key={article.url}>
            <NewsArticleEntry article={article} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
