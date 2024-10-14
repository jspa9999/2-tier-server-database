const mongoose = require("mongoose");


let studentSchema = new mongoose.Schema({

   firstName:{
      type: String,
        validate: {
               validator: function(v) {
                 return /^[A-Za-z]{2,20}(?: [A-Za-z]{2,20})?$/.test(v);
               },
               message: props => `${props.value} is not a valid firstName!`
             },
             required: [true, 'User firstName required']
           },

   lastName:{
      type: String,
        validate: {
               validator: function(v) {
                 return /^[A-Za-z]{2,20}(?: [A-Za-z]{2,20})?$/.test(v);
               },
               message: props => `${props.value} is not a lastName!`
             },
             required: [true, 'User lastName required']
           },

   age:{
      type:Number,
      min:[18,"you are too young to create account"],
      max:[100,"you are too old to create account"],   
      required:true,
   },
   gender:{
      type:String,
      require:true,
      lowercase:true,
      enum:["male","female"]
   },
   email:{
       type: String,
         validate: {
                validator: function(v) {
                  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
                },
                message: props => `${props.value} is not a valid email Id!`
              },
              required: [true, 'User email Id required']
            },

   phoneNumber:String,
   maritalStatus:String,
})

    let Student = new mongoose.model("students",studentSchema);

   let saveToDB = async ()=>{
      try {
      let sree = new Student({
         firstName:"Jaya",
         lastName:"Balan",
         age:27,
          gender:"MALE",
         email:"js@gmail.com",
         phoneNumber:"91-8977747647",
         maritalStatus:"single",
         }) 

    let abhi = new Student({
      firstName:"Abhilash",
      lastName:"Balan",
      age:27,
       gender:"male",
      email:"abhi@gmail.com",
      phoneNumber:"91-8654747647",
      maritalStatus:"single",
      }) 

      let suji = new Student({
         firstName:"Sujan",
         lastName:"Gorla",
         age:24,
          gender:"male",
         email:"suji@gmail.com",
         phoneNumber:"91-9654747647",
         maritalStatus:"single",
         }) 



      
      Student.insertMany([sree,abhi]);
     console.log("saved to MDB successfully");
   } catch (error) {
      console.log("unable to save");
   }
      
}

let getDataFromDB = async ()=>{
  let studentsData = await Student.find();
  console.log(studentsData);
}

let connectToMDB = async ()=>{

   try {

    await mongoose.connect("mongodb+srv://teddy888:butterfly888@cluster0.w3kth.mongodb.net/Database1?retryWrites=true&w=majority&appName=Cluster0"
       );

        console.log("successfuly connected to MDB"); 
        //saveToDB();
        getDataFromDB();
        
   } catch (error) {
     console.log("unable to connect to MDB");
     console.log(error);
   }
}
connectToMDB();