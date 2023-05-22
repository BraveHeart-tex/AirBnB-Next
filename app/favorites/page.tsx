import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import FavoritesClient from './FavoritesClient';

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    <ClientOnly>
      <EmptyState
        title='Favorileriniz bulunamadı'
        subtitle='Görünüşe göre favorilerinizde hiçbir şey yok. '
      />
    </ClientOnly>;
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
