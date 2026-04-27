import { useEffect, useRef, type RefObject } from "react";

/**
 * Hook to detect clicks outside a ref element
 * Closes the dropdown when clicking outside
 */
export function useClickOutside<T extends HTMLElement>(
  handler: () => void,
  ref: RefObject<T | null>
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handler, ref]);
}

/**
 * Hook to handle keyboard navigation
 * Escape to close, Enter to select, Arrow keys navigation
 */
export function useKeyboardNavigation(
  isOpen: boolean,
  onClose: () => void,
  onSelect?: (index: number) => void,
  currentIndex: number = -1,
  itemCount: number = 0
) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          onClose();
          event.preventDefault();
          break;
        case "ArrowDown":
          if (onSelect && itemCount > 0) {
            const newIndex = (currentIndex + 1) % itemCount;
            onSelect(newIndex);
            event.preventDefault();
          }
          break;
        case "ArrowUp":
          if (onSelect && itemCount > 0) {
            const newIndex = currentIndex <= 0 ? itemCount - 1 : currentIndex - 1;
            onSelect(newIndex);
            event.preventDefault();
          }
          break;
        case "Enter":
          if (onSelect && currentIndex >= 0) {
            onSelect(currentIndex);
            event.preventDefault();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onSelect, currentIndex, itemCount]);
}

/**
 * Hook to lock body scroll when modal/dropdown is open
 */
export function useLockScroll(shouldLock: boolean) {
  useEffect(() => {
    if (!shouldLock) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [shouldLock]);
}