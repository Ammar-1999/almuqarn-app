import Inner from "@/components/Inner";
import { ARToEN } from "@/components/Form";
import { useCommission } from "@/lib/store";
import { useRouter } from "next/router";
import Head from "next/head";
export default function Home(): JSX.Element {
  const route = useRouter();
  const [totalCommission, clearCommission] = useCommission((state) => [
    state.totalCommission,
    state.clearCommission,
  ]);

  return (
    <Inner>
      <Head>
        <title>المقارن | العمولات</title>
      </Head>
      <div className="w-screen h-14 bg-white/70 backdrop-blur-xl not-suport-glass text-gray-950 fixed z-10 font-medium text-center top-0 px-8 xs:px-0">
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
            العمولات
          </h1>
        </div>
      </div>
      <div className="login mt-32 mb-6 relative max-w-lg mx-auto bg-white py-8 px-6 xs:px-8 rounded-2xl shadow shadow-gray-300">
        <div className="flex flex-col space-y-6 transition ">
          {[
            { name: "commission", label: "نسبة العمولة" },
            { name: "market", label: "نسبة هيئة سوق العمل" },
            { name: "tax", label: "نسبة الضريبة" },
          ].map((e, i) => (
            <Form key={i} name={e.name} label={e.label} />
          ))}
        </div>
        <p className="relative mt-8 text-gray-800 text-lg">
          مجموع نسبة العمولات:{" "}
          <span className="font-semibold text-gray-900">
            {totalCommission.toLocaleString("en-US", {
              maximumFractionDigits: 5,
            })}
          </span>
        </p>
        <button
          className="w-full btn_second h-full py-2 mt-4"
          type="button"
          aria-label="إستعادة الإعدادات الافتراضية"
          onClick={() => clearCommission()}
        >
          إستعادة الإعدادات الافتراضية
        </button>
      </div>
    </Inner>
  );
}

function Form({ name, label }) {
  const [commissions, setCommission] = useCommission((state) => [
    state.commissions,
    state.setCommission,
  ]);
  return (
    <div className="relative">
      <input
        value={
          name == "commission" &&
          commissions[name] != "" &&
          commissions.market != ""
            ? +commissions[name] + +commissions.market
            : commissions[name]
        }
        dir="ltr"
        id={name}
        name={name}
        inputMode="decimal"
        type="text"
        style={{
          paddingLeft: "1.6rem",
        }}
        onChange={({ target: { value, name } }) => {
          value = ARToEN(value);
          if (!/^[-]?\d*(?:\.\d{0,4})?$/.test(value) && value != "")
            return commissions[name];
          else if (+value > 9999999 || +value < -9999999)
            return commissions[name];
          if (name == "commission" && commissions.market != "")
            setCommission("market", "");
          setCommission(name, value);
        }}
        className="input transition rounded-lg"
        placeholder=""
      />
      <span className="absolute percent top-1/2 left-0 translate-x-1/2 -translate-y-[45%] text-gray-500 z-[2]">
        %
      </span>
      <label htmlFor={name} className="label">
        {label}
      </label>
    </div>
  );
}
export const ValidateNumber = (name: string) =>
  /^\d+(?:\.\d{0,4})?$/.test(name);
