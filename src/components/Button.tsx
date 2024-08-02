import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ButtonProps extends Props {
  title: string;
  isSmall?: boolean;
}

const Button = ({
  title,
  isSmall = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={` border border-[#c0bdbd] bg-white p-2 rounded-xl text-[#79B6DD] font-bold hover:bg-slate-50 ${
        isSmall ? "py-1" : "w-full"
      } ${className}`}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
