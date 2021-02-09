import React, { Fragment } from 'react';
import _ from 'lodash';
import { Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ReactComponent as CloseButtonSvg } from '../../images/close-alt.svg';
import './AdvancedSearchTAndCsModal.scss';

const AdvancedSearchTAndCsModal = ({ open, close, updateUserAcceptedAdvancedSearchTerms }) => {
	const formik = useFormik({
		initialValues: {
			terms: false,
		},
		validationSchema: Yup.object({
			terms: Yup.bool().oneOf([true], 'To agree the terms of use, this cannot be empty'),
		}),

		onSubmit: async () => {
			//Append role to user in db
			await updateUserAcceptedAdvancedSearchTerms();
		},
	});

	return (
		<Fragment>
			<Modal
				show={open}
				onHide={close}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered
				className='advancedSearchTAndCModal'>
				<Form onSubmit={formik.handleSubmit}>
					<div className='advancedSearchTAndCModal-header'>
						<div className='advancedSearchTAndCModal-header--wrap'>
							<div className='advancedSearchTAndCModal-head'>
								<h1 className='black-20-semibold'>HDR Discovery Tool Terms of Use</h1>
								<CloseButtonSvg className='advancedSearchTAndCModal-head--close' onClick={() => close()} />
							</div>
							<Modal.Body>
								<div className='relatedModalBackground'>
									<p>PLEASE READ THESE TERMS OF USE CAREFULLY BEFORE ACCEPTING THEM</p>
									<p>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WHAT’S IN THESE TERMS? </p>
									<p>
										These terms set out the standards and rules that apply when you log onto and use the HDR Discovery tool (“our site”) or
										interact with our site in any other way. You will be required to go through a validation process before being allowed to
										use our site.
									</p>
									<p>Click on the links below to go straight to more information on each area:</p>
									<div className='termsLinks'>
										<a className='termsLink' href='#terms-2'>
											WHO WE ARE AND HOW TO CONTACT US
										</a>
										<a className='termsLink' href='#terms-3'>
											AGREEING TO OUR TERMS
										</a>
										<a className='termsLink' href='#terms-4'>
											WE MAY MAKE CHANGES TO THESE TERMS  
										</a>
										<a className='termsLink' href='#terms-5'>
											PURPOSE OF USE
										</a>
										<a className='termsLink' href='#terms-6'>
											PROHIBITED USES  
										</a>
										<a className='termsLink' href='#terms-7'>
											AVAILABILITY OF OUR SITE
										</a>
										<a className='termsLink' href='#terms-8'>
											Your privacy and personal information
										</a>
										<a className='termsLink' href='#terms-9'>
											Ownership, use and intellectual property rights
										</a>
										<a className='termsLink' href='#terms-10'>
											DATA PROTECTION
										</a>
										<a className='termsLink' href='#terms-11'>
											CONFIDENTIALITY
										</a>
										<a className='termsLink' href='#terms-12'>
											RESEARCH ACTIVITY
										</a>
										<a className='termsLink' href='#terms-13'>
											MONITORING OF USE
										</a>
										<a className='termsLink' href='#terms-14'>
											SNOMED TERMS OF USE
										</a>
										<a className='termsLink' href='#terms-15'>
											BREACH OF THESE TERMS   
										</a>
										<a className='termsLink' href='#terms-16'>
											LIABILITY
										</a>
										<a className='termsLink' href='#terms-17'>
											LAWS APPLYING TO ANY DISPUTES  
										</a>
										<a className='termsLink' href='#terms-appendix'>
											APPENDIX
										</a>
									</div>
									<p id='terms-2'>2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WHO WE ARE AND HOW TO CONTACT US</p>
									<p>UNIVERSITY OF NOTTINGHAM of University Park, Nottingham, NG7 2RD (“The University”, “us” or “we”)</p>
									<p>To contact us, please email Email: contact@biobankinguk.org </p>
									<p id='terms-3'>3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AGREEING TO OUR TERMS</p>
									<p>
										BY [CLICKING ON THE YES BOX] OUR SITE YOU ACCEPT THESE TERMS AND THE SNOMED CT TERMS IN THE APPENDIX AND AGREE TO COMPLY
										WITH THEM.
									</p>
									<p>
										• If you do not agree to these terms, you must not use our site. <br></br>• We recommend that you print a copy of these
										terms for future reference.
									</p>
									<p id='terms-4'>4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WE MAY MAKE CHANGES TO THESE TERMS</p>
									<p>
										 We amend these terms from time to time. Every time you wish to use our site, please check these terms to ensure you
										understand the terms that apply at that time.  When we change our terms you will be asked on logging in to accept the
										new terms. If you choose not to accept the new terms we will withdraw your access to your account.
									</p>
									<p id='terms-5'>5.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PURPOSE OF USE</p>
									<p>
										<li>
											You may only use the site as a discovery tool to search anonymised data to assist you in finding an organisation that
											may hold the data you need for your research.
										</li>
										<li>You are not allowed to use the site for any kind of research activity or for any commercial use.</li>
										<li>
											An account on the site must be used solely by the person it has been registered to. Such accounts must be used by such
											individual. It must not be used by groups nor used as a generic account.
										</li>
									</p>
									<p id='terms-6'>6.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PROHIBITED USES</p>
									<p>
										6.1 You may use our site only for lawful purposes. You may not use our site:  <br></br>for any kind of research activity
										unless you have prior written consent from an organisation registered on our site allowing you to use their data for
										research purposes;
										<br></br>to attempt to re-identify or retrace an individual out of anonymous data;
										<br></br>to ask questions which may lead to loss of anonymization of data;
										<br></br>in any way that is unlawful or fraudulent, or has any unlawful or fraudulent purpose or effect;
										<br></br>to bully, insult, intimidate or humiliate any person;
										<br></br>to send, knowingly receive, use or re-use any material which does not comply with our content standards;
										<br></br>to transmit, or procure the sending of, any unsolicited or unauthorised advertising or promotional material or
										any other form of similar solicitation (spam);
										<br></br>to knowingly transmit any data, send or upload any material that contains viruses, Trojan horses, worms,
										time-bombs, keystroke loggers, spyware, adware or any other harmful programs or similar computer code designed to
										adversely affect the operation of any computer software or hardware.
										<br></br>in any unlawful or unethical manner, including, but not limited to, violation of any persons right to privacy;
										<br></br>in a way that causes interference to our site or to other users;
										<br></br>in any way that breaches any applicable local, national or international law or regulation;
										<br></br>or attempt to use or use the site in violation of these terms.
									</p>
									<p>
										6.2 You also agree:
										<br></br>not to license, sublicense, sell, resell, rent, lease, transfer, assign, distribute, or otherwise commercially
										exploit or make our site available to any third party;
										<br></br>modify, adapt, alter or hack our site or otherwise attempt to gain unauthorized access to related systems and
										networks;
										<br></br>not to reproduce, duplicate, copy or re-sell any part of our site;
										<br></br>not to attempt to decipher, decompile, reverse engineer or otherwise discover the source code of any software
										making up our site;
										<br></br>not to access without authority, interfere with, damage or disrupt:
										<br></br>any part of our site;
										<br></br>any equipment or network on which our site is stored; or
										<br></br>any software used in the provision of our site.
									</p>
									<p id='terms-7'>7.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AVAILABILITY OF OUR SITE</p>
									<p>
										7.1 Use of our site is provided on an “as is” basis. Use is intended to be provided 24/7, excluding temporary service
										breaks, which may result from maintenance, update or correction activities or activities performed in order to ensure or
										restore availability, performance, recoverability, information security or management of our site or from other similar
										breaks. The University shall have no liability for such breaks. The University shall usually inform you of such breaks
										in advance if it is reasonably possible by putting a message on the site’s front page.
									</p>
									<p>
										The University shall have no responsibility in the event that our site does not function due to accident, misuse or
										unauthorized amendments.
									</p>
									<p>
										7.2 The University shall have the right to measure and adapt data communications in order to avoid overload in data
										connection, which may affect the quality of the service provided. The University is entitled to make such minor changes
										and amendments to the site which do not have effect on its essential content
									</p>
									<p>
										7.3 The University cannot guarantee that the site will always be available to you for use or that the information you
										access through the site will be accurate.
									</p>
									<p>
										7.4 The University shall have the right to rectify the site, to prevent a problem with the site, to apply fixes to the
										site and to amend the site if the amendment is necessary due to mandatory legislation or authoritative order or if the
										amendment is due to changes in products or license terms of a third-party software provider.
									</p>
									<p>
										7.5 The University shall have the right to suspend the site or your use of the site either partly or in full for the
										following reasons:
										<br></br>(i) suspension is necessary for repair, update or maintenance of the site or any part or to ensure its
										usability or functioning. The University will inform you of such suspension in advance if it is reasonably possible;
										<br></br>(ii) the University has a legitimate reason to suspect that the site has been used for unlawful or unethical
										activities;
										<br></br>(iii) a user or users have not complied with these terms.
									</p>
									<p id='terms-8'>8.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your privacy and personal information</p>
									<p>
										Your privacy and personal information are important to us. Any personal information that you provide to us will be dealt
										with in line with our privacy policy, which explains what personal information we collect from you, how and why we
										collect, store, use and share such information, your rights in relation to your personal information and how to contact
										us and supervisory authorities in the event you have a query or complaint about the use of your personal information.
										Our privacy policy is available at https://www.hdruk.ac.uk/infrastructure/gateway/privacy-policy/.
									</p>
									<p id='terms-9'>9.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ownership, use and intellectual property rights</p>
									<p>
										Our site and all intellectual property rights in it including are owned by us or our licensors. Intellectual property
										rights means rights such as: copyright, trade marks, domain names, design rights, database rights, patents and all other
										intellectual property rights of any kind whether or not they are registered or unregistered (anywhere in the world). We
										and our licensors reserve all of our and their rights in any intellectual property in connection with these terms. This
										means, for example, that we and they remain owners of them and free to use them as we and they see fit. Nothing in these
										terms grants you any legal rights in the site other than as necessary to enable you to access the site. You agree not to
										adjust to try to circumvent or delete any notices contained on the site (including any intellectual property notices)
										and in particular in any digital rights or other security technology embedded or contained within the site.
									</p>
									<p id='terms-10'>10.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DATA PROTECTION </p>
									<p>
										The University shall have the right to take action to prevent any personal data breach and to remove interference
										related to data security. Such action may include prevention of transfer and receipt of messages or removing malicious
										software that endanger data security from messages. Action taken by the University shall depend on the severity of the
										impact of any interference.
									</p>
									<p>You must inform the University without delay of any data security threats or breaches of which you become aware.</p>
									<p id='terms-11'>11.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CONFIDENTIALITY</p>
									<p>
										You agree to keep confidential and not disclose to any third party any information relating to the site or the results
										of your searches. You must retain your access right details, password and similar information carefully and in a manner
										that ensures that they are not exposed to third parties.
									</p>
									<p>You will tell the University immediately if your access rights have become available to a third party.</p>
									<p id='terms-12'>12.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RESEARCH ACTIVITY </p>
									<p>
										You are not allowed to use the site for any kind of research activity. Be aware that if as a result of your discovery
										exercise on the site you go onto do research, you must get prior written consent from any of the organisations that hold
										the data you may require for your research. You must ensure that you have obtained the appropriate permissions such as
										ethics consent and other consents.
										<br></br>The University gives no guarantee that the organisation holding the data will grant permission for disclosure
										to you for research purposes. Release of any data to you is at the discretion of that organisation.
										<br></br>You should be aware that every search is logged and accessible to the University.
									</p>
									<p id='terms-13'>13.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MONITORING OF USE</p>
									<p>
										To ensure compliance with these rules and with UK legislation including the General Data Protection Regulations we
										reserve the right to log in at our discretion and in particular to investigate any suspected incidents or performance
										problems or other issues to view your user activity and for this purpose we will access your IP address.
									</p>
									<p id='terms-14'>14.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SNOMED CT TERMS OF USE</p>
									<p>
										Under the terms of its licence for the use of SNOMED CT the University is required to ensure that you agree to its terms
										of use as set out in the Appendix to these rules.
										<br></br>By accepting these rules you also agree to the SNOMED terms.{' '}
									</p>
									<p id='terms-15'>15.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BREACH OF THESE TERMS </p>
									<p>
										When we consider that a breach of these terms has occurred, we may take such action as we consider appropriate. Any
										breach by you of these terms may result in the University taking all or any of the following actions:
										<br></br>Immediate, temporary or permanent termination of your right to use our site.
										<br></br>Issue of a warning to you.
										<br></br>Legal proceedings against you for reimbursement of all costs on an indemnity basis (including, but not limited
										to, reasonable administrative and legal costs) resulting from the breach.
										<br></br>Further legal action against you.
										<br></br>Disclosure of such information to law enforcement authorities as we reasonably feel is necessary or as required
										by law.
										<br></br>We exclude our liability for all action we may take in response to breaches of these terms.
									</p>
									<p id='terms-16'>16.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LIABILITY </p>
									<p>
										You will be liable for any unauthorized installation, use, copying, reproduction, or sharing of our site , software or
										parts thereof and for possible costs, expenses and damages incurred by the University as a result thereof.
									</p>
									<p>
										The University will not be liable for, and it shall not have obligation to compensate for, expenses, costs, and damages
										caused by unauthorized use of our site or software or attempt thereof or data security of public internet network or
										other interference or interruption to data connection network outside our control.
									</p>
									<p id='terms-17'>17.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LAWS APPLYING TO ANY DISPUTES </p>
									<p>
										These terms of use, their subject matter and formation (and any non-contractual disputes or claims) are governed by
										English law. We both agree to the exclusive jurisdiction of the courts of England and Wales.
									</p>
									<p id='terms-appendix'>Appendix</p>
									<p>
										SNOMED CT licence statement for HDR Discovery Tool
										<br></br>HDR Discovery Tool includes SNOMED Clinical Terms® (SNOMED CT®) which is used by permission of the SNOMED
										International. All rights reserved. SNOMED CT® was originally created by the College of American Pathologists. “SNOMED”,
										“SNOMED CT” and “SNOMED Clinical Terms” are registered trademarks of the SNOMED International (https://www.snomed.org/)
										<br></br>Use of SNOMED CT in HDR Discovery Tool is governed by the conditions of the following SNOMED CT license issued
										by SNOMED International:
										<br></br>1. The meaning of the terms “Affiliate”, or “Data Analysis System”, “Data Creation System”, “Derivative”, “End
										User”, “Extension”, “Member”, “Non-Member Territory”, “SNOMED CT” and “SNOMED CT Content” are as defined in the SNOMED
										International Affiliate License Agreement (see on the SNOMED International web site).
										<br></br>2. Information about Affiliate Licensing is available at https://www.snomed.org/snomed-ct/get-snomed.
										Individuals or organizations wishing to register as SNOMED International Affiliates can register at
										mlds.ihtsdotools.org, subject to acceptance of the Affiliate License Agreement (see on the SNOMED International web
										site).
										<br></br>3. The current list of SNOMED International Member Territories can be viewed at
										https://www.snomed.org/our-customers/members. Countries not included in that list are "Non-Member Territories".
										<br></br>4. End Users, that do not hold an SNOMED International Affiliate License, may access SNOMED CT® using HDR
										Discovery Tool subject to acceptance of and adherence to the following sub-license limitations:
										<br></br>a) The sub-licensee is only permitted to access SNOMED CT® using this software (or service) for the purpose of
										exploring and evaluating the terminology.
										<br></br>b) The sub-licensee is not permitted the use of this software as part of a system that constitutes a SNOMED CT
										"Data Creation System" or "Data Analysis System", as defined in the SNOMED International Affiliate License. This means
										that the sub-licensee must not use HDR Discovery Tool to add or copy SNOMED CT identifiers into any type of record
										system, database or document.
										<br></br>c) The sub-licensee is not permitted to translate or modify SNOMED CT Content or Derivatives.
										<br></br>d) The sub-licensee is not permitted to distribute or share SNOMED CT Content or Derivatives.
										<br></br>5. SNOMED International Affiliates may use HDR Discovery Tool as part of a "Data Creation System" or "Data
										Analysis System" subject to the following conditions:
										<br></br>a) The SNOMED International Affiliate, using HDR Discovery Tool must accept full responsibility for any
										reporting and fees due for use or deployment of such a system in a Non-Member Territory.
										<br></br>b) The SNOMED International Affiliate must not use HDR Discovery Tool to access or interact with SNOMED CT in
										any way that is not permitted by the Affiliate License Agreement.
										<br></br>c) In the event of termination of the Affiliate License Agreement, the use of HDR Discovery Tool will be
										subject to the End User limitations noted in 4
									</p>
									<Form.Group className='pb-2'>
										<div className='mt-2 advancedSearchAcceptTermsDiv'>
											<Form.Control
												type='checkbox'
												className={formik.touched.terms && formik.errors.terms ? 'emptyFormInput checker' : 'checker'}
												id='terms'
												name='terms'
												default={false}
												checked={formik.values.terms}
												onChange={formik.handleChange}
											/>
											<div id='accept-terms' className='gray800-14 advancedSearchAcceptTerms'>
												I have read and understood the HDR Discovery Tool Terms of Use
											</div>
										</div>
										<div className='mt-2'>
											{formik.touched.terms && formik.errors.terms ? (
												<div className='errorMessages ml-1' data-test-id='advanced-search-terms-conditions-validation'>
													{formik.errors.terms}
												</div>
											) : null}
										</div>
									</Form.Group>
								</div>
							</Modal.Body>
						</div>
					</div>

					<div className='advancedSearchTAndCModal-footer'>
						<div className='advancedSearchTAndCModal-footer--wrap'>
							<button className='button-secondary' type='button' onClick={() => close()}>
								Cancel
							</button>
							<button
								data-test-id='agree-to-terms'
								type='submit'
								className='button-primary'
								onClick={() => {
									const elmnt = document.getElementById('accept-terms');
									elmnt.scrollIntoView();
								}}>
								Yes, I agree
							</button>
						</div>
					</div>
				</Form>
			</Modal>
		</Fragment>
	);
};

export default AdvancedSearchTAndCsModal;
