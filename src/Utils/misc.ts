export function capitalizeFirstLetter(inputString: string) : string {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

/*1 - ok
2 - user with such phone already registered
3 - unknown user type
4 - not found user, no user with this phone
5 - no address for user
6 - error: can not create order in past
7 - no such service, no such user
8 - No partners for this type
9 - Partner is unavailable
10 - error: not working in this day
11 - error: time_start is out from work hours
12 - error: fail to make record
13 - max of orders for time interval
14 - No aviable partners
15 - There is no such partner
16 - wrong input or lack of input parameters
17 - no such type of cleaning
18 - wrong input square
19 - no such order
20 - total price below minimal value
21 - invalid phone*/
