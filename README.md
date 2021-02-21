# Project

## Project Title

**WB Collab**
(Whiteboard Collaborate)

## Team Members

| First Name | Last Name |Student Number |
|------------|-----------|---------------|
| Hongming   | Li        | 1004135624    |
| Diego      | He        | 1004264547    |
| Han-Shin   | Chen      | 1005403957    |

---

## App Description
Our web application aims to provide a collaborative platform that allows multiple users to add text or to draw diagrams on a whiteboard synchronously.

Authenticated users have a workspace with basic file organization features where they can see all the whiteboards they have saved. Users can create a new whiteboard and invite other users to join by sharing the link. Users on the same whiteboard can communicate in the chat, and edit the whiteboard at the same time.

Any users who enter the whiteboard page with write access can free draw with their curser. It supports muliple features such like pen, eraser, text box, image upload, color selection, etc. It supports text recognition which can format handwritings to digital text or diagrams. Additionally, it also has a chat box which allows all users in the whiteboard page to communicate in real-time.


This application is useful when working remotely. User at different physical location can do group discussion or braistorming without meeting up together. It is also very useful for instructors to deliver a lecture online.

## Beta Version 
 - Static Index Page
 - User Authentication
 - Single-page Collaborative Whiteboard
     - Minimal whiteboard features:
         - Pen
         - Eraser
         - Textbox
         - Selection
         - Add image
         - Delete sketch
 

## Final Version
 - Personal Workspace
 - Text Recognition
 - Chat room

## Technology Stack

#### Frontend:
- React (next.js)
- Apollo Client
- Material-UI

#### Backend:
- Express
- GraphQL (Apollo Server)
- Firebase (Authentication)
- MongoDB 
- Redis

## Top Five Technical Challenges
 - P2P User Communication(for whiteboard)
 - Graphics programming with SVG
 - Multi-feature toolbar(e.g. color selection)
 - Text Recognition 
 - Learning new frameworks and technologies (e.g. GraphQL, Redis)