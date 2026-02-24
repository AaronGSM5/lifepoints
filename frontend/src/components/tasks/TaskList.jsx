import React from 'react';
import Task from '@/components/tasks/Task'

export default function TaskList() {

const mockTasks = [
  { title: 'Hallo Bruder ich grüße dich 👋', difficulty: 'easy', xp: 500, lp: 1000 },
    { title: 'Hello 👋', difficulty: 'easy', xp: 500, lp: 1000 },
    { title: 'Hola 👋', difficulty: 'easy', xp: 500, lp: 1000 },
    { title: 'Mahlzeit 👋', difficulty: 'easy', xp: 500, lp: 1000 },
    { title: 'Ich grüße 👋', difficulty: 'easy', xp: 500, lp: 1000 },
    { title: 'Hundegebell?', difficulty: 'medium', xp: 700, lp: 1500 },
    { title: 'Knowledge Test', difficulty: 'medium', xp: 700, lp: 1500 },
    { title: 'NIEMALS FLUSSABWÄRTS', difficulty: 'medium', xp: 700, lp: 1500 },
    { title: 'okEE', difficulty: 'medium', xp: 700, lp: 1500 },
    { title: 'Sie dürfen', difficulty: 'medium', xp: 700, lp: 1500 },
    { title: '(Werde dafür lowkey bezahlt)', difficulty: 'medium', xp: 700, lp: 1500 },
    { title: 'Mock Task 12', difficulty: 'hard', xp: 1000, lp: 2000 },
    { title: 'Mock Task 13', difficulty: 'hard', xp: 1000, lp: 2000 },
    { title: 'Mock Task 14', difficulty: 'hard', xp: 1000, lp: 2000 },
    { title: 'Mock Task 15', difficulty: 'hard', xp: 1000, lp: 2000 },
    { title: 'Mock Task 16', difficulty: 'hard', xp: 1000, lp: 2000 },
    { title: 'Mock Task 17', difficulty: 'hard', xp: 1000, lp: 2000 }
  ];

  return (
    <>
      {mockTasks.map((task, index) => (
        <Task key={index} title={task.title} difficulty={task.difficulty} xp={task.xp} lp={task.lp} />
      ))}
    </>
  );
}
