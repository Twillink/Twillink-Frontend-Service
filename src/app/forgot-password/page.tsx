'use client';

import GradientBg from '@/components/GradientBg';
import {Form, Formik, FormikErrors} from 'formik';
import * as Yup from 'yup';
import ButtonIcon from '@/components/ButtonIcon';
import SvgArrowLeft from '@/assets/svgComponents/SvgArrowLeft';
import Link from 'next/link';
import {useAppDispatch, useAppSelector} from '@/libs/hooks/useReduxHook';
import {useRouter} from 'next/navigation';
import {
  resetSubmitState,
  setSubmitLoading,
  setSubmitSuccess,
} from '@/libs/store/features/generalSubmitSlice';
import {apiOtpSend, apiOtpValidate} from '@/libs/api';
import {useState} from 'react';
import {resetToastState} from '@/libs/store/features/toastSlice';
import {TypeOtpEnum} from '@/libs/types/TypeOtpEnum';
import {StepsEnum} from '@/libs/types/StepsEnum';
import {AnimatePresence, motion} from 'framer-motion';
import FormEmailForgotPassword from '@/app/forgot-password/Forms/FormEmailForgotPassword';
import FormVerifyForgotPassword from '@/app/forgot-password/Forms/FormVerifyForgotPassword';
import {setForgotPassword} from '@/libs/store/features/forgotPasswordSlice';

export type ForgotPasswordInitialData = {
  email: string;
  codeOtp: string;
};

const initialValue: ForgotPasswordInitialData = {
  email: '',
  codeOtp: '',
};

interface IItemStepForgotPassword {
  title: string;
  btnLabel: string;
  seq: number;
  step: StepsEnum;
}

const dataSteps: IItemStepForgotPassword[] = [
  {
    seq: 1,
    title: 'Forgot Password',
    btnLabel: 'Submit',
    step: StepsEnum.EMAIL,
  },
  {
    seq: 2,
    title: 'Please input code that already sent to your email',
    btnLabel: '',
    step: StepsEnum.VERIFY,
  },
];

const CARD_OFFSET = -20;
const SCALE_FACTOR = 0.06;

function ForgotPasswordPage() {
  const [cards, setCards] = useState<IItemStepForgotPassword[]>(dataSteps);
  const [currentCard, setCurrentCard] = useState<number>(1);

  const dispatch = useAppDispatch();
  const generalSubmit = useAppSelector(state => state.generalSubmit);

  const router = useRouter();

  const stepSchema = [
    Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
    }),
    Yup.object({
      otp: Yup.string()
        .required('OTP is required')
        .length(4, 'OTP must be exactly 4 characters'),
    }),
  ];

  const handleNext = async (
    currentSeq: number,
    validateForm: () => Promise<FormikErrors<ForgotPasswordInitialData>>,
    values: ForgotPasswordInitialData,
  ) => {
    dispatch(resetSubmitState());
    dispatch(resetToastState());
    const errors = await validateForm();

    if (Object.keys(errors).length > 0) {
      return;
    }

    if (currentSeq === 1) {
      const success = await handleSendOtp(values);

      if (!success) {
        return;
      }
    }

    setCards(cards.slice(1));
    setCurrentCard(dataSteps.find(item => item.seq > currentSeq)?.seq || 1);
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
      setCurrentCard(targetSeq);
    }
    if (currentSeq === 2) {
      setFieldValue('otp', '');
    }
  };

  const renderForm = (
    step: StepsEnum,
    onNext: () => void,
    handleSubmit: (data: ForgotPasswordInitialData) => void,
    formValues: ForgotPasswordInitialData,
  ) => {
    switch (step) {
      case StepsEnum.EMAIL:
        return (
          <FormEmailForgotPassword
            onNext={onNext}
            generalSubmit={generalSubmit}
          />
        );
      case StepsEnum.VERIFY:
        return (
          <FormVerifyForgotPassword
            handleSubmit={handleSubmit}
            generalSubmit={generalSubmit}
            formValues={formValues}
          />
        );
      default:
        return null;
    }
  };

  const handleSendOtp = async (values: ForgotPasswordInitialData) => {
    dispatch(setSubmitLoading(true));
    const body = {
      email: values.email,
      typeOtp: TypeOtpEnum.forgotPassword,
    };

    return apiOtpSend(dispatch, body)
      .then(() => {
        dispatch(setSubmitSuccess(true));

        return true;
      })
      .catch(() => {
        return false;
      })
      .finally(() => {
        dispatch(setSubmitLoading(false));
      });
  };

  const handleSubmit = async (values: ForgotPasswordInitialData) => {
    dispatch(setSubmitLoading(true));

    return apiOtpValidate(dispatch, values)
      .then(() => {
        dispatch(setSubmitSuccess(true));
        dispatch(setForgotPassword(values));
        router.push(`/reset-password`);
        return true;
      })
      .catch(() => {
        return false;
      })
      .finally(() => {
        dispatch(setSubmitLoading(false));
      });
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
          validationSchema={stepSchema[currentCard - 1]}>
          {({
            values,

            validateForm,
            setFieldValue,
          }) => (
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
                      transition={{
                        duration: 0.3,
                        ease: [0, 0.71, 0.2, 1.01],
                      }}>
                      <div className="card-body w-full px-6 sm:px-[99px] py-10 sm:py-[90px]">
                        <div className="flex flex-col gap-6 w-full">
                          {item.seq !== dataSteps[0].seq ? (
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
                          ) : (
                            <Link href="/login">
                              <ButtonIcon
                                icon={
                                  <SvgArrowLeft
                                    height={24}
                                    className="stroke-primary hover:stroke-general-med"
                                  />
                                }
                                type="button"
                                className="flex justify-start w-max"
                              />
                            </Link>
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
}

export default ForgotPasswordPage;
