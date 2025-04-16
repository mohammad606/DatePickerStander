# 🎨 Craft Selector - Advanced React Select Component

![Component Demo](https://via.placeholder.com/800x400?text=Craft+Selector+Demo) <!-- Replace with actual screenshot -->

A feature-rich React select component with search, multi-select, infinite loading, and React Hook Form integration.

## 📦 Installation

```bash
npm install craft-selector
# or
yarn add craft-selector


## Usage
```jsx
import Selector from 'craft-selector';

function App() {
  const countries = [
    { id: 1, name: "Saudi Arabia", nativeName: "المملكة العربية السعودية" },
    { id: 2, name: "Egypt", nativeName: "مصر" }
  ];

  return (
    <Selector
      array={countries}
      KeyShowFn={(item) => item.nativeName}
      getValue={(item) => item.id}
      value="id"
    />
  );
}
```



### Props
🏷️ Core Functionality
Prop	Type	Default	Description
value	string	required	Key for value field in objects
KeyShowFn	(item) => string	item => item	Function to determine display text
getValue	(item) => any	required	Function to extract value
array	any[]	undefined	Local data array
defaultValues	any[]	[]	Pre-selected values
🔄 API Integration
Prop	Type	Default	Description
apiFn	(page, search) => Promise	undefined	Async data fetcher
apiUrl	string	undefined	API endpoint URL
🎚️ Behavior Control
Prop	Type	Default	Description
multiSelect	boolean	false	Enable multi-selection
search	boolean	false	Enable search functionality
closeOnSelect	boolean	true	Close dropdown after selection
label	string	"Select ..."	Default label text
🎨 Styling Props
Prop	Type	Default	Description
labelColor	string	"#000"	Label text color
selectorColor	string	"#000"	Main border/arrow color
borderWidth	string	"2px"	Border thickness
borderStyle	string	"solid"	Border style
borderRadius	string	"10px"	Main container radius
px	string	"10px"	Horizontal padding
py	string	"12px"	Vertical padding
searchColor	string	"#000"	Search text color
optionsSize	string	"50px"	Option item height
selectedColor	string	"#a2e1e1"	Selected item background
selectedColorArray	string	"#92e0f9"	Multi-selected items background
containerOptionsRadius	string	"5px"	Dropdown radius
ColorHovered	string	"#f0f0f0"	Hover state color
optionsTextColor	string	"#000"	Options text color
🧩 Form Integration
Prop	Type	Default	Description
nameFormHook	string	undefined	React Hook Form field name
setValueFormHook	function	undefined	RHF setValue function