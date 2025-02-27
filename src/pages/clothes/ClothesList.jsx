import {useEffect, useState} from "react";
import apiClothesService from "./apiClothesService";
import {Link} from "react-router-dom";

const ClothesList = () => {
    const [clothes, setClothes] = useState([]);
    const [err, setErr] = useState(null);

    useEffect(() => {
        apiClothesService.getAllClothes(setClothes, setErr)
    }, []);

    return (
        <div className="clothesList-container">
            <h2>옷 가게</h2>

            <Link to={`/clothes/add`}>
                <button>옷 추가하기</button>
            </Link>

            {
                    clothes.map(
                    (c) => (
                    <div key={c.cid}>
                        <h3>{c.cname}</h3>
                        <p>카테고리 : {c.ccategory}</p>
                        <p>브랜드 : {c.cbrand}</p>
                        <p>가격 : {c.cprice}원</p>
                        <p>수량 : {c.cstock}</p>
                        <Link to={`/clothes/${c.cid}`}>이동하기</Link>
                    </div>

                    )
                    )
            }
        </div>
    )
};

export default ClothesList;