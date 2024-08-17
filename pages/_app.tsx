import "./globals.css";
import "./forms.css";
import "@/assets/popover.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import logo from "@/assets/logo white.png";
import { Rubik } from "next/font/google";
import ErrorBound from "@/components/ErrorBound";
import dynamic from "next/dynamic";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import Menu from "@/components/Menu";
import Link from "next/link";
import FirstTip from "@/components/FirstTip";
import Loading from "@/components/Loading";
const SendUserData = dynamic(() => import("@/components/SendUserData"), {
  ssr: false,
});
const font = Rubik({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});
const CSP = `
  base-uri 'self';
  default-src 'self';
  script-src 'self' 'unsafe-inline'${
    process.env.NODE_ENV !== "production" ? " 'unsafe-eval'" : ""
  } https://pagead2.googlesyndication.com/ https://ep2.adtrafficquality.google/;
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  connect-src 'self' https://ep1.adtrafficquality.google/ https://firestore.googleapis.com/v1/projects/try-e4215/databases/;
  frame-src https://www.google.com/ https://googleads.g.doubleclick.net/ https://tpc.googlesyndication.com/;
  img-src 'self' https://pagead2.googlesyndication.com/ http://www.w3.org/2000/svg data:;
  object-src 'none';
  form-action 'none';
  `;
// Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false})
export default function MyApp({ Component, pageProps, router }) {
  return (
    <main className={font.className}>
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content={CSP.replace(/\s{2,}/g, " ").trim()}
        />
        <meta httpEquiv="Cross-Origin-Resource-Policy" content="same-origin" />
        <meta
          httpEquiv="Cross-Origin-Embedder-Policy"
          content="credentialless"
        />
        <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin" />
        <meta property="og:url" content="https://almuqarn.pages.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_KSA" />
        <meta property="og:title" content="المُقارن" />
        <meta
          property="og:description"
          content="المقارن تطبيق يستهدف عالم التداول للمقارنة بين أسهم الشركات، ومعرفة بالضبط كم قيمة الربح لكل هدَف في كل شركة، ومعرفة اهداف الشركات الأكثر ربحًا والأقل تكلفة مِن غيرها، ويحتوي على مؤشر لكفاءة كل هدَف، ويمكنك معرفة كم ستكون القوة الشرائية في حالة الهُبوط أو الارتفاع في نسبة السهم، ويُساعدك على تحليل أرباح وأداء أسهم الشركات المختلفة."
        />
        <meta
          property="og:image"
          content={"https://almuqarn.pages.dev" + "/og.png"}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary" />
        <link rel="icon" href="/favicon.ico" sizes="256x256" />
        <link rel="icon" href="/images/favicon48.ico" sizes="48x48" />
        <link rel="icon" href="/images/favicon32.ico" sizes="32x32" />
        <meta
          name="description"
          content="المقارن تطبيق يستهدف عالم التداول للمقارنة بين أسهم الشركات، ومعرفة بالضبط كم قيمة الربح لكل هدَف في كل شركة، ومعرفة اهداف الشركات الأكثر ربحًا والأقل تكلفة مِن غيرها، ويحتوي على مؤشر لكفاءة كل هدَف، ويمكنك معرفة كم ستكون القوة الشرائية في حالة الهُبوط أو الارتفاع في نسبة السهم، ويُساعدك على تحليل أرباح وأداء أسهم الشركات المختلفة."
        />
        <meta
          name="keywords"
          content="الاسهم، تداول، تحليل مالي، تحليل فني، البورصة، تاسي، تاسي اليوم، السوق اليوم، مقارنة أسهم الشركات، نازداك، ناسداك، فرانكفورت، يورونكست، بيتكوين، SSE ،ASX ،NYSE، إيثريوم، تيثر، استثمار، مقارنة الاسهم، مقارنة الشركات، مقارنة الاهداف، ربح الاهداف، ربح التداول، الربح من الشركات، مقارنة التداول، ربح اهداف الشركات، الاسهم الأكثر ربحًا، الاسهم الأقل تكلفة، الاهداف الأكثر ربحًا، الاهداف الأقل تكلفة، الشركات الأكثر ربحًا، الشركات الأقل تكلفة، لكفاءة الاهداف والاسهم، نسبة ربح الاسهم، القوة الشرائية للاسهم، ارتفاع القوة الشرائية، تحليل ارباح وأداء أسهم الشركات، حاسبة الاسهم، حساب الاسهم، حاسبه الأسهم، حسابة الاسهم"
        />
        {isTouch() ? (
          <meta
            name="viewport"
            content="minimum-scale=1, user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
          />
        ) : (
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
        )}

        <meta name="application-name" content="المُقارن" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#BE3D37" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="المُقارن" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/logo180.png"
        />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#BE3D37" />
        <link rel="manifest webmanifest" href="/manifest.json" />
        <title>المقارن</title>
      </Head>
      <Toaster />
      <div className="w-full bg-white h-10 fixed z-10 py-3 font-semibold text-first text-center text-lg top-0">
        اعلان
      </div>
      <div className="w-full h-14 bg-white/70 backdrop-blur-xl not-suport-glass text-gray-950 fixed z-10 font-medium text-center top-10 px-8 xs:px-0">
        <div className="max-w-lg w-full mx-auto flex items-center justify-center h-full py-2">
          <Link href="/" title="الصفحة الرئيسية">
            <img src={logo.src} alt="" width={35} height={35} />
          </Link>
        </div>
      </div>
      <Loading>
        <ErrorBound>
          <SendUserData />
          <FirstTip
            title="مرحبا بك في تطبيق المُقارن"
            description="هذا البرنامج لا يوصي بأي توصية بيع او شراء"
            button="حسنا"
            button2={false}
          />
          <LazyMotion features={domAnimation}>
            <AnimatePresence mode="wait">
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </LazyMotion>
        </ErrorBound>
      </Loading>
      <Menu />
      <div className="w-full h-10 fixed z-10 py-3 font-semibold text-first text-center text-lg bottom-0 bg-white">
        اعلان
      </div>
    </main>
  );
}

function isTouch() {
  if (typeof navigator === "undefined" || typeof window === "undefined")
    return false;
  return (
    // @ts-ignore
    navigator.maxTouchPoints ||
    // @ts-ignore
    window.msMaxTouchPoints ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0 ||
    // @ts-ignore
    (window.DocumentTouch && document instanceof DocumentTouch) ||
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(any-pointer: coarse)").matches
  );
}
