"use client";

import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs'; // Import Clerk's useUser hook

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tool name must be at least 2 characters.",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  userId: z.string().min(1, {
    message: "User ID is required.",
  }),
  instruction: z.string().min(5, {
    message: "Instruction must be at least 5 characters.",
  }),
  link: z.string().url({
    message: "Must be a valid URL.",
  }),
  contact: z.string().min(5, {
    message: "Contact must be at least 5 characters.",
  }),
});

const CreateToolPage = () => {
  const router = useRouter();
  const { user } = useUser(); // Get the current user from Clerk
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      userId: user?.id || '', // Set the userId from the current user
      instruction: '',
      link: '',
      contact: ''
    }
  });

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const response = await axios.post('http://localhost:8080/tools', data);
      console.log(response.data);
      // Redirect to the tools page after successful submission
      router.push('/tools');
    } catch (error) {
      console.error('Error creating tool:', error);
    }
  };

  const onCancel = () => {
    // Handle cancel logic here
    router.push('/tools');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Tool</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tool Name</FormLabel>
                <FormControl>
                  <Input placeholder="Tool Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instruction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instruction</FormLabel>
                <FormControl>
                  <Input placeholder="Instruction" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input placeholder="Link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact</FormLabel>
                <FormControl>
                  <Input placeholder="Contact" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="secondary" onClick={onCancel}>Cancel Create</Button>
            <Button type="submit">Confirm Create</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateToolPage;