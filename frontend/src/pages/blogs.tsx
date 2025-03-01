import { AppBar } from "../components/appbar"
import { BlogCard } from "../components/blogCard"
import { PageLoader } from "../components/pageLoader";
import { useBlogs } from "../hooks"



export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading) {
        return <div className="flex justify-center items-center h-screen">
            <PageLoader />
        </div>
    }

    return <div className="flex flex-col justify-center items-center">
                <AppBar />
                <div>
                    {blogs.map(blog=><BlogCard
                        id={blog.id} 
                        title={blog.title}
                        authorName={blog.author.name || "Anonymous"}
                        publishedDate="28th Feb 2025"
                        content={blog.content}
                    /> )}
                    
                    
                </div>
            </div>
}