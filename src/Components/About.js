import React, { lazy, Suspense, useState } from 'react'
const Text = lazy(() => import(/* webpackChunkName:'Text'*/'./Text'))

const About = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <h1>
        About
      </h1>

      
        <Suspense fallback={<h1>loading...</h1>}>
         {
          show &&  <Text />
         }
        </Suspense>
    
      <button onClick={() => setShow(true)} > show text </button>
    </div>
  )
}

export default About