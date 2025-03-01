import { Link } from "react-router-dom"
import { Avatar } from "./blogCard"

export const AppBar = () => {
    return <div className="flex justify-between items-center px-15 w-full border-b-2 border-slate-200 py-5">
        <Link to="/blogs">
            Medium
        </Link>
        <div className="flex justify-center">
            <Link to="/publish">
                <button
                    type="button"
                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 
                            font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                    Blog
                </button>
            </Link>

            <div className="pl-3">
                <div className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden
                         bg-gray-800 rounded-full `}>
                    <span className="font-sm font-light text-gray-600 ">A</span>
                </div>
            </div>
        </div>
    </div>
}