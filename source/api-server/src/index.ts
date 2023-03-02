import express from 'express';
import axios from 'axios';

import {traceObject, getTraceObject} from './traceing';
import {logContent, logUtils} from './logging';

(async () => {

const app = express();

const tracingObj = await getTraceObject();
const logEntry = await logUtils(tracingObj);


app.get('/customers', async (req, res) => {
    console.log('received customers');
    await callCos('30000', req.originalUrl);
    res.json({ message: 'received customers',});
});
app.get('/customers/:NO', async (req, res) => {
  console.log(`received customers: ${req.params.NO}`);
  await callCos('30001', req.originalUrl);  
  res.json({ message: `received customers: ${req.params.NO}`,});
});
app.get('/salesorders', async (req, res) => {
  console.log('received salesorders');
  await callCos('30002', req.originalUrl);  
  res.json({ message: 'received salesorders',});
});
app.get('/salesorders/:NO', async (req, res) => {
  console.log(`received salesorders ${req.params.NO}`);
  await callCos('30003', req.originalUrl);  
  res.json({ message: `received salesorders: ${req.params.NO}`,});
});
app.get('/productionorders', async (req, res) => {
  console.log('received productionorders');
  await callCos('30004', req.originalUrl); 
  res.json({ message: 'received productionorders',});
});
app.get('/productionorders/:NO', async (req, res) => {
  console.log(`received productionorders: ${req.params.NO}`);
  await callCos('30005', req.originalUrl);
  res.json({ message: `received productionorders: ${req.params.NO}`,});
});
app.get('/invoices', async (req, res) => {
  console.log('received invoices');
  await callCos('30006', req.originalUrl);
  res.json({ message: 'received invoices',});
});
app.get('/invoices/:NO', async (req, res) => {
  console.log(`received invoices ${req.params.NO}`);
  await callCos('30007', req.originalUrl);
  res.json({ message: `received invoices: ${req.params.NO}`,});
});
app.get('/payments', async (req, res) => {
  console.log('received payments');
  await callCos('30008', req.originalUrl);
  res.json({ message: 'received payments',});
});
  app.get('/payments/:NO', async (req, res) => {
  console.log(`received payments ${req.params.NO}`);
  await callCos('30009', req.originalUrl);
  res.json({ message: `received payments: ${req.params.NO}`,});
});



const callCos = async ( cosno: string, endpoint: string ) => {

  const { api, tracer, propagator } = tracingObj

  const start = Date.now();

  // Create a new span, link to previous request to show how linking between traces works.
  const requestSpan = tracer.startSpan('requester', {
      kind: api.SpanKind.CLIENT,
      links: (previousReqSpanContext) ? [{ context: previousReqSpanContext }] : undefined,
  });
  requestSpan.setAttribute(spanTag, endpoint);
  requestSpan.setAttribute(`http.target`, endpoint);
  requestSpan.setAttribute(`http.method`, type);
  requestSpan.setAttribute('service.version', (Math.floor(Math.random() * 100)) < 50 ? '1.9.2' : '2.0.0');
  previousReqSpanContext = requestSpan.spanContext();
  const { traceId } = requestSpan.spanContext();


  try {
    const response = await axios.get(`http://cos-server:4002/cos/${cosno}`);    
    //console.log(response.data);
  } catch (error) {
    console.error(error);
  }    
  
  logEntry({
    level: 'info',
    namespace: process.env.NAMESPACE as string,
    job: `api-server`,
    endpointLabel: 'spantag',
    endpoint,
    message: `traceID=${traceId} http.method=GET endpoint=${endpoint} duration=${Date.now() - start}ms`,
  });

}   
   


app.listen(4000, () => {
  console.log(`server running on port 4000`);
});

})();
