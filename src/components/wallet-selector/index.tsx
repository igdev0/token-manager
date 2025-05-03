import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog.tsx';
import {Button} from '@/components/ui/button.tsx';
import {LogOut, TriangleAlertIcon, Wallet} from 'lucide-react';
import {useState} from 'react';
import {useWalletStore} from '@/store/wallet.ts';
import {toast} from 'sonner';
import {truncateAddress} from '@/utils/functions.ts';

export default function WalletSelector() {
  const walletStore = useWalletStore();
  const [modalOpen, set] = useState(false);

  const onProviderClick = (key: string) => {
    return () => {
      walletStore.authenticate(key).then(() => {
        set(false);
      }).catch(err => {
        console.error(err);
        toast("Error while attempting to authenticate", {
          description: err.message,
          position: "top-right",
          classNames: {content: "ml-1"},
          icon: <TriangleAlertIcon/>
        });
      });
    };
  };

  return (
      <Dialog open={modalOpen} onOpenChange={set}>
        {
          walletStore.authenticated ? (
                  <Button onClick={walletStore.logout}><img src={walletStore.currentProvider?.metadata.icon} width={20}
                               height={20}/> {truncateAddress(walletStore.accounts[0])}
                    <LogOut/>
                  </Button>) :
              <DialogTrigger asChild>
                <Button>Connect <Wallet/></Button>
              </DialogTrigger>
        }
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select provider</DialogTitle>
            <DialogDescription>
              Please select a provider to continue
            </DialogDescription>
          </DialogHeader>
          <div className="flex-col space-y-2">
            {Array.from(walletStore.providers).map(([key, metadata]) => (
                <button key={key} onClick={onProviderClick(key)}
                        className="flex gap-2 rounded-sm p-2 bg-gray-200 cursor-pointer w-full transition-all hover:bg-gray-300">
                  <img src={metadata.metadata.icon} width={30} height={30}/> {metadata.metadata.name}
                </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

  );
}