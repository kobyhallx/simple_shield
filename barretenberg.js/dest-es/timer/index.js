export class Timer {
    constructor() {
        this.start = new Date().getTime();
    }
    ms() {
        return new Date().getTime() - this.start;
    }
    s() {
        return (new Date().getTime() - this.start) / 1000;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGltZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLEtBQUs7SUFHaEI7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVNLEVBQUU7UUFDUCxPQUFPLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUMzQyxDQUFDO0lBRU0sQ0FBQztRQUNOLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDcEQsQ0FBQztDQUNGIn0=