import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import Toast from "../components/Toast";

type ToastOptions = {
  message: string;
  actionLabel?: string;
  action?: () => void;
  duration?: number; // ms
};

type ToastContextType = {
  showToast: (opts: ToastOptions) => void;
  hideToast: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastOptions | null>(null);
  const [visible, setVisible] = useState(false);
  const timerRef = React.useRef<number | undefined>(undefined);

  const hideToast = useCallback(() => {
    setVisible(false);
    // small delay to allow animation
    window.setTimeout(() => setToast(null), 300);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const showToast = useCallback((opts: ToastOptions) => {
    setToast(opts);
    setVisible(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    const duration = opts.duration ?? 4000;
    timerRef.current = window.setTimeout(() => {
      setVisible(false);
      window.setTimeout(() => setToast(null), 300);
      timerRef.current = undefined;
    }, duration);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast toast={toast} visible={visible} onClose={hideToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export default ToastContext;
