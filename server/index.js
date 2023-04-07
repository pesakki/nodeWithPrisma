//IMPORTS THE REQUIRED MODULES......
const express = require("express")
const Prisma = require('prisma/prisma-client')
const {check, validationResult} = require('express-validator');
const bodyParser = require('body-parser');

//INITIALIZINGGGG......
const app = express()
const prisma = new Prisma.PrismaClient()

app.use(bodyParser.json())

//ROUTES.....
app.post('/create',[
  //VALIDATINGGG.....
  check('Firstname', 'Firstname length should be 3 to 20 characters')
                  .isLength({ min: 3, max: 20 }),
  check('Lastname', 'Lastame length should be 1 to 20 characters')
                     .isLength({ min: 1, max: 20 }),
  check('Email', 'Email length should be 5 to 30 characters')
                  .isEmail().isLength({ min: 1, max: 30 }),
  check('Mob', 'Mobile number should contains 10 digits')
                  .isLength({ min: 10, max: 10 }),
  check('DOB', 'DOB length should be 3 to 20 characters')
                  .isLength({ min: 3, max: 20 }),
  check('address', 'address length should be 3 to 20 characters')
                  .isLength({ min: 3, max: 20 }),
  check('accountNumber', 'acountNumber length should be 3 to 20 characters')
                  .isLength({ min: 3, max: 20 }),
  check('ifscCode', 'ifscCode length should be 3 to 20 characters')
                  .isLength({ min: 3, max: 20 }),
  check('bankName', 'bankName length should be 3 to 20 characters')
                  .isLength({ min: 3, max: 20 }),
  check('branchName','branchName length should be 3 to 20 characters')
                  .isLength({ min: 3, max: 20 }),
  ],
  //CREATINGG....
  async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors);
    }
    else {
    const accountNumber = parseInt(req.body.accountNumber, 10);
    const ifscCode = parseInt(req.body.ifscCode, 10);

    const employee = await prisma.employee.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        Mob: req.body.Mob,
        email: req.body.email,
        DOB: new Date(req.body.DOB),
        address: req.body.address,
        accountNumber: accountNumber,
        ifscCode: ifscCode,
        bankName: req.body.bankName,
        branchName: req.body.branchName
      }
    });
    res.status(200).json({ message: 'Employee created', employee });
  }
  } catch (err) {
    console.error(err);
  }
})

//GET SINGLE EMPLOYEE......
app.get('/getEmpolyeeDetails',async(req,res)=>{
  try{
    const employee = await prisma.employee.findUnique({
      where : {
        id: req.body.id
      }
    })
    res.status(200).send({"Details":employee})
  }
  catch{
    res.send("Error")
  }
})

//GET ALL EMPLOYEES....
app.get('/employees', async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json({ message: 'Success', employees });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting employees', error: err });
  }
});

//UPDATINGGGG......
app.put('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await prisma.employee.update({
      where: { id: parseInt(id, 10) },
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        Mob: req.body.Mob,
        email: req.body.email,
        DOB: new Date(req.body.DOB),
        address: req.body.address,
        accountNumber: req.body.accountNumber,
        ifscCode: req.body.ifscCode,
        bankName: req.body.bankName,
        branchName: req.body.branchName,
      },
    });
    res.status(200).json({ message: 'Employee updated', employee: updatedEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating employee', error: err });
  }
});

//DELETINGGG.....
app.delete('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await prisma.employee.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(200).json({ message: 'Employee deleted', employee: deletedEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting employee', error: err });
  }
});

//LISTENING PORT......
app.listen(9000,()=>{
  console.log("Server Started")
})