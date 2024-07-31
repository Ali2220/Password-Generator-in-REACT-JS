import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");
  
  // useRef hook
  const passwordRef = useRef(null);

  // useCallback hook
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) {
      str += '0123456789';
    }
    if (charAllowed) {
      str += '!@#$%^&*()_+';
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

      setpassword(pass)
  
  }, [length, numberAllowed, charAllowed, setpassword]);
  
  const copyPasswordToClipboard = useCallback(() => {
      passwordRef.current.select();
      window.navigator.clipboard.writeText(password);
  }, [password])

  // useEffect hook
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])

  return (
    <>
      <div className="w-full h-52 max-w-md mx-auto shadow-md rounded-lg px-4 my-8  bg-slate-900 text-white">
        <h1 className="m-3 text-center text-2xl my-3 py-3">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-gray-700 text-white"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className="bg-blue-500 text-white p-2 hover:bg-blue-700">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={40}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1 mx-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={(e) => {
                setnumberAllowed((prev) => {
                  !prev;
                });
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1 mx-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setnumberAllowed((prev) => {
                  !prev;
                });
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
