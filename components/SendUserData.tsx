import { useStore, useUserData } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
async function wait(time: number) {
  return new Promise((res) => setTimeout(() => res(""), time));
}
export default function SendUserData() {
  const { appErrors, setAppErrors } = useStore(useShallow((state) => ({
    appErrors: state.appErrors,
    setAppErrors: state.setAppErrors,
  })));
  const { userData, setUserData } = useUserData(useShallow((state) => ({
    userData: state.userData,
    setUserData: state.setUserData,
  })));
  useEffect(() => {
    if (!userData || !appErrors) return;
    setUserData({ times: true });
    let interval = setInterval(() => setUserData({ time: true }), 10000);
    if (
      typeof window !== "undefined" &&
      typeof navigator !== "undefined" &&
      !userData.name.id
    )
      setUserData({
        name: "name",
        val: {
          id: Math.random().toString(),
          platform: navigator?.platform,
          userAgent: navigator.userAgent,
        },
      });

    const sendError = async (retries = 0) => {
      try {
        const { addDoc, getFirestore, collection } = await import(
          "@firebase/firestore/lite"
        );
        const { app } = await import("@/lib/firebas");
        const db = getFirestore(app);
        await addDoc(collection(db, "Errors"), appErrors);
        setAppErrors({});
      } catch (_) {
        await wait(5000);
        if (retries > 0) return sendError(retries - 1);
      }
    };
    const sendUser = async (retries = 0) => {
      try {
        const { setDoc, getFirestore, doc } = await import(
          "@firebase/firestore/lite"
        );
        const { app } = await import("@/lib/firebas");
        const db = getFirestore(app);
        await setDoc(
          doc(db, "userData", userData.name.id || Math.random().toString()),
          userData
        );
        setUserData({ update: true, val: Date.now() + 86400000 * 2 });
      } catch (_) {
        await wait(5000);
        if (retries > 0) return sendUser(retries - 1);
      }
    };
    if (appErrors.error_message) sendError(20);
    if (userData.update < Date.now() && userData.name.id) sendUser(20);
    return () => clearInterval(interval)
  }, []);
  return null;
}
