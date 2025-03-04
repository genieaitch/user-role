import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import apiClothesService from "./apiClothesService";

const EditClothes = () => {
    const {clothesId} = useParams();
    const [clothes, setClothes] = useState(null);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [material, setMaterial] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [gender, setGender] = useState("");
    const [season, setSeason] = useState("");
    const [message, setMessage] = useState(null);

    useEffect(() => {
        apiClothesService.getClothesById(clothesId, (data) => {
            setClothes(data);
            setName(data.cname);
            setCategory(data.ccategory);
            setBrand(data.cbrand);
            setColor(data.ccolor);
            setMaterial(data.cmaterial);
            setSize(data.csize);
            setPrice(data.cprice);
            setStock(data.cstock);
            setGender(data.cgender);
            setSeason(data.cseason);
        }, setMessage)
    }, [clothesId]);

    const handleUpdate = () => {
        const updateContent = {
            cid: clothesId,
            cname: name,
            ccategory: category,
            cbrand: brand,
            ccolor: color,
            cmaterial: material,
            csize: size,
            cprice: price,
            cstock: stock,
            cgender: gender,
            cseason: season
        };
        apiClothesService.updateClothes(clothesId, updateContent, "수정성공", "수정 실패(백엔드 에러)")
    }

    return (
        <div className="editClothes-container">
            <h2>옷 정보 수정</h2>
            이름 : <input
            type="text"
            placeholder="옷 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />

            카테고리 : <input
            type="text"
            placeholder="카테고리"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        />

            브랜드 : <input
            type="text"
            placeholder="브랜드"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
        />

            색상 : <input
            type="text"
            placeholder="색상"
            value={color}
            onChange={(e) => setColor(e.target.value)}
        />

            소재 : <input
            type="text"
            placeholder="소재"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
        />

            사이즈 : <input
            type="text"
            placeholder="사이즈"
            value={size}
            onChange={(e) => setSize(e.target.value)}
        />

            가격 : <input
            type="number"
            placeholder="가격"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
        />

            수량 : <input
            type="number"
            placeholder="수량"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
        />

            성별 : <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
            <option value="공용">공용</option>
        </select>

            계절 : <select value={season} onChange={(e) => setSeason(e.target.value)}>
            <option value="봄">봄</option>
            <option value="여름">여름</option>
            <option value="가을">가을</option>
            <option value="겨울">겨울</option>
            <option value="사계절">사계절</option>
        </select>

            <button onClick={handleUpdate}>수정하기</button>
        </div>
    )
};

export default EditClothes;