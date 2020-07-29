require('dotenv').config();
const app = require('./app');
app.listen(app.get('port'),()=>{
    console.log('SERVER ON PORT', app.get('port'));
})