import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import dayjs from "dayjs";
import CalendarSvg from "@/components/CalendarSvg.tsx";
import ArrowIcon from "@/components/ArrowIcon";
import ArrowMonthIcon from "@/components/ArrowMonthIcon";

export interface PickerValidDateLookup {
    [key: string]: dayjs.Dayjs;
}
export type PickerValidDate = PickerValidDateLookup[keyof PickerValidDateLookup];

type SetFormValue<TValue = any> = <TFieldName extends string>(
    name: TFieldName,
    value: TValue,
    options?: {
        shouldValidate?: boolean;
        shouldDirty?: boolean;
        shouldTouch?: boolean;
    }
) => void;

interface RexDatePickerProps {
    width?: string;
    px?: string;
    py?: string;
    bgColor?: string;
    bgDate?: string;
    fontSize?: string;
    borderWidth?: string;
    borderStyle?: string;
    borderColor?: string;
    svgSize?: string;
    bgSelectDate?: string;
    svgColor?: string;
    fontColor?: string;
    defaultDate?: string;
    getDateChange?: (date: string) => void;
    nameFormHook?: string;
    setValueFormHook?: SetFormValue;
    shouldDisableDate?: (date: PickerValidDate) => boolean;
}

const years = Array.from({length: 2101 - 1900}, (_, i) => 1900 + i);
const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const RexDatePickerStander = ({
                           width = '220px',
                           px = '10px',
                           py = '4px',
                           bgColor = '#101316',
                           bgDate = '',
                           fontSize = '16px',
                           borderWidth = '1px',
                           borderStyle = 'solid',
                           borderColor = '#ffff',
                           svgSize = '20px',
                           svgColor = '#ffff',
                           bgSelectDate = '#2e2e2e',
                           fontColor = '#ffff',
                           defaultDate = '',
                           getDateChange,
                           nameFormHook,
                           setValueFormHook,
                           shouldDisableDate = () => false
                       }: RexDatePickerProps) => {
    const getInitialDate = () => {
        const date = defaultDate || dayjs().format('YYYY/MM/DD');
        const dayjsDate = dayjs(date);
        return {
            date,
            year: dayjsDate.format('YYYY'),
            month: dayjsDate.format('MMMM'),
            monthNum: String(dayjsDate.month() + 1).padStart(2, '0')
        };
    };

    const {date: initialDate, year: initialYear, month: initialMonth, monthNum: initialMonthNum} = getInitialDate();
    const [currentDate, setCurrentDate] = useState(initialDate);
    const [selectYear, setSelectYear] = useState(initialYear);
    const [selectMonth, setSelectMonth] = useState(initialMonth);
    const [selectMonthNum, setSelectMonthNum] = useState(initialMonthNum);
    const [open, setOpen] = useState(false);
    const [openYear, setOpenYear] = useState(false);
    const currentYearRef = useRef<HTMLSpanElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    const currentMonth = dayjs().format('MMMM');
    const currentYear = dayjs().format('YYYY');

    const generateCalendar = useCallback((month: string, year: string): (number | string)[][] => {
        const firstDayOfMonth = dayjs(`${year}-${month}-01`);
        const daysInMonth = firstDayOfMonth.daysInMonth();
        let calendar: (number | string)[][] = [];
        let week: (number | string)[] = Array(7).fill(' ');

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = dayjs(`${year}-${month}-${day}`);
            const dayOfWeek = currentDate.day();
            week[dayOfWeek] = day;
            if (dayOfWeek === 6 || day === daysInMonth) {
                calendar.push([...week]);
                week = Array(7).fill(' ');
            }
        }
        return calendar;
    }, []);

    const calendar = useMemo(() => generateCalendar(selectMonth, selectYear), [selectMonth, selectYear, generateCalendar]);

    useEffect(() => {
        if (currentYearRef.current && openYear) {
            currentYearRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [openYear]);

    useEffect(() => {
        if (getDateChange) {
            getDateChange(currentDate);
        }
        if (nameFormHook && setValueFormHook) {
            setValueFormHook(nameFormHook, currentDate);
        }
    }, [currentDate, getDateChange, nameFormHook, setValueFormHook]);

    const changeMonth = useCallback((direction: 'next' | 'prev') => {
        const currentMonth = dayjs(`${selectMonth} 1, ${selectYear}`);
        const newMonth = direction === 'next'
            ? currentMonth.add(1, 'month')
            : currentMonth.subtract(1, 'month');
        setSelectMonth(newMonth.format('MMMM'));
        setSelectMonthNum(String(newMonth.month() + 1).padStart(2, '0'));
        setSelectYear(newMonth.format('YYYY'));
    }, [selectMonth, selectYear]);

    const handleDateClick = useCallback((day: number) => {
        const formattedDate = `${selectYear}/${selectMonthNum}/${String(day).padStart(2, '0')}`;
        const dateObj = dayjs(formattedDate);

        if (shouldDisableDate(dateObj)) {
            return;
        }

        setCurrentDate(formattedDate);
        setOpen(false);
    }, [selectYear, selectMonthNum, shouldDisableDate]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setOpen(false);
                setOpenYear(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    return (
        <div className={'contDatePicker'} style={{
            width: `${width}`,
            padding: `${py} ${px}`,
            backgroundColor: `${bgColor}`,
            border: `${borderWidth} ${borderStyle} ${borderColor}`,
            position: 'relative'
        }}>
            <p className={'showDate'}
               style={{backgroundColor: `${bgDate}`, fontSize: `${fontSize}`, color: `${fontColor}`}}>
                {currentDate}
            </p>
            <CalendarSvg
                props={'calSvg'}
                style={{width: `${svgSize}`, height: `${svgSize}`, fill: `${svgColor}`}}
                onClick={() => setOpen(!open)}
            />
            <div
                ref={calendarRef}
                className={'contSelectDate'}
                style={{
                    display: `${open ? 'flex' : 'none'}`,
                    backgroundColor: `${bgSelectDate}`,
                    position: 'absolute',
                    zIndex: 1000
                }}
            >
                <div className={'controlDate'}>
                    <div className={'yearSelector'} style={{color: `${fontColor}`}}
                         onClick={() => setOpenYear(!openYear)}>
                        <p>{selectMonth}</p>
                        <p>{selectYear}</p>
                        <ArrowIcon style={{rotate: `${openYear ? '0deg' : "180deg"}`, fill: `${svgColor}`}}/>
                    </div>
                    <div className={'contMonthSelect'}>
                        <ArrowMonthIcon
                            style={{fill: `${svgColor}`}}
                            onClick={() => changeMonth('prev')}
                        />
                        <ArrowMonthIcon
                            style={{rotate: '180deg', fill: `${svgColor}`}}
                            onClick={() => changeMonth('next')}
                        />
                    </div>
                </div>
                <div className={'contSelectorDay'} style={{color: `${fontColor}`}}>
                    <div className={'contDay'}>
                        {days.map((day, i) => (
                            <span key={i} style={{width: '100%'}}>{day}</span>
                        ))}
                    </div>
                    {calendar.map((week, i) => (
                        <div key={i} className={'contDayNum'}>
                            {week?.map((day: any, j: number) => {
                                if (day === ' ') {
                                    return <span key={j} className={'dayNum'}>{day}</span>;
                                }

                                const dateObj = dayjs(`${selectYear}-${selectMonthNum}-${day}`);
                                const isDisabled = shouldDisableDate(dateObj);
                                const isCurrentDay = day === dayjs().date() &&
                                    selectMonth === currentMonth &&
                                    selectYear === currentYear;
                                const isSelected = `${selectYear}/${selectMonthNum}/${String(day).padStart(2, '0')}` === currentDate;

                                return (
                                    <span
                                        key={j}
                                        className={'dayNum'}
                                        style={{
                                            background: isSelected
                                                ? '#5252e5'
                                                : isCurrentDay
                                                    ? '#4CAF50'
                                                    : 'transparent',
                                            opacity: isDisabled ? 0.5 : 1,
                                            cursor: isDisabled ? 'not-allowed' : 'pointer',
                                            color: isDisabled ? '#ccc' : fontColor
                                        }}
                                        onClick={() => {
                                            if (!isDisabled) {
                                                handleDateClick(day);
                                            }
                                        }}
                                    >
                                        {day}
                                    </span>
                                );
                            })}
                        </div>
                    ))}
                    <div
                        className={'yearSelectorArray'}
                        style={{
                            backgroundColor: `${bgSelectDate}`,
                            display: `${openYear ? 'grid' : "none"}`
                        }}
                    >
                        {years.map((year, i) => {
                            const isCurrentYear = year === parseInt(currentYear);
                            const isSelectedYear = year === parseInt(selectYear);

                            return (
                                <span
                                    key={i}
                                    ref={isCurrentYear ? currentYearRef : null}
                                    onClick={() => {
                                        setSelectYear(year.toString());
                                        setOpenYear(false);
                                    }}
                                    className={'yearNum'}
                                    style={{
                                        color: `${fontColor}`,
                                        background: isSelectedYear
                                            ? "#5252e5"
                                            : isCurrentYear
                                                ? '#4CAF50'
                                                : 'transparent'
                                    }}
                                >
                                    {year}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RexDatePickerStander;