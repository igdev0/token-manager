import Navbar from '@/components/ui/navbar.tsx';
import {Button} from '@/components/ui/button.tsx';

function App() {
  return (
    <div className="px-2">
      <Navbar/>
      <header className="mt-70">
        <h1 className="text-6xl font-bold text-center mb-2">The wallet guardian</h1>
        <h1 className="text-2xl font-bold text-center max-w-[600px] mx-auto text-balance mb-4">A tool that allows you to predict contract call outcome.</h1>
        <div className="max-w-[600px] mx-auto flex justify-center gap-2">
          <Button>
            Get started
          </Button>
          <Button variant="ghost">
            Learn how
          </Button>
        </div>
      </header>
    </div>
  )
}

export default App
