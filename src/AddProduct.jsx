
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'
import { productitem } from './store/product/action';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

const CategoriesList = [
    { "id": 1, "name": "Electronics", "description": "Devices and gadgets" },
    { "id": 2, "name": "Clothing", "description": "Apparel and fashion" },
    { "id": 3, "name": "Home and Kitchen", "description": "Household items" },
    { "id": 4, "name": "Books", "description": "Literary works" },
    { "id": 5, "name": "Sports and Outdoors", "description": "Athletic gear and outdoor equipment" },
    { "id": 6, "name": "Beauty and Personal Care", "description": "Cosmetics and personal grooming" },
    { "id": 7, "name": "Toys and Games", "description": "Entertainment for all ages" },
    { "id": 8, "name": "Furniture", "description": "Home furnishings" },
    { "id": 9, "name": "Food and Beverages", "description": "Edible products and drinks" },
    { "id": 10, "name": "Automotive", "description": "Vehicle-related products" }
]


function AddProduct() {

    const [productName, setProductName] = useState("")
    const [code, setCode] = useState("")
    const [Categories, setCategories] = useState("")
    const [productImage, setProductImage] = useState("")
    const [description, setDescription] = useState("")
    const [producterror, setProductError] = useState("")
    const [codeError, setCodeError] = useState("")
    const [categoryError, setCategoryError] = useState("")
    const [imageError, setImageError] = useState("")
    const [listItem, setListItem] = useState([])
    const [sumbit, setSubmit] = useState(false)
    const ProductItem = useSelector(s => s.products.products)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const option = CategoriesList.map((item) => {
        return { value: item.id, label: item.name }
    })

    const Validate = () => {
        let validateObj = {
            productImage: false,
            code: false,
            categoryError: false,
            productImage: false
        }

        if (productName !== "") {
            setProductError("")
            validateObj.productName = true
        } else {
            setProductError("Product name is required")
            validateObj.productName = false
        }

        if (code !== "") {
            setCodeError("")
            validateObj.code = true
        } else {
            setCodeError("Code is required")
            validateObj.code = false
        }

        if (Categories !== "") {
            setCategoryError("")
            validateObj.Categories = true
        } else {
            setCategoryError("Categories is required")
            validateObj.Categories = false
        }
        if (productImage !== "" || productImage !== null) {
            setImageError("")
            validateObj.productImage = true
        } else {
            setImageError("Product Image is required")
            validateObj.productImage = false
        }


        if (validateObj.productName == true && validateObj.code == true && validateObj.Categories == true && validateObj.productImage == true) {
            return true
        } else {
            return false
        }
    }


    useEffect(() => {
        if (sumbit) {
            Validate()
        }
    }, [productImage, code, Categories, productImage])

    const clear = () => {
        navigate("/")
    }

    const handleAdd = (e) => {
        e.preventDefault()
        setSubmit(true)
        if (Validate()) {
            const obj = {
                name: productName,
                code: code,
                Categories: Categories?.label,
                img: productImage,
                description: description
            }
            setListItem([...listItem, obj])
            dispatch(productitem([...ProductItem, obj]))
            clear()
        }
    }

    const HandleImage = (event) => {
        const { files } = event.target;
        if (files && files[0] && files[0].name.match(/\.(jpg|jpeg|png)$/)) {
            const fsize = files[0].size
            const fileszie = Math.round(fsize / 1024)

            if (fileszie < 2048) {
                let reader = new FileReader()
                reader.readAsDataURL(files[0])
                reader.onloadend = () => { setProductImage(reader.result) }
            } else {
                alert("File size exceeds 2 MB limit")
                event.target.value = null
            }
        } else {
            alert("Allow JPG,JPEG,PNG types only")
            event.target.value = null
        }



    }

    return (
        <div className='container'>
            <form >
                <div className="mb-3">
                    <label>Product Name<span style={{ color: "red" }}>*</span></label>
                    <input type='text' value={productName} onChange={(e) => setProductName(e.target.value)} className="form-control" />
                    {producterror !== "" && <p style={{ color: "red" }}>{producterror}</p>}
                </div>
                <div className="mb-3">
                    <label>Code<span style={{ color: "red" }}>*</span></label>
                    <input type='text' value={code} onChange={(e) => setCode(e.target.value)} className="form-control" />
                    {codeError !== "" && <p style={{ color: "red" }}>{codeError}</p>}
                </div>
                <div className="mb-3">
                    <label>Categories<span style={{ color: "red" }}>*</span></label>
                    <Select options={option} value={Categories} onChange={(e) => setCategories(e)} />
                    {categoryError !== "" && <p style={{ color: "red" }}>{categoryError}</p>}
                </div>
                <div className="mb-3">
                    <label>Product image<span style={{ color: "red" }}>*</span></label>
                    <input type="file" onChange={HandleImage} className="form-control" />
                    {imageError !== "" && <p style={{ color: "red" }}>{imageError}</p>}
                </div>
                <div className="mb-3">
                    <label>Product Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
                </div>

                <button onClick={handleAdd} className='button'>Add</button>
            </form>
        </div>
    );
}

export default AddProduct;
