import React from "react";

const AddNewRecord = ({ callFunction, text }) => {
	return (
		<div style={{ margin: "2rem 0" }}>
			<div className="primary-btn" onClick={() => callFunction(true)}>
				{text}
			</div>
		</div>
	);
};

export default AddNewRecord;
