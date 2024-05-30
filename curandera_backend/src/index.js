const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost:27017/curandera', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());

// Modelo de Producto
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});

const Product = mongoose.model('Product', productSchema);

// Crear Producto
app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).send(product);
});

// Obtener Productos
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// Actualizar Producto
app.patch('/products/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(product);
});

// Eliminar Producto
app.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Añadir ruta para la raíz
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
