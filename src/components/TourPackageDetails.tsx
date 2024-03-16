import { PackageType } from '@src/types/base'
import MarkdownRenderer from './MarkdownRenderer'
import { parsePrice } from '@src/functions/helpers'

const generateTicketDetails = ({ price }: { price: number }) => (`
- 💰 **Price:** ${parsePrice(price)} Taka.
- 💳 **Payment Method:** Payment will be made through Nagad, a digital payment system.
- ⏳ **Processing Time:** Please note that it might take some time to process the payment.
- 🎟️ **Ticket Number:** Once the payment is successfully processed, you will receive a unique ticket number.
- 📄 **Ticket Details:** You will receive detailed information about your ticket two days prior to the event.
- 📧 **Ticket Delivery:** Additionally, a PDF of your ticket will be sent to your provided email address for your convenience.
- 📱 **Mobile Notification:** You may also receive a mobile notification confirming your ticket purchase.
- 🕰️ **Event Timing:** Please be sure to check the event timing and arrive punctually.
- 📢 **Announcements:** Any updates or announcements regarding the event will be communicated via email or text message.
- 🤝 **Customer Support:** If you encounter any issues or have questions, feel free to reach out to our customer support team for assistance.
`)

const TourPackageDetails = ({pac}:{pac: PackageType}) => {
    return (
        <div className="overflow-y-auto custom-scrollbar max-h-[60vh] my-5">
            <div className="join join-vertical w-full">
                <div className="collapse join-item accordion-open">
                    <div className="collapse-title font-semibold">
                        🛎️ Included Services
                    </div>
                    <div className="collapse-content">
                        <MarkdownRenderer md_text={pac.included} />
                    </div>
                </div>
                <div className="collapse join-item accordion-open">
                    <div className="collapse-title font-semibold">
                        🙅🏻 Excluded Services
                    </div>
                    <div className="collapse-content">
                        <MarkdownRenderer md_text={pac.excluded} />
                    </div>
                </div>
                <div className="collapse join-item accordion-open">
                    <div className="collapse-title font-semibold">
                        📑 Conditions
                    </div>
                    <div className="collapse-content">
                        <MarkdownRenderer md_text={pac.conditions} />
                    </div>
                </div>
                <div className="collapse join-item accordion-open">
                    <div className="collapse-title font-semibold">
                        🏷️ Ticket Purchase Details
                    </div>
                    <div className="collapse-content">
                        <MarkdownRenderer md_text={generateTicketDetails({ price: pac.price })} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourPackageDetails