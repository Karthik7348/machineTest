const express = require("express");
const EmployeeDetails = require("./models/EmployeeDetails");
const SignUp = require("./models/SignUp");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const validator = require("validator");
require("dotenv").config();

app.use(cors());
app.options("*", cors());
app.use(express.json());

const employeeDbConfig = require("./employeeDbConfig");
const signUpDbConfig = require("./signUpDbConfig");

app.get("/getEmployeeDetails", async (req, res) => {
  mongoose.connect(employeeDbConfig.connectionString, {
    useNewUrlParser: employeeDbConfig.useNewUrlParser,
    useUnifiedTopology: employeeDbConfig.useUnifiedTopology,
    dbName: employeeDbConfig.databaseName,
  });
  const employeeDetails = await EmployeeDetails.find();

  if (!employeeDetails) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(employeeDetails);
});

app.get("/getSignUpDetails", async (req, res) => {
  mongoose.connect(signUpDbConfig.connectionString, {
    useNewUrlParser: signUpDbConfig.useNewUrlParser,
    useUnifiedTopology: signUpDbConfig.useUnifiedTopology,
    dbName: signUpDbConfig.databaseName,
  });

  const SignUpDetails = await SignUp.find();

  if (!SignUpDetails) {
    res.status(500).json({
      success: false,
    });
  }

  res.send(SignUpDetails);
});

app.post("/postSignUpDetails", async (req, res) => {
  mongoose.connect(signUpDbConfig.connectionString, {
    useNewUrlParser: signUpDbConfig.useNewUrlParser,
    useUnifiedTopology: signUpDbConfig.useUnifiedTopology,
    dbName: signUpDbConfig.databaseName,
  });

  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({
      success: false,
      error: "username field is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      error: "password field is required",
    });
  }

  const SignUpDetails = new SignUp({
    username,
    password,
  });

  try {
    const createdSignUp = await SignUpDetails.save();
    res.status(201).json(createdSignUp);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});

