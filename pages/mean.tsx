import Inner from "@/components/Inner";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Head from "next/head";
import { ARToEN } from "@/components/Form";
import { useCommission } from "@/lib/store";
import Toggle from "@/components/Toggle";
const newData = [
  {
    price: "",
    count: "",
  },
  {
    price: "",
    count: "",
  },
];
export default function Home(): JSX.Element {
  const [totalCommission, commissions] = useCommission((state) => [
    state.totalCommission,
    state.commissions,
  ]);
  const [data, setData] = useState(newData);
  const [result, setResult] = useState<any>({});
  useEffect(() => {
    if (Object.keys(result).length !== 0)
      setTimeout(() => {
        document.body.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 50);
  }, [result]);
  const handelResult = useCallback(
    (data) => {
      let error = false,
        allTatal: string[] = [],
        totalCount = 0,
        totalPrice = 0,
        commission = 0;
      for (let i = 0; i < data.length; i++) {
        let currentCommission =
          +data[i].price * ((commissions.on ? +totalCommission : 0) / 100);
        commission += currentCommission;
        let count = +data[i].count,
          price = currentCommission + +data[i].price;
        if (isNaN(count) || isNaN(price)) {
          error = true;
          break;
        }
        if (count == 0 || price == 0) continue;
        totalCount += count;
        totalPrice += price * count;
        allTatal[i] = (count * price || "").toLocaleString("en-US");
      }
      if (error || totalCount == 0 || totalPrice == 0) {
        toast.error("قم بتوفير ارقام صحيحة");
        return;
      }
      setResult({
        totalCount: totalCount.toLocaleString("en-US"),
        totalPrice: totalPrice.toLocaleString("en-US"),
        commission: commission.toLocaleString("en-US"),
        mean: (totalPrice / totalCount).toLocaleString("en-US"),
        allTatal,
      });
    },
    [commissions.on]
  );

  return (
    <Inner>
      <Head>
        <title>المقارن | المتوسط الحسابي</title>
      </Head>
      <div className="h-20" />
      <div className="flex justify-between items-center max-w-lg mx-auto mt-10 mb-5 bg-white py-3 px-6 xs:px-8 rounded-2xl shadow shadow-gray-300">
        <h3 className="text-lg font-medium">العمولات</h3>
        <Toggle />
      </div>
      <div className="login mt-5 mb-6 relative max-w-lg mx-auto bg-white pb-8 pt-6 px-6 xs:px-8 rounded-2xl shadow shadow-gray-300">
        <div className="flex items-center relative mb-4">
          <h1 className="w-fit text-2xl font-bold pl-2 py-1 leading-[34px]">
            المتوسط الحسابي
          </h1>
          <button
            onClick={() => {
              setResult({});
              setData([
                {
                  price: "",
                  count: "",
                },
                {
                  price: "",
                  count: "",
                },
              ]);
            }}
            aria-label="محو"
            type="button"
            className="block hover:bg-opacity-90 focus:bg-opacity-90 rounded-lg transition ease-out border border-first text-first active:scale-[.95] mr-auto py-1 px-3 text-sm leading-normal"
          >
            محو
          </button>
        </div>
        <div className="flex flex-col space-y-6 transition ">
          {data.map((e, i) => (
            <Form key={i + "_mean"} data={e} index={i} setData={setData} />
          ))}
          {data.length < 7 && (
            <div
              style={{
                background: `url("data:image/svg+xml,%3csvg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23E5E7EBFF' stroke-width='3' stroke-dasharray='10' stroke-dashoffset='23' stroke-linecap='square'/%3e%3c/svg%3e")`,
              }}
              onClick={() =>
                setData((pre) => [
                  ...pre,
                  {
                    price: "",
                    count: "",
                  },
                ])
              }
              className="noSelect text-gray-300 py-2 w-full h-14 rounded-lg cursor-pointer flex flex-col justify-center items-center active:scale-[.95] focus:shadow transition hover:shadow"
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
              <p className="text-gray-500">إضافه</p>
            </div>
          )}
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
      {Object.keys(result).length !== 0 && (
        <div className="max-w-lg mx-auto bg-white pb-8 pt-6 px-6 xs:px-8 rounded-2xl shadow shadow-gray-300">
          <h1 className="text-2xl font-bold pl-2 py-2 leading-[34px]">
            الناتج
          </h1>
          <p className="mb-1">اجمالي التكلفة في كل عملية شراء</p>
          {result.allTatal.map((e, i) =>
            e ? (
              <p key={i + "allTatal"}>
                {i + 1}- <span className="font-semibold">{e}</span>
              </p>
            ) : null
          )}
          <p className="my-2">
            متوسط سعر السهم:{" "}
            <span className="font-semibold">{result.mean}</span>
          </p>
          <p className="my-2">
            مجموع عدد الاسهم:{" "}
            <span className="font-semibold">{result.totalCount}</span>
          </p>
          <p className="my-2">
            اجمالي مبلغ الشراء:{" "}
            <span className="font-semibold">{result.totalPrice}</span>
          </p>
          {result.commission && +result.commission > 0 ? (
            <p className="my-2">
              مجموع العمولات:{" "}
              <span className="font-semibold">{result.commission}</span>
            </p>
          ) : null}
        </div>
      )}
      <div className="h-32"></div>
    </Inner>
  );
}

function Form({ data, index, setData }) {
  return (
    <div className="flex items-center justify-center space-x-4 space-x-reverse">
      <div className="relative bg-white parent flex-1">
        <input
          value={data.price}
          dir="ltr"
          id={"price_" + index}
          name={"price"}
          inputMode="decimal"
          type="text"
          onChange={({ target: { value, name } }) => {
            value = ARToEN(value);
            if (!ValidateNumber(value) && value != "") return data[name];
            else if (+value > 999999999999) return data[name];
            setData((pre) => {
              let newData = [...pre];
              newData[index][name] = value;
              return newData;
            });
          }}
          className="input transition rounded-lg"
          placeholder=""
        />
        <label htmlFor={"price_" + index} className="label">
          سعر الشراء
        </label>
      </div>
      <div className="relative bg-white parent flex-1">
        <input
          value={data.count}
          dir="ltr"
          id={"count_" + index}
          name={"count"}
          inputMode="decimal"
          type="text"
          onChange={({ target: { value, name } }) => {
            value = ARToEN(value);
            if (!ValidateNumber(value) && value != "") return data[name];
            else if (+value > 999999999999) return data[name];
            setData((pre) => {
              let newData = [...pre];
              newData[index][name] = value;
              return newData;
            });
          }}
          className="input transition rounded-lg"
          placeholder=""
        />
        <label htmlFor={"count_" + index} className="label">
          عدد الاسهم
        </label>
      </div>
    </div>
  );
}
export const ValidateNumber = (name: string) =>
  /^\d+(?:\.\d{0,4})?$/.test(name);
