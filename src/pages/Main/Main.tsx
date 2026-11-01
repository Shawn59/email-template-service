import styles from './Main.module.scss';
import { useEffect } from 'react';
import { Auth } from '@components';
import { constants } from '../../constants';
import { useDispatch } from 'react-redux';
import { actionSetUser } from '../../store/userSlice/user.slice';
import { useAppSelector } from '../../store/hooks';
import WelcomeEmail from '../../_components/Emails/WelcomeEmail/WelcomeEmail.tsx';

export const Main = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const userInfo = localStorage.getItem(constants.localStorage.USER_INFO);

    if (userInfo) {
      try {
        dispatch(actionSetUser(JSON.parse(userInfo)));
      } catch (error) {
        console.error('Невалидные данные для userInfo', error);

        localStorage.removeItem(constants.localStorage.USER_INFO);
      }
    }
  }, [dispatch]);

  /* return <section className={styles.main}>{user ? <Chat className={styles.chatContainer} /> : <Auth />}</section>;*/
  return (
    <section className={styles.main}>
      {user ? <WelcomeEmail name={'Бтн немй'} verificationUrl={'dsfsd'} /> : <Auth />}
    </section>
  );
};
