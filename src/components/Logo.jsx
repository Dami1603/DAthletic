import { Link } from "react-router";

const sizes = {
  sm: { img: "size-9", text: "text-lg" },
  md: { img: "size-12", text: "text-xl" },
};

/** Logo completo: imagen de marca (PNG sin fondo) + "DAthletic". */
export default function Logo({ size = "md", className = "" }) {
  const s = sizes[size];
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`} aria-label="DAthletic, inicio">
      <img src="/logo.png" alt="" className={`shrink-0 object-contain ${s.img}`} />
      <span className={`font-extrabold tracking-tight ${s.text}`}>
        <span className="text-primary">DA</span>thletic
      </span>
    </Link>
  );
}
