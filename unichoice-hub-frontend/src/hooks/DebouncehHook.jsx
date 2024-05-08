import { useEffect, useState } from "react";

const DebounceHook = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const handler = setTimeout(() => {
    setDebouncedValue(value);
  }, delay);

  useEffect(() => {
    clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default DebounceHook;
