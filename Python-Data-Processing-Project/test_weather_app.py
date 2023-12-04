import unittest
from unittest.mock import patch, call
from io import StringIO

# Functions imported
from coordinates_module import get_general_weather_info_now, get_coordinate_info, get_weather_forecast_info

class TestWeatherFunctions(unittest.TestCase):

    @patch('builtins.input', side_effect=['London', 'GB'])
    def test_get_general_weather_info_now(self, mock_input):
        # Capture the print statements
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            get_general_weather_info_now('London', 'GB')
            output = mock_stdout.getvalue()

        # Assertions
        self.assertIn('Temperature in London:', output)
        self.assertIn('Humidity in London:', output)

    @patch('builtins.input', side_effect=['London', 'GB'])
    def test_get_coordinate_info(self, mock_input):
        latitude, longitude = get_coordinate_info('London', 'GB')
        self.assertIsInstance(latitude, str)
        self.assertIsInstance(longitude, str)
    
if __name__ == '__main__':
    unittest.main()
