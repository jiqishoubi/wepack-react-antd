//十六进制颜色值的正则表达式
const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

/*16进制颜色转为RGB格式*/
/**
 *
 * @param {string} color
 * @param {number} [a]
 */
export const colorRgb = function (color, a) {
	let sColor = color.toLowerCase();
	if (sColor && reg.test(sColor)) {
		if (sColor.length === 4) {
			let sColorNew = "#";
			for (let i = 1; i < 4; i += 1) {
				sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
			}
			sColor = sColorNew;
		}
		//处理六位的颜色值
		let sColorChange = [];

		for (let i = 1; i < 7; i += 2) {
			sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
		}
		// return "rgb(" + sColorChange.join(",") + ")";
		//或
		return "rgba(" + sColorChange.join(",") + "," + (a ? Number(a) : 1) + ")";
	} else {
		return sColor;
	}
};
