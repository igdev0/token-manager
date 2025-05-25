"use client";
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Input} from '@/components/ui/input';
import {useState} from 'react';
import {X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {clsx} from 'clsx';
import {createContact} from '@/app/dashboard/contacts/actions';
import {useWalletStore} from '@/store/wallet';
import {toast} from 'sonner';

const schema = yup.object({
  alias: yup.string().required(),
  address: yup.string().required(),
  tags: yup.array().of(yup.string()).required(),
})
    .required();

type FormValues = {
  alias: string
  address: string
  tags: string[]
}

export default function CreateContactPage() {
  const [owner] = useWalletStore().accounts;
  const form = useForm<FormValues>({
    resolver: yupResolver(schema) as keyof object,
  });

  const onSubmit = () => {
    const {tags, address, alias} = form.getValues();
    createContact(owner, alias, tags, address).then(_ => {
      toast("Contact added!", {
        position: "top-right",
        description: `Successfully created contact ${alias} with address ${address}`
      });
      form.reset();
    }).catch(err => {
      toast("Failed creating contact", {position: "top-right", description: `Details: ${err.message}`});
    });
  };

  const fieldsetCls = clsx("mb-2");

  return (
      <div className="max-w-[900]">
        <h1 className="text-2xl font-extrabold">Add contact</h1>
        <p className="text-sm mb-4">Add a new contacts and tag them so you can airdrop tokens to those.</p>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className={fieldsetCls}>
            <label htmlFor="alias"> Alias</label>
            <Input {...form.register("alias")} placeholder="Alias: e.g: My contact"/>
            <p className="text-red-500">{form.formState.errors?.alias?.message}</p>
          </fieldset>
          <fieldset className={fieldsetCls}>
            <label htmlFor="alias">Address</label>
            <Input {...form.register("address")} placeholder="Address: e.g: 0x0000000000000000"/>
            <p className="text-red-500">{form.formState.errors?.address?.message}</p>
          </fieldset>
          <fieldset className={fieldsetCls}>
            <label htmlFor="tags">Tags</label>
            <Controller
                name="tags"
                control={form.control}
                render={({field}) => (
                    <TagsInput value={field.value as keyof object ?? []} onChange={field.onChange}/>
                )}
            />
            <p className="text-red-500">{form.formState.errors?.tags?.message}</p>
          </fieldset>
          <Button type="submit">Submit</Button>
        </form>
      </div>
  );
}

function TagsInput({
                     value,
                     onChange,
                   }: {
  value: string[];
  onChange: (tags: string[]) => void;
}) {
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(inputValue);
      setInputValue('');
    }
  };

  return (
      <div className="rounded flex flex-wrap gap-2 border-1 px-3 py-1 border-input text-sm">
        {value?.map((tag) => (
            <div key={tag} className="bg-gray-200 px-2 py-1 rounded-full flex items-center gap-1">
              <span>{tag}</span>
              <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-red-500 hover:text-red-700"
              >
                <X/>
              </button>
            </div>
        ))}
        <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-[120px] border-none outline-none"
            placeholder="Add tag and press Enter"
        />
      </div>
  );
}