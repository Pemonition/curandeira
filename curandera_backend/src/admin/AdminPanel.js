// curandera_frontend/src/admin/AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0 });

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
    }
    fetchProducts();
  }, []);

  const addProduct = async () => {
    const response = await axios.post('http://localhost:3001/products', newProduct);
    setProducts([...products, response.data]);
    setNewProduct({ name: '', description: '', price: 0 });
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:3001/products/${id}`);
    setProducts(products.filter(product => product._id !== id));
  };

  return (
    <div>
      <h1>Administración de Productos</h1>
      <div>
        <input type="text" placeholder="Nombre" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input type="text" placeholder="Descripción" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
        <input type="number" placeholder="Precio" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })} />
        <button onClick={addProduct}>Agregar Producto</button>
      </div>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            <button onClick={() => deleteProduct(product._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
