import { Button, TextField } from '@mui/material';
import styles from './Auth.module.scss';
import { useAppDispatch } from '../../store/hooks';
import { useForm } from 'react-hook-form';
import { actionSetUser } from '../../store/userSlice/user.slice';
import type { IUserModel } from '../../types/user';
import uuid from 'react-uuid';
import { MaskInput } from '../../_atoms/MaskInput/MaskInput';

export const Auth = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      profession: '',
      email: '',
      phone: '',
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
        {...register('firstName', {
          required: 'Поле не может быть пустым',
          maxLength: { value: 20, message: 'Максимум 20 символов' },
          pattern: {
            value: /^\S+$/,
            message: 'Некорректное значение',
          },
        })}
        label={'Имя*'}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        autoComplete={'off'}
        variant={'standard'}
      />

      <TextField
        {...register('lastName', {
          required: 'Поле не может быть пустым',
          maxLength: { value: 20, message: 'Максимум 20 символов' },
          pattern: {
            value: /^\S+$/,
            message: 'Некорректное значение',
          },
        })}
        label={'Фамилия*'}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        autoComplete={'off'}
        variant={'standard'}
      />

      <TextField
        {...register('profession', {
          maxLength: { value: 20, message: 'Максимум 20 символов' },
          required: 'Поле не может быть пустым',
          pattern: {
            value: /^\S+$/,
            message: 'Некорректное значение',
          },
        })}
        label={'Профессия*'}
        error={!!errors.profession}
        helperText={errors.profession?.message}
        autoComplete={'off'}
        variant={'standard'}
      />

      <TextField
        {...register('email', {
          maxLength: { value: 20, message: 'Максимум 20 символов' },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Некорректный email',
          },
        })}
        label={'Email'}
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete={'off'}
        variant={'standard'}
      />

      <MaskInput
        label={'Телефон'}
        mask="# (000) 000-00-00"
        definitions={{
          '#': /[1-9]/,
        }}
        error={!!errors.phone}
        helperText={errors.phone?.message}
        inputModeIsNumeric={'numeric'}
        {...register('phone', {
          minLength: { value: 17, message: 'некорректный номер' },
        })}
      />

      {/* <TextField
        label="Телефон"
        error={!!errors.phone}
        helperText={errors.phone?.message}
        fullWidth
        margin="normal"
        InputProps={{
          inputComponent: PhoneMask,
        }}
      />*/}

      {/*<InputMask mask="(0)999 999 99 99" value={'+7'} maskChar=" ">
        <TextField
          {...register('phone', {
            maxLength: { value: 20, message: 'Максимум 20 символов' },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Некорректный email',
            },
          })}
          label={'Телефон'}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          autoComplete={'off'}
        />
      </InputMask>*/}

      <Button type="submit" variant="contained" color="primary">
        {'Отправить'}
      </Button>
    </form>
  );
};
