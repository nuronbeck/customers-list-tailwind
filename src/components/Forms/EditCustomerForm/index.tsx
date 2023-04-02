import Button from 'components/Base/Button';
import TextInput from 'components/Base/TextInput';
import { CustomersContext } from 'context/CustomersContext';
import { FormEvent, useContext, useEffect, useState } from 'react';
import type { IUser, TUserStatus } from 'types';

interface IEditCustomerForm extends Pick<IUser, 'id'> {
  onEditSuccess: () => void;
}

const defaultState: Omit<IUser, 'id' | 'password'> = {
  firstName: '',
  lastName: '',
  company: '',
  status: 'user',
  email: '',
};

const EditCustomerForm = ({ id, onEditSuccess }: IEditCustomerForm) => {
  const { findItem, editItem } = useContext(CustomersContext);

  const [firstName, setFirstName] = useState(defaultState.firstName);
  const [lastName, setLastName] = useState(defaultState.lastName);
  const [company, setCompany] = useState(defaultState.company);
  const [status, setStatus] = useState<TUserStatus>(defaultState.status);
  const [email, setEmail] = useState(defaultState.email);

  useEffect(() => {
    const customer = findItem({ id });

    if (customer?.id) {
      setFirstName(customer.firstName);
      setLastName(customer.lastName);
      setCompany(customer.company);
      setStatus(customer.status);
      setEmail(customer.email);
    }
  }, [findItem, id]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (id && firstName && lastName && company && status && email) {
      editItem({
        id,
        firstName,
        lastName,
        company,
        status,
        email,
      });

      onEditSuccess?.();
    }
  };

  const isSelectedStatus = (value: 'user' | 'admin') => {
    return status === value;
  };

  return (
    <form className="p-10" onSubmit={handleFormSubmit}>
      <h3 className="text-xl font-bold leading-6 mb-10 text-[#0F172A]">Edit Customer</h3>

      <div className="bg-white rounded-lg flex flex-col">
        <div className="grid grid-cols-2 gap-6">
          <TextInput
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextInput
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <TextInput label="Company" value={company} onChange={(e) => setCompany(e.target.value)} />

        <div>
          <div className="field-group-label">Status</div>

          <div
            className="grid grid-cols-2 gap-1 align-middle rounded-xl p-1 bg-[#F1F5F9] mb-6"
            role="group"
          >
            <Button
              variant={isSelectedStatus('user') ? 'white' : 'transparent'}
              elevated={isSelectedStatus('user')}
              onClick={() => setStatus('user')}
            >
              User
            </Button>

            <Button
              variant={isSelectedStatus('admin') ? 'white' : 'transparent'}
              elevated={isSelectedStatus('admin')}
              onClick={() => setStatus('admin')}
            >
              Administrator
            </Button>
          </div>
        </div>

        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default EditCustomerForm;
