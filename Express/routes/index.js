var express = require('express');
var router = express.Router();
let todos = require('../public/todos.json');
const {check , validationResult} = require('express-validator');
const { response } = require('express');

/* GET home page. */
router.get('/', function(req, res, next) {
  next();
});
/**
 * Get all todos
 */
router.get('/', (req, res) => {
  res.send(todos);
});

/**
 * Create a new Todo with the paramers of the body
 * @name: String
 * @description: Text
 * Validation done with express-validator pacakge
 */
router.post('/:name/:description', [check('name').notEmpty() , check('description').notEmpty()] , 
async (req, res, next) => {
  try {
    // validate if the parameters don't exist throw a meaningful error , else perform the request
    const errors = validationResult(req);
    if(!errors.isEmpty()) {throw (new Error(`Error reading the data`));}  
    else{
      const { name, description } = req.params;
      todos.push({name:name , description: description});
      res.send(todos);
    }
  } catch(err){
      response.send(`An error happened: ${err}`);
    }
});

/**
 * Edit data with post
 * 
 */
router.put('/:id/:name/:description', [check('name').notEmpty() , check('description').notEmpty()] , 
async (req, res , next) =>{
  try{
    const errors = validationResult(req);
    if(!errors.isEmpty()) throw (new Error(`Error updating the data`));  
    else{
      const { id , name, description } = req.params;
      const el = {id: id, name: name, descritpion: description};
      todos[el.id-1] = el;
      res.send(todos);
    }  
  }catch(err){
    res.send(`${err}`);
  }
});

/**
 * Delete a Todo param , it deletes the id requested and also doesn't leave an empty space to memory
 */
 let deleted = 0;
router.delete('/:id',(request, response) => {
  const { id } = request.params;
  try{
    if(id > todos.length || id < 0){
      throw (new Error('Id was not valid'));
    }  
    else{
      todos = todos.filter((item) =>{ 
        return item.id !== id;  
     });
     deleted++;
     delete todos[id-deleted];
     todos = todos.filter(function (el) {
      return el != null;
    });
     response.send(todos);
    }
  } 
  catch(err){
    response.send(`Upss something went wrong deleting your element: ${err}`);
  }
});


module.exports = router;
