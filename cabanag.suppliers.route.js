// supplierRoutes.js
const express = require('express');
const router = express.Router();

// Example in-memory supplier list (replace with DB in real app)
let suppliers = [
  { id: 1, name: 'ABC Supplies', contact: 'abc@example.com' },
  { id: 2, name: 'XYZ Traders', contact: 'xyz@example.com' }
];

// GET all suppliers
router.get('/', (req, res) => {
  res.json(suppliers);
});

// GET supplier by ID
router.get('/:id', (req, res) => {
  const supplierId = parseInt(req.params.id, 10);
  if (isNaN(supplierId)) {
    return res.status(400).json({ error: 'Invalid supplier ID' });
  }

  const supplier = suppliers.find(s => s.id === supplierId);
  if (!supplier) {
    return res.status(404).json({ error: 'Supplier not found' });
  }
  res.json(supplier);
});

// POST create new supplier
router.post('/', (req, res) => {
  const { name, contact } = req.body;

  // Basic validation
  if (!name || typeof name !== 'string' || !contact || typeof contact !== 'string') {
    return res.status(400).json({ error: 'Name and contact are required and must be strings' });
  }

  const newSupplier = {
    id: suppliers.length ? suppliers[suppliers.length - 1].id + 1 : 1,
    name,
    contact
  };
  suppliers.push(newSupplier);
  res.status(201).json(newSupplier);
});

// PUT update supplier
router.put('/:id', (req, res) => {
  const supplierId = parseInt(req.params.id, 10);
  if (isNaN(supplierId)) {
    return res.status(400).json({ error: 'Invalid supplier ID' });
  }

  const supplierIndex = suppliers.findIndex(s => s.id === supplierId);
  if (supplierIndex === -1) {
    return res.status(404).json({ error: 'Supplier not found' });
  }

  const { name, contact } = req.body;
  if (!name || typeof name !== 'string' || !contact || typeof contact !== 'string') {
    return res.status(400).json({ error: 'Name and contact are required and must be strings' });
  }

  suppliers[supplierIndex] = { id: supplierId, name, contact };
  res.json(suppliers[supplierIndex]);
});

// DELETE supplier
router.delete('/:id', (req, res) => {
  const supplierId = parseInt(req.params.id, 10);
  if (isNaN(supplierId)) {
    return res.status(400).json({ error: 'Invalid supplier ID' });
  }

  const supplierIndex = suppliers.findIndex(s => s.id === supplierId);
  if (supplierIndex === -1) {
    return res.status(404).json({ error: 'Supplier not found' });
  }

  suppliers.splice(supplierIndex, 1);
  res.status(204).send(); // No content
});

module.exports = router;
