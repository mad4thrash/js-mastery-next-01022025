import { HexColorPicker, HexColorInput } from "react-colorful";

type Props = {
	value?: string;
	onPickerChange: (color: string) => void;
};

const ColorPicker = ({ value, onPickerChange }: Props) => {
	return (
		<div className="relative">
			<HexColorPicker color={value} onChange={onPickerChange} />
			<div className="flex items-center mt-2">
				<p>#</p>
				<HexColorInput
					color={value}
					onChange={onPickerChange}
					className="hex-input"
				/>
			</div>
		</div>
	);
};

export default ColorPicker;
