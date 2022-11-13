import React from 'react'
import { checkPassword } from '../helper'
const Home = () => {
  checkPassword();
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home