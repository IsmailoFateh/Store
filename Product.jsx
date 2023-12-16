import React, { useState, useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom';

import './css/Product.css'

const Product = () => {
    let { id } = useParams();
    const navigate = useNavigate()
    console.log(id)
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            setProduct(await response.json());
            setLoading(false);
        }

        getProduct();
    }, [id]);

    const handleCart = (product, redirect) => {
        console.log(product)
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const isProductExist = cart.find(item => item.id === product.id)
        if(isProductExist) {
          const updatedCart = cart.map(item => {
            if(item.id === product.id) {
              return {
                ...item,
                quantity: item.quantity + 1
              }
            }
            return item
          })
          localStorage.setItem('cart', JSON.stringify(updatedCart))
        } else {
          localStorage.setItem('cart', JSON.stringify([...cart, {...product, quantity: 1}]))
        }
        alert('Product added to cart')
        if(redirect) {
            navigate('/cart');
        }
      }

      
    if (loading) {
        return <h1>Loading...</h1>;
    }



    return (

        <div className='product-container'>

            <div key={product.id} className='product-content'>
                <div className='img-field'><img src={product.image} alt="#" /></div>
                <div className='card-description'>
                    <h1>{product.title}</h1>
                    <h2>Price: {product.price}</h2>
                    <h3>{product.description}</h3>
                    
                </div>
                <div className="btns">
                    <button onClick={() => handleCart(product)}>Add to Cart</button>
                    
                </div>
            </div>



        </div>
    )
}

export default Product
