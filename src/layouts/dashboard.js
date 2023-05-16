'use client';
import React, { useEffect, useState  } from 'react';
import * as api from '@/api'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

import {setCookie} from '@/utils/helpers'

export default function DashboardLayout({
    children,
  }) {

    const [user, setUser] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if ( ! storedUser) {
          api
              .me()
              .then(data => data.json())
              .then(data => {
                  setUser(data.user ?? {});
              })
              return;
        }
        setUser(JSON.parse(storedUser));
    }, [])

    const handleLogout = () => {
        localStorage.setItem('user', '')
        localStorage.setItem('token', '')
        
        setCookie('token', '', 0)

        location.href = '/signin'
    }

    return (
      <div>
        <Navbar user={user}  />
        <Sidebar user={user} logout={handleLogout} />
        <div className="bg-[#F5F5F5] min-h-screen">
          <div>
            {
              children
            }
          </div>
        </div>
      </div>
    );
  }