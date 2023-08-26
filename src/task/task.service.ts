import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/createTask.input';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { UpdateTaskInput } from './dto/updateTask.input';
import { DeleteTaskInput } from './dto/deleteTask.input';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTasks(): Promise<Task[]> {
    return this.prismaService.task.findMany();
  }

  async createTask(createTaskInput: CreateTaskInput): Promise<Task> {
    const { name, dueDate, description } = createTaskInput;
    return this.prismaService.task.create({
      data: {
        name,
        dueDate,
        description,
      },
    });
  }

  async updateTask(updateTaskInput: UpdateTaskInput): Promise<Task> {
    const { id, name, dueDate, status, description } = updateTaskInput;
    return this.prismaService.task.update({
      data: {name, dueDate, status, description},
      where: {id},
    });
  }

  async deleteTask(deleteTaskInput: DeleteTaskInput): Promise<Task> {
    const { id } = deleteTaskInput;
    return this.prismaService.task.delete({
      where: {id},
    });
  }
}
