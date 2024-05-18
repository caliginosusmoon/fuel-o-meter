import { useEffect, useState } from "react";
import "./App.css";
import AddNewRecord from "./components/AddNewRecord";
import AverageCard from "./components/AverageCard";
import AverageMileageCalculator from "./components/AverageMileageCalculator";
import LastTransaction from "./components/LastTransaction";
import VehicleRegistrationForm from "./components/VehicleRegistrationForm";
import FuelRecordForm from "./components/FuelRecordForm";

function App() {
	const [fuelRecords, setFuelRecords] = useState([]);
	const [addRecord, setAddRecord] = useState(false);
	const [addVehicle, setAddVehicle] = useState(false);
	const [fuelData, setFuelData] = useState([]);

	const handleRegister = (vehicleData) => {
		// Add vehicle data to fuel records
		console.log("vehicle data received: ", vehicleData);
		const updatedFuelRecords = { ...fuelRecords };
		console.log("updated fuel records: ", updatedFuelRecords);
		updatedFuelRecords[vehicleData.registrationNumber] = [];
		setFuelRecords(updatedFuelRecords);

		// Update local storage with the updated fuel records
		const allFuelRecords =
			JSON.parse(localStorage.getItem("FuelRecords")) || vehicleData;
		allFuelRecords[vehicleData.registrationNumber] = [];
		localStorage.setItem("FuelRecords", JSON.stringify(allFuelRecords));
		setAddVehicle(false);
		alert("Registered");
	};

	const handleAddRecord = (recordData, vehicleRegistrationNumber) => {
		// Retrieve existing fuel records from local storage
		const allFuelRecords =
			JSON.parse(localStorage.getItem("FuelRecords")) || {};

		console.log("allFuelRecords: ", allFuelRecords);
		console.log("record data: ", recordData);
		console.log("Vehicle Reg: ", vehicleRegistrationNumber);
		// Get or initialize fuel records array for the specified vehicle
		const vehicleFuelRecords =
			allFuelRecords[vehicleRegistrationNumber] || [];

		// Add the new fuel record to the array
		vehicleFuelRecords.push(recordData);

		// Update the fuel records for the specified vehicle in the local storage
		allFuelRecords[vehicleRegistrationNumber] = vehicleFuelRecords;
		localStorage.setItem("FuelRecords", JSON.stringify(allFuelRecords));
		setAddRecord(!addRecord);
	};

	const vehicleRegistrationNumber = JSON.parse(
		localStorage.getItem("FuelRecords")
	)?.registrationNumber;
	const vehicleName = JSON.parse(
		localStorage.getItem("FuelRecords")
	)?.vehicleName;

	useEffect(() => {
		// Set today's date as the default value for fillDate when the component mounts
		const storedRecordsData = JSON?.parse(
			localStorage?.getItem("FuelRecords")
		);
		if (storedRecordsData) {
			const fuelArray = storedRecordsData?.[vehicleRegistrationNumber];
			setFuelData(fuelArray);
		}
	}, [addRecord]);
	return (
		<div className="App">
			{/* <AverageCard/> */}
			<div className="app-name">Fuel-o-Meter</div>

			{addRecord && (
				<FuelRecordForm
					key={vehicleRegistrationNumber}
					vehicleRegistrationNumber={vehicleRegistrationNumber}
					onAddRecord={handleAddRecord}
					setAddRecord={setAddRecord}
				/>
			)}
			{addVehicle && (
				<>
					<VehicleRegistrationForm
						onRegister={handleRegister}
						setAddVehicle={setAddVehicle}
					/>
					{/* <AddNewRecord
						callFunction={setAddVehicle}
						text="Add Vehicle"
					/> */}
				</>
			)}
			{!addRecord && !addVehicle && (
				<>
					<AverageMileageCalculator
						vehicleRegNumber={vehicleRegistrationNumber}
						vehicleName={vehicleName}
						setAddVehicle={setAddVehicle}
					/>
					{}
					{vehicleName ? (
						<AddNewRecord
							callFunction={setAddRecord}
							text="Add Record"
						/>
					) : (
						<AddNewRecord
							callFunction={setAddVehicle}
							text="Register Vehicle"
						/>
					)}
				</>
			)}

			<hr color="#001339" />
			{fuelData?.length > 1 && (
				<div className="heading-container">
					<div className="heading-text">Recent Transactions</div>
					<div className="actions">view All</div>
				</div>
			)}

			{fuelData?.length > 1 &&
				fuelData
					?.map((data, index) => {
						return (
							<LastTransaction
								fillDate={data.fillDate}
								quantity={data.quantity}
								paymentMode={data.paymentMode}
							/>
						);
					})
					.reverse()}
		</div>
	);
}

export default App;
