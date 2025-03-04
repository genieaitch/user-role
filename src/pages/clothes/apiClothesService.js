import axios from 'axios';
// API_URL 이름 사용 금지
const API_CLOTHES_URL = "http://localhost:8080/api/clothes";

/*
const 기능명칭 = {
1번기능 :
    function () {
    },
2번기능 :
    function () {
    },
3번기능 :
    function () {
    },
}

export default 기능명칭;
외부 파일에서 기능명칭 안에 들어있는 기능을 사용하기 위해서는
기능명칭.1번기능();
와 같이 사용
*/
const apiClothesService = {

    getAllClothes:
        function (setClothes, setErr) {
            axios
                .get(API_CLOTHES_URL)
                .then(
                    (res) => {
                        console.log("백엔드 연결 성공", res.data)
                        setClothes(res.data)
                    }
                )
                .catch( //백엔드와 연결을 실패했을 경우
                    // err 는 자동으로 생성되는 문제가 err 변수이름에 자동으로 담김
                    (err) => {
                        alert("백엔드에서 데이터를 가져오지 못했습니다.");
                        setErr(err)
                        console.log("getAllClothes Error : ", err)
                    }
                )
        },

    getClothesById:
        function (clothesId, setClothes) {
            axios
                .get(`${API_CLOTHES_URL}/${clothesId}`)
                .then(
                    res => {
                        setClothes(res.data)
                    }
                )
                .catch(
                    err => {
                        alert("백엔드에서 데이터를 가져오지 못했습니다.");
                        console.log("detail Error : ", err)
                    }
                )
        },

        insertClothes :
        function (clothesId, content, callback, errorCallback){
            axios
                .post(`${API_CLOTHES_URL}`, content, {
                    headers: {
                        'Content-Type': 'application/json'
                    }})
                .then(
                    (res) => {
                        console.log("백엔드 연결 성공", res.data)
                        alert(callback)
                    }
                )
                .catch(
                    (err) => {
                        alert("백엔드에서 데이터를 가져오지 못했습니다.");
                        console.log("getAllClothes Error : ", err)
                    }
                )
        },

        updateClothes: //putMapping 에 id 경로 추가
        function (clothesId, updateContent, callback, errorCallback){
            axios
                .put(`${API_CLOTHES_URL}/${clothesId}`, updateContent,
                    {headers: {"Content-Type": "application/json"}
                })
                .then(
                    (res) => {
                            console.log("백엔드 연결 성공", res.data)
                            alert(callback);
                    }

                )
                .catch(
                    (err) => {
                        alert(errorCallback);
                        console.log("getAllClothes Error : ", err);
                    }
                )
        },

        deleteClothes:
        function (clothesId, callback, errorCallback){
            axios
                .delete(`${API_CLOTHES_URL}/${clothesId}`)
                .then(
                    (res) => {
                        console.log("백엔드 연결 성공", res.data);
                        alert(callback);
                        window.location.reload();
                    }
                )
                .catch(
                    (err) => {
                        alert("삭제에 실패했습니다 : " + errorCallback)
                        console.log("getAllClothes Error : ", err)
                    }
                )
        },
}

export default apiClothesService;