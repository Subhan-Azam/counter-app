import React, { useEffect, useState } from "react";
import Drop_down from "../drop_down/drop_down";
import axios from "axios";
import { IoMdSwap } from "react-icons/io";

export default function Currency_converter() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Currencies -> https://api.frankfurter.app/currencies

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
      setToCurrency(Object.keys(data)[0]);
    } catch (error) {
      console.log("error==>", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  console.log("currencies==>", currencies);

  // Conversion -> https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
  const currencyCovertBtn = async () => {
    if (!amount) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency] * amount);
    } catch (error) {
      console.log("error==>", error);
    } finally {
      setLoading(false);
    }
  };

  const swapHandler = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="container max-w-[700px] md:mx-auto p-6 rounded-md bg-white shadow-md">
      <div className="text-center text-3xl font-bold text-gray-700 mb-4">
        Currency Converter
      </div>
      <div className="mb-4 flex flex-row  flex-wrap items-end gap-2">
        <Drop_down
          title="From"
          currencies={currencies}
          currency={fromCurrency}
          setCurrency={setFromCurrency}
        />
        {/* <p className="flex items-center justify-center">Swap</p> */}
        <button
          onClick={swapHandler}
          className="p-2 w-full md:w-12 flex justify-center items-center "
        >
          <IoMdSwap className="text-xl" />
        </button>

        <Drop_down
          title="To"
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
        />
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-md text-gray-600" htmlFor="amount">
          Amount:
        </label>
        <input
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-2 border-2 border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          type="number"
          placeholder="Enter amount"
        />
      </div>

      <button
        onClick={currencyCovertBtn}
        className={`mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300
        ${loading ? "animate-pulse" : ""}
        `}
      >
        Convert
      </button>
      {convertedAmount && (
        <div className="text-right mt-3 text-green-700 font-extrabold">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
}
