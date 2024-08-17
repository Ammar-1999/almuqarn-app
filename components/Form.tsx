import { useStore } from "@/lib/store";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ValidateText } from "@/lib/validation";
import { useEffect, useRef, useState } from "react";
import UpdatePercent from "@/components/UpdatePercent";
const INPUTE_MAX_CHAR = "لقد وصلت الحد المسموح به";
const INPUTE_MAX_GOALS = "لايمكن تجاوز مجموع الاسهم المُشتراه";
const ONLY_NUMBER = "مسموح بأرقام فقط";
const INPUTE_INVALIED = "هذا الحرف غير مسموح به";

export default function Form({ data, index, inputErr, setDataError }) {
  const { setData, setDataGoals, clear, addDataGoals, deleteDataGoal } =
    useStore((state) => ({
      setData: state.setData,
      setDataGoals: state.setDataGoals,
      clear: state.clear,
      addDataGoals: state.addDataGoals,
      deleteDataGoal: state.deleteDataGoal,
    }));
  const inputTitle = useRef<HTMLInputElement>(null);
  const [changeTitle, setChangeTitle] = useState(false);

  useEffect(() => {
    if (changeTitle) inputTitle.current?.focus();
  }, [changeTitle]);
  if (data?.length == 0 || inputErr?.length == 0) return null;
  return (
    <>
      <div className="login relative max-w-lg mx-auto mb-10 mt-5 bg-white pb-8 pt-6 px-6 xs:px-8 rounded-2xl shadow shadow-gray-300">
        <div className="flex flex-col space-y-6 transition ">
          <div className="flex items-center relative mb-2">
            {changeTitle ? (
              <>
                <input
                  onBlur={({ target: { name } }) => {
                    setChangeTitle(false);
                    if (inputErr[name])
                      setDataError((pre) => ({ ...pre, [name]: false }));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.keyCode === 13) {
                      setChangeTitle(false);
                      if (inputErr.name)
                        setDataError((pre) => ({ ...pre, name: false }));
                    }
                  }}
                  ref={inputTitle}
                  value={data?.name}
                  id={"name_" + index}
                  name="name"
                  type="text"
                  autoComplete="off"
                  autoCorrect="off"
                  onChange={({ target: { value, name } }) => {
                    let newVal = ValidateText(value, 25);
                    if (value.length > 25) {
                      setDataError((pre) => ({
                        ...pre,
                        [name]: INPUTE_MAX_CHAR,
                      }));
                      return data.name;
                    } else if (newVal != value) {
                      setDataError((pre) => ({
                        ...pre,
                        [name]: INPUTE_INVALIED,
                      }));
                      return data.name;
                    } else if (inputErr[name])
                      setDataError((pre) => ({ ...pre, [name]: false }));
                    setData("name", newVal, index);
                  }}
                  className="select-none max-w-[75%] border-none active:!border-none bg-transparent text-2xl py-1 font-bold outline-none leading-[34px]"
                  placeholder=""
                />
                <InputError err={inputErr.name} />
              </>
            ) : (
              <>
                <h3
                  title={data?.name}
                  className="max-w-[75%] overflow-auto noScroll w-fit text-2xl font-bold pl-2 py-1 leading-[34px]"
                >
                  {data?.name}
                </h3>
                <svg
                  onClick={() => setChangeTitle((pre) => !pre)}
                  className="cursor-pointer mx-1"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.6011 2.25589C16.6247 1.27958 15.0419 1.27957 14.0656 2.25589L12.6657 3.65572L6.0774 10.244C5.9706 10.3508 5.89484 10.4847 5.8582 10.6312L5.02487 13.9645C4.95387 14.2485 5.03708 14.5489 5.24406 14.7558C5.45105 14.9628 5.75145 15.0461 6.03544 14.9751L9.36874 14.1418C9.51532 14.1051 9.64907 14.0293 9.7559 13.9225L16.2963 7.38215L17.7441 5.93439C18.7204 4.95808 18.7204 3.37517 17.7441 2.39886L17.6011 2.25589ZM15.2441 3.43439C15.5695 3.10896 16.0972 3.10896 16.4226 3.43439L16.5656 3.57737C16.891 3.90281 16.891 4.43045 16.5656 4.75588L15.7185 5.60298L14.4223 4.25616L15.2441 3.43439ZM13.2436 5.43488L14.5397 6.78171L8.74065 12.5808L6.97863 13.0213L7.41912 11.2593L13.2436 5.43488ZM3.33332 6.66663C3.33332 6.20639 3.70642 5.83329 4.16666 5.83329H8.33332C8.79357 5.83329 9.16665 5.4602 9.16665 4.99996C9.16665 4.53973 8.79357 4.16663 8.33332 4.16663H4.16666C2.78595 4.16663 1.66666 5.28592 1.66666 6.66663V15.8333C1.66666 17.214 2.78595 18.3333 4.16666 18.3333H13.3333C14.7141 18.3333 15.8333 17.214 15.8333 15.8333V11.6666C15.8333 11.2064 15.4602 10.8333 15 10.8333C14.5397 10.8333 14.1667 11.2064 14.1667 11.6666V15.8333C14.1667 16.2935 13.7936 16.6666 13.3333 16.6666H4.16666C3.70642 16.6666 3.33332 16.2935 3.33332 15.8333V6.66663Z"
                    fill="#6B7280"
                  />
                </svg>
              </>
            )}
            <button
              onClick={() => clear(index)}
              aria-label={index === 0 ? "محو" : "حذف"}
              type="button"
              className="block hover:bg-opacity-90 focus:bg-opacity-90 rounded-lg transition ease-out border border-first text-first active:scale-[.95] mr-auto py-1 px-3 text-sm leading-normal"
            >
              {index === 0 ? "محو" : "حذف"}
            </button>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative bg-white parent flex-1">
              <input
                value={data?.price || ""}
                dir="ltr"
                id={"price_" + index}
                name="price"
                inputMode="decimal"
                type="text"
                onBlur={({ target: { name } }) =>
                  inputErr[name]
                    ? setDataError((pre) => ({ ...pre, [name]: false }))
                    : void 0
                }
                onChange={({ target: { value, name } }) => {
                  value = ARToEN(value);
                  if (!ValidateNumber(value) && value != "") {
                    setDataError((pre) => ({ ...pre, [name]: ONLY_NUMBER }));
                    return data[name];
                  } else if (+value > 999999999999) {
                    setDataError((pre) => ({
                      ...pre,
                      [name]: INPUTE_MAX_CHAR,
                    }));
                    return data[name];
                  } else if (inputErr[name])
                    setDataError((pre) => ({ ...pre, [name]: false }));
                  setData(name, value, index);
                }}
                className="input transition rounded-lg"
                placeholder=""
              />
              <label htmlFor={"price_" + index} className="label">
                سعر الشراء <span className="text-first">*</span>
              </label>
              <InputError err={inputErr.price} />
            </div>
            <div className="w-4"></div>
            <div className="relative bg-white parent flex-1">
              <input
                dir="ltr"
                id={"count_" + index}
                onBlur={({ target: { name } }) =>
                  inputErr[name]
                    ? setDataError((pre) => ({ ...pre, [name]: false }))
                    : void 0
                }
                name="count"
                inputMode="decimal"
                type="text"
                className="input transition rounded-lg"
                value={data?.count}
                placeholder=""
                onChange={({ target: { value, name } }) => {
                  value = ARToEN(value);
                  if (!ValidateNumber(value) && value != "") {
                    setDataError((pre) => ({ ...pre, [name]: ONLY_NUMBER }));
                    return data[name];
                  } else if (+value > 999999999999) {
                    setDataError((pre) => ({
                      ...pre,
                      [name]: INPUTE_MAX_CHAR,
                    }));
                    return data[name];
                  } else if (inputErr[name])
                    setDataError((pre) => ({ ...pre, [name]: false }));
                  setData(name, int(value), index);
                }}
              />
              <label htmlFor={"count_" + index} className="label">
                عدد الاسهم <span className="text-first">*</span>
              </label>
              <InputError err={inputErr.count} />
            </div>
          </div>
          {data?.goals.map((e, i) => (
            <div
              className={`flex py-2 justify-center relative${
                data?.goals.length > 1 ? " ml-[21px] xxs:ml-[32px]" : ""
              }`}
              key={i}
            >
              <div
                className={`relative bg-white parent ${
                  data?.goals.length > 1 ? "flex-[.65]" : "flex-1"
                } `}
              >
                <input
                  value={e.price}
                  dir="ltr"
                  style={{
                    padding: data?.goals.length > 1 ? "8px 4px" : "8px 12px",
                  }}
                  id={"goal_" + i + index}
                  onBlur={({ target: { name } }) =>
                    inputErr.goals[name]
                      ? setDataError((pre) => ({
                          ...pre,
                          goals: { ...pre.goals, [name]: false },
                        }))
                      : void 0
                  }
                  name={"price"}
                  inputMode="decimal"
                type="text"
                  onChange={({ target: { value, name } }) => {
                    value = ARToEN(value);
                    if (!ValidateNumber(value) && value != "") {
                      setDataError((pre) => ({
                        ...pre,
                        goals: { ...pre.goals, [name]: ONLY_NUMBER },
                      }));
                      return data.goals[i][name];
                    } else if (+value > 999999999999) {
                      setDataError((pre) => ({
                        ...pre,
                        goals: { ...pre.goals, [name]: INPUTE_MAX_CHAR },
                      }));
                      return data.goals[i][name];
                    } else if (inputErr.goals[name])
                      setDataError((pre) => ({
                        ...pre,
                        goals: { ...pre.goals, [name]: false },
                      }));
                    setDataGoals(name, value, i, index);
                  }}
                  className={`input transition h-full ${
                    data.goals.length === 1 ? "rounded-lg" : "rounded-r-8"
                  }`}
                  placeholder=""
                />
                <label htmlFor={"goal_" + i + index} className="label">
                  الهدف {i + 1}{" "}
                  {data?.goals.length > 1 && (
                    <span className="text-first">*</span>
                  )}
                </label>
                <InputError err={inputErr.goals.price} />
              </div>
              {data?.goals.length > 1 && (
                <div className="relative bg-white parent flex-1">
                  <input
                    value={e.sold}
                    dir="ltr"
                    id={"sold_" + i + index}
                    onBlur={({ target: { name } }) =>
                      inputErr.goals[name]
                        ? setDataError((pre) => ({
                            ...pre,
                            goals: { ...pre.goals, [name]: false },
                          }))
                        : void 0
                    }
                    name={"sold"}
                    inputMode="decimal"
                type="text"
                    onChange={({ target: { value, name } }) => {
                      if (!ValidateNumber(value) && value != "") {
                        setDataError((pre) => ({
                          ...pre,
                          goals: { ...pre.goals, [name]: ONLY_NUMBER },
                        }));
                        return data.goals[i][name];
                      } else if (+value > 999999999999) {
                        setDataError((pre) => ({
                          ...pre,
                          goals: { ...pre.goals, [name]: INPUTE_MAX_CHAR },
                        }));
                        return data.goals[i][name];
                      } else if (
                        value != "" &&
                        data.goals.reduce(
                          (acc, cur, j) => (j == i ? acc : acc + +cur.sold),
                          0
                        ) +
                          +value >
                          data.count
                      ) {
                        setDataError((pre) => ({
                          ...pre,
                          goals: { ...pre.goals, [name]: INPUTE_MAX_GOALS },
                        }));
                        return data.goals[i][name];
                      } else if (inputErr.goals[name])
                        setDataError((pre) => ({
                          ...pre,
                          goals: { ...pre.goals, [name]: false },
                        }));
                      setDataGoals(name, int(value), i, index);
                    }}
                    className="input transition rounded-l-8 h-full"
                    placeholder=""
                  />
                  <label htmlFor={"sold_" + i + index} className="label">
                    الكمية المباعة
                  </label>
                  <InputError err={inputErr.goals.sold} />
                </div>
              )}
              <div className="w-4"></div>
              <Menu
                as="div"
                className="relative inline-block text-left parent flex-1"
              >
                <MenuButton className="flex rotate_arrow w-full justify-between h-full items-center rounded-lg bg-white px-3 py-2 text-gray-500 focus:shadow hover:shadow border border-gray-300 noSelect">
                  <span>{e.time ? e.time : "المدة المتوقعة"}</span>
                  <svg
                    className=""
                    width="13"
                    height="13"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="stroke-gray-600"
                      d="M1.5 5L9 12.5L16.5 5"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute left-0 z-10 mt-2 min-w-fit whitespace-nowrap origin-top-left rounded-lg text-gray-600 bg-white shadow-md transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1 text-right w-full min-w-fit whitespace-nowrap">
                    <MenuItem>
                      <div
                        className="noSelect min-w-fit whitespace-nowrap block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 cursor-pointer"
                        onClick={() => setDataGoals("time", "لحظي", i, index)}
                      >
                        لحظي <span className="text-gray-500">(1-6 ساعات)</span>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div
                        className="block noSelect min-w-fit whitespace-nowrap px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 cursor-pointer"
                        onClick={() => setDataGoals("time", "يومي", i, index)}
                      >
                        يومي <span className="text-gray-500">(1-5 ايام)</span>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div
                        className="block noSelect min-w-fit whitespace-nowrap px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 cursor-pointer"
                        onClick={() => setDataGoals("time", "اسبوعي", i, index)}
                      >
                        اسبوعي{" "}
                        <span className="text-gray-500">(اسبوعين - شهر)</span>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div
                        className="block noSelect min-w-fit whitespace-nowrap px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 cursor-pointer"
                        onClick={() => setDataGoals("time", "شهري", i, index)}
                      >
                        شهري{" "}
                        <span className="text-gray-500">(شهر - شهر ونص)</span>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div
                        className="block noSelect min-w-fit whitespace-nowrap px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 cursor-pointer"
                        onClick={() => setDataGoals("time", "", i, index)}
                      >
                        غير محدد
                      </div>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
              {data?.goals.length > 1 && (
                <svg
                  onClick={() => deleteDataGoal(index, i)}
                  className="absolute -left-[21px] top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <path
                    fill="#ff0000"
                    d="M352 480h320a32 32 0 1 1 0 64H352a32 32 0 0 1 0-64z"
                  />
                  <path
                    fill="#ff0000"
                    d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
                  />
                </svg>
              )}
            </div>
          ))}
          {data?.goals.length < 4 && (
            <div
              style={{
                background: `url("data:image/svg+xml,%3csvg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23E5E7EBFF' stroke-width='3' stroke-dasharray='10' stroke-dashoffset='23' stroke-linecap='square'/%3e%3c/svg%3e")`,
              }}
              onClick={() => addDataGoals(index)}
              className="noSelect py-2 text-gray-300 w-full h-14 rounded-lg cursor-pointer flex flex-col justify-center items-center active:scale-[.95] focus:shadow transition hover:shadow"
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
              <p className="text-gray-500">إضافه هدف</p>
            </div>
          )}
          <div className="flex justify-center">
            <UpdatePercent index={index} startCounter={data?.percent} />
          </div>
        </div>
      </div>
      <div className="flex max-w-3xl px-2 my-3 md:px-4 w-full mx-auto justify-center items-center text-first text-center text-lg font-semibold h-4">
        اعلان
      </div>
    </>
  );
}

export function InputError({ err }) {
  return (
    <span className="z-[1] hidden inputError text-first absolute select-none text-xs pt-[1px] pr-3 bottom-0 right-0 translate-y-full">
      {err || ""}
    </span>
  );
}
export function Message({ children, err }) {
  return (
    <div className={`note_sort text-gray-800`}>
      <div className="h-12 w-full"></div>
      <div className={`relative animate-search ${err ? "!pt-7" : ""}`}>
        <ul>{children}</ul>
      </div>
    </div>
  );
}

export const ValidateNumber = (name: string) =>
  /^\d+(?:\.\d{0,4})?$/.test(name);

const int = (num: string) => (parseInt(num) ? parseInt(num).toString() : "");

export function ARToEN(str: string | number) {
  if (str == "" || (typeof str !== "string" && typeof str !== "number"))
    return "";
  const ARNums = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const ENNums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return str.toString().replace(/[٠-٩]/g, (n) => ENNums[ARNums.indexOf(n)]);
}