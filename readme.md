Design:


Task:

Content Script
- When url leetcode/problems
- get element ide-top-btns and add button flagger
- pass message to worker with type
  - {
        type: "SAVE_PROBLEM"
        url: "https://leetcode.com/two-sum",
        createdDate: "2024-11-01"
  }


Service Worker
- function saveProblem to ingest SAVE_PROBLEM from message
- function fetchProblems from storage to ingest GET_PROBLEMS from message


Pop Up
- get problem from Service worker by listening to event? or can do it synchronousely
- function to renderList of problem