app.post("/postEmployeeDetails", (req, res) => {
  mongoose.connect(employeeDbConfig.connectionString, {
    useNewUrlParser: employeeDbConfig.useNewUrlParser,
    useUnifiedTopology: employeeDbConfig.useUnifiedTopology,
    dbName: employeeDbConfig.databaseName,
  });

  const { name, Email, MobileNo, Designation, Gender, Course, Img } = req.body;

  // Validate name
  if (!name) {
    return res.status(400).json({
      success: false,
      error: "Name is required",
    });
  }

  // Validate email
  if (!Email) {
    return res.status(400).json({
      success: false,
      error: "Email is required",
    });
  } else if (!validator.isEmail(Email)) {
    return res.status(400).json({
      success: false,
      error: "Invalid email",
    });
  }

  // Validate mobile number
  if (!MobileNo) {
    return res.status(400).json({
      success: false,
      error: "Mobile number is required",
    });
  } else if (!validator.isMobilePhone(MobileNo, "en-IN")) {
    return res.status(400).json({
      success: false,
      error: "Invalid mobile number",
    });
  }

  // Validate designation
  if (!Designation) {
    return res.status(400).json({
      success: false,
      error: "Designation is required",
    });
  }

  // Validate gender
  if (!Gender) {
    return res.status(400).json({
      success: false,
      error: "Gender is required",
    });
  } else if (!["Male", "Female", "Other"].includes(Gender)) {
    return res.status(400).json({
      success: false,
      error: "Invalid gender",
    });
  }

  // Validate course
  if (!Course) {
    return res.status(400).json({
      success: false,
      error: "Course is required",
    });
  }

  // Validate Img
  if (!Img) {
    return res.status(400).json({
      success: false,
      error: "Image is required",
    });
  } else if (
    !validator.isURL(Img) ||
    !(Img.endsWith(".jpg") || Img.endsWith(".png"))
  ) {
    return res.status(400).json({
      success: false,
      error: "Invalid image URL. Only JPG and PNG images are allowed.",
    });
  }

  const employeeDetails = new EmployeeDetails({
    name,
    Email,
    MobileNo,
    Designation,
    Gender,
    Course,
    Img,
  });

  employeeDetails
    .save()
    .then((createdEmployeeDetails) => {
      res.status(201).json(createdEmployeeDetails);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

app.put("/updateEmployeeDetails/:id", (req, res) => {
  mongoose.connect(employeeDbConfig.connectionString, {
    useNewUrlParser: employeeDbConfig.useNewUrlParser,
    useUnifiedTopology: employeeDbConfig.useUnifiedTopology,
    dbName: employeeDbConfig.databaseName,
  });

  const { name, Email, MobileNo, Designation, Gender, Course, Img } = req.body;

  // Validate email
  if (Email && !validator.isEmail(Email)) {
    return res.status(400).json({
      success: false,
      error: "Invalid email",
    });
  }

  // Validate mobile number
  if (MobileNo && !validator.isMobilePhone(MobileNo, "en-IN")) {
    return res.status(400).json({
      success: false,
      error: "Invalid mobile number",
    });
  }

  // Validate gender
  if (Gender && !["Male", "Female", "Other"].includes(Gender)) {
    return res.status(400).json({
      success: false,
      error: "Invalid gender",
    });
  }

  // Validate Img
  if (
    Img &&
    (!validator.isURL(Img) || !(Img.endsWith(".jpg") || Img.endsWith(".png")))
  ) {
    return res.status(400).json({
      success: false,
      error: "Invalid image URL. Only JPG and PNG images are allowed.",
    });
  }

  EmployeeDetails.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: name || undefined,
        Email: Email || undefined,
        MobileNo: MobileNo || undefined,
        Designation: Designation || undefined,
        Gender: Gender || undefined,
        Course: Course || undefined,
        Img: Img || undefined,
      },
    },
    { new: true }
  )
    .then((updatedEmployeeDetails) => {
      res.json(updatedEmployeeDetails);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});
app.put("/updateEmployeeDetails/:id", (req, res) => {
  mongoose.connect(employeeDbConfig.connectionString, {
    useNewUrlParser: employeeDbConfig.useNewUrlParser,
    useUnifiedTopology: employeeDbConfig.useUnifiedTopology,
    dbName: employeeDbConfig.databaseName,
  });

  const { name, Email, MobileNo, Designation, Gender, Course, Img } = req.body;

  // Validate email
  if (Email && !validator.isEmail(Email)) {
    return res.status(400).json({
      success: false,
      error: "Invalid email",
    });
  }

  // Validate mobile number
  if (MobileNo && !validator.isMobilePhone(MobileNo, "en-IN")) {
    return res.status(400).json({
      success: false,
      error: "Invalid mobile number",
    });
  }

  // Validate gender
  if (Gender && !["Male", "Female", "Other"].includes(Gender)) {
    return res.status(400).json({
      success: false,
      error: "Invalid gender",
    });
  }

  // Validate Img
  if (
    Img &&
    (!validator.isURL(Img) || !(Img.endsWith(".jpg") || Img.endsWith(".png")))
  ) {
    return res.status(400).json({
      success: false,
      error: "Invalid image URL. Only JPG and PNG images are allowed.",
    });
  }

  EmployeeDetails.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: name || undefined,
        Email: Email || undefined,
        MobileNo: MobileNo || undefined,
        Designation: Designation || undefined,
        Gender: Gender || undefined,
        Course: Course || undefined,
        Img: Img || undefined,
      },
    },
    { new: true }
  )
    .then((updatedEmployeeDetails) => {
      res.json(updatedEmployeeDetails);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

app.delete("/deleteEmployeeDetails/:id", (req, res) => {
  mongoose.connect(employeeDbConfig.connectionString, {
    useNewUrlParser: employeeDbConfig.useNewUrlParser,
    useUnifiedTopology: employeeDbConfig.useUnifiedTopology,
    dbName: employeeDbConfig.databaseName,
  });

  const id = req.params.id;

  EmployeeDetails.findByIdAndDelete(id)
    .then((deletedEmployeeDetails) => {
      if (!deletedEmployeeDetails) {
        return res.status(404).json({
          success: false,
          error: "Employee details not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Employee details deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://shreyaskumarr62:shreyas@cluster0.din74w0.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "EmployeeDetails",
    }
  )
  .then(() => {
    console.log("Database connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(9000, () => {
  console.log(`Server is Running on http://localhost:3000 port`);
});