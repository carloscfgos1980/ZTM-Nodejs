## Continous Integration and Delivery

# Lesson 1. Introduction to CI and CD

https://academy.zerotomastery.io/courses/1206554/lectures/32983970

# Lesson 2. Continuos Integration (CI)

https://academy.zerotomastery.io/courses/1206554/lectures/32983971

# lesson 3. Continuos Delivery (CD)

https://academy.zerotomastery.io/courses/1206554/lectures/32983973

# Lesson4. Continous deployment (CD)

https://academy.zerotomastery.io/courses/1206554/lectures/32983984

# Lesson 5. Pipelines

https://academy.zerotomastery.io/courses/1206554/lectures/32983985

# Lesson 6. GitHub Actions

https://academy.zerotomastery.io/courses/1206554/lectures/32983986

# Lesson 7. Setting Up GitHub Actions

https://academy.zerotomastery.io/courses/1206554/lectures/32983987

# Lesson 8. Continuos Integratin pipelines

https://academy.zerotomastery.io/courses/1206554/lectures/32983988

# Lesson 9. Build pipeline in Actions

https://academy.zerotomastery.io/courses/1206554/lectures/33045694

N: Here I had a bug in the frontend which I solved by looking at the tutorial repository:
https://github.com/odziem/nasa-project

# Lesson 10. GitHub Actions Markplace

https://academy.zerotomastery.io/courses/1206554/lectures/33045696

N: We can look for actions develop by others in order to create a workflow:
https://github.com/marketplace?type=actions

# Lesson 11. Continuos integration pipeline

https://academy.zerotomastery.io/courses/1206554/lectures/33045698

N: At this point at get ann eror coz MONGO_URL is not available in the github repository since it is storaged in .env which is not loaded to the repository

# Lesson 12. Mocking Databases

https://academy.zerotomastery.io/courses/1206554/lectures/33045701

N: Explanation why using mockig database for CI is not such a good idea. It might introduce new bugs

# Lesson 13. Database with Contibous integration

https://academy.zerotomastery.io/courses/1206554/lectures/33053527

I had a bug that took me like one hour to find it, it ws here because all was in one line instead of two lines:
with:
mongodb-version: ${{ matrix.mongodb-version }}

Solved this issue. MongoDB works fine but I got an error in the in testing posting new launch coz it doe not match any planet. This is solved in next lesson

# Lesson 14. Populating database for Continuos Integration

https://academy.zerotomastery.io/courses/1206554/lectures/33053527

Reppsitory for the actions in test CI
https://github.com/marketplace/actions/mongodb-in-github-actions

              - name: MongoDB in GitHub Actions
                uses: supercharge/mongodb-github-action@1.10.0

the bug is coz the testing file has no access to planet.model we need to add that manually. src/routes/launches/launches.test.js:
const { loadPlanetsData } = require('../../models/planets.model');

    beforeAll(async ()=>{
        await mongoConnect();
        await loadPlanetsData();
    });

2. Second bug. Error by texting frontend. We have no test planned and it is expecting none so we need to make some changes in the package.json in the client (frontend):
   "test": "react-scripts test --passWithNoTests",
