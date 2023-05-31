'use client';
import React, { useEffect, useState  } from 'react';
import * as api from '@/api'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

import {setCookie} from '@/utils/helpers'
import UserContext from '@/context/user';

export default function DashboardLayout({ children }) {
    
  const [user, setUser] = useState({});
  const [roles] = useState([
    {
      label: 'role1',
      value: 'role1'
    },
    {
      label: 'role2',
      value: 'role2'
    },
  ])

  const [projects] = useState([
    {
        label: 'Please select project',
        value: '',
    },
    {
      label: 'project1',
      value: 'project1'
    },
    {
      label: 'project2',
      value: 'project2'
    },
  ])

    useEffect(() => {            
        const storedUser = localStorage.getItem('user');
        if ( ! storedUser) {
          api
              .me()
              .then(data => data.json())
              .then(data => {
                  setUser(data.user ?? {});
                  connectToPusher(data.user ?? {});
              })
              return;
        }
        setUser(JSON.parse(storedUser));
        connectToPusher(JSON.parse(storedUser));
    }, [])

    const connectToPusher = (user) => {
      api.initPusher(user);
    }

    const handleLogout = () => {
        localStorage.setItem('user', '')
        localStorage.setItem('token', '')
        
        setCookie('token', '', 0)

        location.href = '/signin'
    }

    return (
      <div>
        <Navbar user={user} roles={roles} projects={projects}  />
        <Sidebar user={user} logout={handleLogout} />
        <div className="bg-[#F5F5F5] min-h-screen">
          <div>
            <UserContext.Provider value={{ user, setUser, roles }}>
              {
                children
              }
            </UserContext.Provider>
          </div>
        </div>
      </div>
    );
  }