const  express = require("express");

const router = express.Router();

const Distribution =require("../../models/Distributor_manager/distribution");

//test
router.get("/test",(req,res) => res.send("Distribution routes working"));

router.post("/",(req, res)=>{
   Distribution.create(req.body)
   .then(()=>res.json({msg:"order added successfully"}))
   .catch(()=>res.status(400).json({msg:"order adding failed"}));

});

router.get("/",(req, res) => {
   Distribution.find()
   .then((distribution) => res.json(distribution))
   .catch((err) => res.status(400).json({ msg: "No distribution find" }));
});

router.get("/:id", (req, res) => {
   Distribution 
   .findById(req.params.id)
   .then((distribution) => res.json(distribution))
   .catch(() => res.status(400).json({ msg: "cannot find this employee"}));
});
router.put("/:id",(req,res) => {
   Distribution.
   findByIdAndUpdate(req.params.id, req.body).then(() => 
      res
   .json({ msg: "update successfully" }))
   .catch(() => res.status(400).json({ msg: "update failed" }));

});

router.delete("/:id", (req, res) => {
   Distribution.findByIdAndDelete(req.params.id)
   .then((distribution) => {
      if(!distribution){
         return res.status(404).json({msg: "Distribution not found"});
      }
  res.status(200).json({msg:"Deleted successfully"});
   })
   .catch((err) => 
      res.status(400).json({ msg: "Error deleting distribution", error:err })
   );
});
module.exports = router;
