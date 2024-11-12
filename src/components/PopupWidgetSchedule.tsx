import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import Button from './Button';
import PopupContainer from './PopupContainer';
import AddWidgetLinkSchema from '@/libs/schema/Widget/WidgetLink.schema';
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import Input from '@/components/Input';

interface IPopupWidgetSchedule {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onAdd: (type: WidgetTypeEnum, value: object) => Promise<boolean>;
  disabled?: boolean;
}

const PopupWidgetSchedule: React.FC<IPopupWidgetSchedule> = ({
  isOpen,
  onClose,
  onBack,
  onAdd,
  disabled = false,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 7, 27));

  const formik = useFormik({
    initialValues: {
      title: '',
      url: '',
      selectedImage: null,
      startTime: '',
      endTime: '',
    },
    validationSchema: AddWidgetLinkSchema,
    onSubmit: async values => {
      const value = {
        title: values.title,
        url: values.url,
        image: values.selectedImage,
      };

      const success = await onAdd(WidgetTypeEnum.Link, value);
      if (success) {
        formik.resetForm();
        onClose();
      }
    },
  });

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';

    return (
      <div className="flex justify-between items-center mb-2">
        <div
          className="cursor-pointer text-red-500"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          <i className="fas fa-chevron-left text-primary"></i>
          Before
        </div>
        <span className="text-lg font-medium text-primary">
          {format(currentMonth, dateFormat)}
        </span>
        <div
          className="cursor-pointer text-red-500 text-lg"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          <i className="fas fa-chevron-righttext-red-500"></i>
          Next
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEEEEE';
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-sm text-gray-500" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>,
      );
    }

    return <div className="grid grid-cols-7 gap-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        days.push(
          <div
            className={`w-8 h-8 flex items-center text-primary justify-center rounded-full cursor-pointer ${!isSameMonth(day, monthStart) ? 'text-gray-400' : isSameDay(day, selectedDate) ? 'bg-primary text-primary-content' : ''}`}
            key={day.toString()}
            onClick={() => setSelectedDate(cloneDay)}>
            <span>{formattedDate}</span>
          </div>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div
          className="grid grid-cols-7 gap-2 text-primary"
          key={day.toString()}>
          {days}
        </div>,
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  return (
    <PopupContainer
      title="Add Schedule"
      onClose={onClose}
      onBack={onBack}
      isOpen={isOpen}>
      <form
        method="dialog"
        className="modal-backdrop flex flex-col gap-5"
        onSubmit={formik.handleSubmit}>
        <div className="text-center mb-4">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
        <div className="text-center mb-4">
          <div className="text-sm text-gray-500">
            {format(selectedDate, 'EEEE')}
          </div>
          <div className="text-lg font-medium text-primary">
            {format(selectedDate, 'd MMMM yyyy')}
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="w-1/2 pr-2">
            <label className="block text-sm text-gray-500 mb-1">
              Start Time
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1">
              <Input
                type="text"
                placeholder="HH : MM"
                className="w-full text-center focus:outline-none"
                name="startTime"
                onChange={formik.handleChange}
                value={formik.values.startTime}
              />
              <i className="far fa-clock text-gray-500"></i>
            </div>
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-sm text-gray-500 mb-1">End Time</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1">
              <Input
                type="text"
                placeholder="HH : MM"
                className="w-full text-center focus:outline-none"
                name="endTime"
                onChange={formik.handleChange}
                value={formik.values.endTime}
              />
              <i className="far fa-clock text-gray-500"></i>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-max"
            title="Add"
            disabled={disabled}
          />
        </div>
      </form>
    </PopupContainer>
  );
};

export default PopupWidgetSchedule;
