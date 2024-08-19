import { twMerge } from "tailwind-merge";

export default function Loader({
  containerClassess,
  dotClassess,
  dotCount = 3,
}: any) {
  const items = [];
  for (let i = 0; i < dotCount; i++) {
    items.push(i);
  }

  return (
    <div
      className={twMerge(
        "loader bg-white p-5 rounded-full flex space-x-3 justify-center",
        containerClassess
      )}
    >
      {items.map((v) => (
        <div
          key={v}
          className={twMerge(
            "w-5 h-5 bg-primary rounded-full animate-bounce",
            dotClassess
          )}
        />
      ))}
    </div>
  );
}
