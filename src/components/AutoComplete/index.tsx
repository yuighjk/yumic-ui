
import classnames from "classnames";
import { useState, useRef, useEffect } from 'react';
import { useOnClickOutside } from "usehooks-ts";  //点击空白区域监听事件
import Transition from "../Transition";
import "./style.scss";
// 更加通用，不仅有这两个属性，还有一些其他的属性
type LabelOptions = string | { label: string; value: string;[key: string]: any };
type FilterType = (inputValue: string, option: LabelOptions) => boolean;

interface IAutoCompleteProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSelect'> {
    className?: string;
    options?: Array<LabelOptions>;
    autoFocus?: boolean;
    defaultValue?: string;
    disabled?: boolean;
    render?: (option: LabelOptions) => React.ReactNode;
    filterOptions?: FilterType;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect?: (item: LabelOptions) => void;
    onFocus?: () => void;
}

const AutoComplete: React.FunctionComponent<IAutoCompleteProps> = (props) => {
    const {
        disabled,
        filterOptions,
        options,
        onChange,
        onSelect,
        onFocus,
        className: cls,
        render,
        autoFocus,
        ...restProps
    } = props;

    const ref = useRef(null);
    const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

    const [value, setValue] = useState(props.defaultValue || '');
    const [index, setIndex] = useState(-1);   //定义用户选择的索引值

    const [isOpen, setOpen] = useState(false);  //定义打开列表

    const [result, setResults] = useState([] as Array<LabelOptions>);
    const classes = classnames('auto-complete', cls, {
        disabled: disabled,

    })
    const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setValue(value)
        if (!value) {
            setIndex(-1);
            setResults([]);
            return;
        }

        // 回调用户自定义的onChange
        onChange && onChange(e);
        if (typeof filterOptions === 'function') {
            // 2.filterOptions->用户自定义筛选
            if (props.options) {
                const arr = [] as Array<LabelOptions>;
                props.options.forEach(item => {
                    if (filterOptions(value, item)) {
                        arr.push(item);
                    }
                    setResults(arr)
                })
            }
        } else {
            // 1.LabelOptions ->string | []

            if (props.options && props.options[0] && typeof props.options[0] === 'string') {
                const arr = props.options as string[]
                const result = arr.filter(item => item.indexOf(value) !== -1)
                setResults(result)
            } else {
                const arr = props.options as Array<{
                    label: string;
                    value: string;
                    [key: string]: any;
                }>
                const result = arr.filter(item => item.label.indexOf(value) !== -1)
                setResults(result)
            }

        }
    }

    const renderNodes = (item: LabelOptions) => {
        // 用户自定义的render方法
        if (typeof render === 'function') {
            return render(item)
        } else {
            return typeof item === 'string' ? item : item.label;
        }
    }

    const handleSelect = (item: LabelOptions) => {
        // 清空提示结果
        setResults([]);
        setIndex(-1);
        typeof item === 'string' ? setValue(item) : setValue(item.label);
        onSelect && onSelect(item);
    }

    const onkeyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === 'ArrowDown') {
            if (index < result.length - 1) {
                setIndex(index + 1)
            }
        }
        if (e.key === 'ArrowUp') {
            if (index > 0) {
                setIndex(index - 1)
            }
        }
        if (e.key === 'Enter') {
            if (index !== -1 && result.length > 0) {
                handleSelect(result[index]);
            }
        }
    };

    const handleClickOutside = () => {
        // setResults([]);
        setOpen(false)
        setIndex(-1);
    }
    useOnClickOutside(ref, handleClickOutside);

    useEffect(() => {
        if (props.autoFocus) {
            inputRef.current && inputRef.current.focus();
        }
    })

    const onFocusHandle = () => {
        setOpen(true)
        onFocus && onFocus();

    }

    return <div className={classes} ref={ref}>
        <input
            ref={inputRef}
            disabled={disabled}
            {...restProps}
            value={value}
            onChange={onChangeHandle}
            onFocus={onFocusHandle}
            onKeyDown={onkeyDownHandle}
        />
        {
            result.length > 0 && isOpen && (
                <ul className={"auto-complete-lists"}>
                    {
                        result.map((item, i) => {
                            return <li
                                className={classnames("auto-complete-item", (index === i) && "active")}
                                key={i}
                                onClick={() => handleSelect(item)}
                                role='presentation'
                            >{renderNodes(item)}
                            </li>
                        })
                    }
                </ul>
            )
        }
    </div>;
};

export default AutoComplete;
