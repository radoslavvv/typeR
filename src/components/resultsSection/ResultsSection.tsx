import React from "react";

interface IResultsSectionProps {}

import styles from "./ResultsSections.module.scss";

const ResultsSection = (props: IResultsSectionProps) => {
	return (
		<div className={styles.resultsSection}>
			<p>Time is up!</p>
		</div>
	);
};

export default ResultsSection;
