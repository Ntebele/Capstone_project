import express from 'express';
import  getRecommendation from './bootcamp/recomm.js';
import sqlite3 from 'sqlite3';
import exphbs from 'express-handlebars';




import { create, getDetails, deleteUser, updateUser, UserComments, login, aim, images } from './code.sql.js';




const app = express();


app.use(express.static('public'))
app.use(express.json())




app.get('/api/details', async function (req, res) {
  const users_info = await getDetails()


  res.json({
    users_info
  })
});


app.post('/api/details/login', async function (req, res) {
  const email = req.body.email;
  const password_hash = req.body.password_hash;

  const loginResult = await login(email);

  const username = loginResult[0].email;
  const password = loginResult[0].password_hash;
  console.log(username + password)
  if (email === username && password === password_hash) {
    res.json({
      status: 'Log-in-successful',
      loginResult
    });
  } else {
    res.json({
      status: 'Login-failed',
    });
  }
});


app.post('/api/details/create', async function (req, res) {
  const email = req.body.email
  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const occupation = req.body.occupation
  const numbers = req.body.numbers
  const addresss = req.body.addresss
  const password_hash = req.body.password_hash



  const users_info = await create(email, first_name, last_name, occupation, numbers, addresss, password_hash)


  res.json({

    users_info,
    status: 'successfully registered'
  })
});

app.post('/api/details/aim', async function (req, res) {

  const first_name = req.body.first_name
  const brief = req.body.brief


  await aim(brief, first_name)

  res.json({

     
    status: 'successfully submitted'
  })
});

app.post('/api/details/images', async function (req, res) {


  const picture_data = req.body.picture_data

  await images(picture_data)

  res.json({


    status: 'successfully submitted'
  })
});

app.post('/api/details/UserComments', async function (req, res) {


  const first_name = req.body.first_name
  const comment = req.body.comment

  await UserComments(comment, first_name)

  res.json({


    status: 'successfully uploaded'
  })
});

app.post('/api/details/deleteUser', async function (req, res) {
  const email = req.body.email


  await deleteUser(email)
  const users_info = await getDetails()



  res.json({

    users_info,
    status: 'success'
  })
});
app.post('/api/recomm', function(req, res) {
  const FOS = req.body.FOS;
  const soil = req.body.soil;
  const rainfall = req.body.rainfall;
  const waterTable = req.body.waterTable;

  if (!FOS || !soil || !rainfall || !waterTable) {
    return res.status(400).json({
      error: 'Please enter all the information requested'
    });
  }

  const recommendation = getRecommendation(FOS, soil, rainfall, waterTable);

  return res.json({
    recommendation: recommendation
  });
});




app.post('/api/details/updateUser', async function (req, res) {

  const email = req.body.email
  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const occupation = req.body.occupation
  const numbers = req.body.numbers
  const addresss = req.body.addresss
  const password_hash = req.body.password_hash

  const users_info = await updateUser(email, first_name, last_name, occupation, numbers, addresss, password_hash)
  res.json({

    users_info,
    status: 'successfully updated'
  })
});












const PORT = process.env.PORT || 4011;
app.listen(PORT, () => `Server started ${PORT}`)