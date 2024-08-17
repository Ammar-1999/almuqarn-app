import { useEffect, useState, useCallback } from "react";
import { Drawer } from "vaul";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import UpdateStocks from "@/components/updateStocks";
import dynamic from "next/dynamic";
const Charts = dynamic(() => import("@/components/Charts"), {
  ssr: false,
});
const Dialog = dynamic(() => import("@/components/ui/Dialog"), {
  ssr: false,
});
import { useCommission, useStore } from "@/lib/store";
export default function Result() {
  const [totalCommission, commissions] = useCommission((state) => [
    state.totalCommission,
    state.commissions,
  ]);
  const { data, setSave, save, unSave } = useStore((state) => ({
    data: state.data,
    unSave: state.unSave,
    setSave: state.setSave,
    save: state.save,
  }));
  const [dialog, setDialog] = useState(false);
  const [commissionIn, setCommissionIn] = useState([]);
  const [commissionOut, setCommissionOut] = useState({});
  const [open, setOpen] = useState(false);
  const [checkSave, setCheckSave] = useState(false);
  const [totalGoals, setTotalGoals] = useState<any>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (data && data.length !== 0 && searchParams.get("data")) {
      let check = save.some((e) => JSON.stringify(e) === JSON.stringify(data));
      if (check && !checkSave) setCheckSave(true);
      else if (!check && checkSave) setCheckSave(false);
    }
  }, [searchParams, data, save]);

  const addParams = useCallback(
    (name, value) => {
      if (searchParams.get("data")) {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);
        router.push(
          process.env.NEXT_PUBLIC_URL + pathname + "?" + params.toString(),
          {
            scroll: false,
          }
        );
      }
    },
    [searchParams]
  );
  const deleteParams = useCallback(
    (name) => {
      if (searchParams.get("data")) {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(name);
        router.push(
          process.env.NEXT_PUBLIC_URL + pathname + "?" + params.toString(),
          {
            scroll: false,
          }
        );
      }
    },
    [searchParams]
  );
  useEffect(() => {
    setCommissionIn(() => {
      let check = false;
      let newData = data.map((e) => {
        if (!commissions.on) return;
        let commissionOut = +(
          +e.price *
          (+totalCommission / 100) *
          +e.count
        ).toFixed(3);
        if (commissionOut) check = true;
        return (
          <div
            title={commissionOut.toString()}
            key={e.name + "_commissionOut"}
            className="overflow-auto noScroll flex-1 py-2 select-text text-center bg-gray-100"
          >
            {commissionOut ? commissionOut.toLocaleString("en-US") : "-"}
          </div>
        );
      });
      return check ? newData : [];
    });
  }, [data]);

  useEffect(() => {
    if (searchParams.get("data") && !open) setOpen(true);
    else if (!searchParams.get("data") && open) setOpen(false);
  }, [searchParams, open]);

  if (data?.length === 0) return null;
  return (
    <Drawer.Root
      shouldScaleBackground
      open={open}
      onOpenChange={(param) =>
        param ? addParams("data", "open") : deleteParams("data")
      }
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed top-0 left-0 right-0 bottom-0 bg-black/40 z-10" />
        <Drawer.Content className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px]">
          <Drawer.Description className="sr-only">الناتج</Drawer.Description>
          <Drawer.Title className="sr-only">الناتج</Drawer.Title>
          {dialog && <Dialog />}
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-4 mt-3" />
          <div className="flex min-h-fit max-w-3xl px-2 md:px-4 w-full mx-auto justify-between">
            <svg
              className="cursor-pointer p-1"
              onClick={() => setOpen(false)}
              width="29px"
              height="29px"
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
            <svg
              onClick={() =>
                checkSave ? unSave(data) : setSave(JSON.stringify(data))
              }
              className="cursor-pointer p-1 duration-300"
              width="29"
              height="29"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={`duration-300 ${
                  checkSave ? "fill-second" : "fill-transparent"
                }`}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.04 3H13.2933C8.73333 3 5 6.73333 5 11.2933V41.5866C5 45.4533 7.77333 47.08 11.16 45.2133L21.64 39.3733C22.76 38.76 24.5733 38.76 25.6933 39.3733L36.1733 45.2133C39.56 47.08 42.3333 45.4533 42.3333 41.5866V11.2933C42.3333 6.73333 38.6 3 34.04 3ZM25.6667 21.32H29C30.0933 21.32 31 20.4133 31 19.32C31 18.2266 30.0933 17.32 29 17.32H25.6667V13.9867C25.6667 12.8933 24.76 11.9867 23.6667 11.9867C22.5733 11.9867 21.6667 12.8933 21.6667 13.9867V17.32H18.3333C17.24 17.32 16.3333 18.2266 16.3333 19.32C16.3333 20.4133 17.24 21.32 18.3333 21.32H21.6667V24.6533C21.6667 25.7466 22.5733 26.6533 23.6667 26.6533C24.76 26.6533 25.6667 25.7466 25.6667 24.6533V21.32Z"
                fill="#3D1B1B"
              />
              <path
                className={`duration-300 ${
                  checkSave ? "fill-transparent" : "fill-second"
                }`}
                d="M29 21.32H25.6667V24.6533C25.6667 25.7466 24.76 26.6533 23.6667 26.6533C22.5733 26.6533 21.6667 25.7466 21.6667 24.6533V21.32H18.3333C17.24 21.32 16.3333 20.4133 16.3333 19.32C16.3333 18.2266 17.24 17.32 18.3333 17.32H21.6667V13.9867C21.6667 12.8933 22.5733 11.9867 23.6667 11.9867C24.76 11.9867 25.6667 12.8933 25.6667 13.9867V17.32H29C30.0933 17.32 31 18.2266 31 19.32C31 20.4133 30.0933 21.32 29 21.32Z"
              />
              <path
                className="stroke-second"
                d="M42.3333 10.2933V40.5867C42.3333 44.4534 39.56 46.0801 36.1733 44.2134L25.6934 38.3734C24.5734 37.7601 22.76 37.7601 21.64 38.3734L11.16 44.2134C7.77333 46.0801 5 44.4534 5 40.5867V10.2933C5 5.73331 8.73331 2 13.2933 2H34.04C38.6 2 42.3333 5.73331 42.3333 10.2933Z"
                stroke="#292D32"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              onClick={async () => {
                try {
                  // @ts-ignore
                  if (navigator.share)
                    navigator.share({
                      title: data.map((e) => e.name).join(" - "),
                      url: `${
                        process.env.NEXT_PUBLIC_URL + pathname
                      }?onlinData=${encodeURI(JSON.stringify(data))}`,
                    });
                  else {
                    setDialog(true);
                    addParams(
                      "share",
                      `${
                        process.env.NEXT_PUBLIC_URL + pathname
                      }?onlinData=${encodeURI(JSON.stringify(data))}`
                    );
                  }
                } catch (_) {
                  setDialog(true);
                  addParams(
                    "share",
                    `${
                      process.env.NEXT_PUBLIC_URL + pathname
                    }?onlinData=${encodeURI(JSON.stringify(data))}`
                  );
                }
              }}
              className="cursor-pointer p-1"
              width="31px"
              height="31px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-second"
                d="M13.803 5.33333C13.803 3.49238 15.3022 2 17.1515 2C19.0008 2 20.5 3.49238 20.5 5.33333C20.5 7.17428 19.0008 8.66667 17.1515 8.66667C16.2177 8.66667 15.3738 8.28596 14.7671 7.67347L10.1317 10.8295C10.1745 11.0425 10.197 11.2625 10.197 11.4872C10.197 11.9322 10.109 12.3576 9.94959 12.7464L15.0323 16.0858C15.6092 15.6161 16.3473 15.3333 17.1515 15.3333C19.0008 15.3333 20.5 16.8257 20.5 18.6667C20.5 20.5076 19.0008 22 17.1515 22C15.3022 22 13.803 20.5076 13.803 18.6667C13.803 18.1845 13.9062 17.7255 14.0917 17.3111L9.05007 13.9987C8.46196 14.5098 7.6916 14.8205 6.84848 14.8205C4.99917 14.8205 3.5 13.3281 3.5 11.4872C3.5 9.64623 4.99917 8.15385 6.84848 8.15385C7.9119 8.15385 8.85853 8.64725 9.47145 9.41518L13.9639 6.35642C13.8594 6.03359 13.803 5.6896 13.803 5.33333Z"
              />
            </svg>
          </div>
          <div className="flex max-w-3xl px-2 my-3 md:px-4 w-full mx-auto justify-center items-center text-first text-center text-lg font-semibold h-4">
            اعلان
          </div>
          <div className="max-w-3xl px-2 pb-4 md:px-4 w-full mx-auto flex flex-col overflow-auto scroll rounded-t-[10px]">
            <div className="space-y-[2px] mt-6">
              <div className="flex justify-center w-full space-x-[1px] space-x-reverse max-w-3xl mx-auto bg-white rounded-t-xl shadow-sm overflow-hidden">
                <div className="flex flex-1 py-2 justify-center items-center bg-gray-100"></div>
                {data.map((e) => (
                  <div
                    title={e.name}
                    className="flex-1 py-2 select-text text-center bg-gray-100 font-semibold overflow-auto noScroll"
                    key={e.name + "_name"}
                  >
                    {e.name}
                  </div>
                ))}
              </div>
              {commissionIn.length > 0 && (
                <div
                  className={`flex justify-center w-full space-x-[1px] space-x-reverse max-w-3xl mx-auto bg-white shadow-sm overflow-hidden`}
                >
                  <div className="flex-1 py-2 text-start justify-center items-center bg-gray-100 font-semibold">
                    <p className="px-2">عمولة الشراء</p>
                  </div>
                  {commissionIn.map((e) => e)}
                </div>
              )}
              {Object.keys(commissionOut).length !== 0 && (
                <div className="flex justify-center w-full space-x-[1px] space-x-reverse max-w-3xl mx-auto bg-white rounded-b-xl shadow-sm overflow-hidden">
                  <div className="flex-1 py-2 text-start justify-center items-center bg-gray-100 font-semibold">
                    <p className="px-2">عمولة البيع</p>
                  </div>
                  {data.map((e, i) => (
                    <div
                      title={commissionOut[e.name]}
                      key={i + "_commissionOut"}
                      className="overflow-auto noScroll flex-1 py-2 select-text text-center bg-gray-100"
                    >
                      {commissionOut[e.name] ? commissionOut[e.name] : "-"}
                    </div>
                  ))}
                </div>
              )}
              <div
                className={`flex justify-center w-full space-x-[1px] space-x-reverse max-w-3xl mx-auto bg-white shadow-sm overflow-hidden${
                  Object.keys(totalGoals).length !== 0 ? "" : " rounded-b-xl"
                }`}
              >
                <div className="flex-1 py-2 text-start justify-center items-center bg-gray-100 font-semibold">
                  <p className="px-2">إجمالي التكلفة</p>
                </div>
                {data.map((e) => {
                  let totalCoast =
                    (+e.price *
                      ((commissions.on ? +totalCommission : 0) / 100) +
                      +e.price) *
                    +e.count;
                  return (
                    <div
                      title={totalCoast.toString()}
                      key={e.name + "_number"}
                      className="overflow-auto noScroll flex-1 py-2 select-text text-center bg-gray-100"
                    >
                      {totalCoast.toLocaleString("en-US") || "-"}
                    </div>
                  );
                })}
              </div>
              {Object.keys(totalGoals).length !== 0 && (
                <div className="flex justify-center w-full space-x-[1px] space-x-reverse max-w-3xl mx-auto bg-white rounded-b-xl shadow-sm overflow-hidden">
                  <div className="flex-1 py-2 text-start justify-center items-center bg-gray-100 font-semibold">
                    <p className="px-2">صافي ارباح الاهداف</p>
                  </div>
                  {data.map((e, i) => (
                    <div
                      title={totalGoals[e.name]}
                      key={i + "_totalGoals"}
                      className="overflow-auto noScroll flex-1 py-2 select-text text-center bg-gray-100"
                    >
                      {totalGoals[e.name]
                        ? (+totalGoals[e.name]).toLocaleString("en-US")
                        : "-"}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-7">
              <h3 className="text-2xl font-semibold ">عدد الأسهم</h3>
              {data.map((e, i) => (
                <div className="mt-4" key={e.name + "_stocks"}>
                  <h5 className="text-lg font-medium">{e.name}</h5>
                  <div className="flex space-x-2 space-x-reverse justify-around mt-1 overflow-auto scroll">
                    {e.goals.length === 1 && +e.goals[0].sold == 0 ? (
                      <div className="flex justify-center items-center space-x-3 space-x-reverse">
                        <UpdateStocks index={i} startCounter={e.count} />
                      </div>
                    ) : (
                      e.goals.map((e, j) => (
                        <div className="" key={i + j + "_stocks_goal"}>
                          <p className="text-center mb-1">الهدف {j + 1}</p>
                          <div className="flex justify-center items-center space-x-3 space-x-reverse">
                            <UpdateStocks
                              index={i}
                              startCounter={e.sold}
                              pointer={j}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
            {data.some((e) => +e?.percent) && (
              <div className="mt-7">
                <div className="flex relative items-center space-x-2 space-x-reverse group ">
                  <h3 className="text-2xl font-semibold ">
                    صافي النسبة المئوية
                  </h3>
                  <svg
                    className="mt-1"
                    width="18px"
                    height="18px"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M50 64C45.4766 64 41.6667 67.8099 41.6667 72.3333C41.6667 76.8567 45.4766 80.6667 50 80.6667C54.5234 80.6667 58.3334 76.8567 58.3334 72.3333C58.3334 67.8099 54.5234 64 50 64Z"
                      className="fill-gray-600"
                    />
                    <path
                      className="fill-gray-600"
                      d="M46.3478 18.5644C39.9537 19.974 34.8211 25.0939 33.5481 31.6806C33.3819 32.5402 33.3867 33.4241 33.5621 34.2819C33.7376 35.1396 34.0803 35.9544 34.5706 36.6798C35.061 37.4051 35.6894 38.0267 36.42 38.5091C37.1506 38.9916 37.9691 39.3254 38.8287 39.4915C39.6883 39.6576 40.5722 39.6528 41.4299 39.4773C42.2876 39.3019 43.1024 38.9592 43.8277 38.4688C44.5529 37.9785 45.1745 37.3501 45.657 36.6195C46.1394 35.8889 46.4732 35.0705 46.6393 34.2109C46.9383 32.6636 48.187 31.5849 49.7613 31.5136C51.3355 31.4423 52.6763 32.4036 53.114 33.9175C53.5518 35.4314 52.931 36.9602 51.5615 37.7401C50.9794 38.0867 50.4535 38.5201 50.002 39.0252C50.0018 39.0254 50.0016 39.0255 50.0014 39.0257C44.4973 42.5272 41.5306 48.9659 42.4454 55.4249C42.6933 57.1755 43.6265 58.7559 45.0396 59.8185C46.4528 60.8811 48.2302 61.3387 49.9808 61.0909C50.8476 60.9681 51.6818 60.6759 52.4357 60.2307C53.1896 59.7856 53.8485 59.1963 54.3746 58.4965C54.9008 57.7968 55.2839 57.0002 55.5022 56.1524C55.7206 55.3045 55.7697 54.422 55.6469 53.5551C55.4612 52.2435 56.0404 50.9864 57.1581 50.2754C57.6715 49.9476 58.1376 49.551 58.5434 49.0967C64.9437 45.2192 68.0109 37.4354 65.9228 30.2139C63.7931 22.8487 56.8169 17.8467 49.1578 18.1937C48.2004 18.2371 47.2613 18.363 46.3478 18.5644Z"
                    />
                    <path
                      className="stroke-gray-600"
                      d="M50 96C24.5949 96 4 75.4053 4 50C4 24.5949 24.5949 4 50 4C75.4053 4 96 24.5949 96 50C96 75.4053 75.4053 96 50 96Z"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="absolute opacity-0 -z-10 -translate-y-[90%] right-0 top-0 max-w-sm w-[80%] px-3 py-2 rounded-lg bg-white shadow-md text-sm duration-300 group-hover:opacity-100 group-hover:z-10 group-hover:-translate-y-[110%]">
                    صافي النسبة المئوية سواءً في حال الارتفاع أو الهبوط تعتمد
                    على إجمالي قيمة الأسهم، مثال : إجمالي قيمة الأسهم 100 في حال
                    ارتفع السهم ١٠٪ فإن صافي الربح النسبة المئوية يكون 10 وهكذا
                    مع الهبوط (يمكنك تغيير النسبة المئوية)
                  </div>
                </div>
                <div className="flex space-x-2 space-x-reverse justify-around mt-4 overflow-auto scroll">
                  {data.map((e, i) => {
                    if (!e.percent || +e.percent == 0) return null;
                    let percent =
                      (e.percent / 100) *
                      ((e.price - ((commissions.on ? +totalCommission : 0) / 100) * e.price) *
                        e.count);
                    return (
                      <div
                        className={`flex items-center px-4 space-x-3 space-x-reverse py-2 rounded-lg text-center ${
                          e.percent > 0 ? "bg-second/15" : "bg-first/15"
                        }`}
                        key={i + "_percent"}
                      >
                        <p className={`font-semibold xs:font-medium`}>
                          {e.name}
                        </p>
                        <div
                          className={`font-semibold xs:font-medium ${
                            e.percent > 0 ? "text-second" : "text-first"
                          }`}
                        >
                          <p dir="ltr">
                            {e.percent > 0 ? "+" : ""}
                            {(+e.percent).toLocaleString("en-US")}%
                          </p>
                          <p dir="ltr">
                            {e.percent > 0 ? "+" : ""}
                            {percent.toLocaleString("en-US")}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <Charts
              setTotalGoals={setTotalGoals}
              setCommissionOut={setCommissionOut}
            />
          </div>
          <div className="flex max-w-3xl px-2 my-3 md:px-4 w-full mx-auto justify-center items-center text-first text-center text-lg font-semibold h-4">
            اعلان
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
