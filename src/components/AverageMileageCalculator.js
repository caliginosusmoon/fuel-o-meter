// AverageMileageCalculator.js
import React, { useEffect, useState } from "react";
import AverageCard from "./AverageCard";

const AverageMileageCalculator = ({
	vehicleRegNumber,
	vehicleName,
	setAddVehicle,
}) => {
	const [mileageRecords, setMileageRecords] = useState([]);

	useEffect(() => {
		// Retrieve fuel records from local storage
		const storedRecordsData = JSON?.parse(
			localStorage?.getItem("FuelRecords")
		);
		if (storedRecordsData) {
			const storedRecords = storedRecordsData?.[vehicleRegNumber];
			console.log(
				"stored Records: ",

				vehicleRegNumber,
				storedRecords
			);
			if (storedRecords) {
				setMileageRecords(storedRecords);
			}
		}
	}, []);

	// Function to calculate mileage for full tank fills
	const calculateFullTankMileage = (records) => {
		let totalMileage = 0;
		let numFullTankFills = 0;
		console.log("records length", records?.length);
		for (let i = 1; i < records.length; i++) {
			const currentRecord = records[i];
			const prevRecord = records[i - 1];
			console.log("calculating ", records[i]);

			if (
				currentRecord.fillType === "Full Tank" &&
				prevRecord.fillType === "Full Tank"
			) {
				const mileage =
					(currentRecord.odometerReading -
						prevRecord.odometerReading) /
					currentRecord.quantity;
				totalMileage += mileage;
				numFullTankFills++;
				console.log("mileage: ", i, mileage);
			}
		}

		return numFullTankFills > 0 ? totalMileage / numFullTankFills : 0;
	};

	// Function to calculate the average mileage
	const calculateAverageMileage = () => {
		const fullTankMileage = calculateFullTankMileage(mileageRecords);
		return fullTankMileage;
	};

	return (
		<div>
			{/* Display average mileage */}
			<AverageCard
				mileage={calculateAverageMileage().toFixed(2)}
				vehicleNo={vehicleRegNumber}
				vehicleName={vehicleName}
				setAddVehicle={setAddVehicle}
			/>
			{/* <p>Average Mileage: {calculateAverageMileage().toFixed(2)} km/L</p> */}
		</div>
	);
};

export default AverageMileageCalculator;
