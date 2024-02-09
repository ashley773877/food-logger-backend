import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 8; // indiciates how strong
//the has is going to be (8-12 range) the higher the number
//the longer it will take 


const usersSchema = new mongoose.Schema({
    username: { // field1: string 
        type: String, 
        minLength: 3,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 50,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        max: 200
    },
    admin: {
        type: Boolean,
        default: false
    },
  
}, {
    timestamps: true, // if we create a new resource it will have
    //time stmapts input it by the db of when the recources was created and when the recource was updated
      toJSON: {
        transform: function(doc, retDoc) {
            delete retDoc.password; //removes password from the json doc
            return retDoc;
        }
    } 
});

usersSchema.index({username: 1}) // this is for creating an index 
//which is a folder that will only show you the usernames
usersSchema.index({email: 1})

usersSchema.pre('save', async function(next) {
    // if the password has not change continue
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
});




// {
//     "username": "Ashley1",
//     "email": "miranash24@gmail.com",
//     "password": "ash123",
//     "age": 20
    
//     }



export default mongoose.model('User', usersSchema);