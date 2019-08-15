import React from "react";
import {
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	Col,
	Row
} from 'reactstrap';
import { Line } from 'react-chartjs-2';

//Line chart
let lineData = {
	labels: ['9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th'],
	datasets: [{
		label: 'Users',
		borderWidth: 1,
		backgroundColor: 'rgba(250,128,114,.1)',
		borderColor: 'rgb(128,0,0)',
		pointBorderColor: 'rgb(128,0,0)',
		pointBackgroundColor: 'rgb(128,0,0)',
		data: [3, 3, 1, 1, 2, 2, 2, 4]
	}]
};

class SalesSummary extends React.Component {
	render() {
		return (
			<Card>
				<CardBody>
					<div className="d-flex align-items-center">
						<div>
							<CardTitle>Active Users</CardTitle>
							<CardSubtitle>Last 7 Days</CardSubtitle>
						</div>
						<div className="ml-auto d-flex align-items-center">
							<ul className="list-inline font-12 dl mr-3 mb-0">
								<li className="border-0 p-0 text-info list-inline-item">
									<i className="fa fa-circle redGraphIcon"></i> Users
								</li>
							</ul>
						</div>
					</div>
					<Row>
						<Col lg="12">
							<div className="campaign ct-charts">
								<div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 250 }}>
									<Line data={lineData} options={{ maintainAspectRatio: false, legend: { display: false, labels: { fontFamily: "Nunito Sans" } }, scales: { yAxes: [{ stacked: true, gridLines: { display: true }, ticks: { stepSize: 1, fontFamily: "Nunito Sans" } }], xAxes: [{ gridLines: { display: false }, ticks: { fontFamily: "Nunito Sans" } }] } }} />
								</div>
							</div>
						</Col>
					</Row>
				</CardBody>
			</Card>
		);
	}
}

export default SalesSummary;
