function numberToMonth(monthNumber)
{
    if(monthNumber == 1)
    {
        return 'Jan';
    }
    if(monthNumber == 2)
    {
        return 'Shkurt';
    }
    if(monthNumber == 3)
    {
        return 'Mars';
    }
    if(monthNumber == 4)
    {
        return 'Prill';
    }
    if(monthNumber == 5)
    {
        return 'Maj';
    }
    if(monthNumber == 6)
    {
        return 'Qer';
    }
    if(monthNumber == 7)
    {
        return 'Korrik';
    }
    if(monthNumber == 8)
    {
        return 'Gusht';
    }
    if(monthNumber == 9)
    {
        return 'Shtat';
    }
    if(monthNumber == 10)
    {
        return 'Tetor';
    }
    if(monthNumber == 11)
    {
        return 'Nent';
    }
    if(monthNumber == 12)
    {
        return 'Dhjetor';
    }
 
}
function format_dates(date){
    if(date)
    return date.substr(8,2) + '-' + numberToMonth(parseInt(date.substr(5,2))) + '-' + date.substr(0, 4)
}


module.exports = format_dates;