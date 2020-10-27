const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('todolist can be turned to an array', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('first should be todo1', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('last should be todo3', () => {
    expect(list.last()).toEqual(todo3);
  });
  
  test('shift removes and returns the first item', () => {
    let todo = list.shift();
    expect(todo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('pop removes and returns the last item', () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('all list items are done', () => {
    expect(list.isDone()).toBe(false);
  });

  test('typeerror occurs when adding a non todo object to list', () => {
    expect(() => list.add(1)).toThrow(TypeError);
    expect(() => list.add('Not a todo')).toThrow(TypeError);
  });

  test('testing itemAt', () => {
    expect(() => list.itemAt(3)).toThrow(ReferenceError);
    expect(list.itemAt(0)).toEqual(todo1);
  });

  test('mark done at', () => {
    list.markDoneAt(1);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);
    expect(() => list.markDoneAt(3)).toThrow(ReferenceError);
  });

  test('mark undone at', () => {
    list.markDoneAt(0);
    list.markDoneAt(1);
    list.markDoneAt(2);

    list.markUndoneAt(1);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
    expect(() => list.markUndoneAt(3)).toThrow(ReferenceError);

  });

  test('mark all done', () => {
    list.markAllDone();

    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('remove at', () => {
    list.removeAt(1);
    expect(list.toArray()).toEqual([todo1, todo3]);
    expect(() => list.removeAt(3)).toThrow(ReferenceError);
  });

  test('to string', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('to string for one completed', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[X] Clean room
[ ] Go to the gym`;

    list.markDoneAt(1);
    expect(list.toString()).toBe(string);
  });

  test('to string for all todos done', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
    
    list.markAllDone();
    expect(list.toString()).toBe(string);
  });

  test('for each', () => {
    list.forEach(todo => todo.markDone());
    expect(list.isDone()).toBe(true);
  });

  test('filter', () => {
    list.markDoneAt(1);
    let filteredResults = list.filter(todo => !(todo.isDone()));
    expect(filteredResults.toArray()).toEqual([todo1, todo3]);

  });
  
});
