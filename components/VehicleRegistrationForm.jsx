// VehicleRegistrationForm.js
import React, { useState } from "react";

const VehicleRegistrationForm = ({ onRegister, setAddVehicle }) => {
	const [vehicleData, setVehicleData] = useState({
		vehicleName: "",
		registrationNumber: "",
		initialOdometerReading: "",
		fuelTankCapacity: "",
	});

	const handleChange = (e) => {
		setVehicleData({
			...vehicleData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("vehicle data sent: ", vehicleData);
		onRegister(vehicleData);
		// Reset form data after submission
		setVehicleData({
			vehicleName: "",
			registrationNumber: "",
			initialOdometerReading: "",
			fuelTankCapacity: "",
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="avgCard-outer-container">
				<div className="fuel-form-inner">
					<input
						type="text"
						name="vehicleName"
						value={vehicleData.vehicleName}
						onChange={handleChange}
						placeholder="Vehicle Name"
						required
					/>
					<input
						type="text"
						name="registrationNumber"
						value={vehicleData.registrationNumber}
						onChange={handleChange}
						placeholder="Registration Number"
						required
					/>
					<input
						type="number"
						name="initialOdometerReading"
						value={vehicleData.initialOdometerReading}
						onChange={handleChange}
						placeholder="Initial Odometer Reading"
						required
					/>
					<input
						type="number"
						name="fuelTankCapacity"
						value={vehicleData.fuelTankCapacity}
						onChange={handleChange}
						placeholder="Fuel Tank Capacity in L"
						required
					/>
				</div>
			</div>
			<div style={{ margin: "1.87rem 0" }}>
				<button
					type="submit"
					className="primary-btn"
					style={{ marginRight: "1rem" }}
				>
					Register
				</button>
				<button
					className="secondary-btn"
					type="reset"
					onClick={() => setAddVehicle(false)}
				>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default VehicleRegistrationForm;
