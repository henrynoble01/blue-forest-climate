import { useEffect } from "react";
import { Alert, Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import considerTravel from "../assets/consider-travel.png";
import eatVegetables from "../assets/eat-vegetables.png";
import moneyCount from "../assets/money-count.png";
import saveEnergy from "../assets/save-energy.png";
import speakUp from "../assets/speak-up.png";
import throwLessFood from "../assets/throw-less-food.png";
import transport from "../assets/transport.png";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../infrastructure/persistence/firebase";
import { IconAlertCircle, IconAt, IconLock } from "@tabler/icons";
import { z } from "zod";
import { useLocalStorage, useSetState } from "@mantine/hooks";
import { AxiosError } from "axios";
import GoogleIcon from "../components/icons/GoogleIcon";
import { Link, useNavigate } from "react-router-dom";
import { RegistrationSchema } from "../infrastructure/schema";

// Regex Resources =https://regexr.com/74m8a
// Regex Resources =https://www.w3resource.com/javascript/form/password-validation.php

const Register = () => {
  const [error, setError] = useSetState({
    error: false,
    message: "",
  });
  const [loadState, setLoadState] = useSetState({
    registerLoading: false,
  });

  // const [uid, setUid] = useLocalStorage({
  //   key: "uid",
  //   defaultValue: "",
  // });

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      password: "",
      email: "",
      confirmPassword: "",
    },
    validate: zodResolver(RegistrationSchema),
  });

  const submitForm = (values: typeof form.values) => {
    setLoadState({ registerLoading: true });
    setPersistence(auth, browserLocalPersistence).then(() => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((res) => {
          setLoadState({ registerLoading: false });
          navigate("/my-posts");
        })
        .catch((e) => {
          setLoadState({ registerLoading: false });
          setError({ error: true, message: e.code });
        });
    });
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result!);
        const token = credential?.accessToken;

        // The signed-in user info.
        const user = result?.user;
        // console.log(user);
        // setUid(user?.uid!);
        navigate("/my-posts");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }, []);

  const authWithGoogle = () => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth, provider);
    });
  };

  return (
    <div className=''>
      <div className='flex container mx-auto mt-10'>
        <div className='w-1/2 p-2'>
          <div className='mb-4'>
            <h5 className='text-4xl text-slate-800 font-500'>
              Login in to your account
            </h5>
            <h5 className=' text-4xl text-slate-500 font-500'>
              Or Sign up for an account
            </h5>
          </div>

          <form className='max-w-xs' onSubmit={form.onSubmit(submitForm)}>
            <div className=' flex flex-col gap-4'>
              <TextInput
                mt='md'
                label='Email'
                placeholder='Email'
                description='Emil must be valid'
                {...form.getInputProps("email")}
                icon={<IconAt size={16} />}
              />
              <PasswordInput
                label='Password'
                placeholder='Password'
                description='Password must include at least one letter, number and special character and be between 6 to 20 characters'
                {...form.getInputProps("password")}
                icon={<IconLock size={16} />}
              />
              <PasswordInput
                label='Confirm Password'
                placeholder='Confirm Password'
                description='Password must include at least one letter, number and special character and be between 6 to 20 characters'
                {...form.getInputProps("confirmPassword")}
                icon={<IconLock size={16} />}
              />
            </div>
            {error.error ? (
              <Alert
                icon={<IconAlertCircle size={16} />}
                title='Bummer!'
                color='red'
              >
                {error.message}
              </Alert>
            ) : null}
            <Group position='left' mt='xl'>
              <Button
                variant='filled'
                className='w-full'
                type='submit'
                loading={loadState.registerLoading}
              >
                Sign Up
              </Button>
              <Button
                leftIcon={<GoogleIcon />}
                variant='outline'
                className='w-full'
                type='button'
                onClick={authWithGoogle}
              >
                SignUp with Google
              </Button>
            </Group>
          </form>
          <p className='font-sans mt-4 font-500'>
            Already have an account <Link to='/login'>Login</Link>
          </p>
        </div>

        <div className='w-1/2 p-2'>
          <div className='flex gap-2 flex-wrap justify-center'>
            <LocalImage imgSrc={considerTravel} />
            <LocalImage imgSrc={eatVegetables} />
            <LocalImage imgSrc={moneyCount} />
            <LocalImage imgSrc={saveEnergy} />
            <LocalImage imgSrc={speakUp} />
            <LocalImage imgSrc={throwLessFood} />
            <LocalImage imgSrc={transport} />
          </div>
        </div>
      </div>
    </div>
  );
};

function LocalImage({ imgSrc }: { imgSrc: string }) {
  return (
    <span className=''>
      <img
        src={imgSrc}
        alt=''
        className='max-w-full'
        height={150}
        width={150}
      />
    </span>
  );
}

export default Register;
