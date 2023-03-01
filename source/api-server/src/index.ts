import express from 'express';
import axios from 'axios';

import Tracer from './Tracer';

const tracer = new Tracer();

const app = express();


app.get('/customers', async (req, res) => {
    console.log('received customers');
    await callCos('30000');
    res.json({ message: 'received customers',});
});
app.get('/customers/:NO', async (req, res) => {
  console.log(`received customers: ${req.params.NO}`);
  await callCos('30001');  
  res.json({ message: `received customers: ${req.params.NO}`,});
});
app.get('/salesorders', async (req, res) => {
  console.log('received salesorders');
  await callCos('30002');  
  res.json({ message: 'received salesorders',});
});
app.get('/salesorders/:NO', async (req, res) => {
  console.log(`received salesorders ${req.params.NO}`);
  await callCos('30003');  
  res.json({ message: `received salesorders: ${req.params.NO}`,});
});
app.get('/productionorders', async (req, res) => {
  console.log('received productionorders');
  await callCos('30004'); 
  res.json({ message: 'received productionorders',});
});
app.get('/productionorders/:NO', async (req, res) => {
  console.log(`received productionorders: ${req.params.NO}`);
  await callCos('30005');
  res.json({ message: `received productionorders: ${req.params.NO}`,});
});
app.get('/invoices', async (req, res) => {
  console.log('received invoices');
  await callCos('30006');
  res.json({ message: 'received invoices',});
});
app.get('/invoices/:NO', async (req, res) => {
  console.log(`received invoices ${req.params.NO}`);
  await callCos('30007');
  res.json({ message: `received invoices: ${req.params.NO}`,});
});
app.get('/payments', async (req, res) => {
  console.log('received payments');
  await callCos('30008');
  res.json({ message: 'received payments',});
});
  app.get('/payments/:NO', async (req, res) => {
  console.log(`received payments ${req.params.NO}`);
  await callCos('30009');
  res.json({ message: `received payments: ${req.params.NO}`,});
});



const callCos = async ( cosno: string ) => {

  try {
    const response = await axios.get(`http://cos-server:4002/cos/${cosno}`);    
    //console.log(response.data);
  } catch (error) {
    console.error(error);
  }    

}
    
   


app.listen(4000, () => {
  console.log(`server running on port 4000`);
});