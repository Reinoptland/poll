const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;

// GET /polls
// GET /polls/:id

// add database later
let polls = [
  {
    id: 1,
    title: "Who is the king of the jungle?",
    options: {
      1: { text: "Panther", votes: 0 },
      2: { text: "Gorilla", votes: 0 },
      3: { text: "Snake", votes: 0 },
      4: { text: "Panda", votes: 0 },
    },
    voteCount: 0,
  },
  {
    id: 2,
    title: "Who s the best at soccer",
    options: {
      1: { text: "Messi", votes: 0 },
      2: { text: "C. Ronaldo", votes: 0 },
      3: { text: "Mbappe", votes: 0 },
      4: { text: "Haaland", votes: 0 },
    },
    voteCount: 0,
  },
];

app.get("/polls/:id", (req, res) => {
  const poll = polls.find((poll) => Number(poll.id) === Number(req.params.id));
  res.json(poll);
});

app.post("/polls/:id/vote", (req, res) => {
  polls = polls.map((poll) => {
    if (poll.id === Number(req.params.id)) {
      poll.options[req.body.option].votes++;
      poll.voteCount++;
    }
    return poll;
  });
  return res.status(200).json({ message: "Thanks for voting" });
});

app.listen(PORT, () => {
  console.log("LISTENENING ON", PORT);
});
