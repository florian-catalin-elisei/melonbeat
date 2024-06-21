import { makeUnauthenticatedPOSTRequest } from "../utils/serverReq";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "../components/TextField";
import { useState } from "react";
import { useCookies } from "react-cookie";
import orangeLogo from "../assets/orangeLogo.svg";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    const data = { email, password };
    const response = await makeUnauthenticatedPOSTRequest("auth/login", data);

    if (response) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      navigate("/");
    }
  };

  return (
    <div className="border-orange-500 border-solid border-t-4 flex flex-col h-full items-center overflow-x-hidden pb-6 pt-10 w-full">
      <div>
        <img alt="MelOnBeat Logo" className="h-14 w-52" src={orangeLogo} />
      </div>
      <div className="flex flex-col items-center justify-center py-10 w-1/3">
        <div className="font-bold mb-12">To continue, log in to MelOnBeat</div>
        <TextField
          label="Email address"
          placeholder="Email address"
          type="text"
          value={email}
          setValue={setEmail}
        />
        <TextField
          className="mt-6"
          label="Password"
          placeholder="Password"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <button
          className="bg-orange-500 font-semibold mt-8 p-3 px-10 rounded-full text-white"
          onClick={(e) => {
            e.preventDefault();
            login();
          }}>
          Log In
        </button>
        <div className="border border-orange-300 border-solid mt-8 w-full" />
        <div className="font-semibold my-6 text-lg">Don't have an account?</div>
        <button className="border border-black border-solid font-semibold py-4 rounded-full text-white w-full">
          <Link to="/signup">Sign Up For MelOnBeat</Link>
        </button>
      </div>
    </div>
  );
};
