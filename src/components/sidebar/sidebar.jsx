import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { withAuthorization, AuthUserContext } from '../Session'
class Sidebar extends React.Component {

	constructor(props) {
		super(props);
		this.activeRoute.bind(this);
	}
	/*--------------------------------------------------------------------------------*/
	/*To Expand SITE_LOGO With Sidebar-Menu on Hover                                  */
	/*--------------------------------------------------------------------------------*/
	/*--------------------------------------------------------------------------------*/
	/*Verifies if routeName is the one active (in browser input)                      */
	/*--------------------------------------------------------------------------------*/
	activeRoute(routeName) { return this.props.location.pathname.indexOf(routeName) > -1 ? 'selected' : ''; }

	render() {
		return (
			<aside className="left-sidebar" id="sidebarbg" data-sidebarbg="skin6" onMouseEnter={this.expandLogo} onMouseLeave={this.expandLogo}>
				<div className="scroll-sidebar">
					<PerfectScrollbar className="sidebar-nav">
						{/*--------------------------------------------------------------------------------*/}
						{/* Sidebar Menus will go here                                                */}
						{/*--------------------------------------------------------------------------------*/}
						<Nav id="sidebarnav">
							{this.props.routes.map((prop, key) => {
								if (prop.redirect) {
									return null;
								}
								if (prop.path == '/signin' || prop.path == '/edit' || prop.path == '/userinfo' || prop.path == '/addnewpost') {
									return null;
								}
								else {
									return (
										/*--------------------------------------------------------------------------------*/
										/* Adding Sidebar Item                                                   s         */
										/*--------------------------------------------------------------------------------*/
										<li className={this.activeRoute(prop.path) + (prop.pro ? ' active active-pro' : '') + ' sidebar-item'} key={key}>
											<NavLink to={prop.path} className="sidebar-link" activeClassName="active">
												<i className={prop.icon} />
												<span className="hide-menu">{prop.name}</span>
											</NavLink>
										</li>
									);
								}
							})}
						</Nav>
					</PerfectScrollbar>
				</div>
			</aside>
	
		);
	}
}

const condition = authUser => {
	console.log(authUser);
	if(!authUser)
	{
		return false;
	}
	else
	return true;
}

export default withAuthorization(condition)(Sidebar);
