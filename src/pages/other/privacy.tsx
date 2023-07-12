/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

export const PrivacyPage = () => {
    return <div css={_css}>
        <section className="content content--narrow">
            <div className="content__text">
                <h1 id="privacy-policy">Privacy Policy</h1>
                <p>We’re built for privacy. Internally, we know what exactly that means; we use privacy as a filter for
                    decision-making. If a choice needs to be made between one practice that deepens a user’s privacy,
                    and another that would diminish it but accelerate our growth, we’ll always take the slower, more
                    private option. If you’d like to know more about our principles and beliefs that drive our choices,
                    please see our team pages.</p>
                <p>We realize how important it is that our customers fully understand what we
                    mean by privacy. This policy gives you an overview of;</p>
                <ul>
                    <li>
                        <p>What we mean by “logless”</p>
                    </li>
                    <li>
                        <p>What information we collect, how it’s stored, and how it’s used</p>
                    </li>
                    <li>
                        <p>What happens in the case we are subpoenaed, receive a court order or DMCA copyright
                            infringement notice</p>
                    </li>
                    <li>
                        <p>What we do with information relating to cancelled or dormant accounts</p>
                    </li>
                    <li>
                        <p>How we handle subject access requests</p>
                    </li>
                </ul>
                <p>We’ve tried our best to make this policy human-readable so you can get the facts you need
                    quickly.</p>
                <h3 id="zero-user-information-is-our-goal">Zero user information is our goal</h3>
                <p>As a privacy service we believe it’s crucially important to collect the minimum information required
                    to operate our service. Many companies require at least an email address so they can push
                    subscription renewals and enable other customer growth strategies. When you sign up for taikula, you
                    will not be asked for any personal information e.g. email address, name etc. We will also not log
                    any personally identifiable information e.g. IP address.</p>
                <p>This also means that we have no way to contact you in the event of any account issues, network
                    downtime etc. If you wish to provide us with an email address so we can contact you about future
                    issues, you can optionally add one in the client area after sign-up.</p>
                <h3 id="what-data-dont-you-log">What data don’t you log?</h3>
                <p>We do not log any data relating to a user’s VPN activity (while connected or connecting to the
                    VPN).</p>
                <ul>
                    <li>
                        <p>No traffic logging</p>
                    </li>
                    <li>
                        <p>No connection timestamp or connection duration</p>
                    </li>
                    <li>
                        <p>No DNS request logging</p>
                    </li>
                    <li>
                        <p>No logging of user bandwidth</p>
                    </li>
                    <li>
                        <p>No logging of customer IP addresses</p>
                    </li>
                    <li>
                        <p>No logging of any account activity except active total simultaneous connections (explained
                            below)</p>
                    </li>
                </ul>
                <h3 id="what-data-do-you-log-on-sign-up">What data do you log on sign-up?</h3>
                <p>When a new account is created, we store the following data: (please note that we are using simplified
                    field names and formatting below to highlight the relevant information)</p>
                <div className="table-container-mobile">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Created at</th>
                            <th>Product</th>
                            <th>Max devices</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>JR-XXXX-XXXX-XXXX</td>
                            <td>2020-09-21 05:03:13</td>
                            <td>taikula Pro</td>
                            <td>7</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="what-information-is-logged-when-making-a-payment-using-a-credit-card-paypal-cash-cryptocurrency-or-voucher-code">What
                    information is logged when making a payment using a credit card, PayPal, Cash, cryptocurrency or
                    voucher code?</h3>
                <p>When you add time to your account, the following information is stored:</p>
                <div className="table-container-mobile">
                    <table>
                        <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Account ID</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Timestamp</th>
                            <th>Transaction ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>xxx</td>
                            <td>xxx</td>
                            <td>100</td>
                            <td>USD</td>
                            <td>2020-10-2 14:01:11</td>
                            <td>xxx</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <p>Some payment information may be related to your account, for example, if PayPal is used a PayPal
                    transaction ID will be associated with your account, as well as a subscription ID to set up a PayPal
                    subscription. If payment is made using our BTCPay server, then the BTCPay transaction ID will be
                    associated with your account (note that we operate our own BTCPay server). If you add time with
                    voucher code, it is stored in our system and associated with your account ID for 30 days after
                    redemption, then deleted.</p>
                <p>For credit card payments, we use Braintree as our payment processor, and store a Braintree
                    transaction ID against your account. If you elect to enable auto-renew for card payments, a
                    subscription ID will also be stored.</p>
                <p>This is the data we store for a credit card payment:</p>
                <div className="table-container-mobile">
                    <table>
                        <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Account ID</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Timestamp</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>xxx</td>
                            <td>xxx</td>
                            <td>100</td>
                            <td>USD</td>
                            <td>2018-10-2 14:01:11</td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <p>In order to process your payment, Braintree and PayPal will request additional information. Braintree
                    requires collection of your card details to process your payment, and PayPal will require name,
                    email and address information to create a new PayPal account as well as agreement to their terms of
                    service. These additional data points are not stored by taikula, though Braintree and PayPal are
                    required to retain them for many years. No third-party payment provider has access to your taikula
                    account ID.</p>
                <p>In short, where we can offer anonymous payment methods we will, and we collect as little information
                    as possible to process them. However, centralised or third-party payment systems and their data
                    processing and storage are out of our control.</p>
                <p>Please select cash or cryptocurrency payments should this be of concern.</p>
                <h3 id="why-do-you-store-transaction_id-and-subscription_id">Why do you store transaction_id and
                    subscription_id?</h3>
                <p>To be able to process refunds for our 30-day money-back guarantee and resolve other payment issues,
                    as well as to enable auto-renewal of subscription.</p>
                <h3 id="what-information-is-logged-when-i-visit-the-taikula-website">What information is logged when I
                    visit the taikula website?</h3>
                <p>taikula have selected Matomo as their web analytics platform. Web
                    analytics allow us to understand our users engagement with our site to understand where it delivers
                    value, and where it can be improved in terms of usability, simplicity and speed. It also helps us to
                    understand where our site visitors originate, and audit those referring sites to ensure they aren’t
                    making unfounded or exaggerated claims.</p>
                <p>Matomo is open source software that is hosted on our own server infrastructure to ensure your privacy
                    (unlike platforms such as Google Analytics). For example, the Center for Data Privacy Protection in
                    France (CNIL) recommended Matomo as the only tool that can easily ensure full compliance with
                    privacy regulations. Matomo is used to analyse in aggregate information about our website
                    visitors.</p>
                <p>When your web browser loads a page on our site, a small snippet of JavaScript code is executed within
                    your browser which submits information such as;</p>
                <ul>
                    <li>
                        <p>your browser user-agent,</p>
                    </li>
                    <li>
                        <p>language,</p>
                    </li>
                    <li>
                        <p>screen resolution,</p>
                    </li>
                    <li>
                        <p>referring website,</p>
                    </li>
                    <li>
                        <p>IP address.</p>
                    </li>
                </ul>
                <p>To ensure your privacy, taikula discards the last two octets of the IP address. Matomo may also set a
                    web cookie to facilitate the identification of users who revisit the site.</p>
                <h3 id="where-is-my-data-stored-and-who-has-access-to-it">Where is my data stored and who has access to
                    it?</h3>
                <p>taikula is subject to EU law and is in compliance with the EU Data Protection Directive (Directive
                    95/46/EC), which prohibits companies transferring data to overseas jurisdictions with weaker privacy
                    laws. taikula will not locate servers in countries where it’s forced to break this compliance. Due to
                    the nature of our logging practices, VPN servers do not contain any personally identifiable
                    information and thus, if seized, could not be used to identify users.</p>
                <p>No third-parties have access to any of your data. We always use first or third-party tools we can
                    host on our own servers in a protected and secure environment.</p>
                <h3 id="how-do-you-limit-simultaneous-connections">How do you limit simultaneous connections?</h3>
                <p>To authenticate customers, our VPN servers send a request to a central authentication server,
                    containing the customers account ID. The authentication server holds a temporary record of all
                    connected customer ID’s. When a customer connects to a VPN gateway, the authentication server checks
                    how many active authentication records are already in the table for the account ID, if it exceeds
                    the allowed number of simultaneous connections, then authentication is denied. When a user
                    disconnects, the relevant record is permanently deleted. If an adversary was able to gain access to
                    this data, they could only determine which account ID’s were logged into the VPN network at that
                    exact moment in time.</p>
                <p>As this data is only stored for the duration of the VPN session, if you or anyone requests to know
                    how many connections you had at a specific time in the past, we couldn’t tell you because we don’t
                    store it.</p>
                <h3 id="what-information-is-retained-when-i-stop-using-your-service">What information is retained when I
                    stop using your service?</h3>
                <p>When a VPN account is terminated on our network due to the subscription ending, non-payment or for
                    any other reason, all data associated with that VPN account including the account itself (with the
                    exception of the accounting data below) is automatically deleted after 90 days. After the account is
                    deleted, the remaining accounting data below has no link to any past account ID. If you want to
                    delete your data immediately, simply click on the ‘delete account’ button within the client
                    area.</p>
                <div className="table-container-mobile">
                    <table>
                        <thead>
                        <tr>
                            <th>Date of payment</th>
                            <th>Amount</th>
                            <th>Payment method</th>
                            <th>Transaction ID</th>
                            <th>Subscription ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>2020-01-24</td>
                            <td>$100</td>
                            <td>Paypal</td>
                            <td>XXX</td>
                            <td>XXX</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="how-can-i-get-access-to-the-data-you-store-on-my-behalf-via-a-subject-access-request">How can I
                    get access to the data you store on my behalf via a subject access request?</h3>
                <p>In accordance with GDPR legislation, reasonable requests for release of a specific user’s data will
                    be honoured within 28 days of an acceptable request from a user or person with a provable legal
                    relationship with that user.</p>
                <p>We reserve the right to refuse or charge for requests that are manifestly unfounded or excessive. Any
                    refused subject access requests will be responded to without undue delay including the refusal
                    reason as well as recourse to refer to the supervisory authority.</p>
                <p>Subject access requests should be made in writing to <a href="mailto:sar@taikula.life">sar@taikula.life</a>
                </p>
                <h3 id="where-is-the-regulatory-authority-that-oversees-the-jurisdiction-in-which-taikula-operates-under-gdpr">Where
                    is the regulatory authority that oversees the jurisdiction in which taikula operates under GDPR?</h3>
                <p>taikula is registered in Gibraltar, and as such the GDPR regulatory body is the <a
                    href="http://www.gra.gi/">Gibraltar Regulatory Authority</a>.</p>
                <h3 id="what-happens-if-you-receive-a-legal-notice-such-as-a-dmca-for-copyright-material-that-i-have-downloaded">What
                    happens if you receive a legal notice such as a DMCA for copyright material that I have
                    downloaded?</h3>
                <p>Since our customers are using an taikula issued IP address when using our service, such notices are
                    directed to taikula and our legal department will issue an appropriate response. Since we store no
                    connection logs, we couldn’t associate a request with a customer identity even if legally compelled
                    to do so.</p>
                <h3 id="how-do-you-react-when-requested-by-an-authority-for-information-relating-to-a-customer">How do
                    you react when requested by an authority for information relating to a customer?</h3>
                <p>The company is incorporated in Gibraltar. If a court order is received from a recognised legal
                    authority with jurisdiction over taikula, then the company will comply with that order. However, the
                    company cannot be compelled to hand over information which it does not have. When a customer signs
                    up, we request no personal information. If it ever becomes required by law for us to keep a
                    persistent log of our customers connections or any personal data relating to their network activity,
                    we will immediately notify our customers and do everything in our power to move jurisdictions or
                    close the service to protect those who entrust their privacy to us.</p>
                <h3 id="what-happens-if-laws-change">What happens if laws change?</h3>
                <p>taikula is committed to keeping its customers informed of any serious legislative threats to our
                    service. If the laws in our jurisdiction change in way that prevents us from upholding our privacy
                    policy, we will always inform our customers before those laws are enacted. We will also allow
                    customers to cancel their subscription and will refund any fees that cover the remainder of their
                    subscription period.</p>
                <h3 id="crash-logs">Crash Logs</h3>
                <p>By default, if one of our mobile apps crashes while you’re using it, anonymized data about the crash
                    will be collected on the device to help us identify the cause of the crash and hopefully fix it in a
                    future update. These “crash logs” contain information such as the state of the app, operating
                    system, and device at the time of the crash, but no personally identifiable information.</p>
                <p>Crash logs for our desktop apps are only sent when the user manually confirms the action. For our
                    mobile apps, you can opt-out of crash log reporting by disabling it in user preferences.</p>
                <p>Crash logs are sent to a server hosted and managed by taikula and no third-party vendors or cloud
                    services.</p>
                <h3 id="device-permissions-for-personal-data-access">Device permissions for Personal Data access</h3>
                <p>taikula Android and iOS apps may request certain permissions that allow it to access the user’s device
                    data as described below.</p>
                <p>These permissions must be granted by the user before the respective information can be accessed. Once
                    the permission has been given, it can be revoked by the user at any time in device settings.</p>
                <p>Please note that revoking of such permissions might impact the proper functioning of the app.</p>
                <h4 id="android-app">Android App</h4>
                <p>Background location permission (continuous):<br/>
                    Required to access the current Wi-Fi SSID, when the Network Protection feature is enabled.</p>
                <p>Camera permission:<br/>
                    Used to scan QR code with an account ID.</p>
                <h4 id="ios-app">iOS App</h4>
                <p>Permission to save VPN profile:<br/>
                    Required to access the current Wi-Fi SSID, when the Network Protection feature is enabled.</p>
                <p>Camera permission:<br/>
                    Used to scan QR code with an account ID.</p>
                <h3 id="changes-to-policy">Changes to policy</h3>
                <p>taikula reserves the right to change this privacy policy at any time. In such cases, we will take every
                    reasonable step to ensure that these changes are brought to your attention by posting all changes
                    prominently on the taikula website for a reasonable period of time, before the new policy becomes
                    effective as well as emailing our existing customers.</p>
                <p>If you have any questions or comments regarding this policy, please do not hesitate to contact
                    us.</p>

            </div>
        </section>
    </div>
}

const _css = css`
  padding: 12px;

  #privacy-policy {
    margin: 10px 0;
  }

  h3 {
    margin: 10px 0;
  }
`
