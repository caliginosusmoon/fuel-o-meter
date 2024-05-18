import React from "react";

const AverageCard = ({ mileage, vehicleNo, vehicleName, setAddVehicle }) => {
	return (
		<div className="avgCard-outer-container">
			<div className="avg-card">
				<div className="avg-mileage">{mileage}</div>

				{/* <div className="dash"></div> */}
				<div className="avg-text">Current Average (KM/L)</div>
			</div>
			<div className="vehicle-details">
				{vehicleName ? vehicleName : <>No Vehicle Added</>}
				<div className="vehicle-reg">{vehicleNo}</div>
			</div>
		</div>
	);
};

export default AverageCard;
