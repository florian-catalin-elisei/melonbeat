import loader from "../assets/loader.svg";

export const Loader = ({ title }) => {
  return (
    <div className="flex flex-col h-96 items-center justify-center w-full">
      <img alt="Loader" className="w-16" src={loader} />
      <h1 className="font-bold">{title || "Loading..."}</h1>
    </div>
  );
};
