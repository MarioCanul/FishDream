const mongoose =require('mongoose');

// console.log(process.env.MONGODB_URI);
const URI = process.env.MONGODB_URI ;
mongoose.connect(URI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false

})
.then(result =>console.log('DB is conected ok'))
.catch(error =>console.error(error))
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log('DB is Conected');
// });