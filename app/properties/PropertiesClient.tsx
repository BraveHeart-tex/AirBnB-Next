'use client';
import { useRouter } from 'next/navigation';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { SafeListing, SafeUser } from '../types';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface ITripsClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient = ({ listings, currentUser }: ITripsClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('İlan iptal edildi');
          router.refresh();
        })
        .catch((error) => {
          toast.error(
            `Bir şeyler ters gitti: ${error?.response?.data?.message}}`
          );
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title='Evlerim'
        subTitle='Airbnb’deki evlerinizi burada görebilirsiniz.'
      />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel='Evi sil'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
