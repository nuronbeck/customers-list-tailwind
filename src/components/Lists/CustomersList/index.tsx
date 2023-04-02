import Button from 'components/Base/Button';
import Icon from 'components/Icons';
import { CustomersContext } from 'context/CustomersContext';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Jdenticon from 'react-jdenticon';

import type { IUser } from 'types';

interface IRowItem extends Omit<IUser, 'id' | 'password'> {
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const RowsHeader = () => {
  return (
    <div className="text-[#94A3B8] font-medium w-full grid grid-cols-[minmax(307px,_1fr)_minmax(307px,_1fr)_minmax(307px,_1fr)_100px_100px]">
      <span className="py-3">Name</span>
      <span className="py-3">Company</span>
      <span className="py-3">Email</span>
      <span className="py-3">Admin</span>
      <span className="py-3">Actions</span>
    </div>
  );
};

const RowItem = ({
  firstName,
  lastName,
  company,
  status,
  email,
  onEditClick,
  onDeleteClick,
}: IRowItem) => {
  return (
    <div className="w-full grid grid-cols-[minmax(307px,_1fr)_minmax(307px,_1fr)_minmax(307px,_1fr)_100px_100px]">
      <span className="py-4 flex justify-start align-middle content-center">
        <span className="flex justify-center align-middle content-center pt-1 rounded-lg w-8 h-8 bg-[#F1F5F9]">
          <Jdenticon size="24" value={email} />
        </span>
        <span className="ml-2">{`${firstName} ${lastName}`}</span>
      </span>
      <span className="py-4">{company}</span>
      <span className="py-4">{email}</span>
      <span className="py-4">
        <span
          className={`block w-12 h-6 rounded-[4px] ${
            status === 'admin' ? 'bg-primary ' : 'bg-[#E2E8F0]'
          }`}
        ></span>
      </span>
      <span className="py-4">
        <span className="flex flex-row gap-2">
          <Button variant="transparent" className="p-0" onClick={() => onEditClick?.()}>
            <Icon name="pensil" />
          </Button>

          <Button variant="transparent" className="p-0" onClick={() => onDeleteClick?.()}>
            <Icon name="trash" />
          </Button>
        </span>
      </span>
    </div>
  );
};

const EmptyList = () => {
  return (
    <div className="text-[#94A3B8] font-normal py-12 border my-4 w-full flex justify-center align-middle">
      <div className="py-3 text-center">
        <div className="mb-1">There is no data.</div>
        <div>Add your first customer</div>
      </div>
    </div>
  );
};

const CustomersList = () => {
  const router = useRouter();
  const { items, deleteItem } = useContext(CustomersContext);

  const handleClickEdit = (id: number) => {
    router.push(`/edit/${id}`);
  };

  return (
    <div className="p-10">
      <h3 className="text-xl font-bold leading-6 mb-10 text-[#0F172A]">Customers</h3>

      <div className="relative overflow-x-auto">
        <div className="w-full text-base text-left">
          <RowsHeader />

          {!items.length ? (
            <EmptyList />
          ) : (
            items.map(({ id, firstName, lastName, company, email, status }) => (
              <RowItem
                key={id}
                firstName={firstName}
                lastName={lastName}
                company={company}
                email={email}
                status={status}
                onEditClick={() => handleClickEdit(id)}
                onDeleteClick={() => deleteItem({ id })}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersList;
