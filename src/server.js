const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
	{
        "title": "The post title1",
        "contents": "The post contents1"
    },
    {
        "title": "The post title2",
        "contents": "The post contents2"
    },
    {
        "title": "The post title3",
        "contents": "The post contents3"
    }
];

server.get('/posts', function(req, res) {
	// 3 ways of getting term from server:
	// 1.req.query: localhost:3000/posts?term=the post title1 -> req.query.term
	// 2.req.body 
	// 3.req.params: localhost:3000/posts/:id -> localhost:3000/posts/:id
	const term = req.query.term.toLowerCase();
	const results = posts.filter(post => post.title.toLowerCase().includes(term));

	res.status(200).json(results);
});

// TODO: your code to handle requests
server.post('/posts', (req, res) => {
	const post = req.body;

	posts.push(post);

	res.status(201).json(posts);
});

module.exports = { posts, server };