import axios from 'axios';
// API_URL 이름 사용 금지
const API_CLOTHES_URL = "http://localhost:8080/api/clothes";

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
                .catch(
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
                        console.log("getAllClothes Error : ", err)
                    }
                )
        },
/*
        insertClothes :
        function (){
            axios
                .post(`${API_CLOTHES_URL}/add`)
                .then(
                    (res) => {
                        console.log("백엔드 연결 성공", res.data)
                    }
                )
                .catch(
                    (err) => {
                        alert("백엔드에서 데이터를 가져오지 못했습니다.");
                        (err)
                        console.log("getAllClothes Error : ", err)
                    }
                )
        },
*/
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
                .get(`${API_CLOTHES_URL}/${clothesId}`)
                .then(
                    (res) => {
                        console.log("백엔드 연결 성공", res.data);
                        alert(callback);
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