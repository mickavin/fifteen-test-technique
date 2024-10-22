import { to120 } from '@/utils/percent'
export function getIndicatorColorFunction(index: number, battery_level_percent: number){
    const battery_level = to120(battery_level_percent, 100)/10
    const i = index + 1
    if(i <= battery_level){
        if(i >= 10){
        return 'green'
        } else if(i >= 7 && i < 10){
            return 'yellow'
        } else if(i >= 4 && i < 7){
            return 'orange'
        } else if(i < 4){
            return 'red'
        }
    } else {
        return 'grey'
    }
}