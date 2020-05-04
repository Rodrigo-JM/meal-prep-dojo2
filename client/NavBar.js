import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo">
          <Link to="/" className="nav-link">
            <span className="link-text logo-text">Meal Prep Dojo</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <i className="far fa-calendar-alt fa-primary" />
            <span className="link-text">Planner</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/meals">
            <i className="fas fa-utensils fa-primary" />

            <span className="link-text">Create Meal</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/groceries">
            <i className="far fa-list-alt fa-primary" />
            <span className="link-text">Groceries List</span>
          </Link>
        </li>
        <li className="nav-item">
          <a href="https://platform.fatsecret.com">
            <img
              className="link-text"
              src="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret.svg"
              border="0"
            />
          </a>
        </li>
      </ul>
    </nav>
  )
}
