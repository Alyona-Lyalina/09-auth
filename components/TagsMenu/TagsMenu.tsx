
"use client";

import Link from "next/link";
import { useState } from "react";
import css from "./TagsMenu.module.css";
import { usePathname } from "next/navigation";


const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

const TagsMenu = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const hidePaths = ["/", "/sign-in", "/sign-up"];
   if (hidePaths.includes(pathname)) return null;
 
  return (
    <div className={css.menuContainer}>
      <button onClick={() => setIsOpen(!isOpen)} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {tag === "All" ? "All notes" : tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TagsMenu;
