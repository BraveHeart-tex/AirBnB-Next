import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';

import getCurrentUser from '../actions/getCurrentUser';
import PropertiesClient from './PropertiesClient';
import getListings from '../actions/getListings';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title='Bunu yapmaya yetkiniz yok gibi görünüyor'
          subtitle='Lütfen oturum açın'
        />
      </ClientOnly>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Airbnb'ye kayıtlı eviniz yok gibi görünüyor"
          subtitle='Evinizi kaydetmek için bir ilan oluşturun'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
