const Mod_n_addition = (n: number, m: number, mod: number) => {
  return (mod % m) + (mod % n);
};

const args = [10, 8];

const a = Mod_n_addition(args[0], args[1], 12);
a;

type Weekday =
  | 'Sunday'   | 'Monday' | 'Tuesday'  | 'Wednesday'
  | 'Thursday' | 'Friday' | 'Saturday';

const WhichDay = (currentDay: Weekday, days: number) => {
  const weekdays = [
    'Sunday'   , 'Monday' , 'Tuesday'  , 'Wednesday',
    'Thursday' , 'Friday' , 'Saturday' ,
  ];
  const L = 7;
  let DayIndex = 0;
  switch (currentDay) {
    case 'Monday'    :  DayIndex = 1;  break;
    case 'Tuesday'   :  DayIndex = 2;  break;
    case 'Wednesday' :  DayIndex = 3;  break;
    case 'Thursday'  :  DayIndex = 4;  break;
    case 'Friday'    :  DayIndex = 5;  break;
    case 'Saturday'  :  DayIndex = 6;  break;
		default          :  throw new Error("Unrecognized weekday.");
  }
  const sum = DayIndex + days;
  const index = sum % L;
  return weekdays[index];
};

const r = WhichDay('Tuesday', 17);
r;
