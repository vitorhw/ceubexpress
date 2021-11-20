import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({ from, to }) {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = value.toFixed(0);
      }
    });

    return () => controls.stop();
  }, [from, to]);

  return <span ref={nodeRef} />;
}
