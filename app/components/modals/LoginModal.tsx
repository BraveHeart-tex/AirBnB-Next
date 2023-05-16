'use client';

import { signIn } from 'next-auth/react';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { MouseEvent, useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Giriş başarılı, hoş geldiniz.');
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error('Giriş başarısız :(');
      }
    });
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title={"Airbnb'ye hoş geldiniz"}
        subTitle='Hesabınıza giriş yapın!'
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        type='password'
        label='Şifre'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label={'Google hesabınız ile oturum açın'}
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label={'Github hesabınız ile oturum açın'}
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>Hesabınız yok mu? </div>
          <div
            onClick={toggle}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
            Kaydolun{' '}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title='Oturum açın veya kaydolun'
        actionLabel='Oturum aç'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};
export default LoginModal;
