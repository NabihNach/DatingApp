using Microsoft.AspNetCore.Http;
using System;

namespace DatingApp.API.Helpers{
    public static class Extensions{
        public static void AddApplicationError(this HttpResponse response, string message){
            response.Headers.Append("Application-Error", message);
            response.Headers.Append("Access-Control-Expose-Headers","Application-Error");
            response.Headers.Append("Access-Control-Allow-Origin","*");
        }

        public static int CalculateAge(this DateTime theDateTime){
            var age = DateTime.Today.Year - theDateTime.Year;
            if(theDateTime.AddYears(age)>DateTime.Today)
                    age--;
            return age;
        }
    }
}