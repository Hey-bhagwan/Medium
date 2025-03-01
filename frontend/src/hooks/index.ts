import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../component";

export interface blog {
    title: string,
    content: string,
    id: number,
    author: {
        name: string
    }
}

export const useblog = ({id}:{id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<blog | null>(null);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        })
        .then((res)=>{
            setBlog(res.data.blog);
            setLoading(false);
        })
    },[])

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        })
        .then((res)=>{
            setBlogs(res.data.blogs);
            setLoading(false);
        })
    },[])

    return {
        loading,
        blogs
    }
}

export const usePublish = ({title,description}:{title:string,description:string}) => {
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState<string>("");

    useEffect(() => {
        const publishBlog = async () => {
            await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            .then((res) => {
                setId(res.data.res);
                setLoading(false);
            });
        };
        publishBlog();
    }, [])

    return {
        loading,
        id
    }
}