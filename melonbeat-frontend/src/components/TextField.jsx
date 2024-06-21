export const TextField = ({ className, label, placeholder, type, value, setValue, accept }) => {
  return (
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      <label className="font-semibold" htmlFor={label}>
        {label}
      </label>
      <input
        className="border border-black border-solid p-3 rounded"
        id={label}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        accept={accept}
      />
    </div>
  );
};
