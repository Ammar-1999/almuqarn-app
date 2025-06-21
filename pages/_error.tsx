import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

function Error({ statusCode }) {
  const clearAll = useStore(useShallow((state) => state.clearAll));
  useEffect(() => {
    clearAll();
  }, []);
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
