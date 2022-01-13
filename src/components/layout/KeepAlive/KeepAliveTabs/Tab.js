import React from "react";
import { useHistory } from "react-router";
import { useAliveController } from "react-activation";
import { Dropdown, Menu } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { colorRgb } from "./utils";
import theme from "../../../../../config/theme";
import styles from "./index.less";

export default function Tab({ node }) {
	const history = useHistory();
	const { location } = history;
	const { getCachingNodes, dropScope } = useAliveController();
	const cachingNodes = getCachingNodes();
	const closable = cachingNodes.length > 1;
	const currentName = node.name;

	//点击关闭
	function dropTab(e, isNeedStopPropagation) {
		if (isNeedStopPropagation) e.stopPropagation();

		// 如果关闭激活中的 KeepAlive Tab，需要先离开当前路由
		// 触发 KeepAlive unactivated 后再进行 drop
		if (location.pathname === currentName) {
			const unlisten = history.listen(() => {
				unlisten();
				setTimeout(() => {
					dropScope(currentName);
				}, 60);
			});

			// 前往排除当前 node 后的最后一个 tab
			history.push(cachingNodes.filter((item) => item.name !== currentName).pop().name);
		} else {
			dropScope(currentName);
		}
	}

	function dropOtherTab() {
		const dropScopeOther = () => {
			cachingNodes.forEach((item) => {
				if (item.name !== currentName) {
					dropScope(item.name);
				}
			});
		};

		// 如果关闭激活中的 KeepAlive Tab，需要先离开当前路由
		// 触发 KeepAlive unactivated 后再进行 drop
		if (location.pathname !== currentName) {
			const unlisten = history.listen(() => {
				unlisten();
				setTimeout(() => {
					dropScopeOther();
				}, 60);
			});
			history.push(currentName);
		} else {
			dropScopeOther();
		}
	}

	const isActive = location.pathname === node.name;

	const menu = (
		<Menu>
			{closable && (
				<Menu.Item key="closeCurrent">
					<span
						className={styles.menu_span}
						onClick={(e) => {
							dropTab(e, false);
						}}
					>
						关闭当前标签
					</span>
				</Menu.Item>
			)}
			<Menu.Item key="closeOther" disabled={cachingNodes.length <= 1}>
				<span className={styles.menu_span} onClick={dropOtherTab}>
					关闭其它标签
				</span>
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown overlay={menu} trigger={["contextMenu"]}>
			<li
				className={styles.muti_tabs_li}
				style={{
					background: isActive ? colorRgb(theme["primary-color"], 0.3) : "#fff",
					color: isActive ? "inherit" : "inherit"
				}}
				onClick={() => {
					history.push(node.name);
				}}
			>
				{node.tabName || node.name}
				{closable && (
					<CloseCircleOutlined
						className={styles["close-btn"]}
						onClick={(e) => {
							dropTab(e, true);
						}}
					/>
				)}
			</li>
		</Dropdown>
	);
}
