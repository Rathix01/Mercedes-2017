import React from 'react';
import read from '../../../components/read-state';
import Styles from '../styles';

const FAQ = (state) => {
    return (
      <div className={ Styles.container }>
          <div className='faq-list'>
              <h1 className='faq-header'>FAQ</h1>
            <ul className={ Styles.list }>
              <li>
                <div className='subtitle'><h3>
                  Volo Overview
                </h3></div>
              </li>
              <li>
                <div className={ Styles.question }>
                  Who are the Volo team?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    The Volo Team is based in New Zealand, and creates innovative insurance products using digital delivery
                    to 18 to 35 year olds in NZ.
                  </div>
                  <div>
                    All our products are underwritten by premier and trusted NZ Insurance
                    providers such as Partners Life and Cover-More. We use industry-leading
                    technology and security to bring you unique, low-cost lifestyle solutions.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What is different about Volo?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Our focus is on 18 to 35 year olds and their needs
                    and desires, we are not selling standard insurance
                    products instead we have designed new products from
                    the ground up.  We've also turned the old school
                    "Insurance Rules" on their head, no lengthy forms to
                    fill out, and payout levels that are shown to you up-front
                    when you sign up.
                  </div>
                  <div>
                    We even pay when you get a payment from someone else for
                    a claim, so you still get paid even when ACC or another insurer
                    pays for a claim!
                  </div>
                  <div>
                    Mobile and Online access are the primary focuses, we don't
                    want you to have to wait on the phone, send a fax, or fill
                    in paper forms to buy your cover.  We are not a broker so
                    we don't give advice, we simply give you the power to
                    pick and choose the right cover for you, your cover, your way.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What’s the difference between Health Insurance, Life Insurance & Lifestyle Insurance?
                </div>
                <div className={ Styles.answer }>
                  <ul className='answer-list'>
                    <li>
                      <div><strong>Health Insurance</strong> specifically covers your medical bills
                        when you are ill or in need of surgery. Health Insurance varies widely and
                        can often be split in to different insurance benefits policies that you can
                        pick and choose from. For example, Medical Insurance that covers GP visits
                        or Critical Illness (e.g. cancer, heart disease) or Surgery (e.g. hip
                        replacement).
                      </div>
                    </li>
                    <li>
                      <div><strong>Life Insurance</strong> products include Income Protection (pays
                        a percentage of your income if you cannot work), Mortgage Protection (to
                        cover your mortgage if you can’t work), Disability Insurance (for permanent
                        disablement through sickness or accident), Trauma (life threatening
                        conditions e.g. cancer) and/or Death.
                      </div>
                    </li>
                    <li>
                      <div className='no-bottom-margin'><strong>Volo Lifestyle Cover</strong> pays
                        you out an agreed amount based on
                      </div>
                      <ol>
                        <li>your annual income (you can pick cover from 1 – 2 times your income) and </li>
                        <li>the event (it could be from death to disability to a broken bone).</li>
                      </ol>
                      <div>
                        Claims amounts are based on how severe your claim event is – the more
                        serious a claim event (potentially meaning more time off work), the
                        more Volo Lifestyle Cover pays. Unlike traditional Income or Disability
                        Insurance products, Volo does not necessarily require you to be off
                        work at all in order to make a claim. Benefits are paid as lump sums,
                        it’s entirely up to you to do decide what you do with any claim payments
                        you receive – for example you could use them to pay medical bills, pay
                        rent & bills or pocket it for a holiday to recover, it’s up to you!
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div className='subtitle'><h3>
                  Volo Lifestyle Cover
                </h3></div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What is Lifestyle Cover?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Lifestyle cover is designed to cover your lifestyle (rent,
                    bills, entertainment, transport, hobbies) should something
                    slow you down. That is why the product is designed to cover
                    1 – 2 times your annual income (your cover within that range
                    is your choice). To see what you’d get paid out in any given
                    scenario, check out the user friendly quote page.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  Why is it called ‘Volo Lifestyle Cover’ and not ‘Volo Lifestyle Insurance’?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Because the word insurance makes us think of complicated forms,
                    dry corporates in suits and begrudging claim encounters. Volo
                    doesn’t want to be any of that, we just want to  make sure young
                    kiwis get cover! We’ve designed affordable cover, an
                    understandable policy, a quick online sign-up process, a simple
                    online claim process and we want to pay you out (&amp; quickly)
                    if something bad happens.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What does Volo Lifestyle Cover give me?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    In simple terms – we cover you if one of the 84 things in
                    your policy happens. Whenever and wherever it happens, you
                    simply claim the pre-agreed policy amount, we pay. You get
                    on with your life.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  Why get Volo Lifestyle Cover?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    In a nutshell – we’ve designed it so you can pick cover you
                    can afford, it’s lots of cover wrapped up into 1 simple policy,
                    kiwi made with kiwi values. It’s an easy online sign up process,
                    a quick online claim process and most importantly it gives you
                    financial security if something sh*t happens to you.
                  </div>
                  <div>
                    We have designed it so you know exactly what benefits you will
                    get; it’s clear, simple and quick.
                  </div>
                  <div>
                    If an event happens to you get the pre-agreed benefits, no
                    arguments, no haggling. The benefits are NOT affected by any
                    ACC monies you may also be entitled to.
                  </div>
                  <div>
                    When stuff happens to you your cover kicks in, no ifs, no buts.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What does Volo Lifestyle Cover exactly cover?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    We pay you should any of the following happen; Major Traumas, Cancer & Chemo,
                    Total Permanent Disability, Fractures, Organ & Transplant Surgery, Minor
                    Surgery, Temporary Disability, Life, Spine & Joint Surgery and Inpatient
                    Surgery (pretty comprehensive!).
                  </div>
                  <div>
                    Traditionally in the world of insurance you would have to purchase
                    cover for each of these individually, but Volo has wrapped them all
                    into 1 policy.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  How soon can I claim?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Once you complete payment and the policy is issued, there is a stand-down
                    period of only 30 days. Once you have had the policy for that 30 day period
                    you are eligible to make a claim from that date under the terms and benefits of the policy.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  Will my claim get paid?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Yes - Volo Lifestyle insurance is underwritten by Partners Life.
                  </div>
                  <div>
                    Partners Life was established in August 2010, and entered the market with
                    fresh innovative offerings. With unprecedented growth since launch Partners
                    is now one of the most substantial competitors in the New Zealand Life
                    Insurance Industry. Products include life insurance, income protection,
                    medical insurance, disability insurance, trauma cover and business risk
                    protection. They hold both the 2015 PAA Insurance Provider Award and the 2015
                    ANZIIF Life Insurance Company of the Year Award.
                  </div>
                  <div>
                    They understand how difficult and stressful it can be when it comes time to submit
                    a claim and at Partners Life there are no surprises or shocks. They have a
                    philosophy embedded into the fabric of the company that all genuine claims
                    are paid as quickly and with as much empathy as possible. These are the
                    commitments made to clients giving them the confidence that they will always
                    do the right thing at claim time...
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  How is Volo Lifestyle Cover different to ACC?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    ACC is purely for accidents; Volo covers a much wider range of benefits.
                    We decided to include injuries from accidents as well, simply to make
                    sure you are covered. If you break a bone, we will still pay you your
                    lump sum even if you can still go to work or get paid sick leave or
                    get ACC assistance. That sounds like cover worth investing in to us!
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  Cancellation and Refund Policy
                </div>
                <div className={ Styles.answer }>
                  <div>
                    You can request we cancel your policy at any time, the process depends
                    on the product and when you cancel:
                  </div>
                  <div>
                    Volo Lifestyle Cover (Inside "Free Look Period"): If you cancel inside
                    the "free look period" for Volo Lifestyle Cover (the first 30 days of
                    cover) we will cancel your policy from when you first purchased it and
                    you will receive a refund of all premiums paid.  From the date we
                    receive notification of cancellation of your policy you will not be
                    entitled to any of the benefits of Volo Lifestyle Cover.
                  </div>
                  <div>
                    Volo Lifestyle Cover (Outside "Free Look Period"): If you cancel outside
                    the "free look period" for Volo Lifestyle Cover (after the first 30 days
                    of cover) your policy is cancelled from the date your current paid
                    premiums expire.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What is the Free Look Period?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Because we sell a non-advice product, which means we
                    don't advise you on what cover to buy, you get a 30
                    day period (the "Free Look Period") where you are welcome
                    to try out the product, our service and decide if you want
                    to remain a customer.  </div>
                  <div>
                    This gives you time to read your
                    policy and benefit and ensure that you are comfortable with
                    the cover you are being provided with. If you decide not to continue we will refund your initial payment.
                  </div>
                  <div>
                    The Free Look Period is currently applicable to the Volo Lifestyle Cover product.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  How long am I covered for?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    You purchase your cover in advance and pay upfront, you are
                    covered for that initial payment period and will be charged
                    for your next cover period when it expires.
                  </div>
                  <div>
                    Your first payment and recurring payments depend on the options
                    you select for your payments, you control this and will be shown
                    how much your initial payment and recurring payments will be.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What if I am a student?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Good news; we have made provision for you to be able to get cover of
                    between $20,000 and $30,000.  Simply select the cover in the Customise section.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What currency am I charged in?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Mosaic Enterprises / Volo is a New Zealand based company and all
                    prices and payments are quoted in New Zealand dollars.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What if I fail to make a payment?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    If you miss a payment there is a grace period to allow you to catch up and
                    make the payment. Once your account goes into arrears (excepting bank error)
                    you have 30 days to catch up and make a payment before we cancel your policy.
                    Your payment must have arrived in our account before the 30 days are up or
                    your policy will be cancelled. If that happens you can reapply for a new
                    policy, but exclusions and any new pricing will apply, Policies will
                    not be reinstated once they are cancelled.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  Can I transfer my policy?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    All of our policies are non-transferrable, they are yours and you may
                    not assign them to anyone else.  You can nominate a specific beneficiary
                    for a particular claim and any death claims will be paid to your estate
                    unless otherwise notified.  If your details have been recorded incorrectly
                    or you change your name (e.g. by wedding or deed poll) then we will help
                    you to update your policy appropriately
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What is 'Sum Assured'?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Sum Assured is the amount of money you are covered for, and claim
                    payments will be based on. Volo Lifestyle Cover is designed to
                    cover you for between 1 – 2 times your monthly salary, the sum
                    you select when you apply will become your Sum Assured.
                  </div>
                </div>
              </li>
              <li>
                <div className='subtitle'><h3>
                  Volo Travel
                </h3></div>
              </li>
              <li>
                <div className={ Styles.question }>
                  Why do I need international travel insurance?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    <strong>Medical assistance:</strong> Volo travel not only offers medical travel
                    insurance, our global support team can help coordinate your care, find a local
                    doctor that speaks English, even arrange for medical evacuation back to New
                    Zealand if needed.
                  </div>
                  <div>
                    If you had to pay for that yourself, you could be faced with hospital bills
                    totalling thousands of dollars. Protect not only your trip, but your
                    financial future.
                  </div>
                  <div>
                    <strong>Emergency assistence:</strong> Not all emergencies are medical.
                    In cases of natural disaster or civil unrest, your travel plans can be
                    disrupted. That’s when having a 24 hour global assistance centre can
                    make the difference.
                  </div>
                  <div>
                    <strong>Cover your activities:</strong> Be sure that your planned
                    activities are covered by your travel insurance. Volo Travel automatically
                    includes many common activities such as flying fox, snorkelling,
                    trekking, and bungee jumping. Some activities such as skiing may
                    require an additional premium.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What are the benefits of Volo Travel?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    All Volo Travel Insurance policy holders receive:
                    <ul className='answer-list'>
                      <li>Overseas medical cover</li>
                      <li>Cover for luggage delay or loss</li>
                      <li>Loss of travel documents</li>
                      <li>Travel delay benefits</li>
                      <li>Access to our 24 hour emergency medical and travel assistance centre</li>
                      <li>
                        Access to your medical summary information such as medications, allergies
                        and conditions - from your secure personal LockBox.</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  Do I need Travel Insurance?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Before you take a trip, you might ask yourself whether you need to
                    purchase travel insurance. Of  course, in a perfect world, nobody would
                    need travel insurance (or any kind of insurance, for that matter), your
                    trip would always be smooth and easy from start to finish.
                  </div>
                  <div>
                    In the real world, however, travel is often fraught with unpleasant
                    surprises - from minor inconveniences like lost luggage and missed
                    connections to major crises like medical emergencies or natural disasters.
                    Fortunately, even though some mishaps are unavoidable, you can protect
                    yourself and your investment when you buy travel insurance.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  Why buy Travel insurance?
                </div>
                <div className={ Styles.answer }>
                  <div>Check out these 8 fantastic reasons to buy a policy before you travel:</div>
                  <ul className='answer-list'>
                    <li>
                      It protects your travel investment so if something beyond your control happens
                      and you can’t take your trip, a travel insurance policy can offer cover for
                      many of your non-refundable costs.
                    </li>
                    <li>
                      Travel health insurance can cover you for any area, when travelling overseas
                    </li>
                    <li>
                      Provides cover for overseas medical and dental expenses when your New Zealand
                      health insurance might not be able to help you. In addition to providing cover
                      for expenses related to minor accidents and illnesses, travel insurance will
                      provide cover for big-ticket expenses, such as medical evacuations. These type
                      of claims can easily run into tens of thousands of dollars.
                    </li>
                    <li>
                      You’ll be able to access top-quality care, around the globe
                    </li>
                    <li>
                      Quality travel and medical insurance makes financial sense, and it can also
                      literally be life-saving. If you have an accident or fall seriously ill while
                      overseas we will be able to help manage your care. We will not only help cover
                      your medical expenses, but we will also assist in finding you top-quality
                      medical treatment and case management. We’ll also see that you’re transported
                      home safely.
                    </li>
                    <li>
                      You’ll enjoy around the clock emergency assistance
                    </li>
                    <li>
                      You will have access to our 24-hour emergency assistance service. No matter
                      where or when you need help, you have a direct line to a travel assistance
                      expert who is waiting to help you.
                    </li>
                    <li>
                      Travel insurance can fit different kinds of budgets
                    </li>
                  </ul>
                  <div>
                    Get the cover you can afford—you can’t afford to travel without it.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What does Volo Travel cover me for?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    <table className='answer-table'>
                      <tbody>
                        <tr><td>Medical and dental expenses</td><td className="travel-benefit-amount">$7,500,000</td></tr>
                        <tr><td>Additional expenses</td><td className="travel-benefit-amount">$750,000</td></tr>
                        <tr><td>Amendment or cancellation costs</td><td className="travel-benefit-amount">Cover chosen</td></tr>
                        <tr><td>Luggage and travel documents</td><td className="travel-benefit-amount">$4,000</td></tr>
                        <tr><td>Delayed luggage allowance</td><td className="travel-benefit-amount">$500</td></tr>
                        <tr><td>Money</td><td className="travel-benefit-amount">$250</td></tr>
                        <tr><td>Travel delay</td><td className="travel-benefit-amount">$1,000</td></tr>
                        <tr><td>Hijacking</td><td className="travel-benefit-amount">$2,000</td></tr>
                        <tr><td>Loss of income</td><td className="travel-benefit-amount">$4,500 - up to $500 per month</td></tr>
                        <tr><td>Disability</td><td className="travel-benefit-amount">$5,000</td></tr>
                        <tr><td>Accidental death</td><td className="travel-benefit-amount">$5,000</td></tr>
                        <tr><td>Personal liability</td><td className="travel-benefit-amount">$2,500,000</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  How can I be sure I'm choosing quality cover?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    There are many things to look out for when choosing a travel insurance provider and although
                    it may appear that some policies are very similar, quality cover is more than just high policy
                    limits. Make sure you compare plans by looking into the sub limits and carefully reading the
                    policy exclusions.
                  </div>
                  <div>
                    Our policies don’t just cover your luggage, they also provide cover for the costs of you having
                    to unexpectedly cancel or amend your trip, accommodation and medical costs should you become
                    ill or get injured, experience a travel delay, have your luggage lost or stolen and much more.
                  </div>
                  <div>
                    When you compare travel insurance policies ensure you look closely at what cover you’ll have
                    for major world disasters. You will soon discover that we cover what many others don't —
                    including medical costs for injuries resulting from terrorism attacks, civil unrest, strikes,
                    natural disasters such as earthquakes and volcanic eruptions, redundancy, working holidays,
                    and unlimited dental.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  Tell me about Lockbox
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Volo Travel exclusively offers you the ability to have access to your potentially vital medical
                    information in case of an emergency happening to you. (You consent for us to get this info and we
                    do the rest, so it’s there if you need it).
                  </div>
                  <div>
                    If you have any allergies, or existing meds having access to this information could absolutely
                    save your life.
                  </div>
                  <div>
                    You can also securely store your passport info, travel documentation, certificate of insurance
                    etc. which could be invaluable to you in the event of loss.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  Will my claim get paid?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Yes - Volo Travel insurance is provided by Cover-More Pty and underwritten by Great Lakes
                    Reinsurance (UK) a division of SwissRe.
                  </div>
                  <div>
                    Millions of people in Australia, China, India, Malaysia, the United States, the United
                    Kingdom and New Zealand are covered. They have provided high-quality travel insurance
                    and medical assistance, superior round-the clock service and professional care for more
                    than 30 years.
                  </div>
                  <div>
                    They are a global travel insurance and assistance group of companies with offices
                    in New Zealand, the United Kingdom, India, Malaysia, China and Australia.
                    <ul className="answer-list">
                      <li>Founded in Sydney in 1986.</li>
                      <li>Covers more than 1.8 million travellers p.a.</li>
                      <li>Help more than 40,000 people a year with medical assistance.</li>
                      <li>
                        Has a global workforce of approximately 1,000 including own medical team
                        of doctors, registered nurses, psychologists and experienced case managers.
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What if I need to talk to somebody in an emergency?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Importantly, you will have access to our 24 hour emergency assistance team
                    so help is just a phone call away 24 hours a day, 365 days of the year.
                  </div>
                  <div>
                    Call toll free from:
                    <table className="answer-table">
                      <tbody>
                      <tr><td>USA</td><td><a className='phone-value' href='tel:1866-309-2267'>1866 309 2267</a></td></tr>
                      <tr><td>Canada</td><td><a className='phone-value' href='tel:1866-773-9318'>1866 773 9318</a></td></tr>
                      <tr><td>UK</td><td><a className='phone-value' href='tel:0808-234-1526'>0808 234 1526</a></td></tr>
                      <tr><td>Australia</td><td><a className='phone-value' href='tel:1800-242-579'>1800 242 579</a></td></tr>
                      <tr><td>From all other countries call: </td><td ><a className='phone-value' href='tel:+61-2-8907-5240'>+61 (2) 8907 5240</a></td></tr>
                      </tbody>
                    </table>

                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  I'm going overseas for over a year, will you cover me?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    In most cases yes we will. Our travel policies allow you to stay away for a
                    maximum of 24 months. There are however tighter restrictions on durations
                    for some destinations and age groups.
                  </div>
                  <div>
                    In particular, if you are travelling to the Americas or Africa, we can only
                    offer cover up to 18 months. Please contact our Customer Service Department
                    on New
                    Zealand <a className='phone-value' href="tel:0800-86-56-23">0800 86 56 23</a> or <a className='phone-value' href="tel:0800-500-225">0800 500 225 </a> for
                    more details.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What do I do if my luggage is delayed?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    There is provision to claim for the purchase of essential items of clothing
                    and toiletries if your entire luggage is delayed for more than 24 hours by
                    a Transport Provider. Cover limits are up to $500 if your delay is in
                    excess of 24 hours.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  I will be Snow Skiing/Snowboarding, am I covered?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Yes, we can offer cover for snow skiing and snowboarding provided
                    you pay an additional premium. However, you will NOT be covered if
                    you are racing, off-piste or participating in a professional
                    capacity, even if you pay the extra amount.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  I am taking part in a race or sporting competition. Am I covered?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    We cover many different types of sporting activities as long as
                    the activity is not in a professional capacity and not listed in
                    the "We Will Not Under Any Section Pay For" section of the policy
                    wording. We cannot provide cover for participation in any races,
                    other than on foot (i.e. walking or running).
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  Can I get extra coverage for a valuable item?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Certainly! On some plans you may add extra cover for valuables at the
                    time of purchase, or any time before your departure. Check your policy
                    brochure for limits. Please note that you will need to provide us with
                    a valuation and the purchase receipt for the items if you need to claim
                    on an item.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  Are there any policy restrictions relating to coverage of Dental Expenses overseas?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    There is provision for Emergency Dental Treatment overseas; however, there
                    is no provision for dental treatment caused by or related to the deterioration
                    and/or decay of teeth or associated tissue, or involving the use of precious metals.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What existing medical conditions can not be covered?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Under no circumstances is cover available for:
                    <ul className='answer-list'>
                      <li>conditions involving the back or neck</li>
                      <li>conditions involving drug or alcohol dependency</li>
                      <li>conditions for which you are travelling to seek medical treatment or review</li>
                      <li>travel booked or undertaken against the advice of any medical adviser</li>
                      <li>anxiety, depression, mental or nervous disorders</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  I am pregnant, will travel insurance cover me?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Volo Travel Insurance policies provide cover for pregnancy up to 26 weeks, but the
                    following conditions apply:
                  </div>
                  <div>
                    If you are aware of your pregnancy at the time of issue of the policy and there
                    have been complications with this or any previous pregnancy, or the conception
                    was medically assisted, you will be required to complete an Assessment Form
                    prior to cover being accepted.
                  </div>
                  <div>
                    No cover is provided for standard check-ups or scans.
                  </div>
                  <div>
                    No cover exists where unexpected serious complications of your pregnancy occur
                    after the 26th week of pregnancy.
                  </div>
                  <div>
                    Cover cannot be provided for childbirth or the health of a new-born child,
                    regardless of the stage of pregnancy at which the child is born.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What existing medical conditions are automatically covered?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    These are some of the existing medical conditions that are automatically
                    covered subject to policy requirements, for more information please visit
                    our existing medical condition information page.
                    <ul className='answer-list'>
                      <li>Various cancers</li>
                      <li>Asthma</li>
                      <li>Allergies</li>
                      <li>Epilepsy</li>
                      <li>Hip / knee replacement</li>
                      <li>Cataracts / glaucoma</li>
                      <li>Diabetes/glucose intolerance</li>
                      <li>Gastric reflux</li>
                      <li>Hypertension (high blood pressure)</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div className='subtitle'><h3>Some Insurance Words</h3></div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What is Insurance?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    It’s not fun, let’s face it, you need it when you’re having a sh*t day. But
                    the bottom line is it keeps your ass covered. Essentially it’s like a savings
                    account you contribute to (paying a ‘premium’ regularly) so that should
                    something happen which has a price tag higher than you could imagine, you can
                    keep on top of your financials.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What's a 'Premium'?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    A ‘Premium’ is a fancy word to describe the amount of money you are charged for
                    a certain amount of insurance coverage. Volo Lifestyle Cover has designed an
                    affordable pricing model and more so, you can pick a premium (and cover amount)
                    that you can afford.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What is 'Underwriting'?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Underwriting is the process where a large financial service provider (e.g. a bank or
                    insurer) signs and accepts liability, guaranteeing payment in the case of loss or
                    damage. Our friends at Partner’s Life Limited underwrite the Volo Lifestyle Cover
                    policy for us (we’re not a bank or insurer).
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What is 'Sum Assured'?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    Sum Assured is the amount of money you are covered for, and claim
                    payments will be based on. Volo Lifestyle Cover is designed to
                    cover you for between 1 – 2 times your monthly salary, the sum
                    you select when you apply will become your Sum Assured.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What does 'Trauma' mean exactly?
                </div>
                <div className={ Styles.answer }>
                  <div>
                  'Trauma' can also be referred to as a ‘Major Health Event’. For young kiwi’s ‘Trauma’ claims are
                  usually outcomes of car crashes or sports injuries.  Trauma includes things such as
                  permanent loss of speech or sight, or permanent inability to perform normal domestic
                  duties or activities of daily life. Volo Lifestyle covers you for these events - we will pay
                  you out, ensuring you can keep your bills paid.
                </div>
                  <div>
                   Volo Lifestyle also covers temporary disabilities under a different section of your policy.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  What is 'Inpatient Surgery'?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    An ‘inpatient surgery’ is when you are required to stay in hospital overnight
                    for a surgery. So, should you need to be eating hospital food and wearing an
                    attractive gown, at the very least you know Volo will be paying you a lump sum.
                  </div>
                </div>
              </li>
              <li>
                <div className={ Styles.question }>
                  Who should I talk to for insurance advice?
                </div>
                <div className={ Styles.answer }>
                  <div>
                    We’re a no advice product so we’ve tried to make our policy and site as
                    simple as possible. We know young kiwis are educated and constantly on
                    the go so if there is anything that’s not clear straight away, please
                    comment & let us know. We can also arrange for a professional advisor
                    to get in touch if you have questions, just let us know.
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
)};

export default read(FAQ);