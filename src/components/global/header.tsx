import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'


type HeaderLinks = {
    label: string
    href: string
}

type HeaderProps = {
    links: HeaderLinks[]
}


const Header = () => {

    const links: HeaderLinks[] = [
        {
            label: 'Features',
            href: '/features'
        },
        {
            label: 'About',
            href: '/about'
        },
        {
            label: 'Contact',
            href: '/contact'
        },
        {
            label: 'FAQ',
            href: '/faq'
        }
    ]


  return (
    <div className='flex items-center justify-between p-3 fixed w-full text-secondary z-[100]'>
        <div>
            <h4>BlocMe</h4>
        </div>


        <nav className='hidden lg:flex items-center gap-8'>
            <ul className='flex items-center gap-8'>
                {links.map((link, index) => (
                    <div key={index}>
                        <li className='hover:scale-110 transition duration-300'>
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    </div>
                ))}
            </ul>
                <Link href='sign-up'>
                    <Button variant='secondary' className='text-md'>Join Now</Button>
                </Link>
        </nav>
    </div>
  )
}

export default Header