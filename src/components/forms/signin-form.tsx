'use client'
import React from 'react'
import { Form, FormControl, FormField, FormLabel, FormMessage, FormItem } from '../ui/form'
import { Button } from '../ui/button'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required' ).min(6, 'Password must be at least 6 characters').regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
  
  })


const SignInForm = () => {

  const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password:
''        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const result = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password
        });

        if (result?.error) {
            form.setError('email', { message: 'Invalid email or password' })
            console.error(result.error)
        } else {
          router.push('/dashboard')
          console.log('Signed in successfully')
        }
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
    </Form>
  )
}

export default SignInForm