'use client';

import React, { useMemo, useState } from 'react';
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../Inputs/CategoryInput';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import CountrySelect, { CountrySelectValue } from '../Inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../Inputs/Counter';
import ImageUpload from '../Inputs/ImageUpload';
import Input from '../Inputs/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('İlanınız başarıyla yaratıldı!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error('Bir hata oluştu!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return 'Cancel';
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Aşağıdakilerden hangisi evinizi en iyi şekilde anlatıyor?'
        subTitle='Bir kategori seçin'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
        {categories.map((item) => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title={'Eviniz nerede?'}
          subTitle='Misafirlerin sizi bulmasına yardım edin.'
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title={'Eviniz hakkında basit bilgiler verin'}
          subTitle='Evinizde ne gibi olanaklar var?'
        />
        <Counter
          title={'Misafir sayısı'}
          subtitle={'En fazla kaç kişiye ev sahipliği yapmak istiyorsunuz?'}
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title={'Oda sayısı'}
          subtitle={'Evinizde kaç oda var?'}
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title={'Banyo?'}
          subtitle={'Evinizde kaç adet banyo var?'}
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title={'Evinizin fotoğrafını ekleyin'}
          subTitle={'Misafirlere evinizin nasıl göründüğünü gösterin!'}
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          image={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title={'Evinizi nasıl tarif edersiniz?'}
          subTitle='Kısa ve öz her zaman iyidir!'
        />
        <Input
          id={'title'}
          label={'Başlık'}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id={'description'}
          label={'Açıklama'}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title={'Şimdi, fiyatınızı belirleyin'}
          subTitle={'Eviniz için günlük ne kadar ücret alıyorsunuz?'}
        />
        <Input
          id={'price'}
          label={'Fiyat'}
          formatPrice
          type='number'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? rentModal.onClose : onBack}
      title='Evimi Airbnb’ye ekle'
      body={bodyContent}
    />
  );
};

export default RentModal;
