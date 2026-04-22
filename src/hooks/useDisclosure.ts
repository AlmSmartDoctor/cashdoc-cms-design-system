import { useCallback, useState } from "react";

export type UseDisclosureReturn = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  onOpenChange: (next: boolean) => void;
};

export function useDisclosure(initialOpen = false): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const onOpenChange = useCallback((next: boolean) => setIsOpen(next), []);

  return { isOpen, open, close, toggle, onOpenChange };
}
