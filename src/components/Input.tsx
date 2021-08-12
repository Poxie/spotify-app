import { useEffect, useMemo, useState } from "react"
import './Input.scss'
import { InputExamples } from "./InputExamples";

interface Props {
    placeholder?: string;
    onSubmit?: (value: string) => void;
    onChange?: (value: string) => void;
    disabled?: boolean;
    defaultValue?: string;
    replaceString?: [string, string];
    noCaps?: boolean;
    noSubmit?: boolean;
    examples?: string[];
    rounded?: boolean;
    onBlur?: () => void;
    onFocus?: () => void;
    id: string;
    label: string;
}

export const Input: React.FC<Props> = ({ placeholder, onSubmit, onChange, disabled, defaultValue, replaceString, noCaps, examples, rounded, noSubmit, onBlur, onFocus, label, id }) => {
    const [value, setValue] = useState(defaultValue || '');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!value || noSubmit) return;
        if(onSubmit) onSubmit(value);
        setValue('');
    };

    const handleChange = useMemo(() => (value: string) => {
        let tempValue = value;
        if(replaceString) tempValue = tempValue.replaceAll(replaceString[0], replaceString[1]);
        if(noCaps) tempValue = tempValue.toLowerCase();
        if(onChange) onChange(tempValue);
        setValue(tempValue);
    }, []);

    const handleBlur = useMemo(() => () => {
        if(!onBlur) return;
        onBlur();
    }, []);
    const handleFocus = useMemo(() => () => {
        if(!onFocus) return;
        onFocus();
    }, []);

    return(
        <form className="input" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={(e) => handleChange(e.target.value)}
                className={rounded ? 'rounded' : ''}
                onBlur={handleBlur}
                onFocus={handleFocus}
                id={id}
            />
            <label htmlFor={id} style={{position: 'absolute', opacity: 0, pointerEvents: 'none'}}>
                {label}
            </label>
            {examples && value === '' && (
                <InputExamples 
                    examples={examples}
                />
            )}
        </form>
    )
}