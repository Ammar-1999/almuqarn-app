import { ErrorBoundary } from "react-error-boundary";
import { useStore, useUserData } from "@/lib/store";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
export default function ErrorBound({ children }) {
  return (
    <ErrorBoundary FallbackComponent={FallbackRender}>{children}</ErrorBoundary>
  );
}
function FallbackRender({ error }) {
  const { setDataOnline, setAppErrors,clearAll } = useStore(useShallow((state) => ({
    setDataOnline: state.setDataOnline,
    setAppErrors: state.setAppErrors,
    clearAll: state.clearAll,
  })));
  useEffect(() => {
    clearAll()
  }, [])
  const userData = useUserData((state) => state.userData);
  const router = useRouter();
  useEffect(() => {
    async function sendError() {
      toast.error("حدث خطاء في معالجة البيانات", { duration: 10000 });
      try {
        if (
          typeof error.message == "string" &&
          typeof error.stack == "string"
        ) {
          const { addDoc, getFirestore, collection } = await import(
            "@firebase/firestore/lite"
          );
          const { app } = await import("@/lib/firebas");
          const db = getFirestore(app);
          await addDoc(collection(db, "Errors"), {
            error_message: error.message.slice(0, 600),
            error_stack: error.stack.slice(0, 600),
            userData,
          });
        }
      } catch (_) {
        setAppErrors({
          error_message: error.message.slice(0, 600),
          error_stack: error.stack.slice(0, 600),
          userData,
        });
      }
      setDataOnline([
        {
          name: "الشركة أ",
          price: "",
          count: "",
          goals: [{ price: "", sold: "", time: "" }],
          percent: "",
        },
      ]);

      router.refresh();
      router.replace("/", { scroll: false });
      window.location = "/";
    }
    sendError();
  }, []);

  return <></>;
}
