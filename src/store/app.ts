import {create} from 'zustand/react';

interface AppStore {
  loading: boolean,
  setLoading: (loading: boolean) => void
}

const useAppStore = create<AppStore>((setState) => ({
  loading: false,
  setLoading(loading) {
    setState({loading});
  }
}));

export default useAppStore;