import {useEffect, useState} from "react";
import apiClothesService from "./apiClothesService";
import {Link, useNavigate} from "react-router-dom";
import ClothesCard from "./ClothesCard";

const ClothesList = () => {
        const [clothes, setClothes] = useState([]);
        const [err, setErr] = useState(null);
        const navigator = useNavigate();

        useEffect(() => {
            apiClothesService.getAllClothes(setClothes, setErr)
        }, []);

        const handleDelete = (cid) => {
            apiClothesService.deleteClothes(cid, "삭제성공", "삭제실패");
            navigator("/clothesList");
        }

        return (
            <div className="row mt-5">
            <Link to={"/clothes/add"}>
            <button>옷 추가하기</button>
            </Link>
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {clothes.map((clothes, index) => (
                                <ClothesCard id={clothes.cid}
                                             name={clothes.cname}
                                             price={clothes.cprice}
                                             image="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"

                                             onDelete={handleDelete} //삭제 기능 함수를 ClothesCard로 전달
                                />
                            )
                        )
                        }
                    </div>
                </div>
            </div>
        )
    }
;

export default ClothesList;