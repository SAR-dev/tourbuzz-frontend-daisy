import { useState } from 'react'
import Modal from './Modal'

const SignInButton = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <button className="btn" onClick={() => setIsOpen(true)}>Sign In</button>
            <Modal title='Sign In' closeButton isOpen={isOpen} setIsOpen={setIsOpen} maxWidth='25rem'>
                <div className="flex flex-col gap-3">
                    <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    <div className="text-xs text-base-content/75">A confirmation link with magic code will be sent in your email</div>
                    <button className="btn btn-info">Get Magic Link</button>
                </div>
            </Modal>
        </div>
    )
}

export default SignInButton