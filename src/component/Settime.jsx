import React, { useState } from 'react'
import { useEffect } from 'react';
import App from '../App';
import Loading from './Loading';
import '../App.css'
export default function Settime() {
    let[time,Settime]=useState(true);

    useEffect(() => {

        // Creating a timeout within the useEffect hook
        setTimeout(() => {
            
            Settime(false);
        }, 1090);
    }, []);
  return (
    <div>{time? <div className='loading'><Loading/></div>:<App/>}</div>
  )
}
