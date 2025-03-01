import { blog } from "../hooks"
import { AppBar } from "./appbar"


export const SoleBlog = ({ blog }: { blog: blog }) => {
    return <div>
        <AppBar />
        <div className="flex justify-center ">
            <div className="grid grid-cols-12 px-15 pt-20 max-w-screen-xl w-full">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 text-sm  pt-4">
                        Posted on 1st Jan 2025
                    </div>
                    <div className="text-slate-700 pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex items-center ">
                        {/* <Avatar name={blog.author.name || "Anonymous"} size={6} /> */}
                        <div className="flex justify-center items-center">
                            <div className={`relative inline-flex items-center justify-center w-6 h-6 overflow-hidden
                                             bg-gray-800 rounded-full `}>
                                <span className="font-sm font-light text-gray-600 ">{blog.author.name[0] || "A"}</span>
                            </div>
                            <div className="pl-3">
                                <div className="text-xl font-bold">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="text-slate-500 pt-2">
                                    some catch phrase of author
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}