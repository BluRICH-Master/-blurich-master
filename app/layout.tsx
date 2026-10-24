export const metadata = {
  title: 'BluRICH Master',
  description: 'Система управления выездными мастерами',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preload" href="https://cdn.tailwindcss.com" as="script" />
        <script src="https://cdn.tailwindcss.com" defer></script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}