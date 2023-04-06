import { NewsArticle } from "@/models/NewsArticles";
import { Card } from "react-bootstrap";
import Image from "next/image";
import placeholderImage from "@/assets/images/istockphoto-1428321006-1024x1024.jpg";
import styles from "@/styles/NewsArticleEntry.module.css";

interface NewsArticleEntryProps {
  article: NewsArticle;
}

export default function NewsArticleEntry({
  article: { title, description, url, urlToImage },
}: NewsArticleEntryProps) {
  const validImageUrl = urlToImage?.startsWith(
    "https://" || urlToImage?.startsWith("https://")
  )
    ? urlToImage
    : undefined;
  return (
    <a href={url}>
      <Card className="h-100" style={{}}>
        {/* <Card.Img variant="top" src={validImageUrl} style={{height: ''}}/> */}
        <Image
          src={validImageUrl || placeholderImage}
          alt="News Image"
          width={500}
          height={200}
          className={`card-img-top ${styles.image}`}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
}
