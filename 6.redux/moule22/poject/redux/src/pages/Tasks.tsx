import { AddTaskModal } from '@/components/module/tasks/addTaskModal';
import TaskCard from '@/components/module/tasks/TaskCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { filterOptons } from '@/constants/options';
import {
  selectTasks,
  updateFilter,
  type Priority,
} from '@/redux/features/task/taskSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hoock';
import { useState } from 'react';

const Tasks = () => {
  const [open, setSetOpen] = useState(false);
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  console.log(tasks);
  return (
    <div className='mx-auto max-w-7xl px-5 mt-20'>
      <div className='flex justify-end gap-5 items-center'>
        <h1 className='mr-auto'>Tasks</h1>
        <Tabs defaultValue='all'>
          <TabsList>
            {filterOptons.map((option) => (
              <TabsTrigger
                onClick={() =>
                  dispatch(updateFilter(option.toLowerCase() as Priority))
                }
                value={option.toLowerCase()}
              >
                {option}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
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
