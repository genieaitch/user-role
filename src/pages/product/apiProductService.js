// ProductSearch
// ProductDetail
// 작성된 api 호출 분리하여 기능 사용

import axios from "axios";

const API_PRODUCT_URL = "http://localhost:8080/api/products"


/*
Uncaught (in promise) TypeError: errCallback is not a function at apiProductService.js:27:1
errCallback → 함수가 아니면 문제가 발생
err 의 경우 매개변수 이름으로 전달받아서 작성 XX

AI 학습의 도움을 받을 경우
기능명칭:
        function (callback, errCallback) {
        // 메인기능명칭을 호출할 경우 수행할 기능 작성
        }

        ===> 여기서 errCallback 의 경우 백엔드에서 문제가 생겼을 때
             해결해야할 문제
              매개변수 명칭으로 받아오지 않음
              err 관련 매개변수는 받아오지 않음 XXX

바른 예제
        기능명칭:
        function (keyword) {
            // 메인기능명칭을 호출할 경우 수행할 기능 작성
        }
*/
const apiProductService = {
    // 1. getProducts(keyword)
    getProducts:
        function (setProducts) {
            axios
                .get(API_PRODUCT_URL)
                .then( // 백엔드 연결 성공
                    res => {
                        console.log("백엔드 연결 성공", res.data);
                        setProducts(res.data);
                    }
                )
                .catch( // 백엔드 연결 실패
                    err => {
                        alert("백엔드에서 데이터를 불러올 수 없습니다.");
                        console.log("ProductSearch Error : " + err);
                    }
                )
        },

    // 2. getSuggestions(keyword)
    getSuggestions:
        function (value, setSugs, setShow) {
            axios
                .get(`${API_PRODUCT_URL}/search?=keyword=${encodeURIComponent(value)}`)
                .then( // 백엔드와 연결 성공
                    res => {
                        const sugsList = res.data?.map(p => p.productName) || [];
                        setSugs(sugsList);
                        setShow(true);
                    }
                )
                .catch( // 백엔드와 연결 실패
                    err => {
                        // console.log 일 경우에는 function() 소괄호 내부에 err 작성해야하지만
                        // console.error 경우에는 function() 소괄호 내부에 err 작성할 필요 없음
                        console.error("handelChange Error : " + err)
                        setSugs([]);
                    }
                )
        },


    // 3. getProductById(keyword)
    getProductById:
        function (productId, setProduct, err) {
            axios
                .get(`${API_PRODUCT_URL}/${productId}`)
                .then( // 백엔드와 연결 성공
                    res => {
                        if (res.data) { // 데이터가 1개 이상 존재할 때
                            // 데이터를 setProduct 로 전달
                            setProduct(res.data)
                        }
                    }
                )
                .catch( // 백엔드와 연결 실패
                    err => {
                        alert("백엔드에서 데이터를 가져올 수 없습니다.")
                        console.log("productDetail Error : " + err(err))
                    }
                )
        },

    getSearchProduct:
        function (keyword, setProducts) {
            axios
                .get(`http://localhost:8080/api/products/search?keyword=${keyword}`)
                .then((res) => {
                    setProducts(res.data);
                })
                .catch((err) => {
                    console.log("search 에러 발생 : " + err)
                    setProducts([]);
                    alert("백엔드에서 데이터를 불러올 수 없습니다.")
                })
        },
    /*
    불러올기능명칭:
    function (){
      복사해오기
    },
     */
}

export default apiProductService;