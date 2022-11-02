# Component Structure
## Connections
 - DayList/DayListItem

 ## Components
  
  ```javascript
  - DayListItem: {
    props: {
      key: integer,
      name: string,
      spots: integer,
      selected: bool,
      setDay: Function,
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
