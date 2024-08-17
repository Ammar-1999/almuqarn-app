import { ARToEN } from "@/components/Form";
import Inner from "@/components/Inner";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ValidateNumber } from "./mean";

export default function Home() {
  const [data, setData] = useState({
    price: "",
    percent: "",
  });
  const [result, setResult] = useState<any>("");
  useEffect(() => {
    if (Object.keys(result).length !== 0)
      setTimeout(() => {
        document.body.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 50);
  }, [result]);

  const handelResult = useCallback((data) => {
    if (!data.price || !data.percent) {
      toast.error("قم بملئ جميع الخانات");
      return;
    }
    setResult((+data.price * +data.percent).toLocaleString("en-US"));
  }, []);

  return (
    <Inner>
      <Head>
        <title>المقارن | التطهير</title>
      </Head>
      <div className="h-20" />
      <div className="login mt-8 mb-6 relative max-w-lg mx-auto bg-white pb-8 pt-6 px-6 xs:px-8 rounded-2xl shadow shadow-gray-300">
        <div className="flex items-center relative mb-4">
          <h1 className="w-fit text-2xl font-bold pl-2 py-1 leading-[34px]">
            التطهير
          </h1>
          <button
            onClick={() => {
              setResult("");
              setData({
                price: "",
                percent: "",
              });
            }}
            aria-label="محو"
            type="button"
            className="block hover:bg-opacity-90 focus:bg-opacity-90 rounded-lg transition ease-out border border-first text-first active:scale-[.95] mr-auto py-1 px-3 text-sm leading-normal"
          >
            محو
          </button>
        </div>
        <div className="flex items-center justify-center space-x-4 space-x-reverse">
          <div className="relative bg-white parent flex-1">
            <input
              value={data.price}
              dir="ltr"
              id="price"
              name="price"
              inputMode="decimal"
              type="text"
              onChange={({ target: { value, name } }) => {
                value = ARToEN(value);
                if (!ValidateNumber(value) && value != "") return data[name];
                else if (+value > 999999999999) return data[name];
                setData((pre) => ({ ...pre, price: value }));
              }}
              className="input transition rounded-lg"
              placeholder=""
            />
            <label htmlFor="price" className="label">
              الربح
            </label>
          </div>
          <div className="relative bg-white parent flex-1">
            <input
              value={data.percent}
              dir="ltr"
              id="percent"
              name="percent"
              inputMode="decimal"
              type="text"
              onChange={({ target: { value, name } }) => {
                value = ARToEN(value);
                if (!ValidateNumber(value) && value != "") return data[name];
                else if (+value > 999999999999) return data[name];
                setData((pre) => ({ ...pre, percent: value }));
              }}
              style={{
                paddingLeft: "1.6rem",
              }}
              className="input transition rounded-lg"
              placeholder=""
            />
            <span className="absolute percent top-1/2 left-0 translate-x-1/2 -translate-y-[45%] text-gray-500 z-[2]">
              %
            </span>
            <label htmlFor="percent" className="label">
              نسبة التطهير
            </label>
          </div>
        </div>
        <div className="flex transition mt-7">
          <button
            aria-label="حساب"
            type="button"
            onMouseDown={() =>
              !(
                navigator.maxTouchPoints ||
                // @ts-ignore
                window.msMaxTouchPoints ||
                // @ts-ignore
                navigator.msMaxTouchPoints > 0 ||
                // @ts-ignore
                (window.DocumentTouch && document instanceof DocumentTouch) ||
                window.matchMedia("(pointer: coarse)").matches ||
                window.matchMedia("(any-pointer: coarse)").matches
              )
                ? handelResult(data)
                : void 0
            }
            onTouchStart={() => handelResult(data)}
            className="w-full btn_main h-10 shadow shadow-first/30 font-semibold text-center"
          >
            حساب
          </button>
        </div>
      </div>
      {!!result && (
        <div className="max-w-lg flex mx-auto bg-white py-6 space-x-2 space-x-reverse px-6 xs:px-8 rounded-2xl shadow shadow-gray-300">
          <p className="text-xl text-gray-700">
            مبلغ التطهير:
          </p>
          <p className="text-xl font-semibold leading-6">
            {result}
          </p>
        </div>
      )}
      <div className="h-24"/>
    </Inner>
  );
}
