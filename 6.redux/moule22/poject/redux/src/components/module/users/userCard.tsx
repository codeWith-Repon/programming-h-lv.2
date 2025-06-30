import { Card } from '@/components/ui/card';

import { Trash2 } from 'lucide-react';

export const UserCard = () => {
  return (
    <div className=' grid grid-cols-3 gap-4'>
      <Card className='w-full max-w-sm  mx-auto border-green-500 pl-5 pr-5'>
        <div className='flex items-center justify-between'>
          <div className=''>
            <h1>Name: user.name</h1>
            <span> Email: user.email</span>
          </div>
          <Trash2 className='w-4 h-4 text-red-500' />
        </div>
      </Card>
    </div>
  );
};
