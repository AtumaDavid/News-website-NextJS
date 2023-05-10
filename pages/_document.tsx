import { Html, Head, Main, NextScript } from "next/document";
import { SSRProvider } from "react-bootstrap";

export default function Document() {
  return (
    <SSRProvider>
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </SSRProvider>
  );
}
