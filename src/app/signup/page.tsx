'use client';

import GradientBg from '@/components/GradientBg';
import {Form, Formik, FormikErrors} from 'formik';
import {motion, AnimatePresence} from 'framer-motion';
import {useState} from 'react';
import * as Yup from 'yup';
import FormClaim from './Forms/FormClaim';
import FormEmail from './Forms/FormEmail';
import FormVerify from './Forms/FormVerify';
import SvgArrowLeft from '@/assets/svgComponents/SvgArrowLeft';
import ButtonIcon from '@/components/ButtonIcon';
import {StepsEnum} from '@/libs/types/StepsEnum';
import {apiAuthRegister, apiOtpSend} from '@/libs/api';
import {ErrorApiResponseType} from '@/libs/types/ErrorApiResponseType';
import {IAuthInitialData} from '@/libs/types/IAuthInitialData';
import {TypeOtpEnum} from '@/libs/types/TypeOtpEnum';
import {useAppDispatch, useAppSelector} from '@/libs/hooks/useReduxHook';
import {authLogin} from '@/libs/store/features/authSlice';
import {
  resetSubmitState,
  setSubmitLoading,
  setSubmitSuccess,
} from '@/libs/store/features/generalSubmitSlice';
import {resetToastState, showToast} from '@/libs/store/features/toastSlice';
import {ToastType} from '@/libs/types/ToastType';

interface IItemStepSignup {
  title: string;
  btnLabel: string;
  seq: number;
  step: StepsEnum;
}

const dataSteps: IItemStepSignup[] = [
  {
    seq: 1,
    title: 'Claim your link',
    btnLabel: 'Grab My Link',
    step: StepsEnum.CLAIM,
  },
  {
    seq: 2,
    title: 'Your email and password...',
    btnLabel: 'Send',
    step: StepsEnum.EMAIL,
  },
  {
    seq: 3,
    title: 'Please input code that already sent to your email',
    btnLabel: '',
    step: StepsEnum.VERIFY,
  },
];

const initialValue: IAuthInitialData = {
  username: '',
  email: '',
  password: '',
  otp: '',
};

const CARD_OFFSET = -20;
const SCALE_FACTOR = 0.06;

const SignupPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [cards, setCards] = useState<IItemStepSignup[]>(dataSteps);
  const [currentSeqActive, setCurrentSeqActive] = useState<number>(1);

  const generalSubmit = useAppSelector(state => state.generalSubmit);

  const stepSchemas = [
    Yup.object({
      username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters long')
        .max(30, 'Username cannot exceed 30 characters'),
    }),
    Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    }),
    Yup.object({
      otp: Yup.string()
        .required('OTP is required')
        .length(4, 'OTP must be exactly 4 characters'),
    }),
  ];

  const handleNext = async (
    currentSeq: number,
    validateForm: () => Promise<FormikErrors<IAuthInitialData>>,
    values: IAuthInitialData,
  ) => {
    dispatch(resetSubmitState());
    dispatch(resetToastState());
    const errors = await validateForm();

    if (Object.keys(errors).length > 0) {
      return;
    }

    if (currentSeq === 2) {
      const success = await handleSendOtp(values);

      if (!success) {
        return;
      }
    }

    setCards(cards.slice(1));
    setCurrentSeqActive(
      dataSteps.find(item => item.seq > currentSeq)?.seq || 1,
    );
  };

  const handleBack = (
    currentSeq: number,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    dispatch(resetSubmitState());
    dispatch(resetToastState());
    const targetSeq = currentSeq - 1;
    const previousCard = dataSteps.find(item => item.seq === targetSeq);

    if (previousCard) {
      setCards([previousCard, ...cards]);
      setCurrentSeqActive(targetSeq);
    }
    if (currentSeq === 3) {
      setFieldValue('otp', '');
    }
  };

  const renderForm = (
    step: StepsEnum,
    onNext: () => void,
    handleSubmit: () => void,
    formValues: IAuthInitialData,
  ) => {
    switch (step) {
      case StepsEnum.CLAIM:
        return <FormClaim onNext={onNext} />;
      case StepsEnum.EMAIL:
        return <FormEmail onNext={onNext} generalSubmit={generalSubmit} />;
      case StepsEnum.VERIFY:
        return (
          <FormVerify
            handleSubmit={handleSubmit}
            generalSubmit={generalSubmit}
            formValues={formValues}
          />
        );
      default:
        return null;
    }
  };

  const handleSendOtp = async (values: IAuthInitialData) => {
    dispatch(setSubmitLoading(true));
    try {
      const body = {
        email: values.email,
        typeOtp: TypeOtpEnum.signUp,
      };
      const response = await apiOtpSend(body);
      if (response.status === 200 || response.status === 201) {
        dispatch(setSubmitSuccess(true));
      }
      return true;
    } catch (error: unknown) {
      const apiError = error as ErrorApiResponseType;
      dispatch(
        showToast({
          title: 'Failed',
          message: apiError.data?.message,
          type: ToastType.ERROR,
        }),
      );
      return false;
    } finally {
      dispatch(setSubmitLoading(false));
    }
  };

  const handleSubmit = async (values: any) => {
    dispatch(setSubmitLoading(true));
    try {
      const body = {
        userName: values.username,
        email: values.email,
        phoneNumber: '',
        fullName: '',
        password: values.password,
      };
      const response = await apiAuthRegister(body);
      if (response.status === 200 || response.status === 201) {
        dispatch(authLogin(response.data));
        localStorage.setItem('authToken', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch(setSubmitSuccess(true));
        dispatch(
          showToast({
            title: 'Success',
            message: response.data.message,
            type: ToastType.SUCCESS,
          }),
        );
      }
    } catch (error: unknown) {
      const apiError = error as ErrorApiResponseType;
      dispatch(
        showToast({
          title: 'Failed',
          message: apiError.data?.message,
          type: ToastType.ERROR,
        }),
      );
    } finally {
      dispatch(setSubmitLoading(false));
    }
  };

  return (
    <div data-theme="skinLight">
      <GradientBg />
      <div className="h-screen w-screen flex flex-col items-center justify-center px-1">
        <Formik
          initialValues={initialValue}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={handleSubmit}
          validationSchema={stepSchemas[currentSeqActive - 1]}>
          {({validateForm, handleSubmit, setFieldValue, values}) => (
            <Form className="w-full">
              <div className="stack w-full">
                <AnimatePresence>
                  {cards.map((item, index) => (
                    <motion.div
                      className="card w-full max-w-[528px] bg-contras-high text-primary-content shadow-sm"
                      key={`card_${item.seq}`}
                      initial={{y: 0}}
                      animate={{
                        y: index * 10,
                        opacity: index === 0 ? 1 : 0.5,
                        top: index * -CARD_OFFSET,
                        scale: 1 - index * SCALE_FACTOR,
                        zIndex: cards.length - index,
                      }}
                      exit={{y: -700}}
                      transition={{duration: 0.3, ease: [0, 0.71, 0.2, 1.01]}}>
                      <div className="card-body px-6 sm:px-[99px] py-14 sm:py-[90px]">
                        <div className="flex flex-col gap-6 w-full">
                          {item.seq !== dataSteps[0].seq && (
                            <ButtonIcon
                              icon={
                                <SvgArrowLeft className="stroke-primary hover:stroke-general-med" />
                              }
                              onClick={() =>
                                handleBack(item.seq, setFieldValue)
                              }
                              type="button"
                              className="flex justify-start w-max"
                            />
                          )}
                          <h3 className="card-title text-primary">
                            {item.title}
                          </h3>
                          {index === 0 &&
                            renderForm(
                              item.step,
                              () => handleNext(item.seq, validateForm, values),
                              handleSubmit,
                              values,
                            )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;
