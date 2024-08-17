import Inner from "@/components/Inner";
import logo from "@/assets/logo white.png";
import { useRouter } from "next/navigation";
import Head from "next/head";
export default function Page() {
  const route = useRouter();
  return (
    <Inner>
      <Head>
        <title>المقارن | عن المقارن</title>
      </Head>
      <div className="w-full bg-white h-10 fixed z-10 py-3 font-semibold text-first text-center text-lg top-0">
        اعلان
      </div>
      <div className="w-full h-14 bg-white/70 backdrop-blur-xl not-suport-glass text-gray-950 fixed z-10 font-medium text-center top-10 px-8 xs:px-0">
        <div className="relative max-w-lg w-full mx-auto flex justify-center items-center py-3">
          <div
            onClick={() => route.back()}
            className="p-2 pr-0 absolute right-0 noSelect cursor-pointer"
          >
            <svg
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 601 534"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-second"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M600.665 267.002C600.665 275.842 597.153 284.322 590.902 290.572L357.568 523.905C344.552 536.922 323.445 536.922 310.428 523.905C297.412 510.888 297.412 489.782 310.428 476.765L486.858 300.335L33.9984 300.335C15.5884 300.335 0.665062 285.412 0.665062 267.002C0.665062 248.592 15.5884 233.668 33.9984 233.668L486.858 233.668L310.428 57.2386C297.412 44.221 297.412 23.1156 310.428 10.098C323.445 -2.91937 344.552 -2.91937 357.568 10.098L590.902 243.432C597.153 249.682 600.665 258.162 600.665 267.002Z"
              />
            </svg>
          </div>
          <h1 className="text-second font-semibold xs:font-medium text-xl">
            عن التطبيق
          </h1>
        </div>
      </div>
      <div className="relative max-w-lg min-h-screen mx-auto leading-6 font-medium text-lg bg-bg pt-32 pb-20 px-4 md:px-6">
        <div className="flex justify-center mb-6">
          <img
            src={logo.src}
            className="w-36 h-32 object-contain"
            alt=""
            width={70}
            height={70}
          />
        </div>
        <p>
          المقارن تطبيق يستهدف عالم التداول للمقارنة بين أسهم الشركات، ومعرفة
          بالضبط كم قيمة الربح لكل هدَف في كل شركة، ومعرفة اهداف الشركات الأكثر
          ربحًا والأقل تكلفة مِن غيرها، ويحتوي على مؤشر لكفاءة كل هدَف، ويمكنك
          معرفة كم ستكون القوة الشرائية في حالة الهُبوط أو الارتفاع في نسبة
          السهم، ويُساعدك على تحليل أرباح وأداء أسهم الشركات المختلفة.
        </p>
      </div>
      <div className="w-full h-10 fixed z-10 py-3 font-semibold text-first text-center text-lg bottom-0 bg-white">
        اعلان
      </div>
    </Inner>
  );
}
