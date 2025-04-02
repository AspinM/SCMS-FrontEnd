// pages/terms-of-use.js
import Link from 'next/link';
import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="container mt-5">
    <h1 className="mb-4">TERMS OF USE</h1>
    <p>Welcome to Setld, powered by ADRXs Smart Settle Technology<sup>TM</sup>!</p>
    
    <p>This User Agreement is a legally binding contract between you and Adroit DRX, LLC, governing your use of your Setld account and the Setld services. You must be in the United States and have a U.S. bank account to use the services.</p>
    
    <p>You agree to comply with all the terms and conditions in this User Agreement. The terms include an agreement to resolve disputes by arbitration on an individual basis. You acknowledge and agree to comply with Privacy Policy posted on <Link href="https://adroitdrx.com/" className="text-primary">https://adroitdrx.com/</Link> and <Link href="https://setld.app/" className="text-primary">https://setld.app/</Link></p>
    
    <h2 className="mt-4">Electronic Fund Transfers (EFTs) and Account Balances</h2>
    <p>Adroit DRX, LLC d.b.a. SETLD partners with financial services software company Sila Inc. (Sila) and banking services provider Fortress Trust (Fortress), member FDIC, to offer you electronic fund transfers and provide you with an Account. By registering, linking your external bank account, and authorizing any electronic payment, you also agree to:</p>
    <ul className="list-group list-group-flush mb-4">
      <li className="list-group-item"><Link href="https://www.silamoney.com/legal/terms-of-service" className="text-primary">Silas terms of service</Link></li>
      <li className="list-group-item"><Link href="https://www.silamoney.com/legal/acceptable-use-policy" className="text-primary">Acceptable use policy</Link></li>
      <li className="list-group-item"><Link href="https://www.silamoney.com/legal/sila-electronic-communications-consent" className="text-primary">Electronic communications consent</Link></li>
    </ul>
    
    <h2 className="mt-4">Limitation of liability</h2>
    <p>ADRXs liability is limited with respect to your Setld account and your use of the Setld services. In no event shall ADRX be liable for lost profits or any special, incidental or consequential damages arising out of or in connection with our websites, software, systems operated by us or on our behalf, any of the Setld services, or this user agreement (however arising, including negligence), unless and to the extent prohibited by law.</p>
    
    <h2 className="mt-4">No Warranty</h2>
    <p>The Setld services are provided as-is and without any representation or warranty, whether express, implied or statutory. We specifically disclaim any implied warranties of title, merchantability, fitness for a particular purpose and non-infringement.</p>
    
    <h2 className="mt-4">Agreement to Arbitrate</h2>
    <p>If a dispute arises between you and ADRX regarding the Setld services or otherwise, our goal is to learn about and address your concerns. If we are unable to do so to your satisfaction, we aim to provide you with a neutral and cost-effective means of resolving the dispute quickly.</p>
    
    <h2 className="mt-4">Restricted Activities / Prohibited Uses</h2>
    <p>In connection with your use of our websites, your Setld account, the Setld services, or in the course of your interactions with us, other customers, or third parties, you must not:</p>
    <ul className="list-group list-group-flush mb-4">
      <li className="list-group-item">Breach this user agreement, the Acceptable Use Policy, or any other agreement between you and us;</li>
      <li className="list-group-item">Violate any law, statute, ordinance, or regulation;</li>
      <li className="list-group-item">Infringe our or any third partys intellectual property rights, or rights of publicity or privacy;</li>
      <li className="list-group-item">Provide false, inaccurate, or misleading information;</li>
      <li className="list-group-item">Send or receive potentially fraudulent money or payments;</li>
      <li className="list-group-item">Refuse to cooperate in an investigation or provide confirmation of your identity;</li>
      <li className="list-group-item">Use the Setld services in a manner that results in complaints, disputes, claims, reversals, chargebacks, fees, fines, penalties or other liability;</li>
    </ul>
    
    <h2 className="mt-4">Specifically prohibited business activities:</h2>
    <ul className="list-group list-group-flush mb-4">
      <li className="list-group-item">Adult Entertainment Business</li>
      <li className="list-group-item">Aircraft Dealer</li>
      <li className="list-group-item">Cannabis Business</li>
      <li className="list-group-item">Currency Exchange Business</li>
      <li className="list-group-item">Firearms Dealer or Seller of Firearm Components</li>
      <li className="list-group-item">Gambling Establishment</li>
      <li className="list-group-item">Offshore Business</li>
      <li className="list-group-item">Purveyor of Illegal Products or Services</li>
    </ul>
    
    <h2 className="mt-4">Actions We May Take if You Engage in Any Restricted Activities</h2>
    <p>If we believe that youve engaged in any restricted activities, we may take a number of actions to protect ourselves, our customers and others at any time at our sole discretion. The actions we may take include, but are not limited to:</p>
    <ul className="list-group list-group-flush mb-4">
      <li className="list-group-item">Terminate this user agreement, limit your Setld account, and/or close or suspend your Setld account;</li>
      <li className="list-group-item">Refuse to provide the Setld services to you in the future;</li>
      <li className="list-group-item">Limit your access to our websites, software, systems, or any of the Setld services;</li>
      <li className="list-group-item">Hold money in your Setld account for up to 180 days if reasonably needed to protect against the risk of liability;</li>
      <li className="list-group-item">Take legal action against you;</li>
    </ul>
    
    <h2 className="mt-4">Consent to Receive Electronic Disclosures</h2>
    <p>By accepting this Consent, you consent to receive and view disclosures, notices, statements and other communications from Adroit DRX, LLC electronically by any of the following means:</p>
    <ul className="list-group list-group-flush mb-4">
      <li className="list-group-item">Text to your mobile phone number</li>
      <li className="list-group-item">Email</li>
      <li className="list-group-item">Notifications from our Web or mobile application</li>
    </ul>
    
    <h2 className="mt-4">Acknowledgement of How Setld Settles Deals & Charges Fees</h2>
    <p>Setld settles or resolves Deals entered by parties by collecting basic Deal information, settlement terms, and a flexibility percentage. Fees will be charged pursuant to the in-app disclosed and agreed upon transaction fees, and as otherwise set forth below:</p>
    
    <table className="table table-bordered table-striped mb-5">
      <thead>
        <tr>
          <th>Total Deal Amount</th>
          <th>Initial Transaction Fee</th>
          <th>Per Payment Fee</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0 - 1,000</td>
          <td>29.95</td>
          <td>$3.95</td>
        </tr>
        <tr>
          <td>1,000 + to 2,500</td>
          <td>39.95</td>
          <td>$3.95</td>
        </tr>
        <tr>
          <td>2,500 + to 5,000</td>
          <td>49.95</td>
          <td>$4.95</td>
        </tr>
        <tr>
          <td>5,000 + to 10,000</td>
          <td>79.95</td>
          <td>$4.95</td>
        </tr>
        <tr>
          <td>10,000 + to 25,000</td>
          <td>129.95</td>
          <td>$8.95</td>
        </tr>
        <tr>
          <td>25,000 +</td>
          <td>299.95</td>
          <td>$8.95</td>
        </tr>
      </tbody>
    </table>
  </div>
  );
};

export default TermsOfUse;
