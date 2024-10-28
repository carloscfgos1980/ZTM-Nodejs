## 03. Nodejs files IO Planet project

# Website for the data

https://exoplanetarchive.ipac.caltech.edu/docs/data.html

- Run program:
  node index.js

# Lesson 1. Exploring Planets With Node

https://academy.zerotomastery.io/courses/1206554/lectures/31818712

# Lesson 2. Importing Kepler Space Telescope Data

https://academy.zerotomastery.io/courses/1206554/lectures/31774634

CSV stands for Comma Separate Value

# Lesson 3. Setting Up Our CSV Parser

https://academy.zerotomastery.io/courses/1206554/lectures/31774977

npm init -y
npm csv-parse

# Lesson 4. Streaming Large Data Files

https://academy.zerotomastery.io/courses/1206554/lectures/31774749

N: We use stream method so it is read line by line and not the whole document. This is the recommended method when it is a large document (CSV).

# Lesson 5. Reading Our Planets Data

https://academy.zerotomastery.io/courses/1206554/lectures/31775014

- Download a csv file from a pdf online
- read the file (const fs = require('fs');)

1. Read the CSV file
   fs.createReadStream('kepler_data.csv')

2. emit an event to read the data
   .on('data', (data)=>{

3. emit an event to catch errors
   .on('err', (err)=>{

4. finish the function and console the results
   .on('end', () => {

# Lesson 6. Parsing Our Planets Data

https://academy.zerotomastery.io/courses/1206554/lectures/31775197

- Use third party npm package (csv-parse)
- API (stream). https://csv.js.org/parse/api/stream/

  .pipe(parse({
  comment:'#',
  columns: true
  }))

  - This CSV file has a lot of commets so we especify that in the object inside the parser in order to ignore those lines.
  - setting columns to true will create and array of objects

# Lesson 7. Finding Habitable Planets

https://academy.zerotomastery.io/courses/1206554/lectures/31775425

1. This function will narrow down the planets we are going to store in result array (isHabitablePlanets):

function isHabitablePlanet(planet){
return planet['koi_disposition'] === 'CONFIRMED'
&& planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
&& planet['koi_prad'] < 1.6;
}

2. Place the function above as a condiction in the emit event that push the data into the empty array we created (habitablePlanet)
   .on('data', (data)=>{
   if(isHabitablePlanet(data)){
   habitablePlanets.push(data)
   }
   })

# Lesson 8. Exploring Habitable Planets

https://academy.zerotomastery.io/courses/1206554/lectures/31989140

- Console log the planets and the amount of planets:

  })
  .on('end', () => {
  habitablePlanets.map((planet, index)=>console.log(`planet [${index + 1}] name:`, planet.kepler_name));
  console.log(`${habitablePlanets.length} habitable planets found!`);
  });

  Note: I made it a bit more complicated that the tutorial by using the index argument and passing into the console log response:

      habitablePlanets.map((planet, index)=>console.log(`planet [${index + 1}] name:`, planet.kepler_name));

**Resume:**

- Donwload a CVS document with all the planets data from NASA offitial website
- Storage the desired (habitable) planets in a constant using fs tream and CSV parser
- console log the result

# The End

This module is about how to use Nodejs to get data, filtered and storage in our Hd
