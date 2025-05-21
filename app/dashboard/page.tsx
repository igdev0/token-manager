import {Button} from '@/components/ui/button';
import Link from 'next/link';

export default function Dashboard() {
  return (
      <div className="w-full h-full">
        <div className="container mx-auto flex flex-col gap-4 py-2">
          <div className="tabs">

            <Button asChild={true}>
              <Link href="/dashboard/create-fungible-token">
                New Fungible
              </Link>
            </Button>
            <Button variant="secondary">
              New Non-fungible</Button>
          </div>
        </div>
      </div>
  );
}