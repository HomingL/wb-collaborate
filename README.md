# Project

## Project Title

[**WB Collab**](https://ggnbwhiteboard.rocks/)
(Whiteboard Collaborate)

## Hosted

https://ggnbwhiteboard.rocks/

## API Documentation

## Demo Video
## Team Members

| First Name | Last Name |Student Number |
|------------|-----------|---------------|
| Hongming   | Li        | 1004135624    |
| Diego      | He        | 1004264547    |
| Han-Shin   | Chen      | 1005403957    |

---

## App Description
Our web application aims to provide a collaborative platform that allows multiple users to freedraw, add text and to draw diagrams on a whiteboard synchronously.

Authenticated users have a workspace with basic file organization features where they can see all the whiteboards they have saved. Users can create a new whiteboard and invite other users to join by sharing the link. Users on the same whiteboard can communicate in the chat, and edit the whiteboard at the same time. Authenticated users who created the whiteboard are able to delete the whiteboard.

Any users who enter the whiteboard page with access to write can draw freely with their curser. It supports muliple features such like pen, text box, color selection, basic shapes, etc. Additionally, it has a chat box which allows all users in the whiteboard page to communicate in real-time.

This application is useful when working remotely. User at different physical location can do group discussion or brainstorming together without meeting up. It is also very useful for instructors to deliver a lecture online.

## Beta Version 
 - Static Index Page
 - Basic User Authentication with JWT
 - Single-page Collaborative Whiteboard
     - Minimal whiteboard features:
         - Pen
         - Textbox
         - Selection
         - Basic Shapes
         - Delete sketch

## Final Version
 - Multi-page Collaborative Whiteboard
 - Chat Box
 - Personal Workspace
    - Create Whiteboard
    - Delete Whiteboard
    - Display of owning whitboards
 - Toolbar:
    - Change of color of object
    - Change border color of object
    - Change background color of object
    - Change Width of the object
    - Delete the object
    - Make a copy of the object

## Technology Stack

#### Frontend:
- React (next.js)
- Apollo Client
- Material-UI

#### Backend:
- Express
- GraphQL (Apollo Server)
- PostgreSQL (with Typeorm)

#### Other Technologies
- P2P connection (simple-peer)
- Websocket (socket.io)
- Canvas (fabric.js)

## Deployment
- Digital Ocean 
- Docker
- Nginx

## Top Five Technical Challenges
 - P2P User Communication(for whiteboard)
 - Drawing with Canvas
 - Multi-feature toolbar(e.g. color selection)
 - Websocket for P2P connection management
 - Chat Box