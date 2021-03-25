const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{useNewUrlParser: true,useUnifiedTopology:true})
 .then(()=>console.log("Connected To MongoDb....."))
 .catch(err => console.log("Error",err));

 const courseSchema = mongoose.Schema({
     name:{
         type:String,
         required:true,
         minlength:4,
         maxlength:25,
        // match: /pattern/
     },
     author:String,
     tags: {
         type:Array,
         validate:{
             //isAsync:true,
             validator: function (v){
                setTimeout(() => {
                   return v && v.length;
                 }, 2000);
             },
             message:'The course should have atleast one tag'
         }
     },
     date:{type:Date,default:Date.now},
     isPublished:Boolean,
     price:{
         type:Number,
         required: function(){return this.isPublished},
         min:20,
         max:200
     },
     category:{
         type:String,
         required:true,
         lowercase:true,
         enum:['web','mobile','network']
     }

 });
const Course = mongoose.model('Course',courseSchema);

async function createCourse(){
const course = new Course({
    name:'paul',
    author:'Solomon',
    tags:['fronted'],
    isPublished:true,
    price:25,
    category:'weB'
});
try {
    const result = await course.save();
    console.log(result); 
} catch (error) {
    console.log(error.message)
}
};

async function getCourses(){
//comparison operators in mongodb
//eq (equal)
//ne (not equal)
//gt (greater than)
//gte (greater than or equal to )
//lt (less than)
//lte (less than or equal to )
//in 
//nin (not in)

    const courses = await Course.
    //find({author:'Solomon',isPublished:true})
    //find({price:{$gte:10,$lt:20}})
    //find({price:{$in: [10,15,20]}})
    //find()
    //.or([{author:'Solomon'},{isPublished:true}])

    //Starts with
    find({author: /^Solomon/})
    

    //ends with
    //you add i for case insensentive
    .find({author:/Solomon$/i})

    //contains
    //you add i for case insensentive
.find({author:/.*Solomon.*/i})
    .limit(10)
    .sort({name:1})
    //.select({name:1,tags:1});
    .count()
    console.log(courses);
};

async function updateCourse (id){
    //querry first approach
    /*const course = await Course.findById(id);
    if(!course)return;
        course.isPublished=true;
        course.author='Another author';
        const result= await course.save();
        console.log(result)*/
    //update directly approach
    const course = await Course.findByIdAndUpdate(id,{
        $set:{
            author:'Elisha',
            isPublished:true
        }
    },{new:true});
    console.log(course)

};

async function removeCourse(id){
    const result = await Course.remove({_id:id});
    console.log(result)
}
createCourse()