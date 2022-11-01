# Component Structure
## Connections
 - DayList/DayListItem

 ## Components
  
  ```javascript
  - DayListItem: {
    props: {
      name: string,
      spots: integer,
      selected: bool,
    }

    state: {}
  }

  - DayList: {
    props: {
      days: [
        {
          id: integer,
          name: string,
          spots: integer
        }
      ]
      day: string,
      setDay: Function,
    },

    state: {}
  }
  ```
