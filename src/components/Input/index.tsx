import { type } from "os";
import { useState, useRef } from "react";
import classnames from "classnames";
import { useHover } from 'usehooks-ts'
import "./style.scss";
import Icon from '../Icon'

type InputSize = 'large' | 'default' | 'small';

interface IInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
    defaultValue?: string;
    disabled?: boolean;
    size?: InputSize;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    allowClear?: boolean;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear?: () => void;
}

const Input: React.FunctionComponent<IInputProps> = (props) => {
    const { disabled, size, prefix, suffix, addonBefore, addonAfter, allowClear, className: cls, onChange, onClear, ...restProps } = props;
    const [value, setValue] = useState(props.defaultValue || '');

    const hoverRef = useRef(null)
    const isHover = useHover(hoverRef)

    const classes = classnames('input', cls, {
        disabled: disabled,
        [`input-${size}`]: size,
        'allow-clear': allowClear,
        'input-before': addonBefore,
        'input-after': addonAfter
    })
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value.trim());
        onChange && onChange(e)
    }
    const handleClear = () => {
        setValue('')
        onClear && onClear();
    }
    return (
        <div className={classes}>
            {addonBefore && <div className="addon before">{addonBefore}</div>}
            <div className="input-wrapper">
                {prefix && <span className="prefix">{prefix}</span>}
                <input
                    disabled={disabled}
                    value={value}
                    onChange={handleOnChange}
                    {...restProps}
                />
                {allowClear && (
                    <span className="icons" ref={hoverRef} onClick={handleClear}>{value.trim().length > 0 &&
                        (<Icon type="bs" icon="BsXCircleFill" size={12} color={isHover ? '#ddd' : '#eee'}></Icon>)
                    }</span>
                )}
                {suffix && <span className="suffix">{suffix}</span>}
            </div>

            {addonAfter && <div className="addon after">{addonAfter}</div>}
        </div>
    );
};
Input.defaultProps = {
    size: 'default'
}
export default Input;

