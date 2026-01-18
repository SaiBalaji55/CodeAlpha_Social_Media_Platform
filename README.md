# CodeAlpha_Social_Media_Platform

## Mini Social Media Platform
# Project Title

### Mini Social Media Platform (Instagram-Style UI)

## Developed By

Role: Full Stack Developer
Technology Stack: HTML, CSS, JavaScript, Node.js, Express.js, MongoDB

## Project Description

This project is a Mini Social Media Platform inspired by modern applications like Instagram.
Users can register, log in, create posts, like posts, and view a dynamic feed.
The application is built using pure frontend technologies and a RESTful backend with MongoDB.

The UI follows a modern dashboard-style layout with a sidebar, feed section, and suggestions panel.

## Objectives

Build a real-world full-stack social media application

Implement REST APIs using Node.js and Express.js

Design a modern and responsive frontend

Connect frontend and backend using Fetch API

Store and manage data using MongoDB

## Technologies Used

Frontend

HTML5

CSS3

JavaScript (ES6)

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

## Features Implemented
### Authentication

User Registration

User Login using JWT

### Posts

Create text-based posts

View all posts in feed

### Likes

Like and Unlike posts

Real-time like count update

### UI Design

Instagram-inspired modern UI

Sidebar navigation

Gradient theme

Responsive layout

## Project Structure
```
social-media-app/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js

```

## API Endpoints

### Authentication
| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |


### POST
| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| POST   | /api/posts          | Create post      |
| GET    | /api/posts          | Get all posts    |
| POST   | /api/posts/like/:id | Like/Unlike post |

# How to Run the Project
## Backend
```
cd backend
npm install
node server.js
```

## Frontend

Open ```index.html``` using Live Server

Or double-click ```index.html```

## Testing

Register a new user

Login using registered credentials

Create a post

Like the post

Refresh page → data persists

## Screenshots

(Add screenshots of:)

Login Page

Feed Page

Post Creation

Like Feature

## Future Enhancements

Comment system

User profile page

Follow / Unfollow users

Image upload

Notifications

Real-time updates
