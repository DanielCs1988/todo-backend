import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { ITodo } from './todo.interface';
import { Todo } from './todo.model';
import { Repository } from 'typeorm';
import { TodoDto } from './todo.dto';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
}

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  const testTodo: ITodo = {
    id: 1,
    content: 'test',
    createdAt: 'date',
    completed: false,
  };
  const repositoryMockFactory: () => MockType<Repository<Todo>> = jest.fn(() => ({
    find: jest.fn(() => [testTodo, testTodo]),
    findOne: jest.fn(() => ({ ...testTodo })),
    create: jest.fn((dto: TodoDto) => ({ ...testTodo, ...dto })),
    save: jest.fn(entity => ({ ...entity })),
    delete: jest.fn(() => ({ affected: 1 })),
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService, { provide: getRepositoryToken(Todo), useFactory: repositoryMockFactory }],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should return all the TODOs', async () => {
    const result = await controller.getAll();

    expect(result).toEqual([testTodo, testTodo]);
  });

  it('should return the requested TODO', async () => {
    const result = await controller.getOne(testTodo.id);

    expect(result).toEqual(testTodo);
  });

  it('should toggle the completed property of the TODO', async () => {
    const result = await controller.toggleCompleted(testTodo.id);
    const expected = {
      ...testTodo,
      completed: !testTodo.completed,
    };

    expect(result).toEqual(expected);
  });

  it('should update the content of the TODO', async () => {
    const result = await controller.update(testTodo.id, { content: 'new' });
    const expected = {
      ...testTodo,
      content: 'new'
    };

    expect(result).toEqual(expected);
  });

  it('should return the newly created TODO', async () => {
    const result = await controller.create({ content: 'new' });
    const expected = {
      ...testTodo,
      content: 'new'
    };

    expect(result).toEqual(expected);
  });

  it('should return true for delete', async () => {
    const result = await controller.delete(testTodo.id);

    expect(result).toEqual(true);
  });
});
