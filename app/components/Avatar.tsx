'use client';
import Image from 'next/image';

interface IAvatarProps {
  src: string | null | undefined;
}

const Avatar = ({ src }: IAvatarProps) => {
  return (
    <div>
      <Image
        className='rounded-full'
        height={30}
        width={30}
        src={src || '/images/placeholder.jpeg'}
        alt='Avatar'
      />
    </div>
  );
};
export default Avatar;
