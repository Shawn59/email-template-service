export interface AuthUser {
  id: string;
  login: string;
}

interface AuthResponse {
  user: AuthUser;
}

interface ErrorResponse {
  error?: string;
}

async function parseJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

/** Все запросы с credentials: 'include', чтобы браузер слал/принимал httpOnly cookie */
export async function loginRequest(login: string, password: string): Promise<AuthUser> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ login, password }),
  });

  const data = await parseJson<AuthResponse & ErrorResponse>(response);

  if (!response.ok) {
    throw new Error(data.error ?? 'Ошибка авторизации');
  }

  return data.user;
}

export async function meRequest(): Promise<AuthUser | null> {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'include',
  });

  if (response.status === 401) {
    return null;
  }

  const data = await parseJson<AuthResponse & ErrorResponse>(response);

  if (!response.ok) {
    throw new Error(data.error ?? 'Не удалось проверить сессию');
  }

  return data.user;
}

export async function logoutRequest(): Promise<void> {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    const data = await parseJson<ErrorResponse>(response);
    throw new Error(data.error ?? 'Не удалось выйти');
  }
}
