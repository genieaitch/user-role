import {Link, useNavigate, useParams} from "react-router-dom";
import apiProductService from "../pages/product/apiProductService";

const ProductCard = () => {
    const {productId} = useParams();
    const navigate = useNavigate();

    const handleDelete = () => {
        if(window.confirm("정말 삭제 하시겠습니까?")) {
            apiProductService.deleteProduct(productId, "삭제 성공", "삭제실패")
            navigate("/products")
        }
    }

    return (
        <div className="productcard-container">
            <div className="col mb-5">
                <div className="card h-100">
                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="Fancy Product" />
                        <div className="card-body p-4 text-center">
                            <h5 className="fw-bolder">
                                <Link to={`/products/${productId}`} className="text-decoration-none">Fancy Product</Link>
                            </h5>
                            $40.00 - $80.00
                        </div>
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <button className="btn btn-outline-dark mt-auto" onClick={handleDelete}>삭제</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
};

export default ProductCard;