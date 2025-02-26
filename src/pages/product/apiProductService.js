// ProductSearch
// ProductDetail
// 작성된 api 호출 분리하여 기능 사용

import axios from "axios";

const API_PRODUCT_URL = "http://localhost:8080/api/products"

const apiProductService = {
    // 1. getProducts(keyword)
    getProducts:
        function (keyword, callback, errCallback) {
            axios
                .get(API_PRODUCT_URL)
                .then( // 백엔드 연결 성공
                    res => callback(res.data)
                )
                .catch( // 백엔드 연결 실패
                    err => {
                        alert("백엔드에서 데이터를 불러올 수 없습니다.");
                        errCallback("제품 목록 보기 실패했습니다.");
                        console.log("ProductSearch Error : " + errCallback(err));
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
        function (keyword, setProducts){
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