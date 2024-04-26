import React, { useState, ReactNode } from 'react';



interface PostProviderProps {
  children: ReactNode; // Define the type for children here
}
interface DataContextValue {
    ordinalsAddress?: string; // Use the appropriate type for ordinalsAddress
    setOrdinalsAddress: (ordinalsAddress: string) => void; // Use the appropriate type for the setter function
  }
const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [ordinalsAddress, setOrdinalsAddress] = useState<string | undefined>();

  // You might want to include isLoading and ordinalsAddress in the context value
  return (
    <DataContext.Provider
      value={{
        ordinalsAddress,
        setOrdinalsAddress,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const DataContext = React.createContext<DataContextValue>({});
export default PostProvider;