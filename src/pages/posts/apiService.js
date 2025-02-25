// axios. 작성했던 기능을 모아서 설정한 다음 각 jsx 파일로 전달

// 스프링부트 실행 포트 restcontroller 에서 requestMapping에 작성한 api를 그대로 작성
import axios from "axios";

const API_POST_URL = "http://localhost:8080/api/posts";


const apiService = {
    // 외부에서 사용할 메서드 명칭:
    // 기능설정(파라미터값) {
    //          기능작성
    // }
    getAllPosts:
        function (callback, errCallback) {
            axios
                // URL 기능을 관리하기 위해서 따로 빼서 사용
                .get(API_POST_URL) // 대문자로 쓰는 것 상수, 변하면 안됨
                .then(
                    (res) => callback(res.data)
                )
                .catch(
                    err => {
                        alert("게시물을 불러오는 중 오류가 발생했습니다.");
                        errCallback("게시판 목록 보기 실패");
                        console.log("err 문제 개발자가 확인하기 : ", err)
                    }
                )
        },

    getPostById:
        function (postId, setPost, setErr) {
            axios
                //.get(API_POST_URL + postId) http://localhost:8080/api/posts1
                //.get(API_POST_URL + "/" + postId) // http://localhost:8080/api/posts/1
                .get(`${API_POST_URL}/${postId}`) // http://localhost:8080/api/posts/1
                .then(
                    res => setPost(res.data)
                )
                .catch(
                    err => {
                        alert("백엔드에서 데이터를 가져올 수 없습니다.");
                        console.log("개발자만 무슨 문제인지 확인할 수 있도록 설정 : ", setErr(err));
                    }
                )
        },
    // 자바스크립트는 , 뒤에 다른 값이 존재하지 않아도 문제가 발생하지 않으므로
    // 기능이나 목록을 작성할 때 , 를 작성해주는 것이 가장 좋음!
    searchPosts: function (keyword, setPost, setErr) {
        // encodeURIComponent -> 영어, 숫자 이외 값이 왔을 때 문제가 생길경우 UTF-8로 글자 한글 꺠짐 없도록 설정
        // 예전 코드에서는 필수였으나, 근래 필수X
        axios
            .get(`${API_POST_URL}/search?keyword=${encodeURIComponent(keyword)}`)
            .then(response => setPost(response.data))
            .catch((err) => {setErr(err)
            console.log("postSearch 에러 : " + err)
                setPost([]);
                alert("백엔드에서 데이터를 불러올 수 없습니다.")
            });
    },

    suggestedPosts: function (keyword, callback, errorCallback){
        axios
            .get(`${API_POST_URL}/search?keyword=${encodeURIComponent(keyword)}`)
            .then(
                (res) => {
                    const 제안리스트 = res.data?.map(post => post.postTitle) || [];
                    callback(제안리스트);
                    errorCallback(true);
                }
            )
            .catch( // 백엔드에서 검색어를 입력했을 때 추천하는 검색 리스트 가져오기에 문제가 발생했을 때
                // 클라이언트한테 문제가 발생했음을 알려줄 필요X
                // 추천 검색어 리스트를 비우고 보여주지 않음 설정
                (err) => {
                    console.log("검색어 추천 리스트 오류 : ", err)
                    callback([]);
                    errorCallback(false);
                }
            )
    },

}

export default apiService;