import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";

const KEY = "dathletic-theme";
const DARK = "dathletic-dark";

function readStored() {
  try {
    return localStorage.getItem(KEY) === DARK;
  } catch {
    return false;
  }
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(readStored);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, dark ? DARK : "dathletic");
    } catch {}
  }, [dark]);

  return (
    <label className="btn btn-ghost btn-circle swap swap-rotate" aria-label="Cambiar tema">
      <input
        type="checkbox"
        className="theme-controller"
        value={DARK}
        checked={dark}
        onChange={(e) => setDark(e.target.checked)}
      />
      <Icon name="sun" className="swap-off size-5" />
      <Icon name="moon" className="swap-on size-5" />
    </label>
  );
}
