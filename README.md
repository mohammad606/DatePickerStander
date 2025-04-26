
# REX Date Picker

This package is the Community plan edition of the Date Picker components. It's part of Rex, an open-core extension of our Core libraries, with advanced components.





## Installation

Install the package in your project directory with:

```bash
npm i craft-rex-date-picker-stander
```


Then install the date library of your choice (if not already installed). The pickers currently support the following date libraries:

- [date-fns](https://date-fns.org/)
- [Day.js](https://day.js.org/)
- [Luxon](https://moment.github.io/luxon/#/)
- [Moment.js](https://momentjs.com/)

```bash
# date-fns
npm install date-fns

# or dayjs
npm install dayjs

# or luxon
npm install luxon

# or moment
npm install moment
```


## Usage/Examples

```javascript
import  RexDatePickerStander  from 'craft-rex-date-picker-stander';

function App() {
  return <RexDatePickerStander />
}
```


## License

[Digital Craft]('')

## Props

| Prop             |defaultValue                        | Types
| ----------------- | ----------------------------------|-------------------------------- |
| width | 250px | string
| px | 10px | string
| py | 4px |string
| bgColor | #101316 | string
| bgDate |  | string
| fontSize | 16px | string
| borderWidth | 1px |string
| borderStyle | solid | string
| borderColor | #ffff | string
| svgSize | 20px | string
| svgColor | #ffff |string
| bgSelectDate | #2e2e2e | string
| fontColor | #ffff | string
| defaultDate |  | string
| getDateChange |  | (date: string) => void
| nameFormHook |  |string
| setValueFormHook |  |  name: TFieldName, value: TValue,options?: { shouldValidate?: boolean;   shouldDirty?: boolean; shouldTouch?: boolean;    }
| shouldDisableDate | () => false | (date: PickerValidDate) => boolean