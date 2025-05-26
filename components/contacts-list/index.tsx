import {Checkbox} from '@/components/ui/checkbox';
import {Contact} from '@/lib/generated/prisma';
import {Input} from '@/components/ui/input';
import {ChangeEvent} from 'react';

export default function ContactsList({data, onCheckedChange, onSearchInputChange, search}: {
  data: Contact[],
  search: string | null,
  onCheckedChange: (id: string) => (checked: boolean) => void,
  onSearchInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
}) {
  const thCls = "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  return (
      <>
        <Input placeholder="Search contacts" className="mb-4 max-w-[400px]" onChange={onSearchInputChange} defaultValue={search??""}/>
        {
          data.length === 0 ? (
              <div className="w-full text-center">
                <h1 className="text-2xl font-extrabold"> No contacts found.</h1>
                <p className="mb-4">No contact matching: <strong>{search}</strong>.</p>
              </div>
          ) : <table className="w-full">
            <thead className="bg-gray-200">
            <tr>
              <th className={thCls}>Select</th>
              <th className={thCls}>Alias</th>
              <th className={thCls}>Address</th>
              <th className={thCls}>Tags</th>
            </tr>
            </thead>
            <tbody>
            {
              data.map(({id, alias, address, tags}) => (
                  <tr key={id} className="nth-[even]:bg-gray-100">
                    <td className="px-4 flex items-center"><Checkbox name={id} onCheckedChange={onCheckedChange(id)}/>
                    </td>
                    <td className="px-4 py-2">{alias}</td>
                    <td className="px-4 py-2">{address}</td>
                    <td className="px-4 py-2 flex gap-2">{tags.map(tag => (
                        <span key={tag}
                              className="px-2 py-1 text-sm bg-black text-white rounded-sm">{tag}</span>))}</td>
                  </tr>))
            }
            </tbody>
          </table>
        }
      </>
  );
}