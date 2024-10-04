'use client';

import GradientBg from '@/components/GradientBg';
import {Form, Formik, FormikErrors} from 'formik';
import {motion, AnimatePresence} from 'framer-motion';
import {useState} from 'react';
import * as Yup from 'yup';
import FormClaim from './Forms/FormClaim';
import FormEmail from './Forms/FormEmail';
import FormVerify from './Forms/FormVerify';
import {useRouter} from 'next/navigation';
import SvgArrowLeft from '@/assets/svgComponents/SvgArrowLeft';
import ButtonIcon from '@/components/ButtonIcon';
import {StepsEnum} from '@/libs/StepsEnum';

interface IItem {
  title: string;
  btnLabel: string;
  seq: number;
  step: StepsEnum;
}

const dataSteps: IItem[] = [
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

type InitialData = {
  username: string;
  email: string;
  password: string;
  otp: string;
};

const initialValue: InitialData = {
  username: '',
  email: '',
  password: '',
  otp: '',
};

const CARD_OFFSET = -20;
const SCALE_FACTOR = 0.06;

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [cards, setCards] = useState<IItem[]>(dataSteps);
  const [currentSeqActive, setCurrentSeqActive] = useState<number>(1);

  const stepSchemas = [
    Yup.object({
      username: Yup.string().required('Username is required'),
    }),
    Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password cannot exceed 20 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/\d/, 'Password must contain at least one number'),
    }),
    Yup.object({
      otp: Yup.string()
        .required('OTP is required')
        .length(6, 'OTP must be exactly 6 characters'),
    }),
  ];

  const handleNext = async (
    currentSeq: number,
    validateForm: () => Promise<FormikErrors<InitialData>>,
  ) => {
    const errors = await validateForm();

    if (Object.keys(errors).length > 0) {
      console.log('Validation Errors:', errors);
      return;
    }

    if (currentSeq === dataSteps[dataSteps.length - 1].seq) {
      handleSubmit(initialValue);
      router.push('/admin');
    } else {
      setCards(cards.slice(1));
      setCurrentSeqActive(
        dataSteps.find(item => item.seq > currentSeq)?.seq || 1,
      );
    }
  };

  const handleBack = (currentSeq: number) => {
    const targetSeq = currentSeq - 1;
    const previousCard = dataSteps.find(item => item.seq === targetSeq);

    if (previousCard) {
      setCards([previousCard, ...cards]);
      setCurrentSeqActive(targetSeq);
    }
  };

  const renderForm = (step: StepsEnum, onNext: () => void) => {
    switch (step) {
      case StepsEnum.CLAIM:
        return <FormClaim onNext={onNext} />;
      case StepsEnum.EMAIL:
        return <FormEmail onNext={onNext} />;
      case StepsEnum.VERIFY:
        return <FormVerify />;
      default:
        return null;
    }
  };

  const handleSubmit = (values: InitialData) => {
    console.log('Form submitted:', values);
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
          {({validateForm}) => (
            <Form>
              <div className="stack">
                <AnimatePresence>
                  {cards.map((item, index) => (
                    <motion.div
                      className="card bg-contras-high text-primary-content shadow-sm"
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
                      <div className="card-body px-[99px] py-[90px]">
                        <div className="flex flex-col gap-6 w-full sm:w-[376px]">
                          {item.seq !== dataSteps[0].seq && (
                            <ButtonIcon
                              icon={
                                <SvgArrowLeft className="stroke-primary hover:stroke-general-med" />
                              }
                              onClick={() => handleBack(item.seq)}
                              type="button"
                              className="flex justify-start w-max"
                            />
                          )}
                          <h3 className="card-title text-primary">
                            {item.title}
                          </h3>
                          {index === 0 &&
                            renderForm(item.step, () =>
                              handleNext(item.seq, validateForm),
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
