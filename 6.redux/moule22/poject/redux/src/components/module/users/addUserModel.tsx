import { Button } from '@/components/ui/button';
import { UserCard } from '@/components/module/users/userCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useForm, type FieldValues } from 'react-hook-form';
import { useAppDispatch } from '@/redux/hoock';
import { addUser } from '@/redux/features/user/userSlice';
import { useState } from 'react';
import type { IUser } from '@/types';

const AddUserModal = () => {
  const [open, setOpen] = useState(false);
  const form = useForm();
  const dispatch = useAppDispatch();

  const onSubmit = (data: FieldValues) => {
    dispatch(addUser(data as IUser));
    console.log(data)
    form.reset();
    setOpen(false);
  };

  return (
    <div className='mt-10 space-y-5 mx-auto max-w-7xl'>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline'>Add User +</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription className='sr-only'>
              register user
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Name' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Email' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type='submit'>Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <UserCard />
    </div>
  );
};

export default AddUserModal;
