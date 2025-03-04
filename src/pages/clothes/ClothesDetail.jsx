import {useEffect, useState} from "react";
import apiClothesService from "./apiClothesService";
import {Link, useNavigate, useParams} from "react-router-dom";

const ClothesDetail = () => {
    const navigate = useNavigate();
    const {clothesId}= useParams();
    const [clothes, setClothes] = useState(null);

    useEffect(() => {
        apiClothesService.getClothesById(clothesId, setClothes)
    }, [clothesId])

    const handleDelete = () => {
        if(window.confirm("정말 삭제 하시겠습니까?")) {
            apiClothesService.deleteClothes(clothesId, "삭제 성공", "삭제실패")
            navigate("/clothesList")
        }
    }

    return (
        <div className="clothesDetail-container">
            <h3><strong>{clothes?.cname}</strong> 상세보기</h3>
            <p>브랜드 : {clothes?.cbrand}</p>
            <p>카테고리 : {clothes?.ccategory}</p>
            <p>색상 : {clothes?.ccolor}</p>
            <p>소재 : {clothes?.cmaterial}</p>
            <p>사이즈 : {clothes?.csize}</p>
            <p>가격 : {clothes?.cprice}원</p>
            <p>수량 : {clothes?.cstock}</p>

            <Link to={`/clothes/edit/${clothesId}`}>
                <button>수정하기</button>
            </Link>

            <button onClick={handleDelete}>삭제</button>
            <Link to={`/clothesList`}><button>돌아가기</button></Link>
        </div>
    )
};

export default ClothesDetail;