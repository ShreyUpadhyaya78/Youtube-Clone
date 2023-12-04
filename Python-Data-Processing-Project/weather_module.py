"""Weather Info App

This script allows the user to get the general weather info
or forecast of upto 3 days of any major city_name that the user
knows about i.e the input to this script is the name of
city_name:city_name and its corresponding country code:country_code.
This script also has a feature to visualize the forecast
temperatures in a graph with date on x-axis and temperature on y-axis.
To get the weather info, an API of openweathermap is used.

This file can also be imported as a module and contains the following
functions:

    * get_general_weather_info_now - returns the general weather info
    of the input city_name and country code
    * get_coordinate_info - returns the longitude and latitude of the
    input city_name and country code
    * get_weather_forecast_info - returns the 3 days forecast
    temperature info with a graph visualization
"""

#import required modules
import sys
import datetime as dt
from datetime import datetime
import requests
import matplotlib.pyplot as plt
#read the api_key.txt and close after work
with open('api_key.txt', 'r',encoding='utf-8') as file:
    api_key = file.read()

def get_general_weather_info_now(city_name, country_code):
    """Gets the city_name, countrycode and prints the general weather info

    Args:
        city_name (str): name of the input city_name
        country_code (str): country code of the input city_name
    """
    try:
        #url to access openweathermap free API data
        base_url = "http://api.openweathermap.org/data/2.5/weather?"
        url = base_url + "&q=" + city_name + "," + country_code + "&appid=" + api_key + "&units=metric"
        #get data in json format
        response = requests.get(url).json()
        #assign data to variables
        temp = response['main']['temp']
        feels_like = response['main']['feels_like']
        min_temp = response['main']['temp_min']
        max_temp = response['main']['temp_max']
        wind_speed = response['wind']['speed']
        humidity = response['main']['humidity']
        description = response['weather'][0]['description']
        #convert raw timestamp to utc datetime
        sunrise_time = dt.datetime.utcfromtimestamp(
            response['sys']['sunrise'] + response['timezone'])
        sunset_time = dt.datetime.utcfromtimestamp(
            response['sys']['sunset'] + response['timezone'])
        #print the results
        print(f"\nTemperature in {city_name}: {temp}\u2103")
        print(f"Minimum temperature in {city_name}: {min_temp}\u2103")
        print(f"Maximum temperature in {city_name}: {max_temp}\u2103")
        print(f"Temperature in {city_name} feels like: {feels_like}\u2103")
        print(f"Humidity in {city_name}: {humidity}%")
        print(f"Wind Speed in {city_name}: {wind_speed}m/s")
        print(f"General Weather in {city_name}: {description}")
        print(f"Sun rises in {city_name} at {sunrise_time} local time.")
        print(f"Sun sets in {city_name} at {sunset_time} local time.\n")
    except KeyError as error_name:
        print(f"Error: Missing key in the response - {error_name}")
    except requests.HTTPError as error_name:
        print(f"Error: An HTTP Error Occurred-{error_name}")
    except requests.ConnectionError:
        print("Error: Connection error. Check your internet connection.")
    except requests.RequestException as error_name:
        print(f"Error: Request failed - {error_name}")
    except Exception as error_name:
        print(f"Error: An unexpected error occurred - {error_name}")

def get_coordinate_info(city_name, country_code):
    """Gets the city_name, countrycode and returns corresponding longitude and latitude of the city_name

    Args:
        city_name (str): name of the input city_name
        country_code (str): country code of the input city_name

    Returns:
        float: longitude and latitude in float format rounded upto 2 decimal places
    """
    try:
        #url to access free API
        base_url = "http://api.openweathermap.org/geo/1.0/direct?"
        url = base_url + "appid=" + api_key + "&q=" + city_name + "," + country_code
        response = requests.get(url).json()
        #get the latitutde and longitude value from json data
        latitude_value = round(response[0]['lat'], 2)
        longitude_value = round(response[0]['lon'], 2)
        return latitude_value, longitude_value
    except KeyError as error_name:
        print(f"Error: Missing key in the response - {error_name}")
        return None, None
    except requests.HTTPError as error_name:
        print(f"Error: An HTTP Error Occurred-{error_name}")
    except requests.ConnectionError:
        print("Error: Connection error. Check your internet connection.")
        return None, None
    except requests.RequestException as error_name:
        print(f"Error: Request failed - {error_name}")
        return None, None
    except Exception as error_name:
        print(f"Error: An unexpected error occurred - {error_name}")
        return None, None

