import axios from 'axios';

console.log('Tester started..')


function getApi(): string {

  const endpoints = [
    'customers',
    'customers/<NO>',
    'salesorders',
    'salesorders/<NO>',
    'productionOrders',
    'productionOrders/<NO>',
    'invoices',
    'invoices/<NO>',
    'payments',
    'payments/<NO>'
  ]

  const index = Math.floor(Math.random() * 10);

  let ret = endpoints[index].replace('<NO>', (Math.round(Math.random() * 900000) + 100000).toString());

  return ret;
}



const makeRequest = async () => {

  const endpoint = getApi();

  try {
    const response = await axios.get(`http://api-server:4000/${endpoint}`);
  } catch (error) {
    console.error(error);
  }    

  // Sometime in the next two seconds, but larger than 100ms
  const nextReqIn = (Math.random() * 1000) + 100;
  setTimeout(() => makeRequest(), nextReqIn); 
}
    
   



(async () => {

  // Kick off four requests that cycle at regular intervals
  setTimeout(() => makeRequest(), 3000);
  setTimeout(() => makeRequest(), 3500);
  setTimeout(() => makeRequest(), 4000);
  setTimeout(() => makeRequest(), 4500);
  setTimeout(() => makeRequest(), 5000);
  setTimeout(() => makeRequest(), 5500);
  setTimeout(() => makeRequest(), 6000);
  setTimeout(() => makeRequest(), 6500);
  setTimeout(() => makeRequest(), 7000);
  setTimeout(() => makeRequest(), 7500);
  setTimeout(() => makeRequest(), 8000);
  setTimeout(() => makeRequest(), 8500);

 
})();