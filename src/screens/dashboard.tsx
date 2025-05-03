import Navbar from '@/components/navbar';

export default function Dashboard() {
  return (
      <div>
        <Navbar/>
        <div className="container mx-auto">
          <h1 className="text-4xl text-center mt-5">Protected Route</h1>
        </div>
      </div>
  )
}