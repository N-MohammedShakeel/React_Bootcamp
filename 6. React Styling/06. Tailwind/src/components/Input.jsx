export default function Input({ label, invalid, ...props }) {
  // Base Tailwind classes
  let labelClasses = "block mb-2 text-xs font-bold tracking-wide uppercase";
  let inputClasses = "w-full px-3 py-2 leading-tight border rounded shadow";

  // Dynamic Tailwind styles based on "invalid"
  if (invalid) {
    labelClasses += " text-red-400"; // invalid label color
    inputClasses += " text-red-500 bg-red-100 border-red-300"; // invalid input styles
  } else {
    labelClasses += " text-stone-300"; // normal label color
    inputClasses += " text-gray-700 bg-stone-300"; // normal input styles
  }

  return (
    <p>
      <label className={labelClasses}>{label}</label>
      <input className={inputClasses} {...props} />
    </p>
  );
}
