import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import ReservationsClient from './ReservationsClient';

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title='Bunu yapmaya yetkiniz yok gibi görünüyor'
          subtitle='Lütfen oturum açın.'
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='Rezervasyon bulunamadı'
          subtitle='Görünüşe göre evleriniz için herhangi bir rezervasyon yok'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
