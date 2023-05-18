'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Heading from './Heading';
import Button from './Button';

interface IEmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  title = 'Herhangi bir ilan bulunamadı',
  subtitle = 'Kullandığınız filtreleri değiştirmeyi veya kaldırmayı deneyin',
  showReset,
}: IEmptyStateProps) => {
  const router = useRouter();
  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
      <Heading center title={title} subTitle={subtitle} />
      <div className='w-48 mt-4'>
        {showReset && (
          <Button
            outline
            label='Bütün filtreleri kaldır'
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
