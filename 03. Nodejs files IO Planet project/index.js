const { parse } = require('csv-parse');

const fs = require('fs');

const habitablePlanets =[]

function isHabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6; // This is are physical condictions for habitable planets. Some weirdo chichat
}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment:'#',
        columns: true
    }))
    .on('data', (data)=>{
        if(isHabitablePlanet(data)){
            habitablePlanets.push(data)
        }
    })
    .on('err', (err)=>{
        console.log(err)
    })
    .on('end', () => {
    // console.log(habitablePlanets.map((planet) => {
    //   return planet['kepler_name'];
    // }));
    habitablePlanets.map((planet, index)=>console.log(`planet [${index + 1}] name:`, planet.kepler_name));
    console.log(`${habitablePlanets.length} habitable planets found!`);
  });
