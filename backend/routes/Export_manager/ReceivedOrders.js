// const express = require("express");
// const router = express.Router();
// const Export = require("../models/export");

// router.get("/test", (req, res) => res.send("ReceivedOrders routes working"));

// router.post("/",(req,res)=>{
//     Export.create(req.body)
//     .then(()=>res.json({msg:"Order added successfully "}))
//     .catch(()=>res.status(400).json({msg:"Order adding failed"}));
// });

// router.get("/",(req,res)=>{
//     Export.find()
//     .then((exports)=> res.json(exports))
//     .catch(()=> res.status(400).json({ msg: "No exports found"}));
// });

// router.get("/:id",(req,res) => {
//     Export.findById(req.params.id)
//     .then((exports)=>res.json(exports))
//     .catch(()=>res.status(400).json({ msg: "cannot find this export" }));
// });

// router.delete("/:id", (req, res) => {
//     Export.findByIdAndDelete(req.params.id)
//     .then(() => res.json({ msg: "deleted successfully" }))
//     .catch(() => res.status(400).json({ msg: "cannot delete" }));
// });

 
// // PUT route - Update export by ID
// router.put("/:id", (req, res) => {
//     Export.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => res.json({ msg: "update successful" }))
//     .catch(() => res.status(400).json({ msg: "update failed" }));
// });

// // DELETE route - Delete export by ID
// router.delete("/:id", (req, res) => {
//     Export.findByIdAndDelete(req.params.id)
//     .then(() => res.json({ msg: "deleted successfully" }))
//     .catch(() => res.status(400).json({ msg: "cannot delete" }));
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const Export = require("../../models/Export_manager/export");

router.get("/test", (req, res) => res.send("ReceivedOrders routes working"));

router.post("/",(req,res)=>{
    Export.create(req.body)
    .then(()=>res.json({msg:"Order added successfully "}))
    .catch(()=>res.status(400).json({msg:"Order adding failed"}));
});

router.get("/",(req,res)=>{
    Export.find()
    .then((exports)=> res.json(exports))
    .catch(()=> res.status(400).json({ msg: "No exports found"}));
});

router.get("/:id",(req,res) => {
    Export.findById(req.params.id)
    .then((exports)=>res.json(exports))
    .catch(()=>res.status(400).json({ msg: "cannot find this export" }));
});

router.delete("/:id", (req, res) => {
    Export.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "deleted successfully" }))
    .catch(() => res.status(400).json({ msg: "cannot delete" }));
});

 
// PUT route - Update export by ID
router.put("/:id", (req, res) => {
    Export.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "update successful" }))
    .catch(() => res.status(400).json({ msg: "update failed" }));
});

// DELETE route - Delete export by ID
router.delete("/:id", (req, res) => {
    Export.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "deleted successfully" }))
    .catch(() => res.status(400).json({ msg: "cannot delete" }));
});

module.exports = router;