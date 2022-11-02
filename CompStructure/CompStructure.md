# Component Structure
## Components List
  - Button
  - DayList
  - DayListItem

### Application
 - State: day
 - Props: NONE
 - Used By: NO ONE

### Button
  - State: NO STATE
  - Props: confirm(boolean), danger, onClick(func), disabled(bool)
  - Used by: EVERYONE
  
### DayListItem
 - State:
 - Props: key(int), name(string), spots(int), selected(bool), setDay(func) 
 - Used By: DayList
 
### DayList
  - State:
  - Props: days (array of objects with id, name, and spots keys), day(str), setDay(func)
  - Used By: Application