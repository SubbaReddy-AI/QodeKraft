import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

function Button({
  children,
  to,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick
}) {
  const classes = `btn btn-${variant} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        <span>{children}</span>
        <ArrowUpRight size={17} />
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        <span>{children}</span>
        <ArrowUpRight size={17} />
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      <span>{children}</span>
      <ArrowUpRight size={17} />
    </button>
  );
}

export default Button;