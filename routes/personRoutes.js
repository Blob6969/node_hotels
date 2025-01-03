const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const {jwtAuthMiddleware, generateToken} = require('../jwt');

router.post('/signup', async (req, res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Data Saved');

        const payload = {
            id: response.id,
            username: response.username
        }
        
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is :", token);

        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.post('/login', async(req, res) => {
    try{
        const {username, password} = req.body;
        const user = await Person.findOne({username: username});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }
        const payload = { 
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);
        res.json({token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/', jwtAuthMiddleware, async (req, res) =>{
   try{
        const data = await Person.find();
        console.log('Data Fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await  Person.findById(userId);
        res.status(200).json({user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.get('/:workType', async(req, res) =>{
    try{
        const workType = req.params.workType;
        if(workType == 'Chef' || workType == 'Manager' || workType == 'Waiter') {
            const response = await Person.find({work: workType});
            console.log('Response Fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async (req, res) => {
     try {
        const personId = req.params.id; 
        const updatedPersonData = req.body; 

        const updatedPerson = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, 
            runValidators: true, });
            
        if (!updatedPerson) {
            return res.status(404).json({ error: 'Person not found' });
    }
        res.json(updatedPerson); }

    catch (error) {
        console.error('Error updating person:', error);
        res.status(500).json({ error: 'Internal server error' });
        }
    });

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; 
        const deletedPerson = await Person.findByIdAndRemove(personId);

    if (!deletedPerson) {
        return res.status(404).json({ error: 'Person not found' });
         }

        res.json({ message: 'Person deleted successfully' });
        } 
    catch (error) {
          console.error('Error deleting person:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });

module.exports = router;