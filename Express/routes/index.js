var express = require('express');
var router = express.Router();
let todos = require('../public/todos.json');
const {check , validationResult} = require('express-validator');

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
router.post('/:name/:description', [check('name').notEmpty() , check('description').notEmpty(), check('name').isAlpha()], 
async (req, res, next) => {
  try {
    // validate if the parameters don't exist throw a meaningful error , else perform the request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      throw (new Error(`Error reading the data`));  
    }
    else{
      const { name, description } = req.params;
      todos.push({name:name , description: description});
      res.send(todos);
    }
  } catch(err) {
      response.send(err);
    }
});

/**
 * Edit data with post
 * 
 */

router.post('/edit/:id/:name/:descritpion', check())

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
    response.send(`Upss something went wrong deleting your element ${err}`);
  }
});


module.exports = router;
