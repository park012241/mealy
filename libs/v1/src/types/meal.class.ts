export enum MealTime {
  breakfast = 'breakfast',
  lunch = 'lunch',
  dinner = 'dinner',
}

export class Meal {
  public date: Date;
  public time: MealTime;
  public menu: string[];
  public max: number;
}
