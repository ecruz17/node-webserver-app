import { create } from "domain";
import { Request, Response } from "express";

const todos = [
  { id: 1, text: 'buy bread', createdAt: new Date() },
  { id: 2, text: 'buy butter', createdAt: new Date() },
  { id: 3, text: 'buy pizza', createdAt: new Date() },
  { id: 4, text: 'buy ihpone', createdAt: new Date() },
];

export class TodosController {
  constructor() { }
  
  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  }

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    const todo = todos.find(todo => id === todo.id);
    if (isNaN(id))
      res.status(404).json({ error: `id arg NaN` });

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with id: ${id} NOT FOUND` });
  }

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text)
      res.status(400).json({ error: `Text property is required` });

    const newTodo = todos.push({
      id: todos.length++,
      text,
      createdAt: new Date()
    });

    res.json(newTodo);
    console.log('All todos:', todos);
  }

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      res.status(400).json({ error: 'Id is NaN' });

    const todo = todos.find(todo => todo.id === id);
    if (!todo)
      res.status(404).json({ error: `Todo with id: ${id} doesn't exist` });

    const { text, createdAt } = req.body;

    todo!.text = text || todo?.text;

    (createdAt === 'null')
      ? todo!.createdAt 
      : todo!.createdAt = new Date( createdAt || todo?.createdAt )

    todos.forEach(() => { 
      if (todo!.id == id) {
        text
      }
    });

    res.json(todo);
  }

  public deleteTodo = (req: Request, res: Response) => { 
    const id = +req.params.id;

    if (isNaN(id))
      res.status(400).json({ error: 'Id is NaN' });

    const todo = todos.find(todo => todo.id === id);
    if (!todo)
      res.status(404).json({ error: `Todo with id: ${id} doesn't exist` });

    const deletedTodo = todos.splice(todos.indexOf(todo!), 1);

    res.json(deletedTodo);
  }

}
