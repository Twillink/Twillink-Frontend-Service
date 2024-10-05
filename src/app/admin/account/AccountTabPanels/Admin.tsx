import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import SvgClose from '@/assets/svgComponents/SvgClose';
import Button from '@/components/Button';
import ErrorMessageField from '@/components/ErrorMessageField';
import Input from '@/components/Input';
import {mockAdmins} from '@/mock/mockAdmins';

const Admin = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: (values, {resetForm}) => {
      console.log('Inviting:', values.email);
      resetForm();
    },
  });

  return (
    <div className="w-full flex flex-col gap-6">
      <p className="text-primary text-xl font-bold w-full mb-6">All Admin</p>
      <div className="overflow-x-auto">
        <table className="table">
          <tbody>
            {mockAdmins.map(admin => (
              <tr key={admin.id} className="border-none">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-circle h-9 w-9">
                        <img
                          src={admin.avatar}
                          alt={`Avatar of ${admin.name}`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-base text-primary">
                        {admin.name}
                      </div>
                      <div className="font-normal text-xs text-general-med">
                        {admin.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="w-max text-general-med bg-contras-med px-3 py-[6px] rounded-lg border border-general-med font-normal text-base">
                    {admin.role}
                  </div>
                </td>
                <th>
                  <div className="flex justify-end">
                    <Button
                      title="Remove"
                      outline
                      size="sm"
                      iconPosition="left"
                      className="stroke-primary hover:stroke-primary-content"
                      icon={<SvgClose height={16} />}
                    />
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pl-16 pt-3">
          <hr />
        </div>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="pl-16 pt-3 flex gap-5 items-center flex-row">
        <div className="w-full max-w-56 relative">
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Add new admin"
            id="email"
            className={
              formik.touched.email && formik.errors.email ? 'input-error' : ''
            }
          />
          <ErrorMessageField
            error={formik.errors.email}
            touched={formik.touched.email}
            className="absolute -bottom-5 left-1"
          />
        </div>
        <div>
          <Button
            type="submit"
            title="Invite"
            size="md"
            iconPosition="left"
            icon={<SvgClose height={20} className="stroke-primary-content" />}
          />
        </div>
      </form>
    </div>
  );
};

export default Admin;
