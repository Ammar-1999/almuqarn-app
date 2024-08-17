import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function Loading({ children }) {
  // const [update, setUpdate] = useState(false);
  const [loading, setloading] = useStore(
    useShallow((state) => [state.loading, state.setloading])
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      let data = JSON.parse(window.localStorage.getItem("storage") || "{}");
      if (data.state?.loading) setloading();
    }
  }, [loading]);
  // useEffect(() => {
  //   function handelMessage(e) {
  //     setUpdate(true);
  //     if (e.data?.clear) localStorage.clear();
  //     location.reload();
  //   }
  //   navigator.serviceWorker.addEventListener('message', handelMessage);
  //   return () =>
  //     navigator.serviceWorker?.removeEventListener("message", handelMessage);
  // }, [typeof window]);
  if (loading /* || update */) return <></>;
  return <>{children}</>;
}
