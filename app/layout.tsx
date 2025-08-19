import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <h1>Todo List Modern</h1>
          <span>By Nayla</span>
        </nav>

        {children}

        <footer>
          &copy; 2025 Todo List Modern. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
