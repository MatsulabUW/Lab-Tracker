import { RefObject, useEffect } from "react";

export default function useOutsideClick(
  ref: RefObject<HTMLElement>,
  callback: ()=>void
) {
    const handleClick = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) { // e.target의 좌표가 Element (ref.current) 내 있나?
        callback()
      }
    }

    useEffect(() => { // when render
      document.addEventListener("click", handleClick);

      return () => { // when rerender
        document.removeEventListener("click", handleClick);
      };
    });
}