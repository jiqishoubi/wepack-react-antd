import React, { useState } from "react";
import { Input, Row } from "antd";
import { SafetyOutlined } from "@ant-design/icons";
import { randomStrKey } from "@/utils/utils";

/**
 *
 * @param {object} props
 * @param {object} props.value  // {v,key}
 * @param {function} props.getImgSrc  // key
 * @param {function} props.onChange
 */

const Index = (props) => {
	const { value = {} } = props;
	const {
		v
		// key
	} = value;

	const [keyStr, setKeyStr] = useState(randomStrKey());

	const onInputChange = (e) => {
		const curV = e.target.value;
		const emitValue = {
			v: curV,
			key: keyStr
		};
		if (props.onChange) props.onChange(emitValue);
	};

	const reset = () => {
		setKeyStr(randomStrKey());
	};

	return (
		<Row type="flex" align="middle">
			<Input
				placeholder="请输入验证码"
				value={v}
				onChange={onInputChange}
				prefix={<SafetyOutlined />}
				allowClear
				style={{ width: "auto", flex: "1 0 0" }}
			/>
			<img src={props.getImgSrc(keyStr)} style={{ width: "auto", height: 32, marginLeft: 10 }} onClick={reset} />
		</Row>
	);
};

export default Index;
