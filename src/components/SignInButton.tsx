import { useEffect, useState } from 'react';
import Modal from './Modal'
import { sendMagicLink, verifyToken } from '@src/api/auth'
import { constants } from '@src/stores/constantStore';
import { NotificationType } from '@src/enums/NotificationType';
import { useNotification } from '../contexts/Notification';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { AuthTokenType } from './../types/token';
import { useAuthStore } from '@src/stores/authStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { UserDataType, getLoggedInUser, updateLoggedInUser } from '@src/api/user';
import DropdownSelect from './DropDownSelect';
import { useSignInModalStore } from '@src/stores/signInModalStore';
import { useNavigate } from 'react-router-dom';

const SignInButton = () => {
    const queryClient = useQueryClient()
    const notification = useNotification()
    const navigate = useNavigate()
    const { isLoggedIn, setToken } = useAuthStore()
    const { isOpenSignIn, setIsOpenSignIn, disableClose } = useSignInModalStore();

    const [isLoading, setIsLoading] = useState(false)
    const [isMailSent, setIsMailSent] = useState(false)
    const [nameNotSet, setNameNotSet] = useState(false)

    const [email, setEmail] = useState("");
    const [magicToken, setMagicToken] = useState("")
    const [name, setName] = useState("")

    const user = useQuery<UserDataType, Error>({
        queryKey: ['me'],
        queryFn: () => getLoggedInUser(),
        enabled: isLoggedIn()
    })

    useEffect(() => {
        if (user.data) {
            if (!user.data.data.name || user.data.data.name.length < 1) {
                setNameNotSet(true)
            } else {
                setNameNotSet(false)
            }
        }
    }, [user])

    const handleEmailSubmit = () => {
        if (!constants.REGEX_PATTERN.EMAIL.test(email)) {
            notification.add({
                title: "Invalid Email",
                message: "Please use valid email address. If you use invalid email address magic token can not be sent.",
                status: NotificationType.ERROR
            })
            return;
        }
        setIsLoading(true);
        sendMagicLink({ email })
            .then((res) => {
                if (res.error) {
                    notification.add({
                        title: "Error Occured",
                        message: "There was an error sending magic token to your email address. Please try again",
                        status: NotificationType.ERROR
                    })
                } else {
                    setIsMailSent(true)
                    notification.add({
                        title: "Mail Sent",
                        message: "Magic token has been sent to your email address. Copy the token and paste it in the following screen.",
                        status: NotificationType.SUCCESS
                    })
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleMagicTokenSubmit = () => {
        setIsLoading(true);
        verifyToken({ magic_token: magicToken })
            .then((res) => {
                if (res.error) {
                    notification.add({
                        title: "Error Occured",
                        message: "There was an error verifying magic token. Please use valid magic token.",
                        status: NotificationType.ERROR
                    })
                } else {
                    const data: AuthTokenType = res.data as AuthTokenType;
                    setToken(data.accessToken)
                    setIsMailSent(true)
                    notification.add({
                        title: "Signed In",
                        message: "You have signed in successfully. Enjoy 😎👌🔥 !!!",
                        status: NotificationType.SUCCESS
                    })
                }
            })
            .finally(() => {
                setIsLoading(false)
                setIsOpenSignIn(false)
            })
    }

    const handleNameChange = () => {
        setIsLoading(true)
        updateLoggedInUser({ name })
            .then((res) => {
                if (res.error) {
                    notification.add({
                        title: "Error Occured",
                        message: "There was an error updating name.",
                        status: NotificationType.ERROR
                    })
                } else {
                    notification.add({
                        title: "Name updated",
                        message: "Thank you for letting us know your name. From now on we will call you " + name + ".",
                        status: NotificationType.INFO
                    })
                    queryClient.invalidateQueries({ queryKey: ["me"] })
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const signOut = () => {
        setToken(null)
        localStorage.clear()
        notification.remove()
        window.location.reload()
    }

    const handleSignOut = () => {
        notification.add({
            title: "Confirmation Required",
            message: "Are you sure you want to Sign Out ? If you sign out all your data will be cleared.",
            status: NotificationType.INFO,
            body: (
                <div className='flex gap-3 justify-center w-full'>
                    <button className="btn btn-error" onClick={signOut}>Yes, I am Sure</button>
                    <button className="btn btn-success" onClick={() => notification.remove()}>No, I will Stay</button>
                </div>
            )
        })
    }

    const handleClose = () => {
        if (disableClose) {
            setIsOpenSignIn(false)
            navigate(-1)
        } else {
            setIsOpenSignIn(false)
        }
    }

    if (isLoggedIn()) {
        return (
            <div>
                <DropdownSelect
                    button={
                        <button className="btn btn-square">
                            <img src={user.data?.data.avatar.optimized_url} className='h-5 w-5 rounded-full object-cover' />
                        </button>
                    }
                    options={[
                        { text: user.data?.data.name ?? "User Profile", value: user.data?.data.name ?? "", icon: <div className='mr-1'>😎</div> },
                        { text: "Enquiry", value: "enquiry", handleClick: () => navigate("/chat/enquiry"), icon: <div className='mr-1'>📣</div> },
                        { text: "Sign Out", value: "sign-out", handleClick: handleSignOut, icon: <div className='mr-1'>👋</div> },
                    ]}
                />
                <Modal isOpen={nameNotSet} setIsOpen={setNameNotSet} title='What should we call you ?'>
                    <div className='flex flex-col gap-5 pb-5'>
                        <input type="text" placeholder="Type your nickname..." className="input input-bordered w-full" disabled={isLoading} value={name} onChange={e => setName(e.target.value)} />
                        <button className='btn btn-info' disabled={isLoading} onClick={handleNameChange}>
                            {isLoading && (
                                <div className="loading h-5 w-5" />
                            )}
                            Submit</button>
                    </div>
                </Modal>
            </div>
        )
    } else {
        return (
            <div>
                <button className="btn" onClick={() => setIsOpenSignIn(true)}>Sign In</button>
                <Modal title="Sign In to continue" closeButton onClose={handleClose} isOpen={isOpenSignIn} setIsOpen={setIsOpenSignIn} maxWidth='25rem'>
                    {!isMailSent && (
                        <div className="flex flex-col gap-3 pt-5 pb-10">
                            <input type="text" placeholder="Email Address" className="input input-bordered w-full" disabled={isLoading} value={email} onChange={e => setEmail(e.target.value)} />
                            <div className="text-xs text-base-content/75">
                                A confirmation link with magic token will be sent in your email
                            </div>
                            <div className="flex gap-3">
                                <button className="btn btn-info flex-1" disabled={isLoading} onClick={handleEmailSubmit}>
                                    {isLoading && (
                                        <div className="loading h-5 w-5" />
                                    )}
                                    Get Magic Token
                                </button>
                                <button className="btn btn-info btn-square" disabled={isLoading} onClick={() => setIsMailSent(true)}>
                                    <ChevronRightIcon className='h-5 w-5' />
                                </button>
                            </div>
                        </div>
                    )}
                    {isMailSent && (
                        <div className="flex flex-col gap-3 pt-5 pb-10">
                            <input type="password" placeholder="Magic Token" className="input input-bordered w-full" disabled={isLoading} value={magicToken} onChange={e => setMagicToken(e.target.value)} />
                            <div className="text-xs text-base-content/75">
                                Do not share this magic token with anyone. Keep it secret.
                            </div>
                            <div className="flex gap-3">
                                <button className="btn btn-info btn-square" disabled={isLoading} onClick={() => setIsMailSent(false)}>
                                    <ChevronLeftIcon className='h-5 w-5' />
                                </button>
                                <button className="btn btn-info flex-1" disabled={isLoading} onClick={handleMagicTokenSubmit}>
                                    {isLoading && (
                                        <div className="loading h-5 w-5" />
                                    )}
                                    Submit Token
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        )
    }
}

export default SignInButton