import { Button, TextField } from '@mui/material';
import styles from './Auth.module.scss';
import { useAppDispatch } from '../../store/hooks';
import { useForm } from 'react-hook-form';
import { actionSetUser } from '../../store/userSlice/user.slice';
import type { IUserModel } from '../../types/user';
import uuid from 'react-uuid';

export const Auth = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: ''
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: IUserModel) => {
    dispatch(actionSetUser({ ...data, id: uuid() }));

    handleReset();
  };

  const handleReset = () => {
    reset();
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
        autoComplete={'off'}
        variant={'standard'}
      />

      <TextField
        {...register('password', {
          required: 'Поле не может быть пустым',
          pattern: {
            value: /^\S+$/,
            message: 'Некорректное значение',
          },
        })}
        label={'Фамилия*'}
        error={!!errors.password}
        helperText={errors.password?.message}
        autoComplete={'off'}
        variant={'standard'}
      />

      <Button type="submit" variant="contained" color="primary">
        {'Отправить'}
      </Button>
    </form>
  );
};
