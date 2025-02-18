const enquiryModel = require("../../models/enquiry");

// Insert API
let enquiryInsert = (req, res) => {
  console.log(req.body);
  let { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  let enquiry = new enquiryModel({
    name: name,
    email: email,
    phone: phone,
    message: message,
  });
  enquiry
    .save()
    .then(() => {
      res.send({
        status: 1,
        msg: "Enquiry saved successfully",
      });
    })
    .catch((error) => {
      res.send({
        status: 0,
        msg: "Error while saving enquiry",
        error: error,
      });
    });
};

// Get API
let enquiryDisplay = async (req, res) => {
  let enquiryList = await enquiryModel.find();

  res.status(200).json({
    status: 1,
    msg: "Enquiry List",
    data: enquiryList,
  });
};

// Delete API
let enquiryDelete = async (req, res) => {
  let enquiryID = req.params.id;
  let deleteEnquiry = await enquiryModel.deleteOne({ _id: enquiryID });
  res.status(200).json({
    status: 1,
    msg: "API delete sucessfully",
    id: enquiryID,
    delResponse: deleteEnquiry,
  });
};

// Update API
let enquiryUpdate = async (req, res) => {
  let enquiryID = req.params.id;
  let { name, email, phone, message } = req.body;
  let updateObj = {
    name: name,
    email: email,
    phone: phone,
    message: message,
  };
  let updateResponse = await enquiryModel.updateOne(
    { _id: enquiryID },
    updateObj
  );
  res.status(200).json({
    status: 1,
    msg: "Enquiry update successfully",
    data: updateResponse,
    id: enquiryID,
  });
};
module.exports = {
  enquiryInsert,
  enquiryDisplay,
  enquiryDelete,
  enquiryUpdate,
};
