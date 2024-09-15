import { AnimatePresence,m } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import {
  Root as AlertDialogRoot,
  Portal as AlertDialogPortal,
  Overlay as AlertDialogOverlay,
  Content as AlertDialogContent,
  Title as AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Dialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const addParams = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      router.push(
        process.env.NEXT_PUBLIC_URL + pathname + "?" + params.toString(),
        {
          scroll: false,
        }
      );
    },
    [searchParams]
  );
  const deleteParams = useCallback(
    (name) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      router.push(
        process.env.NEXT_PUBLIC_URL + pathname + "?" + params.toString(),
        {
          scroll: false,
        }
      );
    },
    [searchParams]
  );
  useEffect(() => {
    if (searchParams.get("share") && !open) setOpen(true);
    else if (!searchParams.get("share") && open) setOpen(false);
  }, [searchParams, open]);
  return (
    <AlertDialogRoot
      open={open}
      onOpenChange={(param) =>
        param ? addParams("share", "a") : deleteParams("share")
      }
    >
      <AnimatePresence>
        {open && (
          <AlertDialogPortal forceMount>
            <AlertDialogOverlay asChild>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 bottom-0 right-0 z-[60] backdrop-blur-sm bg-white/20 not-overlay-glass"
              />
            </AlertDialogOverlay>
            <AlertDialogContent asChild>
              <div
                onClick={() => deleteParams("share")}
                className="noSelect fixed z-[70] w-full p-4 overflow-x-hidden overflow-y-auto top-0 left-0 bottom-0 right-0 max-h-full"
              >
                <AlertDialogTitle className="sr-only">
                  مشاركة المُقارنة
                </AlertDialogTitle>
                <m.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`relative max-h-full m-auto h-full flex justify-center items-center`}
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="noSelect relative bg-white rounded-lg shadow max-w-md min-w-[350px] w-full"
                  >
                    <button
                      aria-label="اغلاق"
                      onClick={() => deleteParams("share")}
                      type="button"
                      className="absolute m-2 text-gray-400 bg-gray-200/30 hover:text-gray-900 rounded-full text-sm w-8 h-8 inline-flex justify-center items-center"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-5 pb-4 pt-8 lg:px-8 text-center">
                      <h1 className="text-second font-semibold text-lg">
                        مشاركة المُقارنة
                      </h1>
                      <div className="flex justify-center my-2 h-11">
                        <a
                          href={`https://wa.me/?text=${
                            encodeURIComponent(searchParams.get("share") || "")
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="active:scale-[0.93] focus:scale-[0.93] hover:bg-opacity-90 transition ease-out"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-label="WhatsApp"
                            role="img"
                            viewBox="0 0 512 512"
                            width="44px"
                            height="44px"
                            fill="#000000"
                          >
                            <rect
                              width="512"
                              height="512"
                              rx="15%"
                              fill="#25d366"
                            />
                            <path
                              fill="#25d366"
                              stroke="#ffffff"
                              strokeWidth="26"
                              d="M123 393l14-65a138 138 0 1150 47z"
                            />
                            <path
                              fill="#ffffff"
                              d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"
                            />
                          </svg>
                        </a>
                        <div className="w-6" />
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${
                            encodeURIComponent(searchParams.get("share") || "")
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="active:scale-[0.93] focus:scale-[0.93] hover:bg-opacity-90 transition ease-out"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-label="Facebook"
                            role="img"
                            viewBox="0 0 512 512"
                            width="44px"
                            height="44px"
                            fill="#000000"
                          >
                            <rect
                              width="512"
                              height="512"
                              rx="15%"
                              fill="#1877f2"
                            />
                            <path
                              d="M355.6 330l11.4-74h-71v-48c0-20.2 9.9-40 41.7-40H370v-63s-29.3-5-57.3-5c-58.5 0-96.7 35.4-96.7 99.6V256h-65v74h65v182h80V330h59.6z"
                              fill="#ffffff"
                            />
                          </svg>
                        </a>
                      </div>
                      <p className="text-gray-700 text-sm">أو</p>
                      <div className="flex my-2">
                        <input
                          type="text"
                          dir="ltr"
                          aria-describedby="helper-text-explanation"
                          className="bg-gray-50 border border-s-0 border-gray-300 text-gray-500 text-sm block w-full p-2.5 rounded-r-lg"
                          value={
                            encodeURIComponent(searchParams.get("share") || "")
                          }
                          readOnly
                          disabled
                        />
                        {navigator.clipboard?.writeText && (
                          <button
                            onClick={() => {
                              try {
                                navigator.clipboard.writeText(
                                  encodeURIComponent(searchParams.get("share") || "")
                                );
                                toast.success("تم النسخ");
                              } catch (_) {
                                toast.success("تم النسخ");
                              }
                            }}
                            data-tooltip-target="tooltip-website-url"
                            data-copy-to-clipboard-target="website-url"
                            className="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white bg-second rounded-l-lg hover:opacity-90 focus:opacity-90 duration-300"
                            type="button"
                          >
                            <span id="default-icon">
                              <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 20"
                              >
                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                              </svg>
                            </span>
                            <span className="inline-block pr-2">نسخ</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </m.div>
              </div>
            </AlertDialogContent>
          </AlertDialogPortal>
        )}
      </AnimatePresence>
    </AlertDialogRoot>
  );
}
