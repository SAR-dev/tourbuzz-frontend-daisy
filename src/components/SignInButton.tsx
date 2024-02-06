import { useState } from 'react'
import Modal from './Modal'
import { sendMagicLink } from '@src/api/auth'
import toast from 'react-hot-toast';
import { randChoice } from '@src/functions/helpers';
import { constants } from '@src/stores/constantStore';

const SignInButton = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [email, setEmail] = useState("");

    const handleEmailSubmit = () => {
        setIsLoading(true);
        sendMagicLink({ email })
            .then((res) => {
                if (res.error) {
                    toast('Error sending Magic Link', {
                        icon: randChoice(constants.TOAST_ICON.ERROR),
                    });
                } else {
                    toast('Magic Link has been sent to email.', {
                        icon: randChoice(constants.TOAST_ICON.SUCCESS),
                    });
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <div>
            <button className="btn" onClick={() => setIsOpen(true)}>Sign In</button>
            <Modal title='Sign In' closeButton isOpen={isOpen} setIsOpen={setIsOpen} maxWidth='25rem'>
                <div className="flex flex-col gap-3">
                    <input type="text" placeholder="Type here" className="input input-bordered w-full" disabled={isLoading} value={email} onChange={e => setEmail(e.target.value)} />
                    <div className="text-xs text-base-content/75">
                        A confirmation link with magic code will be sent in your email
                    </div>
                    <button className="btn btn-info" disabled={isLoading} onClick={handleEmailSubmit}>Get Magic Link</button>
                </div>
            </Modal>
        </div>
    )
}

export default SignInButton