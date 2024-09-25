import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [color, setColor] = useState("black");

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState(" ");

  //useRef hook
  const passwordRef = useRef(null);
  //this hook is used to find the reference of the anything in the page
  //as if here i am giving reference to password, which i also call from the
  //input field, then we have manipulated this in the methods below

  //useCallback is used to keep the values stored in the cache.
  const passwordGenentor = useCallback(() => {
    let pass = " ";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()(_+>?@#$%^&*";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      //to concatenate the string with other characters
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);
  //here setPassword is called because we want to save the password in the
  //memory, as we know that setPassword can save the password of the memory
  //and return it at the time comes.

  //this hook will be called first whenever the page is loaded
  //this is mainly for the ui-view, to reflect the effect in the ui.
  useEffect(() => {
    passwordGenentor();
  }, [length, numberAllowed, characterAllowed, passwordGenentor]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    //'?' this is used for the 'optional', like if the value is available in the field
    passwordRef.current?.setSelectionRange(0, 21);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div
        className="w-full h-screen duration-200"
        style={{ backgroundColor: color }}
      >
        <h1 className="text-4xl font-bold text-center text-white p-7">
          Random Password Generator
        </h1>

        <div className="max-w-7xxl flex justify-center items-center my-10">
          <div
            className="p-5  shadow-md rounded-lg px-4  text-orange-700
     bg-white"
          >
            <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
              <input
                type="text"
                value={password}
                className="outline-none w-full py-1 px-3"
                placeholder="password"
                readOnly
                ref={passwordRef}
              />

              <button
                onClick={copyPasswordToClipboard}
                className="outline-none bg-red-700 text-white
          px-3 py-0.5 "
              >
                copy
              </button>
            </div>
            <div className="flex text-sm gap-x-2">
              <div className="flex items-center gap-x-1">
                <input
                  type="range"
                  min={6}
                  max={100}
                  value={length}
                  className="cursor-pointer"
                  onChange={(e) => {
                    setLength(e.target.value);
                  }}
                />
                <label>Length: {length}</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input
                  type="checkbox"
                  defaultChecked={numberAllowed}
                  id="numberInput"
                  onChange={() => {
                    setNumberAllowed((prev) => !prev);
                  }}
                />
                <label htmlFor="numberInput">Numbers</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input
                  type="checkbox"
                  defaultChecked={characterAllowed}
                  id="characterInput"
                  onChange={() => {
                    setCharacterAllowed((prev) => !prev);
                  }}
                />
                <label htmlFor="characterInput">Characters</label>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default App;
