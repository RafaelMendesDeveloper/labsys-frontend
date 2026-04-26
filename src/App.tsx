import { AppHeader } from './components/shared/AppHeader'

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-surface)' }}>
      <AppHeader userName="Mateus Reisdorfer" userRole="Rei do Camarote" />
    </div>
  )
}

export default App
