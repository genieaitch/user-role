import React, {useState} from "react";
import axios from "axios";

const ProductDetail = () => {
    //제품 아이디 변수 이름
    const [productId, setProductId] = useState("");
    //제품 정보 변수 이름
    const [product, setProduct] = useState(null);

    const getProductDetail = () => {
        if (!productId.trim()) { //trim() 왼쪽 오른쪽 공백 제거
            alert("상품 ID를 입력하세요.");
            return;
        }
        axios
            .get(`http://localhost:8080/api/products/${productId}`)
            .then((res) => {
                setProduct(res.data); // res 는 변수이름을 ABC나 XYZ 사용 가능하지만 .data 메서드나 변수명으로 활동하는 기능이기 때문에 이름 변경 불가
            })
            .catch((err) => {
                console.log("Detail 백엔드 연결 실패 : " + err);
                alert("백엔드에서 데이터를 조회를 실패했습니다.");
            })
    }

    return (
        <div className="productDetail-container">
            {/* input onChange 설정*/}
            <h2>상품 상세 조회</h2>
            <input
                type="text"
                value={productId}
                placeholder="상품 ID 입력"
                onChange={(e) =>
                    setProductId(e.target.value)
                }
            />
            <button onClick={getProductDetail}>조회</button>

            {product ? (
                <div>
                    <h3>{product.productName}</h3>
                    <p>카테고리: {product.productCategory}</p>
                    <p>가격: {product.productPrice}원</p>
                    <p>재고: {product.productStock}개</p>
                    <p>설명: {product.productDescription}</p>
                </div>
            ) : (
                <p>상품 정보를 찾을 수 없습니다.</p>
            )}
        </div>
    );
};

export default ProductDetail;