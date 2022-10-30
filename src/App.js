import { Routes, Route, Link } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import './App.css'

const Home = lazy(() => import(/* webpackChunkName:'Home' */'./Components/Home'))
const About = lazy(() => import(/* webpackChunkName:'About' */'./Components/About'))
const Settings = lazy(() => import(/* webpackChunkName:'Settings' */'./Components/Settings'))

export default function App() {
  return (
    <div className="app">
      <ul className="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>

      <hr />
      <Suspense fallback={<h1> Loading.. </h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </div>
  );
}