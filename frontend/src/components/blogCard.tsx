import { Link } from "react-router-dom"

interface BlogCardProps {
    title: string,
    authorName: string,
    id: number,
    publishedDate: string,
    content: string,
}

export const BlogCard = ({
    id,
    title,
    publishedDate,
    content,
    authorName,
}: BlogCardProps
) => {
    return <Link to={`/blog/${id}`}>
        <div className="border-b-2 border-slate-200  p-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex items-center">
                {/* <Avatar name={authorName} />  */}
                <div className={`relative inline-flex items-center justify-center w-6 h-6 overflow-hidden
                     bg-gray-800 rounded-full `}>
                    <span className="font-sm font-light text-gray-600 ">{authorName[0]}</span>
                </div>
                <div className="font-light pl-3 pr-2 text-sm">
                    {authorName}
                </div>
                <div className="text-xs opacity-50">
                    &#09679;
                </div>
                <div className="pl-2 font-thin text-slate-500 text-sm">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
    </Link>
}

