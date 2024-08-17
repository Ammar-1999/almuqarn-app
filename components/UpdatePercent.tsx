import { useRef, useCallback, memo, useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { ARToEN } from "./Form";
interface UpdatePercentProps {
  startCounter: string;
  index: number;
}
export default memo(function UpdatePercent({
  index,
  startCounter,
}: UpdatePercentProps) {
  const [counter, setCounter] = useState(startCounter || "");
  const timer = useRef<null | any>(null);
  const  setData  = useStore(useShallow((state) =>  state.setData));
  const stopInterval = useCallback(() => {
    if (!timer.current) return;
    clearTimeout(timer.current);
    timer.current = null;
    setData("percent", (+counter).toFixed(3), index);
  }, [timer, counter]);
  useEffect(() => {
    if(startCounter == "" && +counter !== 0) setCounter("")
  }, [startCounter])
  
  const startInterval = useCallback((type) => {
    let stop = false;
      setCounter((pre) => {
        let newVal = type === "inc" ? +pre + 1 : +pre - 1;
        if(newVal > 9999999) {
          stop = true
          setData("percent", "9999999", index);
          return "9999999"
        } else if(newVal < -9999999) {
          stop = true
          setData("percent", "-9999999", index);
          return "-9999999"
        } else {
          setData("percent", newVal, index);
          return newVal ?  newVal.toString() : ""
        }
      });
      if(stop) return
    updateNumber(type);
  }, [counter]);
  const updateNumber = useCallback((type) => {
    if (timer.current) return;
    let stop = false;
    let startTime = new Date();
    timer.current = setTimeout(function runIncrement() {
      setCounter((pre) => {
        let newVal = type === "inc" ? +pre + 1 : +pre - 1;
        if (newVal > 9999999) {
          stop = true;
          return "9999999";
        } else if (newVal < -9999999) {
          stop = true;
          return "-9999999";
        } else return newVal ?  newVal.toString() : ""
      });
      if (stop) return stopInterval();
      const n =
        40 +
        1 /
          Math.pow(
            1.1,
            (new Date().getTime() - startTime.getTime()) / 1000 -
              (2 * Math.log(5)) / Math.log(1.1)
          );
      timer.current = setTimeout(runIncrement, parseInt(n.toString()));
    }, 500);
  }, [timer, counter]);

  return (
    <>
      <button
        aria-label="إرتفاع السهم"
        type="button"
        className="w-14 border border-gray-300 cursor-pointer noSelect rounded-r-8 bg-second/15 flex justify-center items-center"
        onMouseUp={stopInterval}
        onMouseLeave={stopInterval}
        onTouchEnd={stopInterval}
        // @ts-ignore
        onMouseDown={() => !((navigator.maxTouchPoints || window.msMaxTouchPoints || navigator.msMaxTouchPoints > 0) || (window.DocumentTouch && document instanceof DocumentTouch) || window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(any-pointer: coarse)").matches) ?startInterval("inc")  :void 0}
        onTouchStart={() =>startInterval("inc")}
      >
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-second"
            d="M1.10687 11.2303H14.8945C15.0341 11.2298 15.1709 11.1921 15.2903 11.1212C15.4096 11.0503 15.5069 10.9489 15.5718 10.8278C15.6366 10.7068 15.6665 10.5707 15.6583 10.4343C15.65 10.2978 15.6039 10.1662 15.5249 10.0535L8.63109 0.303196C8.34538 -0.101065 7.65753 -0.101065 7.37105 0.303196L0.477238 10.0535C0.397442 10.1659 0.350648 10.2977 0.341939 10.4343C0.333231 10.571 0.362941 10.7074 0.427843 10.8287C0.492744 10.95 0.590354 11.0516 0.710068 11.1224C0.829782 11.1932 0.96702 11.2305 1.10687 11.2303Z"
          />
        </svg>
      </button>
      <div className="relative bg-white parent flex-1">
        <input
          style={{
            borderLeft: "0",
            borderRight: "0",
            paddingLeft: "1.6rem",
          }}
          value={counter || ""}
          dir="ltr"
          id={"percent_" + index}
          name="percent"
          inputMode="decimal"
          type="text"
          onChange={({ target: { value } }) => {
            value = ARToEN(value);
            if (!/^[-]?\d*(?:\.\d{0,4})?$/.test(value) && value != '') return counter;
            else if (+value > 9999999 || +value < -9999999) return counter;
            setCounter(value)
            setData("percent",value , index);
          }}
          className="input transition"
          placeholder=""
        />
        <span className="absolute percent top-1/2 left-0 translate-x-1/2 -translate-y-[45%] text-gray-500 z-[2]">
          %
        </span>
        <label htmlFor={"percent_" + index} className="label">
          نسبه الربح او الخسارة المئوية
        </label>
      </div>
      <button
        aria-label="نزول السهم"
        type="button"
        className="w-14 cursor-pointer select-none noSelect border border-gray-300 rounded-l-8 bg-first/15 flex justify-center items-center"
        onMouseUp={stopInterval}
        onMouseLeave={stopInterval}
        onTouchEnd={stopInterval}
        // @ts-ignore
        onMouseDown={() => !((navigator.maxTouchPoints || window.msMaxTouchPoints || navigator.msMaxTouchPoints > 0) || (window.DocumentTouch && document instanceof DocumentTouch) || window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(any-pointer: coarse)").matches) ?startInterval("dec")  :void 0}
        onTouchStart={() =>startInterval("dec")}
      >
        <svg
          className="rotate-180"
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-first"
            d="M1.10687 11.2303H14.8945C15.0341 11.2298 15.1709 11.1921 15.2903 11.1212C15.4096 11.0503 15.5069 10.9489 15.5718 10.8278C15.6366 10.7068 15.6665 10.5707 15.6583 10.4343C15.65 10.2978 15.6039 10.1662 15.5249 10.0535L8.63109 0.303196C8.34538 -0.101065 7.65753 -0.101065 7.37105 0.303196L0.477238 10.0535C0.397442 10.1659 0.350648 10.2977 0.341939 10.4343C0.333231 10.571 0.362941 10.7074 0.427843 10.8287C0.492744 10.95 0.590354 11.0516 0.710068 11.1224C0.829782 11.1932 0.96702 11.2305 1.10687 11.2303Z"
          />
        </svg>
      </button>
    </>
  );
});
