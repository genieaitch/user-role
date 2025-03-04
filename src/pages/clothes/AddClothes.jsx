import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import apiClothesService from "./apiClothesService";

const AddClothes = () => {
    const {clothesId} = useParams();
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
    const navigate = useNavigate();

    const handleAdd = () => {
        const content = {
            cid: clothesId,
            cname: name,
            ccategory: category,
            cbrand: brand,
            ccolor: color,
            cmaterial: material,
            csize: size,
            cprice: parseFloat(price),
            cstock: parseInt(stock),
            cgender: gender,
            cseason: season
        }

        const emptyinput = [];
        if (!content.cname.trim()) emptyinput.push("이름");
        if (!content.ccategory.trim()) emptyinput.push("카테고리");
        if (!content.cbrand.trim()) emptyinput.push("브랜드");
        if (!content.ccolor.trim()) emptyinput.push("색상");
        if (!content.cmaterial.trim()) emptyinput.push("소재");
        if (!content.csize.trim()) emptyinput.push("사이즈");
        if (content.cprice <= 0) emptyinput.push("가격");
        if (content.cstock <= 0) emptyinput.push("수량");

        if (emptyinput.length > 0) {
            alert(`항목을 입력해주세요 : \n ${emptyinput.join(", ")}` );
            return;
        }
        apiClothesService.insertClothes(clothesId, content, "추가 성공", "추가 실패");
    }

    return (
        <div className="addclothes-container">
            <h2>옷 추가하기</h2>
            <div>이름 :
                <input
                    type="text"
                    placeholder="옷 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                카테고리 : <input
                type="text"
                placeholder="카테고리"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            </div>

            <div>
                브랜드 : <input
                type="text"
                placeholder="브랜드"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
            />
            </div>

            <div>
                색상 : <input
                type="text"
                placeholder="색상"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
            </div>

            <div>
                소재 : <input
                type="text"
                placeholder="소재"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
            />
            </div>

            <div>
                사이즈 : <input
                type="text"
                placeholder="사이즈"
                value={size}
                onChange={(e) => setSize(e.target.value)}
            />
            </div>

            <div>
                가격 : <input
                type="number"
                placeholder="가격"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            </div>

            <div>
                수량 : <input
                type="number"
                placeholder="수량"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
            />
            </div>

            <div>
                성별 : <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="남성">남성</option>
                    <option value="여성">여성</option>
                    <option value="공용">공용</option>
                </select>
            </div>

            <div>
                계절 : <select value={season} onChange={(e) => setSeason(e.target.value)}>
                <option value="봄">봄</option>
                <option value="여름">여름</option>
                <option value="가을">가을</option>
                <option value="겨울">겨울</option>
                <option value="사계절">사계절</option>
            </select>
            </div>

            <button onClick={handleAdd}>추가하기</button>
        </div>
    )
};

export default AddClothes;