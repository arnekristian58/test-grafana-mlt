import express from 'express';

const app = express();


app.get('/customers', (req, res) => {
    console.log('received customers');
    res.json({ message: 'received customers',});
});
app.get('/customers/:NO', (req, res) => {
  console.log(`received customers: ${req.params.NO}`);
  res.json({ message: `received customers: ${req.params.NO}`,});
});
app.get('/salesorders', (req, res) => {
  console.log('received salesorders');
  res.json({ message: 'received salesorders',});
});
app.get('/salesorders/:NO', (req, res) => {
  console.log(`received salesorders ${req.params.NO}`);
  res.json({ message: `received salesorders: ${req.params.NO}`,});
});
app.get('/productionorders', (req, res) => {
  console.log('received productionorders');
  res.json({ message: 'received productionorders',});
});
app.get('/productionorders/:NO', (req, res) => {
  console.log(`received productionorders: ${req.params.NO}`);
  res.json({ message: `received productionorders: ${req.params.NO}`,});
});
app.get('/invoices', (req, res) => {
  console.log('received invoices');
  res.json({ message: 'received invoices',});
});
app.get('/invoices/:NO', (req, res) => {
  console.log(`received invoices ${req.params.NO}`);
  res.json({ message: `received invoices: ${req.params.NO}`,});
});
app.get('/payments', (req, res) => {
  console.log('received payments');
  res.json({ message: 'received payments',});
});
  app.get('/payments/:NO', (req, res) => {
  console.log(`received payments ${req.params.NO}`);
  res.json({ message: `received payments: ${req.params.NO}`,});
});

app.listen(4000, () => {
  console.log(`server running on port 4000`);
});