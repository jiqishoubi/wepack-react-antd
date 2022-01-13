import React from "react";
import { Avatar, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useModel } from "@/models";
import styles from "./index.less";

/**
 * @param {object} props
 * @param {*} [props.contentDOM]
 * @returns
 */
function Index(props) {
	const { contentDOM } = props;
	const { state, getLoading } = useModel();

	return (
		<div className={styles.header_wrap}>
			<div className={styles.content}>{contentDOM}</div>
			<Spin spinning={getLoading("login/getUserInfo")}>
				<div className={styles.account}>
					<Avatar icon={<UserOutlined />} />
					<div className={styles.name}>{state.login.userInfo?.userName || ""}</div>
				</div>
			</Spin>
		</div>
	);
}

export default Index;
