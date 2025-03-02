import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {/* Remove the Timer link */}
        {/* <li>
          <Link href="/timer">Timer</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;