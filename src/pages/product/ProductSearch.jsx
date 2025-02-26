// import form '파일명 파일위치 js 기능명칭' => 변수명으로 기능을 사용해야할 때
// import 'css 파일 위치' => 가져오기만 진행할 때 사용
import React, {useState} from "react";
import axios from "axios";
import './ProductSearch.css';
import apiProductService from "./apiProductService";

const ProductSearch = () => {
    // 검색 변수 이름
    const [keyword, setKeyword] = useState("");
    //검색 결과 조회 목록 변수 이름
    const [products, setProducts] = useState([]);
    // 검색어 추천 목록 변수 이름
    const [sugs, setSugs] = useState([]); // suggestions -> sugs 추천 검색어를 제안하는 리스트
    // 빈 값일 경우 제안 X 빈 값이 아닐 경우 제안
    const [show, setShow] = useState([]);
    const[err, setErr] = useState([]);

    const handleSug = (sugs) => {
        setKeyword(sugs);
        setShow(false);
    }

    const searchProducts = () => {
        if (!keyword.trim()) {
            alert("검색어를 입력하세요.");
            return;
        }
        apiProductService.getSearchProduct(keyword, setProducts)
        /*
        axios
            .get(`http://localhost:8080/api/products/search?keyword=${keyword}`)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log("search 에러 발생 : " + err)
                setProducts([]); // 기존에 검색된 데이터가 있다면 지워버리기
                alert("백엔드에서 데이터를 불러올 수 없습니다.")
            })
         */
    }

    const handleChange = (e) => {
        const value = e.target.value.trim();// input 창에서 이벤트가 발생, 이벤트가 발생한 특정 값을 공백 제거하고 value 이름에 저장
        // if(!value.trim()){
        // alert("추천할 검색어가 없습니다")}
        // 검색 추천은 추천일 뿐 필수로 추천을 이유가 없기 떄문에 alert 사용 X
        setKeyword(value); // input 가져온 value 값을 setKeyword 에 저장

        // value 값이 존재한다면 추천 검색어 제공
        if (value) {
        apiProductService.getSuggestions(value, setSugs, setShow)
            /*
            axios
                .get(`http://localhost:8080/api/products/search?keyword=${value}`)
                .then(
                    (res) => {
                        // res.data 는 배열 형식으로 데이터를 가져올 수 없기 때문에 사용 불가
                        /*
                        const 제안리스트 = Array.isArray(res.data)
                            ?
                            res.data.map(
                                (p) => (
                                    p.productName
                                )
                            )
                            :
                            [];
                            
                         * /
                        const 제안리스트 = res.data?.map(p => p.productName) || [];
                        setSugs(제안리스트); // 백엔드에서 가져온 제안리스트에서 이름만 sug 변수이름으로 전달
                        setShow(true); // 제안 리스트를 sugs 변수 이름으로 전달했고, 전달한 값이 존재하면 추천 검색어 보여주기 설정
                    }
                )
                .catch(
                    (err) => {
                        console.log("추천 검색어 동작 실행 실패 : ", err)
                        setSugs([]); // 새로운 input 값이 들어왔을 때 문제가 발생하면 기존에 추천한 리스트를 모두 비우기
                    }
                )
            /*
        } else { // 추천할 검색어가 없다면 한마디로 input이 비어있다면!
            setSugs([]); // 추천 검색어 리스트 비우기
            setShow(false);
             */
        }

    }
    return (
        <div className="productsearch-container">
            <h2>상품 검색</h2>
            <div>
                <input
                    type="text"
                    value={keyword}
                    onFocus={() => setShow(true)}
                    onChange={handleChange}
                    onBlur={() => setTimeout(() => setShow(false), 200)}
                />
                {
                    show && sugs.length > 0 && (<ul>

                        {sugs.map(
                            (sugs, index) => (
                                <li key={index} onMouseDown={() => handleSug(sugs)}>
                                    {sugs}
                                </li>
                            ))}
                    </ul>)
                }
            </div>
            <button onClick={searchProducts}>검색</button>

            <ul>
                {products.length > 0 ?
                    (
                        products.map((product) => (
                            <li key={product.productId}>
                                <p>이름 : {product.productName}</p>
                                <p>카테고리 : {product.productCategory}</p>
                            </li>
                        ))) : (
                        <div><p> {keyword} 검색 결과가 없습니다.</p></div>
                    )}
            </ul>
        </div>
    )
};

export default ProductSearch;