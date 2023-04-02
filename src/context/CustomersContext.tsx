import useLocalStorageState from 'hooks/useLocalstorageState';
import { createContext } from 'react';

import type { PropsWithChildren } from 'react';
import type { IUser } from 'types';

interface ICustomersContext {
  items: IUser[];
  findItem: (payload: Pick<IUser, 'id'>) => IUser | undefined;
  addItem: (payload: Omit<IUser, 'id'>) => void;
  editItem: (payload: Omit<IUser, 'password'>) => void;
  deleteItem: (id: Pick<IUser, 'id'>) => void;
}

export const CustomersContext = createContext<ICustomersContext>({
  items: [],
  findItem: () => undefined,
  addItem: () => {},
  editItem: () => {},
  deleteItem: () => {},
});

export const CustomersProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [items, setItems] = useLocalStorageState<IUser[]>('customers', []);

  const findItem = ({ id }: Pick<IUser, 'id'>) => {
    const item = items.find((item) => item.id === id);
    return item;
  };

  const addItem = (payload: Omit<IUser, 'id'>) => {
    const unixTime = Math.floor(new Date().getTime() / 1000);

    setItems((prev) => {
      return [
        ...prev,
        {
          id: unixTime,
          ...payload,
        },
      ];
    });
  };

  const deleteItem = ({ id }: Pick<IUser, 'id'>) => {
    setItems((prev) => {
      return prev.filter((e) => e.id !== id);
    });
  };

  const editItem = ({ id, ...props }: Omit<IUser, 'password'>) => {
    setItems((prev) => {
      return prev.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            ...props,
          };
        }

        return el;
      });
    });
  };

  return (
    <CustomersContext.Provider
      value={{
        items,
        findItem,
        addItem,
        editItem,
        deleteItem,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};
