import React, { useEffect } from "react";
import { KeepAlive, useActivate, useUnactivate } from "umi";
import defaultSettings from "../../../../config/defaultSettings";

const Index = (props) => {
	// useEffect(() => {}, []);

	// useActivate(() => {});

	// useUnactivate(() => {});

	if (defaultSettings.isTabs) {
		return (
			<KeepAlive
				key={props.route.path}
				saveScrollPosition={props.route.saveScrollPosition ?? "screen"}
				//路径
				name={props.route.path}
				tabName={props.route.name}
			>
				<div style={{ marginTop: 54 }}>{props.children}</div>
			</KeepAlive>
		);
	}
	return props.children;
};

export default Index;
