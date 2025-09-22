import { useState } from "react";
import { Smartphone, CheckCircle, FileText } from "lucide-react";
import styles from "./RaavitoPartnerPage.module.css";

export default function RaavitoPartnerPage() {
	const [input, setInput] = useState("");
	const year = new Date().getFullYear();

	const isValid = input.trim().length >= 5 && (/^[0-9]{10}$/.test(input.trim()) || /^[A-Za-z0-9/-]{5,}$/.test(input.trim()));

	return (
		<div className={styles.page}>
			<header className={styles.topbar}>
				<img src='raavitologo.png' alt='RAAVITO' className={styles.logo} />
				<nav className={styles.nav}>
					<a href='#how'>How it works</a>
					<a href='#support'>Support</a>
					<span href='#login' className={`${styles.cta} ${styles.pulse}`}>
						Partner Login
					</span>
				</nav>
			</header>

			<section className={styles.hero} id='login'>
				<div className={styles.heroGrid}>
					<div className={styles.formPanel}>
						<h3>Start on RAAVITO</h3>
						<p>Enter mobile number to continue</p>
						<div className={styles.inputGroup}>
							<input type='text' placeholder='Restaurant ID or Mobile' value={input} onChange={(e) => setInput(e.target.value)} />
							<button disabled={!isValid} className={isValid ? styles.enabled : ""} onClick={() => isValid && alert("Proceeding with: " + input)}>
								Proceed
							</button>
						</div>
						<p className={styles.note}>
							We will use this to create your partner account. <a href='#'>Privacy</a>
						</p>
					</div>

					<div className={styles.heroCopy}>
						<h1>Bring your kitchen to more doors</h1>
						<p>Sign up. Get listed. Start receiving delivery orders in under 24 hours.</p>
						<ul className={styles.features}>
							<li>
								<strong>Direct orders</strong>
								<span>Keep more revenue</span>
							</li>
							<li>
								<strong>Realtime updates</strong>
								<span>Manage orders from app</span>
							</li>
							<li>
								<strong>Simple onboarding</strong>
								<span>Minimal documents</span>
							</li>
						</ul>
					</div>
				</div>
			</section>

			<section className={styles.onboard}>
				<div className={styles.stepsWrapper}>
					<h2 className={styles.heading}>
						In just 3 easy steps <br />
						<span>Get your restaurant delivery-ready in 24hrs!</span>
					</h2>

					<div className={styles.stepsBox}>
						<div className={styles.step}>
							<div className={styles.icon}>
								<Smartphone size={22} />
							</div>
							<div className={styles.text}>
								<small>STEP 1</small>
								<h3>Install the RAAVITO Partner App</h3>
							</div>
						</div>

						<div className={styles.step}>
							<div className={styles.icon}>
								<CheckCircle size={22} />
							</div>
							<div className={styles.text}>
								<small>STEP 2</small>
								<h3>Login/Register using your phone number</h3>
							</div>
						</div>

						<div className={styles.step}>
							<div className={styles.icon}>
								<FileText size={22} />
							</div>
							<div className={styles.text}>
								<small>STEP 3</small>
								<h3>Enter restaurant details</h3>
							</div>
						</div>
					</div>
				</div>

				<div className={`${styles.docs} ${styles.banner}`}>
					<h4>Keep these ready</h4>
					<ul>
						<li>
							Business or FSSAI license <a href='#'>Apply</a>
						</li>
						<li>Menu (PDF)</li>
						<li>Bank details & PAN</li>
						<li>
							GST info <a href='#'>Apply</a>
						</li>
					</ul>
				</div>
			</section>

			{/* Footer */}
			<footer className={styles.footer}>© {year} RAAVITO — Partner platform</footer>
		</div>
	);
}
