
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@100xdevs/medium-common"
import axios from "axios";
import { BACKEND_URL } from "../component";


export const Auth = ({ type }: { type: "signup" | "signin" } ) => {

    const navigate = useNavigate();

    const [postInput, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"? "signup" : "signin"}`, postInput);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        }catch(e){
            alert(e)
        }
    }

    return <div className=" h-screen flex items-center justify-center flex-col ">
        <div className="text-3xl font-extrabold">
            Create an Account
        </div>
        <div className="text-l font-semibold  text-slate-600 pb-9">
            {type== "signin"? "Don't have an account?" :"Already have an account?"} 
            <Link className="pl-3 text-l font-semibold  text-blue-300 underline" to={type == "signup"? "/Signin" : "/Signup"}>
            {type == "signin"? "Sign up" : "Sign in"}
            </Link>
        </div>
        {type === "signup"? <LabelledInput label="Name" placeholder="Type your name" onchange={(e) => {
            setPostInputs({ ...postInput, name: e.target.value })
        }} />: null}
        <LabelledInput label="Username" placeholder="Type your username" onchange={(e) => {
            setPostInputs({ ...postInput, username: e.target.value })
        }} />
        <LabelledInput label="Password" placeholder="Type your your password" type="password" onchange={(e) => {
            setPostInputs({ ...postInput, password: e.target.value })
        }} />
        <button type="button" onClick={sendRequest} className="text-white w-md bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            {type === "signup" ? "Sign Up" : "Sign In"}
        </button>
    </div>
}

interface LabelledInputProps {
    label: string;
    placeholder: string;
    onchange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onchange, type }: LabelledInputProps) {
    return <div className="flex flex-col items-left pb-4">
        <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-black ">{label}</label>
        <input onChange={onchange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-md p-2.5" placeholder={placeholder} required />
    </div>
}