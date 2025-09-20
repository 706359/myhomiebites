import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderButton from "../OrderButton/orderbutton";

export default function Header({ onRegisterClick, onLoginClick }) {
	const [open, setOpen] = useState(false);
	const navigation = useNavigate();
	const Icon = ({ children }) => <span className='hb-svg' aria-hidden='true' dangerouslySetInnerHTML={{ __html: children }} />;

	return (
		<header className={`hb-header ${open ? "open" : ""}`}>
			<nav className='hb-nav'>
				<div className='hb-left'>
					<div href='#home' className='hb-logo' aria-label='Home'>
						<img src='/logo.png' alt='RAAVITO Logo' />
					</div>

					<div className='hb-search' role='search' aria-label='Site search'>
						<Icon>{`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`}</Icon>
						<input type='search' placeholder='Search' aria-label='Search' />
					</div>
				</div>

				<ul className='hb-links' role='menubar'>
					<li role='none'>
						<a role='menuitem' href='#rates'>
							<Icon>{`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="6" rx="1" stroke="currentColor" stroke-width="1.6"/><rect x="3" y="14" width="10" height="6" rx="1" stroke="currentColor" stroke-width="1.6"/></svg>`}</Icon>
							<span>Price List</span>
						</a>
					</li>

					<li role='none'>
						<a role='menuitem' href='#about'>
							<Icon>{`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 8v.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M11 12h1v4h1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`}</Icon>
							<span>About</span>
						</a>
					</li>

					<li role='none'>
						<a role='menuitem' href='#gallery'>
							<Icon>{`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 9l2.5 3 2-2.5L16 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`}</Icon>
							<span>Gallery</span>
						</a>
					</li>

					<li role='none'>
						<a role='menuitem' href='#faq'>
							<Icon>{`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 9a3 3 0 114 4c0 2-3 3-3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="4" r="1" fill="currentColor"/></svg>`}</Icon>
							<span>FAQ</span>
						</a>
					</li>

					<li role='none'>
						<a role='menuitem' href='#contact'>
							<Icon>{`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 8l9 6 9-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`}</Icon>
							<span>Contact</span>
						</a>
					</li>
				</ul>

				<div className='hb-right'>
					<div className='hb-ctas'>
						<button className='hb-btn primary' onClick={onLoginClick}>
							User Login
						</button>
						<button className='hb-btn ghost' onClick={onRegisterClick}>
							User Signup
						</button>
						<button
							className='hb-btn ghost'
							onClick={() => {
								navigation("/chef-registration");
							}}>
							PARTNER WITH RAAVITO!
						</button>
						<OrderButton />
					</div>

					<button className='hb-menu' onClick={() => setOpen(!open)} aria-label='Toggle menu' aria-expanded={open}>
						<Icon>{`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`}</Icon>
					</button>
				</div>
			</nav>

			<ul className='hb-mobile' aria-hidden={!open}>
				<li>
					<a href='#rates'>Price List</a>
				</li>
				<li>
					<a href='#about'>About</a>
				</li>
				<li>
					<a href='#gallery'>Gallery</a>
				</li>
				<li>
					<a href='#faq'>FAQ</a>
				</li>
				<li>
					<a href='#contact'>Contact</a>
				</li>
				<li>
					<button onClick={onLoginClick}>User Login</button>
				</li>
				<li>
					<button onClick={onRegisterClick}>User Signup</button>
				</li>
				<li>
					<button onClick={() => {}}>Homie Chef Registration</button>
				</li>
				<li>
					<OrderButton />
				</li>
			</ul>
		</header>
	);
}
