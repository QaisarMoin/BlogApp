import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header
      className="py-3 mt-2 text-white border-2
      bg-[#7A8A8A] rounded-xl z-10 
     absolute top-0 left-[25.75vw] w-[50%]  "
    >
      <Container>
        <nav className="flex justify-center items-center">
          <ul className="flex ml-auto justify-around items-center w-full">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() =>
                      navigate(item.slug)(window.location.reload(), 1)
                    }
                    className="inline-bock px-6 py-2 
                    duration-200 hover:underline
                     hover:bg-white 
                    hover:text-black rounded-full"
                  >
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) => `
                    ${isActive ? "text-[#713c2e]" : ""}
                    `}
                    >
                      {item.name}
                    </NavLink>
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
