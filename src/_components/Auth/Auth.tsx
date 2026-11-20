import { Button, TextField } from '@mui/material';
import styles from './Auth.module.scss';
import { useAppDispatch } from '../../store/hooks';
import { useForm } from 'react-hook-form';
import { actionSetUser } from '../../store/userSlice/user.slice';
import { loginRequest } from '../../api/auth';
import { useState } from 'react';

interface AuthFormValues {
  login: string;
  password: string;
}

export const Auth = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const dispatch = useAppDispatch();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: AuthFormValues) => {
    setServerError(null);

    try {
      const user = await loginRequest(data.login, data.password);
      dispatch(actionSetUser(user));
      reset();
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Ошибка авторизации');
    }
  };

  return (
    <form className={styles.auth} onSubmit={handleSubmit(onSubmit)}>
      <span className={styles.title}>{'Подключиться'}</span>

      <TextField
        {...register('login', {
          required: 'Поле не может быть пустым',
          pattern: {
            value: /^\S+$/,
            message: 'Некорректное значение',
          },
        })}
        label={'Логин'}
        error={!!errors.login}
        helperText={errors.login?.message}
        autoComplete={'username'}
        variant={'standard'}
      />

      <TextField
        {...register('password', {
          required: 'Поле не может быть пустым',
        })}
        label={'Пароль'}
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
        autoComplete={'current-password'}
        variant={'standard'}
      />

      {serverError ? <span className={styles.error}>{serverError}</span> : null}

      <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
        {isSubmitting ? 'Проверка...' : 'Отправить'}
      </Button>
    </form>
  );
};
