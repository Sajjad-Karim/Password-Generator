import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()_+=-|}{[];:/?";
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, setPassword, numberAllowed, charAllowed]);
  const copy = useRef(null);
  const CopyPassword = useCallback(() => {
    copy.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">password generator</h1>
        <div className="flex rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none  w-full py-1 px-3"
            placeholder="password"
            readOnly
            value={password}
            ref={copy}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 "
            onClick={CopyPassword}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label> Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((pre) => {
                  return !pre;
                });
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((pre) => {
                  return !pre;
                });
              }}
            />
            <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
