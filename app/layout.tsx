import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-lightbg">
        <nav className="flex justify-between items-center p-4 bg-primary text-white shadow-md">
          <h1 className="text-xl font-bold">Todo List Modern</h1>
          <button id="theme-toggle" className="px-3 py-1 border rounded">Dark Mode</button>
        </nav>

        {children}

        <footer className="mt-auto p-4 text-center bg-secondary">
          &copy; 2025 Todo List Modern. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
