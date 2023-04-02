import Button from 'components/Base/Button';
import TextInput from 'components/Base/TextInput';
import { CustomersContext } from 'context/CustomersContext';
import React, { FormEvent, useContext, useState } from 'react';
import type { IUser, TUserStatus } from 'types';

const defaultState: Omit<IUser, 'id'> = {
  firstName: '',
  lastName: '',
  company: '',
  status: 'user',
  email: '',
  password: '',
};

const AddCustomerForm = () => {
  const { addItem } = useContext(CustomersContext);

  const [firstName, setFirstName] = useState(defaultState.firstName);
  const [lastName, setLastName] = useState(defaultState.lastName);
  const [company, setCompany] = useState(defaultState.company);
  const [status, setStatus] = useState<TUserStatus>(defaultState.status);
  const [email, setEmail] = useState(defaultState.email);
  const [password, setPassword] = useState(defaultState.password);

  const resetForm = () => {
    setFirstName(defaultState.firstName);
    setLastName(defaultState.lastName);
    setCompany(defaultState.company);
    setStatus(defaultState.status);
    setEmail(defaultState.email);
    setPassword(defaultState.password);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (firstName && lastName && company && status && email && password) {
      addItem({
        firstName,
        lastName,
        company,
        status,
        email,
        password,
      });

      resetForm();
    } else {
      console.log('is errored');
    }
  };

  const isSelectedStatus = (value: 'user' | 'admin') => {
    return status === value;
  };

  return (
    <form className="p-10" onSubmit={handleFormSubmit}>
      <h3 className="text-xl font-bold leading-6 mb-10 text-[#0F172A]">Add Customer</h3>

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

        <TextInput
          label="Password"
          type="password"
          caption="8+ characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default AddCustomerForm;
