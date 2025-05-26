import {Checkbox} from '@/components/ui/checkbox';
import {Contact} from '@/lib/generated/prisma';
import {Input} from '@/components/ui/input';
import {Ref, useImperativeHandle, useLayoutEffect, useRef, useState} from 'react';
import {clsx} from 'clsx';
import {useRouter, useSearchParams} from 'next/navigation';

export interface ContactsListRef {
  getTags: () => string[],
}

export default function ContactsList({ref, data, onCheckedChange, onSearchInputChange, tags, onTagsChange}: {
  data: Contact[],
  tags: string[],
  ref: Ref<ContactsListRef>,
  onTagsChange: (tags: string[]) => void,
  onCheckedChange: (id: string) => (checked: boolean) => void,
  onSearchInputChange: (value: string) => void,
}) {
  const timer = useRef<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTags, setSelectedTags] = useState<string[] | null>(null);
  const thCls = "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer.current);
    const target = e.currentTarget;
    router.push(`/dashboard/contacts?search=${target?.value ?? ""}&tags=${selectedTags?.join(selectedTags.length > 0 ? "," : "")}`);
    timer.current = setTimeout(() => {
      onSearchInputChange(target?.value ?? "");
      clearTimeout(timer.current);
    }, 500);
  };

  const handleTagClick = (tag: string) => () => {
    const update = selectedTags?.includes(tag) ? selectedTags.filter(v => v !== tag) : [...selectedTags ?? [], tag];
    setSelectedTags(update);
    onTagsChange(update);
    router.push(`/dashboard/contacts?search=${searchParams.get("search") ?? ""}&tags=${update.join(update.length > 0 ? "," : "")}`);
  };
  useLayoutEffect(() => {
    if (selectedTags) {
      return;
    }
    const tagsSearch = searchParams.get("tags");
    if (tagsSearch?.length) {
      const tags = tagsSearch?.split(",") ?? [];
      setSelectedTags(tags);
    }
  }, [searchParams, selectedTags]);

  useImperativeHandle(ref, () => {
    return {
      getTags: () => selectedTags ?? [],
    };
  });

  return (
      <>
        <div className="flex flex-wrap gap-2 mt-4 mb-2 items-center">
          <Input placeholder="Search contacts" className="max-w-[400px]" onChange={handleSearch}
                 defaultValue={searchParams.get("search") ?? ""}/>
          {tags?.map(item => (
              <div key={item}
                   className={clsx('px-2 py-1 rounded-sm tex-xs cursor-pointer', selectedTags?.includes(item) ? "bg-gray-400" : "bg-gray-200")}
                   onClick={handleTagClick(item)}>
                {item}
              </div>
          ))}
        </div>
        {
          data.length === 0 ? (
              <div className="w-full text-center">
                <h1 className="text-2xl font-extrabold"> No contacts found.</h1>
                <p className="mb-4">No contact matching: <strong>{searchParams.get("search")}</strong>.</p>
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