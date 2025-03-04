import {useEffect, useState} from "react";
import apiClothesService from "./apiClothesService";
import {useNavigate} from "react-router-dom";

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
            {clothes.map(
                (c) => (
                    /*<div key={c.cid}>*/
                    <div className="col-3 mb-5" key={c.cid}>
                        <div className="card h-100">
                            <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                 alt="Fancy Product"/>
                            <div className="card-body p-4 text-center">
                                <h5 className="fw-bolder">
                                    <a href={`/clothes/${c.cid}`} className="text-decoration-none">{c.cname}</a>
                                </h5>
                                {c.cprice.toLocaleString()}원
                            </div>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center">
                                    <button className="btn btn-outline-dark mt-auto"
                                    onClick={()=>handleDelete(c.cid)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    //</div>

                )
            )
            }
        </div>
    )
};

export default ClothesList;