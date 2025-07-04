import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

import type { ITask } from '@/types';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import { AddTaskModal } from './addTaskModal';


interface IProps {
  task: ITask;
}

const TaskCard = ({ task }: IProps) => {
  const [editTask, setEditTask] = useState<ITask | null>(null);
 
  const toggleComplete = () => {

  };

  const handleDelete = () => {
   
  };


  return (
    <div className='border px-5 py-3 rounded-md'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <div
            className={cn('size-3 rounded-full', {
              'bg-green-500': task.priority === 'low',
              'bg-yellow-500': task.priority === 'medium',
              'bg-red-500': task.priority === 'high',
            })}
          ></div>
          <h1 className={cn({ 'line-through': task.isCompleted })}>
            {task.title}
          </h1>
        </div>
        <div className='flex gap-3 items-center'>
          <Button
            onClick={() => setEditTask(task)}
            variant='link'
            className='p-0 text-green-500'
          >
            <Edit />
          </Button>
          <Button
            onClick={handleDelete}
            variant='link'
            className='p-0 text-red-500'
          >
            <Trash />
          </Button>
          <Checkbox checked={task.isCompleted} onClick={toggleComplete} />
        </div>
        <AddTaskModal
          open={!!editTask}
          taskToEdit={editTask}
          onClose={() => setEditTask(null)}
        />
      </div>
      <p>Assigned To:</p>
      <p className='mt-5'>{task.description}</p>
    </div>
  );
};

export default TaskCard;
