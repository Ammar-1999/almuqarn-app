import Inner from "@/components/Inner";
import { useStore } from "@/lib/store";
import { AnimatePresence, motion, m } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { useRouter } from "next/navigation";
const slideIn = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  enter: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      delay: 1 + i * 0.1,
    },
  }),
  exit: { scale: 0.8, opacity: 0 },
};
export default function Page() {
  const route = useRouter();
  const { save, deleteSave } = useStore(
    useShallow((state) => ({
      save: state.save,
      deleteSave: state.deleteSave,
    }))
  );
  if (!save) return null;
  return (
    <Inner>
      <Head>
        <title>المقارن | المحفوظات</title>
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
            المحفوظات
          </h1>
        </div>
      </div>
      <div className="relative max-w-lg mx-auto leading-6 font-medium text-lg bg-bg pt-32 pb-20 min-h-screen">
        {save.length === 0 && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-center"
          >
            لايوجد محفوظات
          </m.div>
        )}
        <div className="space-y-[2px] mt-6">
          <AnimatePresence>
            {save.map((e, i) => (
              <motion.div
                layout
                variants={slideIn}
                custom={i}
                initial="initial"
                animate="enter"
                exit="exit"
                transition={{ type: "spring", duration: 0.5 }}
                key={JSON.stringify(e)}
                className="w-full space-x-3 space-x-reverse flex items-center max-w-2xl first:rounded-t-2xl last:rounded-b-2xl mx-auto bg-white shadow-xl duration-300 transition-[border-radius]"
              >
                <Link
                  className="p-4 flex-1 truncate"
                  href={"/?onlinData=" + encodeURIComponent(JSON.stringify(e))}
                >
                  {e.reduce(
                    (acc, curr) => acc + (acc ? " - " : "") + curr.name,
                    ""
                  )}
                </Link>
                <svg
                  onClick={() => deleteSave(i)}
                  className="px-4 cursor-pointer"
                  width="3.3rem"
                  height="3.3rem"
                  viewBox="0 0 55 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="stroke-first"
                    d="M20 24.3333L21.3333 37.6666"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M33.3333 24.3333L32 37.6666"
                    className="stroke-first"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M49.3336 11H4"
                    className="stroke-first"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 11C12.149 11 12.2235 11 12.2911 10.9983C14.4869 10.9426 16.4241 9.54643 17.1713 7.48085C17.1942 7.41731 17.2178 7.34664 17.2649 7.20525L17.5238 6.42856C17.7448 5.76555 17.8553 5.43403 18.0019 5.15253C18.5867 4.02952 19.6686 3.24971 20.919 3.05005C21.2323 3 21.5819 3 22.2808 3H31.0525C31.7515 3 32.1011 3 32.4144 3.05005C33.6648 3.24971 34.7467 4.02952 35.3315 5.15253C35.4781 5.43403 35.5885 5.76555 35.8096 6.42856L36.0685 7.20525C36.1155 7.34645 36.1392 7.41736 36.1621 7.48085C36.9093 9.54643 38.8464 10.9426 41.0424 10.9983C41.1099 11 41.1843 11 41.3333 11"
                    className="stroke-first"
                    strokeWidth="4"
                  />
                  <path
                    className="fill-first"
                    d="M10.6623 17.867C10.5888 16.7649 9.63577 15.931 8.53367 16.0045C7.43153 16.078 6.59764 17.031 6.67113 18.1331L7.907 36.671C8.13497 40.0918 8.31913 42.8547 8.75105 45.023C9.20012 47.2771 9.96391 49.1601 11.5415 50.6358C13.1191 52.1118 15.0485 52.7486 17.3276 53.0467C19.5197 53.3334 22.289 53.3334 25.7172 53.3334H28.0607C31.489 53.3334 34.258 53.3334 36.4503 53.0467C38.7292 52.7486 40.6588 52.1118 42.2364 50.6358C43.814 49.1601 44.5778 47.2771 45.0268 45.023C45.4586 42.8547 45.6428 40.0918 45.8708 36.671L47.1068 18.1331C47.1802 17.031 46.3463 16.078 45.2442 16.0045C44.142 15.931 43.189 16.7649 43.1156 17.867L41.889 36.2646C41.6495 39.859 41.4786 42.3598 41.1039 44.2414C40.7402 46.0667 40.2327 47.0329 39.5036 47.715C38.7746 48.3969 37.7767 48.8393 35.9314 49.0806C34.029 49.3294 31.5223 49.3334 27.9202 49.3334H25.8578C22.2556 49.3334 19.7488 49.3294 17.8464 49.0806C16.0011 48.8393 15.0033 48.3969 14.2742 47.715C13.5451 47.0329 13.0376 46.0667 12.674 44.2414C12.2991 42.3598 12.1284 39.859 11.8888 36.2646L10.6623 17.867Z"
                  />
                </svg>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="w-full h-10 fixed z-10 py-3 font-semibold text-first text-center text-lg bottom-0 bg-white">
        اعلان
      </div>
    </Inner>
  );
}
