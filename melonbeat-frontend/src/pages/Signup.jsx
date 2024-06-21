import { Link, Navigate, useNavigate } from "react-router-dom";
import { TextField } from "../components/TextField";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverReq";
import orangeLogo from "../assets/orangeLogo.svg";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const signUp = async () => {
    const data = { email, firstName, lastName, username, password };
    const response = await makeUnauthenticatedPOSTRequest("auth/register", data);

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
        <div className="font-bold mb-12">Sign Up for free to start listening</div>
        <TextField
          label="First Name"
          placeholder="First Name"
          type="text"
          value={firstName}
          setValue={setFirstName}
        />
        <TextField
          className="mt-6"
          label="Last Name"
          placeholder="Last Name"
          type="text"
          value={lastName}
          setValue={setLastName}
        />
        <TextField
          className="mt-6"
          label="Username"
          placeholder="Username"
          type="text"
          value={username}
          setValue={setUsername}
        />
        <TextField
          className="mt-6"
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
            signUp();
          }}>
          Sign Up
        </button>
        <div className="border border-orange-300 border-solid mt-8 w-full" />
        <div className="font-semibold my-6 text-lg">Already have an account?</div>
        <button className="border border-black border-solid font-semibold py-4 rounded-full text-white w-full">
          <Link to="/login">Log In Instead</Link>
        </button>
      </div>
    </div>
  );
};
