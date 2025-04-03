<p align="center">
<br><br>
  <a href="https://www.insidesherpa.com/virtual-internships/prototype/oRMogWRHeewqHzA7u/College%20Students%3A%20Learn%20how%20to%20work%20at%20a%20YC%20startup">
  <img src="https://s3-ap-southeast-2.amazonaws.com/insidesherpa-assets/yc/workatastartup_logo_orange-c2a27f6374f9395166ee9906e2e0873af835b3c6132ae6aa0543582298567041.svg"></a>
</p>

<p align='center'> 
  <b><a href="#task"> Task Overview </a> </b>
  | 
  <b><a href="#work"> My Work </a></b>
  |           
</p>

# Introduction

<p> 
<b> College Students: 
  Learn how to work at a Y Combinator startup </b>
<br>Train online for the skills Y Combinator startups are looking for. One of the official ways to get recruited into a Y Combinator startup.
</p>

<h2 id="task">Module 1 Task Overview</h2>

<b> Working Fullstack 1: </b> Frontend updates based on feedback.
Help update the frontend of a new productivity tool for shipping.
<br><br>
<b> Aim: </b> Your task is to take the base shipping productivity tool and add in the ability for the new feature, the kanban board, to move shipping requests, to two new lane statuses (in-progress and complete). <b><i> Don't worry about any backend updates for now.</i></b>
<br><br>
Acceptance Criteria

<ul>
<li> In the "Shipping Requests" tab of the application, all tasks should show in the backlog swimlane.</li>
<li> There should be 3 swimlanes.</li>
<li> When a user drags a card up, down or into another swimlane, it reorders the card and stays there. (frontend only)</li>
<li> When a card changes swimlane, it should change color </li>
</ul>

---

<h2 id="work">What I Have Done</h2>

### Before My Task

- The application already had a basic structure for the "Shipping Requests" tab.
- Tasks were displayed in a single swimlane (Backlog), but there was no functionality to move them between swimlanes or update their status.

<img src="public\home.png" alt="Initial Board State" />
<img src="public\before shipping.png" alt="Initial Board State" />
---

### After my Task

1. **Initialized the Board State**:

   - Used the `getClients()` function to fetch all tasks (clients) and set their initial status to **Backlog** when the board loads.
   - Divided the tasks into three categories: `backlog`, `inProgress`, and `complete`.

   <img src="public\shipping_1.png" alt="Initial Board State" />

---

2. **Implemented Drag-and-Drop**:

   - Integrated the **Dragula** library to enable drag-and-drop functionality between the three swimlanes (columns).
   - Configured Dragula to listen for the `drop` event and update the task's status accordingly.

   <img src="public/shipping_2.png" alt="Drag and Drop Example" />"

---

### After My Task

- The kanban board now has full drag-and-drop functionality.
- Tasks can be moved between swimlanes, and their status updates dynamically.
- The visual feedback (color changes) makes it easy to identify the status of each task at a glance.
- The board meets all the acceptance criteria outlined in the task description.
