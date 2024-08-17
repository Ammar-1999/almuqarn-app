import { useStore } from "@/lib/store";
import { useEffect } from "react";

function Error({ statusCode }) {
  const clearAll = useStore((state) => state.clearAll);
  useEffect(() => {
    clearAll()
  }, [])
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
