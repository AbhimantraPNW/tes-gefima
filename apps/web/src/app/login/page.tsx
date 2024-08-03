'use client';

import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import NavbarHome from '@/components/NavbarHome';
import useLogin from '@/hooks/api/auth/useLogin';
import { HelperText, Input, Label } from '@roketid/windmill-react-ui';
import { validationSchema } from './validationSchema';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useLogin();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      login(values);
    },
  });

  const imgSource = '/hero2.jpg';

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <NavbarHome />
      <div className="flex min-h-screen flex-col items-center bg-gray-50 p-6 md:flex-row dark:bg-gray-900">
        <div className="mx-auto mt-10 h-full w-full flex-1 overflow-hidden rounded-lg bg-white shadow-xl md:max-w-4xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="relative h-32 md:h-auto md:w-1/2">
              <Image
                aria-hidden="true"
                className="h-full w-full object-cover"
                src={imgSource}
                alt="Office"
                layout="fill"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Login
                </h1>
                <form onSubmit={formik.handleSubmit}>
                  <div className="flex flex-col">
                    <Label className="mt-2">
                      <span>Email</span>
                      <Input
                        className="mt-1"
                        type="email"
                        name="email"
                        placeholder="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        crossOrigin="anonymous"
                      />
                      {formik.touched.email && formik.errors.email && (
                        <HelperText className="text-red-400">
                          {formik.errors.email}
                        </HelperText>
                      )}
                    </Label>
                  </div>

                  <div className="flex flex-col">
                    <Label className="mt-4">
                      <span>Password</span>
                      <Input
                        className="mt-1"
                        placeholder="***************"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        crossOrigin="anonymous"
                      />
                      {formik.touched.password && formik.errors.password && (
                        <HelperText className="text-red-400">
                          {formik.errors.password}
                        </HelperText>
                      )}
                    </Label>
                  </div>

                  <Label
                    className="cursor-pointer"
                    onClick={handleShowPassword}
                  >
                    {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </Label>

                  <Label className="text-grey-400 underli mt-3 cursor-pointer text-xs">
                    <span onClick={() => router.push('/register')}>
                      Dont have account? Please register first
                    </span>
                  </Label>

                  <Button
                    className="mt-4 w-full border border-black bg-white text-black"
                    type="submit"
                  >
                    Login
                  </Button>
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
