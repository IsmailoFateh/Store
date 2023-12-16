import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom';

import './css/Home.css'

const Products = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

  
    useEffect(() => {
      setLoading(true);
      fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setData(data))
        .catch((e)=> console.log(e))
        .finally(()=> setLoading(false));
    }, []);

    useEffect(() => {
      const filteredProducts = data.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredProducts);
    }, [searchTerm, data]);
  
    const handleSearchChange = event => {
      setSearchTerm(event.target.value);
    };
  
  return (
    <div>
      <div className='input-field'> 
        <input type="text" placeholder="Search " value={searchTerm} onChange={handleSearchChange} /> 
        </div>
    <div className='products-container'>
    {loading && (<div>
        {" "}
        <h1>Loading...</h1>
        </div>)}
        
     

        {searchResults.map(product => (
          <NavLink to={`/product/${product.id}`}>
          <div key={product.id} className='card'>
              <div className='image'><img src={product.image} alt="#"/></div>
              <div className='card-description'>
              <h3>{product.title}</h3>
              <h5>Price: ${product.price}</h5>
              </div>
              
          </div>
          </NavLink>
         
        ))}
    </div>
    </div>
  )
}

export default Products