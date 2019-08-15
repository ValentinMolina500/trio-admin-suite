import React from 'react';
import {
	Nav,
	NavItem,
	Navbar,
	NavbarBrand,
	Collapse,
	DropdownItem,
	Button,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu
} from 'reactstrap';

import profilephoto from '../../assets/images/users/1.jpg';
import { withAuthorization, AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from '../../assets/images/trioLogo.png';

import logolighticon from '../../assets/images/logo-light-icon.png';
import logodarktext from '../../assets/images/logo-text.png';
import logolighttext from '../../assets/images/logo-light-text.png';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.logout = this.logout.bind(this);
		this.showMobilemenu = this.showMobilemenu.bind(this);
		this.state = {
			isOpen: false
		};
	}
	/*--------------------------------------------------------------------------------*/
	/*To open NAVBAR in MOBILE VIEW                                                   */
	/*--------------------------------------------------------------------------------*/
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	logout() {
		console.log("CLICK");
		this.props.firebase.doLogout()
		this.props.history.push('/');
	}
	/*--------------------------------------------------------------------------------*/
	/*To open SIDEBAR-MENU in MOBILE VIEW                                             */
	/*--------------------------------------------------------------------------------*/
	showMobilemenu() {
		document.getElementById('main-wrapper').classList.toggle('show-sidebar');
	}

	onLogoClick = () => {
		this.props.history.push('/dashboard');
	}

	render() {
		return (
			<header className="topbar navbarbg" data-navbarbg="skin2">
				<Navbar className="top-navbar" dark expand="md">
					<div className="navbar-header" id="logobg" data-logobg="skin6">
						{/*--------------------------------------------------------------------------------*/}
						{/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
						{/*--------------------------------------------------------------------------------*/}
						<NavbarBrand className="pointer" onClick={this.onLogoClick}>
							<b className="logo-icon">
								<img src={logodarkicon} alt="homepage" className="dark-logo" />
								<img
									src={logolighticon}
									alt="homepage"
									className="light-logo"
								/>
							</b>
							<span className="logo-text">
								{/* <img src={logodarktext} alt="homepage" className="dark-logo" /> */}
								<img
									src={logolighttext}
									className="light-logo"
									alt="homepage"
								/>
							</span>
						</NavbarBrand>
						{/*--------------------------------------------------------------------------------*/}
						{/* Mobile View Toggler  [visible only after 768px screen]                         */}
						{/*--------------------------------------------------------------------------------*/}
						<a className="nav-toggler d-block d-md-none" onClick={this.showMobilemenu}>
							<i className="ti-menu ti-close" />
						</a>
					</div>
					<Collapse className="navbarbg" isOpen={this.state.isOpen} navbar data-navbarbg="skin1" >
						<Nav className="ml-auto float-right" navbar>
							{/*--------------------------------------------------------------------------------*/}
							{/* Start Profile Dropdown                                                         */}
							{/*--------------------------------------------------------------------------------*/}
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret className="pro-pic">
									<img
										src={profilephoto}
										alt="user"
										className="rounded-circle"
										width="31"
									/>
								</DropdownToggle>
								<DropdownMenu right className="user-dd">
									{/* <DropdownItem>
										<i className="ti-user mr-1 ml-1" /> My Account
                  </DropdownItem> */}
									{/* <DropdownItem>
										<i className="ti-wallet mr-1 ml-1" /> My Balance
                  </DropdownItem>
									<DropdownItem>
										<i className="ti-email mr-1 ml-1" /> Inbox
                  </DropdownItem>*/}
									{/* <DropdownItem divider />  */}
									{/* <DropdownItem>
										<i className="ti-settings mr-1 ml-1" /> Account Settings
                  </DropdownItem> */}
									{/* <DropdownItem divider /> */}
									<DropdownItem onClick={this.logout}>
										<i className="fa fa-power-off mr-1 ml-1" /> Logout
                  </DropdownItem>
									{/* <DropdownItem divider /> */}
									{/* <Button
										color="success"
										className="btn-rounded ml-3 mb-2 mt-2"
									>
										View Profile
                  </Button> */}
								</DropdownMenu>
							</UncontrolledDropdown>
							{/*--------------------------------------------------------------------------------*/}
							{/* End Profile Dropdown                                                           */}
							{/*--------------------------------------------------------------------------------*/}
						</Nav>
					</Collapse>
				</Navbar>
			</header>
		);
	}
}

const condition = authUser => !!authUser
export default withRouter(withFirebase(withAuthorization(condition)(Header)));


