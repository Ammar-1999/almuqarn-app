import { useEffect, useState } from "react";
import DialogTip from "./ui/DialogTip";
import { useStore } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";

export default function FirstTip({ title, description, button, button2 }) {
  const { tips, setTips } = useStore(
    useShallow((state) => ({
      tips: state.tips,
      setTips: state.setTips,
    }))
  );
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    if (tips.firstTip) setShow(true);
  }, [tips]);
  if (!show) return null;
  return (
    <DialogTip
      isOpen={isOpen}
      setIsOpen={(e) => {
        setIsOpen(e)
        setTips("firstTip")
      }}
      title={title}
      description={description}
      button={button}
      button2={button2}
    />
  );
}
