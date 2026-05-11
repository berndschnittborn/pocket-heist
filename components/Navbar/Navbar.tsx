"use client"

import { Clock8 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts"
import styles from "./Navbar.module.css"

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <div className={styles.siteNav}>
      <nav>
        <header>
          <h1>
            <Link href="/heists">
              P<Clock8 className={styles.logo} size={14} strokeWidth={2.75} />
              cket Heist
            </Link>
          </h1>
          <div>Tiny missions. Big office mischief.</div>
        </header>
        <div className={styles.navRight}>
          <ul>
            <li>
              <Link href="/heists/create">Create Heist</Link>
            </li>
          </ul>
          {user && (
            <div className={styles.userSection}>
              <span className={styles.userEmail}>{user.email}</span>
              <button onClick={logout} className={styles.logoutButton}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}
