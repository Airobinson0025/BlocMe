'use client'
import React from 'react'
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Password must contain at least one special character' }),
    passwordConfirm: z.string()
  }).refine((data) => {
    return data.password === data.passwordConfirm
  }, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation']
  })


  
const SignUpForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                  email: values.email,
                  password: values.password
                }) 
            })

            if(!response.ok) {
                throw new Error('Failed to sign up')
            }

            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error(error);
        }
    }

    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 mt-8 text-secondary max-w-md w-full'>
        <FormField
          control={form.control}
          name='email'
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-md'>Enter Your Email</FormLabel>
              <FormControl>
                <Input placeholder='exmpl@gmail.com' className='bg-transparent placeholder:text-secondary-muted' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}>
        </FormField>

        <FormField
          control={form.control}
          name='password'
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-md'>Create Password </FormLabel>
              <FormControl>
            <Input type='password' placeholder='Password' className='bg-transparent placeholder:text-secondary-muted' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}>
        </FormField>

        <FormField
          control={form.control}
          name='passwordConfirm'
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-md'>Confirm Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Re-enter Password' className='bg-transparent placeholder:text-secondary-muted' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}>
        </FormField>
        <Button variant='secondary' type='submit' className='w-full'>Sign Up</Button>
        </form>

        
    </Form>
  )
}

export default SignUpForm