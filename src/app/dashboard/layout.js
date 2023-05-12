'use client';
import { useEffect, useState  } from 'react';
import * as api from '@/api'
import Navbar from '@/components/navbar'

import {setCookie} from '@/utils/helpers'

export default function DashboardLayout({
    children,
  }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        api
            .me()
            .then(data => data.json())
            .then(data => {
                setUser(data.user ?? {});
            })
    }, [])

    const handleLogout = () => {
        localStorage.setItem('user', '')
        localStorage.setItem('token', '')
        
        setCookie('token', '', 0)

        location.href = '/signin'
    }

    return (
      <section>
        <Navbar user={user} logout={handleLogout} />
        {children}
      </section>
    );
  }