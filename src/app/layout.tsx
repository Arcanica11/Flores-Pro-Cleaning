// RUTA: src/app/layout.tsx (NUEVO ARCHIVO)

// Este es el Root Layout principal que envuelve toda la aplicación.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // No necesita la prop "lang" aquí, porque el layout específico de
    // cada idioma (`src/app/[lang]/layout.tsx`) la manejará.
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}