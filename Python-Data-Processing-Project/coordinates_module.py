#http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
#https://api.openweathermap.org/data/2.5/forecast?lat=57&lon=-2.15&cnt=3&appid={API key}
import requests
import datetime as dt
from datetime import datetime
import matplotlib.pyplot as plt

with open('api_key.txt', 'r') as file:
            API_KEY = file.read()

def get_general_weather_info_now(CITY, COUNTRY_CODE):
    try:
        BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"
        url = BASE_URL + "&q=" + CITY + "," + COUNTRY_CODE + "&appid=" + API_KEY + "&units=metric"
        response = requests.get(url).json()

        temp = response['main']['temp']
        feels_like = response['main']['feels_like']
        min_temp = response['main']['temp_min']
        max_temp = response['main']['temp_max']
        wind_speed = response['wind']['speed']
        humidity = response['main']['humidity']
        description = response['weather'][0]['description']
        sunrise_time = dt.datetime.utcfromtimestamp(response['sys']['sunrise'] + response['timezone'])
        sunset_time = dt.datetime.utcfromtimestamp(response['sys']['sunset'] + response['timezone'])

        print(f"\nTemperature in {CITY}: {temp}\u2103")
        print(f"Minimum temperature in {CITY}: {min_temp}\u2103")
        print(f"Maximum temperature in {CITY}: {max_temp}\u2103")
        print(f"Temperature in {CITY} feels like: {feels_like}\u2103")
        print(f"Humidity in {CITY}: {humidity}%")
        print(f"Wind Speed in {CITY}: {wind_speed}m/s")
        print(f"General Weather in {CITY}: {description}")
        print(f"Sun rises in {CITY} at {sunrise_time} local time.")
        print(f"Sun sets in {CITY} at {sunset_time} local time.\n")
    except KeyError as e:
        print(f"Error: Missing key in the response - {e}")
    except requests.ConnectionError:
        print("Error: Connection error. Check your internet connection.")
    except requests.RequestException as e:
        print(f"Error: Request failed - {e}")
    except Exception as e:
        print(f"Error: An unexpected error occurred - {e}")

def get_coordinate_info(CITY, COUNTRY_CODE):
    try:
        BASE_URL = "http://api.openweathermap.org/geo/1.0/direct?"
        url = BASE_URL + "appid=" + API_KEY + "&q=" + CITY + "," + COUNTRY_CODE
        response = requests.get(url).json()
        Latitude = str(round(response[0]['lat'], 2))
        Longitude = str(round(response[0]['lon'], 2))
        return Latitude, Longitude
    except KeyError as e:
        print(f"Error: Missing key in the response - {e}")
        return None, None
    except requests.ConnectionError:
        print("Error: Connection error. Check your internet connection.")
        return None, None
    except requests.RequestException as e:
        print(f"Error: Request failed - {e}")
        return None, None
    except Exception as e:
        print(f"Error: An unexpected error occurred - {e}")
        return None, None

def get_weather_forecast_info(CITY, COUNTRY_CODE):
    try:
        LATITUDE, LONGITUDE = get_coordinate_info(CITY, COUNTRY_CODE)
        if LATITUDE is None or LONGITUDE is None:
            return

        BASE_URL = "https://api.openweathermap.org/data/2.5/forecast?"
        url = BASE_URL + "lat=" + LATITUDE + "&lon=" + LONGITUDE + "&cnt=20" + "&appid=" + API_KEY + "&units=metric"
        response = requests.get(url).json()
        Forecast_time = {}

        # Iterate over the range of 0 to 19
        for num in range(20):
            timestamp = response['list'][num]['dt_txt']
            temperature = response['list'][num]['main']['temp']
            Forecast_time[timestamp] = temperature

        temperatures = list(Forecast_time.values())
        timestamps = list(Forecast_time.keys())
        average_temperature = sum(temperatures) / len(temperatures)
        max_temperature = max(temperatures)
        min_temperature = min(temperatures)
        print(f"\nThe average temperature of 3 days i.e from {timestamps[0]} to {timestamps[19]} local time is: {average_temperature:.2f}\u2103")
        print(f"The minimum temperature of 3 days i.e from {timestamps[0]} to {timestamps[19]} local time is: {min_temperature}\u2103")
        print(f"The maximum temperature of 3 days i.e from {timestamps[0]} to {timestamps[19]} local time is: {max_temperature}\u2103\n")

        date_objects = [datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S') for timestamp in timestamps]

        # Create the plot
        plt.figure(figsize=(10, 6))
        plt.plot(date_objects, temperatures, marker='o', linestyle='-', color='b')

        # Set labels and title
        plt.xlabel('Timestamp in date and hour')
        plt.ylabel('Temperature\u2103')
        plt.title('Temperature Forecast Over Time')

        # Rotate x-axis labels for better readability
        plt.xticks(rotation=45, ha='right')

        # Show the plot
        plt.tight_layout()
        plt.show()

    except KeyError as e:
        print(f"Error: Missing key in the response - {e}")
    except requests.ConnectionError:
        print("Error: Connection error. Check your internet connection.")
    except requests.RequestException as e:
        print(f"Error: Request failed - {e}")
    except Exception as e:
        print(f"Error: An unexpected error occurred - {e}")

if __name__ == '__main__':
    CITY = input("Enter the name of the city of which you want to know the info of:")
    COUNTRY_CODE = input("Enter its country code:")
    while True:
        try:
            x = int(input("Enter the number of option you want to execute:\n1. Get general weather info at current time\n2. Get weather forecast of 3 days\n3. Exit\n"))
            if x == 1:
                get_general_weather_info_now(CITY, COUNTRY_CODE)
            elif x == 2:
                get_weather_forecast_info(CITY, COUNTRY_CODE)
            elif x == 3:
                exit()
            else:
                print("Error!! Enter a valid number.")
        except KeyboardInterrupt:
            print("\nProgram interrupted by user.")
            exit()

        
              
#get_weather_forecast_info('Kathmandu','np')
#get_general_weather_info_now('Kathmandu','np')