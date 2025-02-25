import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import apiService from "./apiService";

const PostDetail = () => {
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(()=>{
        apiService.getPostById(postId, setPost, setErr)
    },[postId]);

    if (!post){
        return <p>게시물 불러오는 중...</p>
    }

    return(
    <div className="postList-container">
        <h2>{post.postTitle}</h2>
        <p>{post.postContent}</p>
        <Link to="/posts">돌아가기</Link>
    </div>
    )
};
    
export default PostDetail;