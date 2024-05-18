import React from "react";

const LastTransaction = ({ fillDate, paymentMode, quantity }) => {
	return (
		<div className="card">
			<div className="left-card">
				<div className="date">{fillDate}</div>
				<div className="mode">{paymentMode}</div>
			</div>
			<div className="right-card">{quantity} L</div>
		</div>
	);
};

export default LastTransaction;
