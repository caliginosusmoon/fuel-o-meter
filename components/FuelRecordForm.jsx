// FuelRecordForm.js
import React, { useEffect, useState } from "react";

const FuelRecordForm = ({
	onAddRecord,
	vehicleRegistrationNumber,
	setAddRecord,
}) => {
	const [recordData, setRecordData] = useState({
		amount: "",
		quantity: "",
		odometerReading: "",
		fillType: "Full Tank",
		paymentMode: "Credit Card",
		fillDate: "",
	});

	const handleChange = (e) => {
		setRecordData({
			...recordData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onAddRecord(recordData, vehicleRegistrationNumber); // Pass vehicle registration number
		// Reset form data after submission
		setRecordData({
			amount: "",
			quantity: "",
			odometerReading: "",
			fillType: "Full Tank",
			paymentMode: "Credit Card",
		});
	};
	useEffect(() => {
		// Set today's date as the default value for fillDate when the component mounts
		const todayDate = new Date();
		const today = `${todayDate.getFullYear()}-${(todayDate.getMonth() + 1)
			.toString()
			.padStart(2, "0")}-${todayDate
			.getDate()
			.toString()
			.padStart(2, "0")}`;
		setRecordData((prevData) => ({
			...prevData,
			fillDate: today,
		}));
	}, []);
	return (
		<form onSubmit={handleSubmit} className="fuel-form">
			{/* Input fields for fuel record details */}
			<div className="avgCard-outer-container">
				<div className="fuel-form-inner">
					<input
						type="number"
						name="quantity"
						value={recordData.quantity}
						onChange={handleChange}
						placeholder="Quantity (L)"
						required
					/>
					<input
						type="number"
						name="amount"
						value={recordData.amount}
						onChange={handleChange}
						placeholder="Amount (Rs)"
					/>

					<input
						type="number"
						name="odometerReading"
						value={recordData.odometerReading}
						onChange={handleChange}
						placeholder="Odometer Reading (KM)"
						required
					/>
					<div>
						{/* <label>
							Fill Type: */}
						<select
							style={{ marginRight: "0.6rem" }}
							name="fillType"
							value={recordData.fillType}
							onChange={handleChange}
							required
						>
							<option value="Full Tank">Full Tank</option>
							<option value="Partial Fill">Partial Fill</option>
						</select>
						{/* </label> */}
						{/* <label>
							Payment Mode: */}
						<select
							name="paymentMode"
							value={recordData.paymentMode}
							onChange={handleChange}
							required
						>
							<option value="Credit Card">Credit Card</option>
							<option value="Debit Card">Debit Card</option>
							<option value="UPI">UPI</option>
							<option value="Cash">Cash</option>
						</select>
						<div></div>
						{/* </label> */}
					</div>
					<input
						type="date"
						name="fillDate"
						value={recordData.fillDate}
						onChange={handleChange}
						required
						style={{ width: "91.5%" }}
					/>
				</div>
			</div>
			<div style={{ margin: "1.87rem 0" }}>
				<button
					type="submit"
					className="primary-btn"
					style={{ marginRight: "1rem" }}
				>
					Submit
				</button>
				<button
					type="reset"
					className="secondary-btn"
					onClick={() => setAddRecord(false)}
				>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default FuelRecordForm;
