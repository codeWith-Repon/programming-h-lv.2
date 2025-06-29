import { AddTaskModal } from '@/components/module/tasks/addTaskModal';
import TaskCard from '@/components/module/tasks/TaskCard';
import { Button } from '@/components/ui/button';
import { selectTasks } from '@/redux/features/task/taskSlice';
import { useAppSelector } from '@/redux/hoock';
import { useState } from 'react';

const Tasks = () => {
  const [open, setSetOpen] = useState(false);
  const tasks = useAppSelector(selectTasks);

  console.log(tasks);
  return (
    <div className='mx-auto max-w-7xl px-5 mt-20'>
      <div className='flex justify-between items-center'>
        <h1>Tasks</h1>
        <Button onClick={() => setSetOpen(true)}>Add Task</Button>
      </div>
      <AddTaskModal open={open} onClose={() => setSetOpen(false)} />
      <div className='space-y-5 mt-5'>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
