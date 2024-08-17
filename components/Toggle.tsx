import { useStore } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import Switch from "react-switch";
import { useCommission } from "@/lib/store";
import { useEffect, useState } from "react";
import DialogTip from "./ui/DialogTip";
export default function Toggle() {
  const [setCommission, commissions] = useCommission((state) => [
    state.setCommission,
    state.commissions,
  ]);
  const [tips, setTips] = useStore(
    useShallow((state) => [state.tips, state.setTips])
  );
  
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    if (tips.commissions) setShow(true);
  }, [tips.commissions]);
  return (
    <>
      {show && !commissions.on && (
        <DialogTip
          isOpen={isOpen}
          setIsOpen={(e) => {
            setIsOpen(e);
            setTips("commissions")
          }}
          title="تعديل العمولات"
          description="يمكنك تعديل الضريبة والعمولة بالذهاب الى المزيد ثم العمولات"
          button2="حسنا"
          button={false}
        />
      )}
      <Switch
      activeBoxShadow="0 0 2px 3px #137333"
        aria-label="العمولات"
        className="scale-75"
        onColor="#137333"
        checkedIcon={false}
        uncheckedIcon={false}
        onChange={() => setCommission("on", !commissions.on)}
        checked={commissions.on}
      />
    </>
  );
}
