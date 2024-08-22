import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const myServer = express();
const portUsed = 5500;

myServer.use(bodyParser.urlencoded({ extended: true }));
myServer.use(express.static("public"));

myServer.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://bored-api.appbrewery.com/random');
        const result = response.data;
        console.log("API response:", result); 
        res.render('index.ejs', { answer: result });
    } catch (error) {
        console.error("Error fetching activity:", error.message);
        res.render('index.ejs',{error:error.message}); 
    }
});

myServer.post('/',async (req,res)=>{
    try {
        console.log(req.body);
        const type = req.body.type;
        const participants = req.body.participants;
        const response = await axios.get(
            `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
        );
        const result = response.data;
        console.log(result);
        res.render('index.ejs',{
                data: result[Math.floor(Math.random() * result.length)]
        });  
    }catch (error){
        console.error('failed to make request:',error.message);
        res.render('index.ejs',{
            error: 'No activities match your criteria.'
        }); 
    }
})

myServer.listen(portUsed, () => {
    console.log(`The port is currently running at port ${portUsed}`);
});
