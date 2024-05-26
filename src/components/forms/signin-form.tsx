'use client'
import React from 'react'
import { Form, FormControl, FormField, FormLabel, FormMessage, FormItem } from '../ui/form'
import { Button } from '../ui/button'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import Link from 'next/link'

const formSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required' ).min(6, 'Password must be at least 6 characters').regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
  
  })


const SignInForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password:
''        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 mt-7 text-secondary'>
        <FormField
          control={form.control}
          name='email'
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-md'>Email or Username</FormLabel>
              <FormControl>
                <Input placeholder='Email' className='bg-transparent placeholder:text-secondary-muted' {...field} />
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
              <FormLabel className='text-md'>Password</FormLabel>
              <FormControl>
                <Input  type='password' placeholder='Password' className='bg-transparent placeholder:text-secondary-muted' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}>
        </FormField>
        
        <Button variant='secondary' type='submit' className='w-full'>Sign In</Button>
        </form>
        {/* <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400 text-secondary'>or</div>
        <Button className='bg-secondary-foreground w-full'>Sign In with Your Wallet</Button>
        <p className='text-center text-sm text-secondary mt-2'>If you don&apos;t have an account, please&nbsp;
          <Link className='text-secondary underline transition duration-200' href='/sign-up'>Sign up</Link>
        </p> */}
    </Form>
  )
}

export default SignInForm