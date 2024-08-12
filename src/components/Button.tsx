import { twMerge } from "tailwind-merge";

export default function Button({ text, className }: any) {
  return (
    <div
      className={twMerge(
        "h-14 bg-primary w-full opacity-90 rounded-[0.5rem] text-white text-xl  text-center flex items-center justify-center font-bold",
        className
      )}
    >
      {text}
    </div>
  );
}
