import React from "react";
import _ from "lodash";
import { useAliveController } from "react-activation";
import { Affix } from "antd";
import Tab from "./Tab";
import styles from "./index.less";

const height = 35;

export default function KeepAliveTabs() {
	const { getCachingNodes } = useAliveController();
	const cachingNodes = getCachingNodes();

	//tab 去个重
	const showCachingNodes = _.unionWith(cachingNodes, (val, otherVal) => {
		return val.name == otherVal.name;
	});

	return (
		<>
			{showCachingNodes && showCachingNodes.length > 0 && (
				<Affix offsetTop={1}>
					<ul
						className={styles["alive-tabs"]}
						style={{
							height,
							lineHeight: 1,
							boxShadow: "0 1px 4px rgb(0 21 41 / 4%)"
						}}
					>
						{showCachingNodes.map((node, idx) => {
							return <Tab key={idx} node={node} />;
						})}
					</ul>
				</Affix>
			)}
		</>
	);
}
