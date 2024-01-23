import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function ProductList() {

    const ProductItem = useSelector(s => s.products.products)

    const [keyword, setKeyword] = useState("")
    const [Products, setProducts] = useState(ProductItem)

    const handleChange = (e) => {
        setKeyword(e.target.value);
        const filtereddata = ProductItem.filter((product) =>
            product.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setProducts(filtereddata);
    }
    return (
        <div>
            <h2 >Product Card</h2>
            <div className="ig-row">
                <input type="text" value={keyword} onChange={(e) => handleChange(e)} placeholder="Search" />
            </div>
            {Products.map((item) => (
                <div className="card">
                    <img src={item.img} alt="Denim Jeans" />
                    <h1>{item.name}</h1>
                    <p className="price">{item.code}</p>
                    <p>{item.Categories}</p>
                    <p>{item.description}</p>
                </div>
            ))}
            <Link to={"/add-product"}><button className="button">Add Product</button></Link>
        </div>
    )
}

export default ProductList