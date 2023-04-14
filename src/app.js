const app = require('./server');
require('express-async-errors');
const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

let rooms = []
/* initial user connection to sockets */
io.on("connection", (socket) => {
    // maxRooms = rooms.filter(room => room.players.length<10)
    console.log('a user connected');

    if (rooms.length > 0) {
        maxRooms = rooms.filter(room => room.players.length < 10) // Can this be a function?
        availableRooms = maxRooms.map(room => room.room)
        io.to(socket.id).emit('available_rooms', availableRooms)
    }

    /* create a room function with a maximum number of 10 */
    socket.on('create_room', data => {
        socket.join(String(rooms.length + 1))
        io.to(socket.id).emit('room_number', rooms.length + 1)

        rooms.push({
            room: rooms.length + 1,
            words: [],
            players: [{
                id: socket.id,
                userName: data, word: ''
            }]
        })

        maxRooms = rooms.filter(room => room.players.length < 10)
        availableRooms = maxRooms.map(room => room.room)
        console.log(availableRooms, 'available rooms');
        io.emit('available_rooms', availableRooms)
    })

    /* allows users to join different rooms - prompts name upon joining */
    socket.on('join_room', (data) => {
        socket.join(data.room)
        console.log(`user joined the room`)

        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].room == data.room) {
                rooms[i].players.push({ id: socket.id, userName: data.userName, word: '' })
                players = rooms[i].players.map(player => player.userName)
                io.to(String(data.room)).emit('players', players)
                return
            }
        }
    })

    /* allows users to leave rooms */
    //TODO: remove username when leaving room
    socket.on('leave_room', (data) => {
        socket.leave(data)
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].room == data) {
                const index = rooms[i].players.indexOf(socket.id)
                rooms[i].players.splice(index, 1)
                return
            }
        }
    })

    /* disconnects user from socket */
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })

    /* allows users to send word or phreases
     * only starts games when all players have sent a word
     */
    socket.on('send_word', (data) => {
        // socket.to(data.room).emit('receive_message',data.message)
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].room == data.room) {
                for (player of rooms[i].players) {
                    if (player.id === socket.id) {
                        player.word = data.word
                        rooms[i].words.push(data.word)
                    }
                }
            }
            console.log("LLego!!!");
            if (rooms[i].players.length > 2 &&
                rooms[i].players.every(player => player.word != '')) {

                console.log("All ready");
                io.to(String(rooms[i].room)).emit('all_players_ready')
            }
        }
    })

    /* after all users submit a word, only only one is selected at random */
    socket.on('start_game', (data) => {
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].room == data) {
                let wordToGuess = rooms[i].words[Math.floor(Math.random() * rooms[i].words.length)]
                rooms[i].wordToGuess = wordToGuess
                for (const player of rooms[i].players) {
                    if (player.word !== wordToGuess) {
                        io.to(player.id).emit('word_to_guess', wordToGuess.length)
                    } else {
                        io.to(player.id).emit('guessing_your_word')
                    }
                }

            }
        }
    })

    /** determine when the secret word is guessed by a user */
    socket.on('guess_word', data => {
        for (const room of rooms) {
            if (room.room == data.room && room.wordToGuess === data.word)
                io.to(socket.id).emit('right')
        }
    })
})

const port = process.env.PORT || 4000;
const start = () => {
    try {
        server.listen(port, () =>
            console.log(`app is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};
start();