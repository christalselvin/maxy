import { useRef } from "react";
import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
  MouseEvent as ReactMouseEvent,
} from "react";
import "../../Styles/bubbly-button.css";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type Props = ButtonProps | LinkProps;

const Button = (props: Props) => {
  const { children, variant = "primary", className = "" } = props;

  const classes = `bubbly-button ${
    variant === "ghost" ? "bubbly-ghost" : ""
  } ${className}`;

  // ✅ LINK VERSION
  if ("href" in props) {
    const { href, ...anchorProps } = props as LinkProps;

    return (
      <a href={href} {...anchorProps} className={classes}>
        {children}
      </a>
    );
  }

  // ✅ BUTTON VERSION
  const { onClick, ...buttonProps } = props as ButtonProps;

  const ref = useRef<HTMLButtonElement | null>(null);

  const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;

    el.classList.remove("animate");
    el.offsetWidth;
    el.classList.add("animate");

    if (onClick) onClick(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      {...buttonProps}
      onClick={handleClick}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;
