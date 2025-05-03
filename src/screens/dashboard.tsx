import Navbar from '@/components/navbar';
import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import {AlertCircleIcon, FileCheck, Search} from 'lucide-react';
import {useActionState, useEffect, useState} from 'react';
import {ethers} from 'ethers';
import {toast} from 'sonner';
import Spinner from '@/components/spinner';

const searchContract = async (_: any, formData: FormData) => {
  const address = formData.get("address");
  if (!ethers.isAddress(address)) {
    return {errorMessage: "The input should be a valid contract address", details: "input invalid", data: null};
  }
  try {
    const response = await fetch(`${import.meta.env.VITE_ETHERSCAN_API_URL}/v2/api?chainid=1&module=contract&action=getabi&address=${address}&apikey=${import.meta.env.VITE_ETHERSCAN_API_KEY}`);
    const data = await response.json();
    return {data: JSON.parse(data.result)};
  } catch (err) {
    return {errorMessage: "Failed fetching contract data", details: (err as Error).message, data: null};
  }
};

export default function Dashboard() {
  const [state, action, isPending] = useActionState(searchContract, null);
  const [address, setAddress] = useState('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');
  useEffect(() => {
    if (!state) {
      return;
    }
    if (!state.data) {
      toast(state.errorMessage, {
        icon: <AlertCircleIcon/>,
        description: state.details
      });
    }

  }, [state]);

  return (
      <div>
        <Navbar/>
        <div className="container mx-auto px-2">
          <h1 className="text-3xl text-center mt-5 mb-2 flex items-center justify-center gap-2">Search for
            contract <FileCheck/></h1>
          <form action={action} className="max-w-2xl mx-auto flex gap-1 items-center">
            <Input type="text" name="address" value={address} onChange={(e) => setAddress(e.currentTarget.value)}
                   placeholder="e.g: 0x1D790d6D38a5ADB6312E86b8cCC365100f7d3F89"/>
            <Button type="submit" disabled={isPending}><Search/></Button>
          </form>
          <div className="w-full mt-4">
            {
                isPending && <div className="w-full flex justify-center items-center"><Spinner/>
                </div>
            }
          </div>
        </div>
      </div>
  );
}