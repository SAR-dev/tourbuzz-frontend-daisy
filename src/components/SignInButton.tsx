import { useState } from 'react'
import Modal from './Modal'
import { sendMagicLink } from '@src/api/auth'
import { constants } from '@src/stores/constantStore';
import { NotificationType } from '@src/enums/NotificationType';
import { useNotification } from './Notification';

const SignInButton = () => {
    const notification = useNotification()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isMailSent, setIsMailSent] = useState(false)

    const [email, setEmail] = useState("");
    const [magicToken, setMagicToken] = useState("")

    const handleEmailSubmit = () => {
        if (!constants.REGEX_PATTERN.EMAIL.test(email)) {
            notification?.add({
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
                    notification?.add({
                        title: "Error Occured",
                        message: "There was an error sending magic token to your email address. Please try again",
                        status: NotificationType.ERROR
                    })
                } else {
                    setIsMailSent(true)
                    notification?.add({
                        title: "Token Mailed",
                        message: "Magic token has been sent to your email address. Please check your inbox.",
                        status: NotificationType.SUCCESS
                    })
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleMagicTokenSubmit = () => {

    }

    return (
        <div>
            <button className="btn" onClick={() => setIsOpen(true)}>Sign In</button>
            <Modal title='Sign In' closeButton isOpen={isOpen} setIsOpen={setIsOpen} maxWidth='25rem'>
                {!isMailSent && (
                    <div className="flex flex-col gap-3">
                        <input type="text" placeholder="Email Address" className="input input-bordered w-full" disabled={isLoading} value={email} onChange={e => setEmail(e.target.value)} />
                        <div className="text-xs text-base-content/75">
                            A confirmation link with magic token will be sent in your email
                        </div>
                        <button className="btn btn-info" disabled={isLoading} onClick={handleEmailSubmit}>Get Magic Token</button>
                    </div>
                )}
                {isMailSent && (
                    <div className="flex flex-col gap-3">
                        <input type="password" placeholder="Magic Token" className="input input-bordered w-full" disabled={isLoading} value={magicToken} onChange={e => setMagicToken(e.target.value)} />
                        <div className="text-xs text-base-content/75">
                            Do not share this magic token with anyone. Keep it secret.
                        </div>
                        <button className="btn btn-info" disabled={isLoading} onClick={handleMagicTokenSubmit}>Submit Token</button>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default SignInButton