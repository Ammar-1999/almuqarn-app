import toast from "react-hot-toast";
import Inner from "@/components/Inner";
import { useState } from "react";
import { useUserData } from "@/lib/store";
import { useRouter } from "next/navigation";
import Head from "next/head";
export default function Page() {
  const route = useRouter()
  const userData = useUserData((state) => state.userData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <Inner>
      <Head>
        <title>المقارن | الشكاوي والأقتراحات</title>
      </Head>
      <div className="w-full bg-white h-10 fixed z-10 py-3 font-semibold text-first text-center text-lg top-0">
        اعلان
      </div>
      <div className="w-full bg-white fixed z-10 top-10">
        <div className="w-full relative container flex justify-center items-center py-3">
          <div
            onClick={() => route.back()}
            className="p-2 pr-0 absolute right-0 -translate-x-3/4 noSelect cursor-pointer"
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
            الشكاوي والأقتراحات
          </h1>
        </div>
      </div>
      <div className="!pb-20 container bg-bg !pt-32 flex flex-col items-center sm:flex-row">
        <h2 className="text-lg font-semibold xs:font-medium">
          شاركنا اقتراحاتك وافكارك لتحسين البرنامج، او قم بإبداء رأيك:
        </h2>
        <span className="basis-3"></span>
        <div className="w-full border border-gray-200 rounded-lg bg-gray-50">
          <div className="px-4 py-2 bg-white rounded-t-lg ">
            <textarea
              onBlur={({ target: { value } }) => setMessage(value)}
              id="comment"
              maxLength={600}
              className="w-full outline-none text-sm resize-none text-gray-900"
              placeholder="شاركنا رأيك"
            ></textarea>
          </div>
          <div>
            <button
              aria-label="ارسل"
              onClick={async () => {
                if (message?.length > 3) {
                  const toastId = toast.loading("جارٍ الارسال");
                  try {
                    setLoading(true);
                    const { addDoc, getFirestore, collection } = await import(
                      "@firebase/firestore/lite"
                    );
                    const { app } = await import("@/lib/firebas");
                    const db = getFirestore(app);
                    await addDoc(collection(db, "message"), {
                      message: message.slice(0, 600),
                      userData,
                    });
                    toast.success("تم الارسال، شكرا على مشاركتك", {
                      id: toastId,
                    });
                  } catch (_) {
                    toast.error(
                      "حدث خطاء، تحقق من الاتصال بالانترنت ثم حاول مجددا",
                      {
                        id: toastId,
                      }
                    );
                  }
                  setLoading(false);
                }
              }}
              type="button"
              className="btn_main relative block mx-auto my-2 px-4 text-sm font-medium rounded-lg py-2"
            >
              <span className="absolute w-4 h-4 top-2/4 left-2/4 -translate-y-2/4">
                <span
                  className={`${
                    loading ? "" : "hidden"
                  } animate-spin absolute w-4 h-4 border-4 rounded-full  border-white border-b-transparent`}
                ></span>
              </span>
              <span className={`${loading ? "opacity-0" : ""}`}>ارسال</span>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-10 fixed z-10 py-3 font-semibold text-first text-center text-lg bottom-0 bg-white">
        اعلان
      </div>
    </Inner>
  );
}
