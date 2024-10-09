import React from 'react';
import {mockBilling} from '@/mock/mockBilling';
import {capitalizeFirstLetter} from '@/utils/formater';

interface PlanContainerProps {
  title: string;
  value: string;
}

const PlanContainer: React.FC<PlanContainerProps> = ({title, value}) => (
  <div className="md:w-1/3 w-full border border-contras-med px-4 py-2">
    <p className="font-normal text-base">{title}</p>
    <p className="font-bold text-xl">{value}</p>
  </div>
);

const Billing: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6 text-primary">
      <div className="flex flex-wrap rounded-lg border border-contras-med">
        <PlanContainer title="Plan" value="Pro" />
        <PlanContainer title="Next invoice issue date" value="Sep 27, 2024" />
        <PlanContainer title="Invoice total" value="$15" />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="font-bold text-base text-primary">
              <th>Date</th>
              <th>Invoice Total</th>
              <th>
                <div className="flex justify-end">Status</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {mockBilling.map(bill => (
              <tr key={bill.id} className="border-none">
                <td>
                  <div className="flex items-center gap-3">{bill.date}</div>
                </td>
                <td>
                  <div className="font-normal text-base">${bill.total}</div>
                </td>
                <td>
                  <div className="flex justify-end font-normal text-base">
                    {capitalizeFirstLetter(bill.status)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pl-16 pt-3">
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Billing;
