import React from "react";

export default function Drop_down({
  currencies,
  currency,
  setCurrency,
  title = "",
}) {
  return (
    <form className="container w-[280px] mx-auto">
      <label htmlFor={title} for="underline_select" className="sr-only">
        {title}
      </label>
      {/* <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        id="underline_select"
        className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-black dark:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
      >
        {currencies?.map((currency) => {
          return (
            <option value={currency} key={currency}>
              {currency}
            </option>
          );
        })}
      </select> */}

      <input
        list="currencies"
        type="text"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        id="underline_select"
        className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-black dark:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
      />
      <datalist id="currencies">
        {currencies?.map((currency) => {
          return (
            <option value={currency} key={currency}>
              {currency}
            </option>
          );
        })}
      </datalist>
    </form>
  );
}
