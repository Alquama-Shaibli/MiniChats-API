const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // to parse form data



main().then(() =>
    {console.log('MongoDB connection successful')})

.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp_chat');
    console.log('Connected to MongoDB');

}


// index route 
//chats ---> show all chats
app.get('/chats',async(req, res) => {
   let chats= await Chat.find();
    console.log(chats);
    res.render('index.ejs', { chats });
});


// new chat creation
app.get('/chats/new', (req, res) => {
    res.render('new.ejs');
});


//post new chat 
app.post('/chats', (req, res) => {
 let { from, to, msg } = req.body;
 let newChat = new Chat({
    from : from, 
    to: to,
    msg: msg, 
    created_at: new Date() });
     newChat.save()
       .then(() => 
             console.log('New chat saved'))
       .catch((err) => 
             console.log(err));

    
    res.redirect('/chats');}
);

// Edit chat
app.get('/chats/:id/edit', async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render('edit.ejs', { chat });
});


// Update chat
app.put('/chats/:id', async (req, res) => {
    let { id } = req.params;
    let { msg : newmsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newmsg },{runValidators:true, new:true});
    res.redirect('/chats');
});


// Delete chat
app.delete('/chats/:id', async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect('/chats');
});


let chat1 = new Chat({
    from: "Alice",
    to: "Bob",
    msg: "Hello, Bob! How are you?",
    created_at: new Date() // Current date and time at random 

});

chat1.save().then((res) => console.log(res))
.catch((err) => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
