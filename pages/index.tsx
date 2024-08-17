import { useStore } from "@/lib/store";
import logo from "@/assets/logo white.png";
import Form from "@/components/Form";
import Link from "next/link";
import Result from "@/components/Result";
import ErrorBound from "@/components/ErrorBound";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Inner from "@/components/Inner";
import Head from "next/head";
import { useShallow } from "zustand/react/shallow";
import Toggle from "@/components/Toggle";
export default function Home(): JSX.Element {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const searchParams = useSearchParams();
  const [dataError, setDataError] = useState({
    name: false,
    price: false,
    count: false,
    goals: { price: false, sold: false },
    percent: false,
  });
  const { data, addData, setDataOnline } = useStore(
    useShallow((state) => ({
      data: state.data,
      addData: state.addData,
      setDataOnline: state.setDataOnline,
    }))
  );
  useEffect(() => {
    if (searchParams.get("onlinData")) {
      const newData = JSON.parse(
        decodeURIComponent(searchParams.get("onlinData")!)
      );
      router.push(process.env.NEXT_PUBLIC_URL + "?data=open", {
        scroll: false,
      });
      setDataOnline(newData);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!openDrawer && searchParams.get("data")) setOpenDrawer(true);
    else if (openDrawer && !searchParams.get("data"))
      setTimeout(() => setOpenDrawer(false), 500);
  }, [searchParams, openDrawer]);
  return (
    <Inner>
      <Head>
        <title>المقارن | الرئيسية</title>
      </Head>
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
      <div className="h-20" />
      <div className="flex justify-between items-center max-w-lg mx-auto mt-10 mb-5 bg-white py-3 px-6 xs:px-8 rounded-2xl shadow shadow-gray-300">
        <h3 className="text-lg font-medium">العمولات</h3>
        <Toggle />
      </div>
      {data.map((e, i) => (
        <Form
          data={e}
          index={i}
          inputErr={dataError}
          key={i + "_form"}
          setDataError={setDataError}
        />
      ))}
      {data.length < 4 && (
        <div className="mb-16 w-full h-14 px-8 xs:px-0">
          <div
            style={{
              background: `url("data:image/svg+xml,%3csvg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%236B7280FF' stroke-width='3' stroke-dasharray='10' stroke-dashoffset='23' stroke-linecap='square'/%3e%3c/svg%3e")`,
            }}
            onClick={() => addData()}
            className="noSelect text-gray-500 h-full cursor-pointer flex flex-col justify-center items-center active:scale-[.95] focus:shadow transition hover:shadow relative max-w-lg mx-auto rounded-xl"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.33333 17.6667C13.9357 17.6667 17.6667 13.9357 17.6667 9.33333C17.6667 4.73096 13.9357 1 9.33333 1C4.73096 1 1 4.73096 1 9.33333C1 13.9357 4.73096 17.6667 9.33333 17.6667Z"
                stroke="#6B7280"
                strokeWidth="1.6"
              />
              <path
                d="M11.8333 9.33333H9.33334M9.33334 9.33333H6.83334M9.33334 9.33333V6.83333M9.33334 9.33333V11.8333"
                stroke="#6B7280"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-gray-500">إضافه شركة</p>
          </div>
        </div>
      )}
      <div className="h-28" />
      <div className="w-full h-10 fixed z-10 font-semibold text-center bottom-28 text-white px-6 xs:px-0">
        <button
          aria-label="مُقارنة"
          type="button"
          onClick={() => {
            let isError = false,
              message = "يجب ملئ خانات ";
            for (let i = 0; i < data.length && !isError; ++i) {
              if (data[i].price <= 0) {
                message += "سعر الشراء ببيانات صحيحة";
                isError = true;
              } else if (data[i].count <= 0) {
                message += "عدد الاسهم  ببيانات صحيحة";
                isError = true;
              } else if (data[i].goals.length > 1) {
                for (let j = 0; j < data[i].goals.length; j++) {
                  if (data[i].goals[j].price <= 0) {
                    message += "اهداف الشركات التي تحتوي على اكثر من هدف";
                    isError = true;
                    break;
                  }
                }
              }
            }
            if (isError) {
              toast.error(message, { duration: 7000 });
              return;
            }
            router.push(process.env.NEXT_PUBLIC_URL + "?data=open", {
              scroll: false,
            });
          }}
          className="w-full max-w-lg mx-auto btn_main h-full shadow-xl shadow-first/30"
        >
          مُقارنة
        </button>
      </div>

      <div className="w-full h-10 fixed z-10 py-3 font-semibold text-first text-center text-lg bottom-0 bg-white">
        اعلان
      </div>
      <ErrorBound>{openDrawer && <Result />}</ErrorBound>
    </Inner>
  );
}
