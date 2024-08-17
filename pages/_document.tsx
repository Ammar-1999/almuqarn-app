import { Html, Main, NextScript, Head } from "next/document";
export default function Document() {
  return (
    <Html lang="ar" className="h-full text-sm xs:text-base" dir="rtl">
      <Head>
        <script src="/js/global.js" type="text/javascript" />
        <script src="/js/queuemicrotask.js" type="text/javascript" />
        <script src="/js/detectsIOS.js" type="text/javascript" async />
        {process.env.NODE_ENV === "production" ? (
          <script src="/js/registerSW.js" type="text/javascript" async />
        ) : null}
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1304205335483256"
          crossOrigin="anonymous"
        /> */}
      </Head>
      <body className="min-h-screen antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