def get_weather_forecast_info(city_name, country_code):
    """Gets the city_name, countrycode and prints the temperature of 3 days with a graph visualization

    Args:
        city_name (str): name of the input city_name
        country_code (str): country code of the input city_name
    """
    try:
        #get latitude and longitude value from function get_coordinate_info
        latitude_value, longitude_value = str(get_coordinate_info(city_name, country_code))
        if latitude_value is None or longitude_value is None:
            return
        #url to get forecast data of 3 days from free API
        base_url = "https://api.openweathermap.org/data/2.5/forecast?"
        url = base_url + "lat=" + latitude_value + "&lon=" + longitude_value + "&cnt=20" + "&appid=" + api_key + "&units=metric"
        response = requests.get(url).json()
        forecast_time = {}
        # Iterate over the range of 0 to 19 because timestamp limit is 20 for free API
        # therefore cnt=20 in above url
        for num in range(20):
            timestamp = response['list'][num]['dt_txt']
            temperature = response['list'][num]['main']['temp']
            forecast_time[timestamp] = temperature
        #get temperature and datetime in list format from json data
        temperatures = list(forecast_time.values())
        timestamps = list(forecast_time.keys())
        #basic arithmetic operation on temperature forecasts
        average_temperature = sum(temperatures) / len(temperatures)
        max_temperature = max(temperatures)
        min_temperature = min(temperatures)
        #print the forecast json data
        print(forecast_time)
        #print the organized temperature data
        print(f"\nThe average temperature of 3 days i.e from {timestamps[0]} to {timestamps[19]} local time is: {average_temperature:.2f}\u2103")
        print(f"The minimum temperature of 3 days i.e from {timestamps[0]} to {timestamps[19]} local time is: {min_temperature}\u2103")
        print(f"The maximum temperature of 3 days i.e from {timestamps[0]} to {timestamps[19]} local time is: {max_temperature}\u2103\n")
        #data visualization section
        #Strip the date from timestamp to better fit the horizontal labels
        date_objects = [datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S') for timestamp in timestamps]
        plt.figure(figsize=(10, 6))
        plt.plot(date_objects, temperatures, marker='o', linestyle='-', color='b')
        plt.xlabel('Timestamp in date and hour')
        plt.ylabel('Temperature\u2103')
        plt.title('Temperature Forecast Over Time')
        plt.xticks(rotation=45, ha='right')
        plt.tight_layout()
        plt.show()
    except KeyError as error_name:
        print(f"Error: Missing key in the response - {error_name}")
    except requests.HTTPError as error_name:
        print(f"Error: An HTTP Error Occurred-{error_name}")
    except requests.ConnectionError:
        print("Error: Connection error. Check your internet connection.")
    except requests.RequestException as error_name:
        print(f"Error: Request failed - {error_name}")
    except Exception as error_name:
        print(f"Error: An unexpected error occurred - {error_name}")

def main():
    """Takes user's input in city name, country code and option number 
    and prints the required output
    """
    city_name = input("Enter the name of the city of which you want to know the info of:")
    country_code = input("Enter its country code:")
    while True:
        try:
            option_input = int(input(
                "Enter the number of option you want to execute:\n1. Get general weather info at current time\n2. Get weather forecast of 3 days\n3. Exit\n"))
            if option_input == 1:
                get_general_weather_info_now(city_name, country_code)
            elif option_input == 2:
                get_weather_forecast_info(city_name, country_code)
            elif option_input == 3:
                sys.exit()
            else:
                print("Error!! Enter a valid number.")
        except KeyboardInterrupt:
            print("\nProgram interrupted by user.")
            sys.exit()
if __name__ == '__main__':
    main()
