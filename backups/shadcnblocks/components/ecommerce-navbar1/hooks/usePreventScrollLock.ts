import { useLayoutEffect } from "react";

const usePreventScrollLock = (open: boolean) => {
  useLayoutEffect(() => {
    if (!open) return;

    const handler = (e: Event) => {
      if (document.body.getAttribute("data-scroll-locked") === "1") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const eventTypes: Array<keyof WindowEventMap> = ["wheel", "touchmove"];

    const options: AddEventListenerOptions = {
      capture: true,
      passive: false,
    };

    eventTypes.forEach((type) => {
      window.addEventListener(type, handler, options);
    });

    return () => {
      eventTypes.forEach((type) => {
        window.removeEventListener(type, handler, options);
      });
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;

    const body = document.body;

    body.setAttribute("data-radix-scroll-lock-ignore", "");
    body.style.overflow = "auto";

    return () => {
      body.removeAttribute("data-radix-scroll-lock-ignore");
      body.style.removeProperty("overflow");
    };
  }, [open]);
};

export default usePreventScrollLock;
