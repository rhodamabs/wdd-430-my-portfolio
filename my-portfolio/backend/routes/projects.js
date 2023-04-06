 const express = require('express');
 const Project = require('../models/project');

 const router = express.Router();

router.post('',(req, res, next) => {
  const project = new Project({
    title: req.body.title,
    content: req.body.content
  });
  project.save().then(createdProject => {
    res.status(201).json({
      message : 'Project created successfully',
      projectId: createdProject._id
  });
  });
});

router.patch('/:id', (req,res,next) =>{
  const project = new Project ({
    _id:req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Project.updateOne({_id: req.params.id}, project).
  then(result =>{
    console.log(result);
    res.status(200).json({message: 'Updated Successful'});
  });
});


router.get('',(req,res,next) => {
  Project.find()
    .then(documents => {
      res.status(200).json({
        message: 'Projects were fetched successfully',
        projects: documents
      });
    });
  
});


router.get('/:id',(req,res,next) => {
  Project.findById(req.params.id).then(project => {
    if(project) {
      res.status(200).json(project);
    }else {
      res.status(404).json({message: 'Project not found'});
    }
  });
})


router.delete('/:id',(req, res, next) => {
  Project.deleteOne({ _id : req.params.id})
  .then(result =>{
    console.log(result);
    res.status(200).json({message: 'Project deleted'});
  })
});

module.exports = router;