const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main().then(() =>
    {console.log('MongoDB connection successful')})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp_chat');
    console.log('Connected to MongoDB');
}

let allChats =([
    {
    from: "Alice",
    to: "Bob",
    msg: "Hello, Bob! How are you?",
    created_at: new Date() // Current date and time at random 

}
,
{
    from: "Bob",
    to: "Alice",
    msg: "Hi, Alice! I'm good, thanks for asking.",
    created_at: new Date() // Current date and time at random
}
,
{
    from: "Alice",
    to: "Bob",
    msg: "Glad to hear that! Are we still on for lunch tomorrow?",
    created_at: new Date() // Current date and time at random
}
,
{   
    from: "Bob",
    to: "Alice",
    msg: "Yes, absolutely! Looking forward to it.",
    created_at: new Date() // Current date and time at random
}
]);
Chat.insertMany(allChats);
