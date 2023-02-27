import styles from "./Footer.module.scss";

interface IFooterProps {}

function Footer(props: IFooterProps) {
	return (
		<div className={styles.footer}>
			<a href="https://github.com/radoslavvv/typeR" target="_blank">
				{"</> GitHub"}
			</a>
		</div>
	);
}

export default Footer;
