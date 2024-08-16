export default function Loader() {
  return (
    <div className="loader bg-white p-5 rounded-full flex space-x-3 justify-center">
      <div className="w-5 h-5 bg-primary rounded-full animate-bounce"></div>
      <div className="w-5 h-5 bg-primary rounded-full animate-bounce"></div>
      <div className="w-5 h-5 bg-primary rounded-full animate-bounce"></div>
    </div>
  );
}
