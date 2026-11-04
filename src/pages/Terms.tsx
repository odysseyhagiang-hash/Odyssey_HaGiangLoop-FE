import { useSeo } from '../hooks/useSeo';
import { images } from '../lib/data';
import { PageHero } from '../components/layout/PageHero';
import { Container, Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { ShieldCheckIcon, PhoneIcon, MailIcon } from 'lucide-react';

export function Terms() {
  useSeo({
    title: 'Terms & Conditions - Odyssey Ha Giang',
    description:
      'Terms and Conditions of Odyssey Hostel & Tours Ha Giang. Border permits, payment rules, itinerary flexibility, self driving requirements, and accommodation policies.',
    image: images.pass,
  });

  return (
    <main id="main" className="w-full bg-canvas">
      <PageHero
        eyebrow="Policies & Regulations"
        title="Terms & Conditions"
        description="Terms and conditions applicable to all tour packages, motorbike rentals, and accommodation services at Odyssey Hostel."
        image={images.pass}
        imageAlt="Ha Giang mountain landscape"
      />

      <Section tone="canvas" className="pt-10 pb-20">
        <Container className="max-w-4xl">
          <Reveal>
            {/* Single Unified Card containing all Terms */}
            <div className="rounded-3xl border border-ink/[0.08] bg-white p-6 sm:p-10 md:p-12 shadow-soft">
              {/* Header inside card */}
              <div className="border-b border-ink/[0.08] pb-6 mb-8">
                <div className="flex items-center gap-2.5 text-forest-700 mb-2">
                  <ShieldCheckIcon className="h-5 w-5 text-forest-600" />
                  <span className="text-xs uppercase tracking-widest font-semibold text-gold-600">
                    Official Policy
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  Terms and Conditions of Odyssey Hostel
                </h1>
              </div>

              {/* 18 Terms in English */}
              <div className="space-y-8 text-ink/85 text-sm sm:text-base leading-relaxed">
                {/* 1 */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    1. Border area entry permit:
                  </h2>
                  <p>
                    Customers who complete a booking will be required to pay a border area entry permit fee of <strong className="font-semibold text-ink">260,000 VND/person</strong>.
                  </p>
                  <p>
                    Odyssey Hostel will apply for the border area entry permit on behalf of all customers. However, the border area entry permit fee is not included in the listed tour price and must be paid directly by the customer.
                  </p>
                  <p>
                    Customers must provide all necessary information for the permit application, including passport, visa, and date of exit.
                  </p>
                </div>

                <hr className="border-ink/[0.06]" />

                {/* 2 */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    2. Itinerary flexibility:
                  </h2>
                  <p>
                    Please note that all routes and itineraries are subject to change (provided that everything corresponds to the value received by the customer). Adjustments may be made due to weather, road conditions, and operational requirements.
                  </p>
                </div>

                <hr className="border-ink/[0.06]" />

                {/* 3 */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    3. Pricing:
                  </h2>
                  <p>
                    All services listed on our website are charged in <strong className="font-semibold text-ink">VND</strong>. Listed tour and motorbike rental prices do not include the border area entry permit fee. Odyssey will apply for the permit on behalf of the customer. This fee is <strong className="font-semibold text-ink">260,000 VND/person</strong> and must be paid by the customer.
                  </p>
                </div>

                <hr className="border-ink/[0.06]" />

                {/* 4 */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    4. Confirmation from us:
                  </h2>
                  <p>
                    Customer bookings will be confirmed by a confirmation letter sent to you.
                  </p>
                </div>

                <hr className="border-ink/[0.06]" />

                {/* 5 */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    5. Full payment:
                  </h2>
                  <p>
                    We prioritize cash payments from our customers.
                  </p>
                  <p>
                    If you are not sufficiently prepared with cash, we can assist by taking you to the nearest location to withdraw cash.
                  </p>
                  <p>
                    We only accept payment in <strong className="font-semibold text-ink">VND</strong>.
                  </p>
                </div>

                <hr className="border-ink/[0.06]" />

                {/* 6 */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    6. Confirmation from us:
                  </h2>
                  <p>
                    After selecting the service you wish to join, a confirmation will be sent via WhatsApp or email.
                  </p>
                  <p>
                    This confirmation will include important details such as: <strong className="font-semibold text-ink">start date, bus departure time, and pick up location</strong>.
                  </p>
                </div>

                <hr className="border-ink/[0.06]" />

                {/* 7 */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    7. Refund for unused services:
                  </h2>
                  <p>
                    No refund will be provided for any unused services included in the tour package.
                  </p>
                  <p>
                    In the event of a no show, the full tour price will be charged and non refundable.
                  </p>
                </div>

                <hr className="border-ink/[0.06]" />

                {/* 8 */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    8. Visa matters:
                  </h2>
                  <p>
                    Each participant is solely responsible for obtaining the necessary visa or entry permit required to join the tour packages or services.
                  </p>
                </div>

                <hr className="border-ink/[0.06]" />

                {/* 9 */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    9. Cancellation by us:
                  </h2>
                  <p>
                    In the unfortunate event that we must cancel your booking, we will notify you immediately and provide one of the following options:
                  </p>
                  <p className="pl-4 border-l-2 border-gold-400">
                    An alternative option of equivalent value, or a full refund of the amount paid.
                  </p>
                </div>

                <hr className="border-ink/[0.06]" />

                {/* 10 */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    10. Travel documents:
                  </h2>
                  <p>
                    All customers must hold a valid passport and the necessary visa or travel permits at the start of the tour.
                  </p>
                </div>

                <hr className="border-ink/[0.06]" />

                {/* 11 */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    11. Insurance:
                  </h2>
                  <p>
                    Tour prices do not include insurance. We encourage all customers to purchase personal travel insurance prior to arrival.
                  </p>
                </div>

                <hr className="border-ink/[0.06]" />

                {/* 12 */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    12. Dietary requirements:
                  </h2>
                  <p>
                    We always strive to accommodate our customers&apos; dietary preferences.
                  </p>
                  <p>
                    Please inform us of your dietary requirements.
                  </p>
                </div>

                <hr className="border-ink/[0.06]" />

                {/* 13 */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    13. Holiday surcharge:
                  </h2>
                  <p>
                    All tours and services operating during public holidays and Tet will incur an additional surcharge: This surcharge applies to all services we provide.
                  </p>
                </div>

                <hr className="border-ink/[0.06]" />

                {/* 14 */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    14. Luggage storage:
                  </h2>
                  <p>
                    We provide free luggage storage throughout your journey. Your luggage will be returned upon completion of the tour.
                  </p>
                  <p>
                    All valuable items such as: <strong className="font-semibold text-ink">cash, computers, or high value items</strong> must be deposited at the reception area.
                  </p>
                  <p>
                    Your belongings and luggage will be organized and kept by us; however, we are not liable for any damage to your luggage as we cannot determine the prior condition of your luggage before it is handed over to us.
                  </p>
                </div>

                <hr className="border-ink/[0.06]" />

                {/* 15 */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    15. Accommodation regulations:
                  </h2>
                  <p>
                    To comply with Vietnamese law and ensure your safety, please adhere to the following regulations at all accommodation facilities:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 pt-1">
                    <li>Present valid identification documents prior to check in</li>
                    <li>Do not bring weapons, prohibited substances, or explosives</li>
                    <li>Do not use drugs or stimulants</li>
                    <li>No gambling</li>
                    <li>No smoking in areas with flammable materials</li>
                  </ul>
                </div>

                <hr className="border-ink/[0.06]" />

                {/* 16 */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    16. Rider weight limit:
                  </h2>
                  <p>
                    To ensure safety for customers and drivers on the road, the maximum combined weight for a passenger and luggage is <strong className="font-semibold text-ink">100kg</strong>. If a customer&apos;s weight exceeds 100kg, please select a vehicle upgrade package to ensure safety.
                  </p>
                  <p>
                    Self driving customers may still ride provided they meet all driving requirements.
                  </p>
                </div>

                <hr className="border-ink/[0.06]" />

                {/* 17 */}
                <div className="space-y-3">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    17. Self driving requirements:
                  </h2>
                  <p>
                    <strong className="font-semibold text-ink">Valid driving documents:</strong> You must carry an International Driving Permit (IDP) under the 1968 Convention with a valid motorcycle endorsement. Category AM is not eligible. You must also carry the original driving licence from your home country, and motorcycle riding privileges on both documents must match. Both documents must be official physical copies issued by the government or authorized governmental authority. Digital copies, photographs, screenshots, unofficial permits, or documents issued by private entities are not accepted.
                  </p>
                  <p>
                    <strong className="font-semibold text-ink">Compliance with traffic laws:</strong> You are strictly required to adhere to all applicable traffic laws, road rules in Vietnam, and instructions from our tour guide throughout the group trip.
                  </p>
                  <p>
                    <strong className="font-semibold text-ink">Ability to ride with the group:</strong> You must have sufficient riding experience and the ability to maintain a safe riding pace with the group. If our team determines that your riding ability poses a safety risk to yourself, other guests, our staff, or other road users, we reserve the right to require you to stop self driving and switch to our Easy Rider service at your own expense, subject to availability.
                  </p>
                  <p>
                    <strong className="font-semibold text-ink">Liability when operating a vehicle:</strong> As a self-driver, you are financially and legally responsible for your actions when operating the motorcycle, including any damage to the motorcycle, other vehicles, property, or third parties, as well as any fines, penalties, injuries, or other expenses arising from your actions or riding.
                  </p>
                  <p className="font-medium text-forest-800 bg-forest-50 p-3.5 rounded-xl border border-forest-100">
                    We can provide a green card when you do not possess a driving licence, provided that you demonstrate the ability to ride safely.
                  </p>
                </div>

                <hr className="border-ink/[0.06]" />

                {/* 18 */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink">
                    18. Self driving customers:
                  </h2>
                  <p>
                    If you choose to ride your own vehicle: You must prove your ability to ride safely. Otherwise, you will be required to switch to an Easy Rider option. All incurred costs must be paid by the customer.
                  </p>
                </div>
              </div>

              {/* Bottom Support Callout */}
              <div className="mt-12 pt-8 border-t border-ink/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-canvas/70 -mx-6 sm:-mx-10 md:-mx-12 -mb-6 sm:-mb-10 md:-mb-12 p-6 sm:p-10 md:p-12 rounded-b-3xl">
                <div>
                  <h3 className="font-bold text-ink text-base">
                    Need further assistance?
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted mt-1">
                    Contact us directly via Hotline or WhatsApp.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="tel:+84357292323"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-forest-600 hover:bg-forest-700 text-white text-xs font-semibold transition-colors">
                    <PhoneIcon className="h-3.5 w-3.5" />
                    +84 357 292 323
                  </a>
                  <a
                    href="mailto:odyssey.hagiang@gmail.com"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-ink/15 hover:bg-white text-ink text-xs font-semibold transition-colors">
                    <MailIcon className="h-3.5 w-3.5" />
                    odyssey.hagiang@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
