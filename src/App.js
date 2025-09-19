import { useState } from "react";
import { LC, NC, SC, UC } from "./Data/PassChar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let [uppercase, setuppercase] = useState(false);
  let [lowercase, setlowercase] = useState(false);
  let [number, setnumber] = useState(false);
  let [symbol, setsymbol] = useState(false);
  let [passwordlen, setpasswordlen] = useState(10);
  let [fPass, setPass] = useState("");

  function createPassword() {
    let finalPass = "";
    let charSet = "";

    if (uppercase || lowercase || number || symbol) {
      if (uppercase) charSet += UC;
      if (lowercase) charSet += LC;
      if (number) charSet += NC;
      if (symbol) charSet += SC;

      for (let i = 0; i < passwordlen; i++) {
        finalPass += charSet.charAt(Math.floor(Math.random() * charSet.length));
      }
      setPass(finalPass);
    } else {
      toast.error("⚠️ Please select at least one option!");
    }
  }

  let copyPass = () => {
    if (!fPass) {
      toast.error("⚠️ Nothing to copy!");
      return;
    }
    navigator.clipboard.writeText(fPass);
    toast.success("📋 Password copied!");
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            🔑 Password Generator
          </h2>

          {/* Password Display */}
          <div className="flex items-center mb-6">
            <input
              type="text"
              readOnly
              value={fPass}
              className={`flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none font-mono text-lg
                ${
                  fPass
                    ? "bg-gradient-to-r from-pink-500 via-orange-400 via-yellow-400 to-red-500 text-transparent bg-clip-text font-extrabold tracking-wider"
                    : "text-gray-700"
                }`}
            />
            <button
              className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              onClick={copyPass}
            >
              Copy
            </button>
          </div>

          {/* Password Length */}
          <div className="mb-4 flex justify-between items-center">
            <label className="font-medium">Password Length</label>
            <input
              type="number"
              value={passwordlen}
              onChange={(event) => setpasswordlen(event.target.value)}
              max={20}
              min={10}
              className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            <label className="flex items-center justify-between">
              Include Upper Case
              <input
                type="checkbox"
                checked={uppercase}
                onChange={() => setuppercase(!uppercase)}
                className="w-5 h-5 accent-blue-600"
              />
            </label>

            <label className="flex items-center justify-between">
              Include Lower Case
              <input
                type="checkbox"
                checked={lowercase}
                onChange={() => setlowercase(!lowercase)}
                className="w-5 h-5 accent-blue-600"
              />
            </label>

            <label className="flex items-center justify-between">
              Include Numbers
              <input
                type="checkbox"
                checked={number}
                onChange={() => setnumber(!number)}
                className="w-5 h-5 accent-blue-600"
              />
            </label>

            <label className="flex items-center justify-between">
              Include Symbols
              <input
                type="checkbox"
                checked={symbol}
                onChange={() => setsymbol(!symbol)}
                className="w-5 h-5 accent-blue-600"
              />
            </label>
          </div>

          {/* Generate Button */}
          <button
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
            onClick={() => {
              createPassword();
              if (uppercase || lowercase || number || symbol) {
                toast.success("🎉 Password created!");
              }
            }}
          >
            Generate Password
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
  