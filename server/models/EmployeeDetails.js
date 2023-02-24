const mongoose = require("mongoose");
const validator = require("validator");

const employeeDetailsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  MobileNo: {
    type: String,
    required: true,
  },
  Designation: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Course: {
    type: String,
    required: true,
  },
  Img: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const extension = value.split(".").pop().toLowerCase();
        return extension === "jpg" || extension === "png";
      },
      message: "Invalid file type",
    },
  },
});

const EmployeeDetails = mongoose.model(
  "EmployeeDetails",
  employeeDetailsSchema
);

module.exports = EmployeeDetails;
