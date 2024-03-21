import { SignInFormData } from '../pages/Login';
import { RegisterFormData } from '../pages/Register.archived';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || `http://localhost:5001/api`;

export const registerAccount = async (formData: RegisterFormData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const resBody = await res.json();

    console.log(resBody);

    if (!resBody.ok) {
      throw new Error(resBody.message);
    }
  } catch (err: Error) {
    console.error(err.message);
  }
};

export const loginUserAccount = async (formData: SignInFormData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/auth`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log(`res: `, res);

    const resBody = await res.json();

    if (!resBody.ok) {
      throw new Error(resBody.message);
    }
  } catch (err) {
    console.error(err.message);
  }
};
