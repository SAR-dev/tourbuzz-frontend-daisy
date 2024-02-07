import { useState } from 'react'
import Modal from './Modal'
import { sendMagicLink } from '@src/api/auth'
import toast from 'react-hot-toast';
import { constants } from '@src/stores/constantStore';

const SignInButton = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isMailSent, setIsMailSent] = useState(false)

    const [email, setEmail] = useState("");
    const [magicToken, setMagicToken] = useState("")

    const handleEmailSubmit = () => {
        if(!constants.REGEX_PATTERN.EMAIL.test(email)){
            toast.error('Use valid email address.');
            return;
        }
        setIsLoading(true);
        sendMagicLink({ email })
            .then((res) => {
                if (res.error) {
                    toast.error('Error sending Magic Token.');
                } else {
                    setIsMailSent(true)
                    toast.success('Magic Token has been sent to your Email.');
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