import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import apiService from "./apiService";

// PostDetail 복사 후 변환
// 기존 PostDetails 로 변환

const PostDetail = () => {
    const navigate = useNavigate();
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
        apiService.getPostById(postId, setPost, setErr)
    }, [postId]);

    if (!post) {
        return <p>게시물 불러오는 중...</p>
    }

const handleDelete = () => {
    alert("알람 메시지");
    prompt("프롬포트 메시지", "기본값"); // 기본 값은 지워도 됨
    window.confirm("확인 취소 메시지");

    if (window.confirm("정말 삭제하시겠습니까?")) {
        // apiService 에서 deletePost 메서드 호출 후 기능 실행
        apiService.deletePost(1, "삭제성공", "삭제실패");
        // 게시물이 삭제가 된 상태
        navigate("/posts"); // 메인으로 이동하기
    }

return (
    <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
                <div className="col-md-6">
                    <img className="card-img-top mb-5 mb-md-0" src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg"
                         alt="..."/>
                </div>
                <div className="col-md-6">
                    <div className="small mb-1">{post.postTitle}</div>
                    <p className="lead">
                        {post.postContent}
                    </p>
                    <div className="d-flex">
                        <button className="btn btn-outline-dark flex-shrink-0" type="button">
                            <Link to={`/posts/edit/${postId}`} className="bi-cart-fill me-1">수정</Link>
                        </button>
                        <button className="btn btn-outline-dark flex-shrink-0" type="button" onClick={handleDelete}>
                           삭제
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
)
}
}

/*
기본 자바스크립트에서는 페이지를 이동할 때
window.location.href("이동할 경로")로 페이지 이동
리액트 자바스크립트에서는 페이지를 이동할 때
useNavigate() hook 을 사용해서 페이지 이동
Link 의 경우 a 태그 대신 활용

useNavigate = html 형식이 아니라 자바스크립트 내에서 특정 행동을 진행한 후
페이지를 이동하거나 페이지 이동 후 특정 기능을 수행해야할 때 사용

const navigate = useNavigate() 와 같은 형식으로 사용
navigate(-1) : 뒤 페이지로 이동하기
navigate(+1) : 앞 페이지로 이동하기
* /
const navigate = useNavigate();
const {postId} = useParams();
const [post, setPost] = useState(null);
const [err, setErr] = useState(null);

useEffect(() => {
apiService.getPostById(postId, setPost, setErr)
}, [postId]);

if (!post) {
return <p>게시물 불러오는 중...</p>
}

/*
alert(message) : 간단한 알림 메시지 표시
확인 버튼 누르기만 가능
문자열 입력 불가, 반환 불가

prompt(message, defaultValue) : 사용자로부터 입력을 받을 때 사용
확인, 취소 버튼 존재 **취소버튼을 누르면 null 값 반환
문자열 입력 가능
사용자가 입력하면 입력한 문자열 반환
defaultValue = 입력하는 기본 값을 제공할 수 있음 보통 사용X

confirm(message) : 사용자의 확인 또는 취소 여부를 물어볼 때 사용
확인, 취소 버튼 존재 ** 확인버튼을 누르면 true 반환, 취소버튼을 누르면 false 반환
문자열 입력 불가
confirm 메시지의 경우 window 함수 내부에 들어있는 메서드이기 때문에
window.confirm(""); 형식으로 사용 가능
confirm 마찬가지로 window 생략하고 사용 가능하지만 리액트의 경우에는 window 를 붙여줘야함
* /
const handleDelete = () => {
alert("알람 메시지");
prompt("프롬포트 메시지", "기본값"); // 기본 값은 지워도 됨
window.confirm("확인 취소 메시지");

if (window.confirm("정말 삭제하시겠습니까?")) {
// apiService 에서 deletePost 메서드 호출 후 기능 실행
apiService.deletePost(1, "삭제성공", "삭제실패");
// 게시물이 삭제가 된 상태
navigate("/posts"); // 메인으로 이동하기
}
}

return (
<div className="postList-container">
    <h2>{post.postTitle}</h2>
    <p>{post.postContent}</p>
    {/*✅ 수정 버튼* /}
    {/* Route 에 작성한 path 와 to 경로를 맞춰서 작성 * /}
    <Link to={`/posts/edit/${postId}`}>
        <button>수정</button>
    </Link>
    {/*✅ 삭제 버튼* /}
    <button onClick={handleDelete}>삭제</button>

    {/*a 가 아닌 Link 를 쓰는 이유 HTML 간 이동이 아니라 자바스크립트 내에서 이동하는 것, 대문자인 이유 다른 사람이 만듬* /}
    <Link to="/posts">돌아가기</Link>
</div>
)
};
*/

export default PostDetail;