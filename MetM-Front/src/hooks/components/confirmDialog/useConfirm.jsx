// src/hooks/components/confirmDialog/useConfirm.js
//=====================================
import { useState, useCallback } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";

export function useConfirm() {
  const [options, setOptions] = useState(null);
  const [promiseInfo, setPromiseInfo] = useState(null);

  const confirm = useCallback(
    ({
      title,
      message,
      confirmLabel = "Confirmer",
      cancelLabel = "Annuler",
    }) => {
      return new Promise((resolve, reject) => {
        setOptions({ title, message, confirmLabel, cancelLabel });
        setPromiseInfo({ resolve, reject });
      });
    },
    []
  );

  const handleConfirm = () => {
    promiseInfo?.resolve();
    setOptions(null);
    setPromiseInfo(null);
  };
  const handleCancel = () => {
    promiseInfo?.reject();
    setOptions(null);
    setPromiseInfo(null);
  };

  const ConfirmUI = () =>
    options ? (
      <ConfirmDialog
        isOpen={true}
        title={options.title}
        message={options.message}
        confirmLabel={options.confirmLabel}
        cancelLabel={options.cancelLabel}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    ) : null;

  return { confirm, ConfirmUI };
}
