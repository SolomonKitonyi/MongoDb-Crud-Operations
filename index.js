const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
 .then(()=>console.log("Connected To MongoDb....."))
 .catch(err => console.log("Error",err));

 const courseSchema = mongoose.Schema({
     name:String,
     author:String,
     tags: [String],
     date:{type:Date,default:Date.now},
     isPublished:Boolean
 });
const Course = mongoose.model('Course',courseSchema);

async function createCourse(){
const course = new Course({
    name:'Angular Course',
    author:'Solomon',
    tags:['Angular','Fronted'],
    isPublished:true
});

const result = await course.save();
console.log(result);
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
}

async function updateCourse (id){
    //querry first approach
    /*const course = await Course.findById(id);
    if(!course)return;
        course.isPublished=true;
        course.author='Another author';
        const result= await course.save();
        console.log(result)*/
    //update directly approach
    const result = await Course.updateOne({_id:id},{
        $set:{
            author:'Paul',
            isPublished:false
        }
    });
    console.log(result)

}
updateCourse('60535aa0cfdb4734a9317fc8');