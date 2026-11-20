import styles from './Main.module.scss';
import { useEffect, useState } from 'react';
import { Auth } from '@components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actionLogout, actionSetUser } from '../../store/userSlice/user.slice';
import WelcomeEmail from '../../_components/Emails/WelcomeEmail/WelcomeEmail.tsx';
import { EmailPreview } from '../../_components/Emails/EmailPreview/EmailPreview';
import { meRequest } from '../../api/auth';

export const Main = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const checkSession = async () => {
      try {
        const sessionUser = await meRequest();

        if (cancelled) return;

        if (sessionUser) {
          dispatch(actionSetUser(sessionUser));
        } else {
          dispatch(actionLogout());
        }
      } catch (error) {
        console.error('Не удалось проверить сессию', error);
        if (!cancelled) {
          dispatch(actionLogout());
        }
      } finally {
        if (!cancelled) {
          setCheckingSession(false);
        }
      }
    };

    void checkSession();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  if (checkingSession) {
    return <section className={styles.main}>{'Проверка сессии...'}</section>;
  }

  return (
    <section className={styles.main}>
      {user ? (
        <EmailPreview component={WelcomeEmail} props={{ name: user.login, verificationUrl: 'dsfsd' }} />
      ) : (
        <Auth />
      )}
    </section>
  );
};
