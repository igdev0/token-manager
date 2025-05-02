import {Button} from '@/components/ui/button.tsx';
import {Wallet} from 'lucide-react';

function App() {
  return (
    <div className="container mx-auto">
      <Button variant="default">Connect <Wallet/></Button>
    </div>
  )
}

export default App
