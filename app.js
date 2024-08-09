const express = require('express');
const Joi = require('joi')
const app = express();
app.use(express.json());

const employees = [
    {id: 1, name: "Gaurav Sharma", position: "Allrounder"},
    {id: 2, name: "Rajiv Shrestha", position: "Senior Frontend Developer"}, 
    {id: 3, name: "Sudeep Desar", position: "Android Developer"}, 
    {id: 4, name: "Deepam Dhakal", position: "IOS Developer"}, 
    {id: 5, name: "Ashim Kharel", position: "Dudhbhat"}
]

app.get('/', (req, res) => {
    res.send('Hello World, This is the homepage')
}); 

app.get('/employee', (req, res) => {
    const id = req.query.id
    if(id) {
        res.send('Hello, I am employee with id: ' + id)
    }else{
        res.send(employees)
    }
})

app.get('/employee/:id', (req, res) => {
    const empDetail = employees.find( n => n.id === parseInt(req.params.id));
    if(empDetail){
    res.send(empDetail)
    } else {
        res.status(404).send({message: `Employee with given id not found`})
    }
})

app.post('/employee', (req, res) => {
    const {error} = validateEmployee(req.body);
    if(error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const employee = {
        id: employees.length +1,
        name: req.body.name,
        position: req.body.position
    };
    employees.push(employee);
    res.send(employee) 
})

app.put('/employee/:id', (req, res) => {
    const empDetail = employees.find( n => n.id === parseInt(req.params.id));
    if(!empDetail) {
      return res.status(404).send('The employee with the given ID was not found.')
    }
    const {error} = validateEmployee(req.body);
    if(error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    empDetail.name = req.body.name;
    res.send(empDetail); 
});

app.delete('/employee/:id', (req, res) => {
    const empDetail = employees.find( n => n.id === parseInt(req.params.id));
    if(!empDetail) {
      return res.status(404).send('The employee with the given ID was not found.')
    }
    const index = employees.indexOf(empDetail)
    employees.splice(index, 1)
    res.send(empDetail)

})


function validateEmployee(empDetail) {
      const schema = Joi.object({
        name: Joi.string().min(3).required(),
        position: Joi.string().min(2).required()
    });
    return schema.validate(empDetail);
}


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running in port: ${port} `);
});
