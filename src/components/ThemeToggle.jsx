import Icon from "./Icon.jsx";
import { KEYS, usePersistentState } from "../lib/storage.js";

const LIGHT = "dathletic";
const DARK = "dathletic-dark";
const isTheme = (v) => v === LIGHT || v === DARK;

export default function ThemeToggle() {
  const [theme, setTheme] = usePersistentState(KEYS.theme, LIGHT, isTheme);

  return (
    <label className="btn btn-ghost btn-circle swap swap-rotate" aria-label="Cambiar tema">
      <input
        type="checkbox"
        className="theme-controller"
        value={DARK}
        checked={theme === DARK}
        onChange={(e) => setTheme(e.target.checked ? DARK : LIGHT)}
      />
      <Icon name="sun" className="swap-off size-5" />
      <Icon name="moon" className="swap-on size-5" />
    </label>
  );
}
