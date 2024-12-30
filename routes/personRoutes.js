const express = require('express');
const router = express.Router();

const Person = require('../models/person');

router.post('/', async (req, res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Data Saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/', async (req, res) =>{
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