import { useRef, useCallback, memo, useState } from "react";
import { useStore } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
interface updateStocks {
  startCounter: number;
  index: number;
  pointer?: number;
}
export default memo(function updateStocks({
  index,
  startCounter,
  pointer,
}: updateStocks) {
  const [counter, setCounter] = useState({ start: 0, all: +startCounter || 0 });
  const timer = useRef<null | any>(null);
  const { setCount, setDataGoals } = useStore(useShallow((state) => ({
    setCount: state.setCount,
    setDataGoals: state.setDataGoals,
  })));
  const stopInterval = useCallback(
    (type) => {
      if (!counter.start) return;
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      setCounter((pre) => {
        if (!isNaN(pointer!)) {
          setDataGoals("sold", parseInt(pre.all.toString()), pointer, index);
        }
        setCount(pre.start, index,type);
        return { ...pre, start: 0 };
      });
    },
    [timer, counter]
  );
  const startInterval = useCallback(
    (type) => {
      let stop = false;
      setCounter((pre) => {
        let newVal = type === "inc" ? pre.all + 1 : pre.all - 1;
        if (newVal >= 999999999999 || newVal < 0) {
          stop = true;
          return { start: 0, all: 0 };
        } else return { start: pre.start + 1 , all: newVal };
      });
      if (stop) {
        stopInterval(type)
        return;
      }
      updateNumber(type);
    },
    [counter]
  );
  const updateNumber = useCallback(
    (type) => {
      if (timer.current) return;
      let startTime = new Date();
      let stop = false;
      timer.current = setTimeout(function runIncrement() {
        setCounter((pre) => {
          let newVal = type === "inc" ? pre.all + 1 : pre.all - 1;
          if (newVal >= 999999999999 || newVal < 0) {
            stop = true;
            return { ...pre, all: 0 };
          } else
            return {
              start: pre.start + 1,
              all: newVal,
            };
        });
        if (stop) return stopInterval(type);
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
    },
    [timer, counter]
  );

  return (
    <>
      <button
        aria-label={"زيادة عدد الاسهم"}
        type="button"
        onMouseUp={() => stopInterval("inc")}
        onMouseLeave={() => stopInterval("inc")}
        onTouchEnd={() => stopInterval("inc")}
        onMouseDown={() => (!isTouch() ? startInterval("inc") : void 0)}
        onTouchStart={() => startInterval("inc")}
        className="font-medium text-lg rounded-full border border-gray-400 h-8 w-8 flex justify-center cursor-pointer"
      >
        +
      </button>
      <span className="">{counter.all.toLocaleString("en-US")}</span>
      <button
        aria-label={"تنقيص عدد الاسهم"}
        type="button"
        onMouseUp={() => stopInterval("dec")}
        onMouseLeave={() => stopInterval("dec")}
        onTouchEnd={() => stopInterval("dec")}
        onMouseDown={() => (!isTouch() ? startInterval("dec") : void 0)}
        onTouchStart={() => startInterval("dec")}
        className="font-medium text-lg rounded-full border border-gray-400 h-8 w-8 flex justify-center cursor-pointer"
      >
        -
      </button>
    </>
  );
});

function isTouch() {
  return (
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
