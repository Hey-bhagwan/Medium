import { PageLoader } from "../components/pageLoader";
import { SoleBlog } from "../components/soleBlog";
import { useblog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const {id} = useParams();

  const {loading,blog} = useblog({
    id: id || ""
  });

  if(loading || !blog) {
    return <div className="flex justify-center items-center h-screen">
        <PageLoader />
      </div>
  }

  return (
    <div>
      <SoleBlog blog={blog} />
    </div>
  )
}