export default function SeachField() {
  return (
    <label className="relative block w-1/3 m-5">
      <span className="sr-only">Search</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <img
          src="/lupa.png"
          alt="Logo empresa"
          className="h-5 w-5 fill-slate-300"
        />
      </span>
      <input
        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Buscar projeto..."
        type="text"
        name="search"
      />
    </label>
  );
}
