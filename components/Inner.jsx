import { m } from "framer-motion";
export default function Inner({ children }) {
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {children}
    </m.div>
  );
}
