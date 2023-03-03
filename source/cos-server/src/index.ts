import express from 'express';

const app = express();



class Cos {

  constructor(cosno: number, durationMs: number, subCoses: number[]) {
    this.cosno = cosno;
    this.durationMs = durationMs;
    this.subCoses = subCoses;
  }

  cosno: number;
  durationMs: number;
  subCoses: number[];

  async run() {
    // console.log(`Running cos: ${this.cosno}`);
    await sleep(this.durationMs);
    this.subCoses.forEach(subCosno => {
      let subCos: Cos | undefined = cosList.find(({ cosno }) => cosno === subCosno); 
      if( subCos )
        subCos.run();
      else
        console.log(`subCof not found..${subCosno}`);  
    });
  }

}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const cosList: Cos[] = [
  new Cos( 30000, 10, [30010, 30011]),
  new Cos( 30001, 20, [30012]),
  new Cos( 30002, 30, [30013,30014]),  
  new Cos( 30003, 10, [30015,30016,30017]),
  new Cos( 30004, 20, [30010]),
  new Cos( 30005, 30, [30019,30010]),  
  new Cos( 30006, 40, [30018,30011]),
  new Cos( 30007, 50, [30013,30014]),
  new Cos( 30008, 60, [30011,30012,30013]),    
  new Cos( 30009, 20, [30015,30011]),  
  new Cos( 30010, 10, [40013,40011]),
  new Cos( 30011, 20, []),
  new Cos( 30012, 30, []),  
  new Cos( 30013, 10, [40019,40018,40017]),
  new Cos( 30014, 20, []),
  new Cos( 30015, 30, []),  
  new Cos( 30016, 40, [40011]),
  new Cos( 30017, 50, []),
  new Cos( 30018, 60, [40013,40014]),    
  new Cos( 30019, 20, []),    
  new Cos( 40010, 10, []),
  new Cos( 40011, 20, []),
  new Cos( 40012, 30, []),  
  new Cos( 40013, 10, []),
  new Cos( 40014, 20, []),
  new Cos( 40015, 30, []),  
  new Cos( 40016, 40, []),
  new Cos( 40017, 50, []),
  new Cos( 40018, 60, []),    
  new Cos( 40019, 20, [])            
]





const cosRunner = async (parCosno: string) => {
  let cos: Cos | undefined = cosList.find(({ cosno }) => cosno.toString() === parCosno); 
  if( cos) {
    await cos.run();
  } else {
    await sleep(10);
  }

}




app.get('/cos/:cosno', async (req, res) => {
    await cosRunner(req.params.cosno);
    res.json({ message: `called cos: ${req.params.cosno}`,});
  });

app.listen(4002, () => {
  console.log(`server running on port 4002`);
});

