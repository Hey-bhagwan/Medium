import { ChangeEvent, useState } from "react"
import { AppBar } from "../components/appbar"
import axios from "axios"
import { BACKEND_URL } from "../component"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate();

    return <div className="flex flex-col justify-center items-center  px-10">
                <AppBar />
                <label className="block mb-2 pt-10 text-sm font-medium text-gray-900">
                    Your Blog
                </label>
                <textarea
                    rows={4}
                    className="block p-2.5 w-2xl h-15 text-sm text-gray-900 bg-gray-50 
                    rounded-lg border border-gray-300 focus:outline-none"
                    placeholder="Title...."
                    onChange={(e)=>{
                        setTitle(e.target.value)
                    }} />

                <TextEditor onChange={(e)=>{
                    setDescription(e.target.value)
                }}/>
                <button
                    onClick={async ()=>{
                        const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                            title,
                            content: description
                        }, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        })
                        navigate(`/blog/${res.data.res}`)
                    }}
                    type="submit"
                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800">
                    Publish post
                </button>
            </div>
}

function TextEditor({onChange}: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div>
        <div className="flex flex-col w-2xl">
            <div className=" my-2 bg-white rounded-b-lg dark:bg-gray-800">
                <label className="sr-only">Publish post</label>
                <textarea
                    onChange={onChange}
                    id="editor"
                    rows={8}
                    className="block w-full focus:outline-none text-sm text-gray-800 bg-white border-0 focus:ring-0 "
                    placeholder="Write an article..." required />
            </div>
        </div>
        
    </div>
}