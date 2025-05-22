import {getTokens} from '@/app/dashboard/actions';
import {Button} from '@/components/ui/button';
import {Pen} from 'lucide-react';

export default async function Dashboard() {
  const tokens = await getTokens();
  return (
      <table>
        <thead className="bg-gray-50">
         <tr>
           <th className="text-left p-2">Name</th>
           <th className="text-left p-2">Kind</th>
           <th className="text-left p-2">Address</th>
           <th className="text-left p-2">Network</th>
         </tr>
        </thead>
        <tbody>
        {
          tokens.map(({id, name, symbol, address, network_name, type}) => (
              <tr key={id}>
                <td className="p-2">{name} ({symbol})</td>
                <td className="p-2">{type}</td>
                <td className="p-2">{address}</td>
                <td className="p-2">{network_name}</td>
                <td className="p-2"><Button><Pen/></Button></td>
              </tr>
          ))
        }
        </tbody>
      </table>
  );
}