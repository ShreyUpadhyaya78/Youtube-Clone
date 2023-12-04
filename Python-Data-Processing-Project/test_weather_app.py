"""Unit test to check whether the return form get_coordinate_info is float or not
"""
import unittest
from weather_module import get_coordinate_info

class TestFloatCheck(unittest.TestCase):
    def test_float_variable(self):
        #Get result from the function call
        latitude,longitude = get_coordinate_info('Kathmandu','np')
        #Check the type and assert the result
        expected_type='<class \'float\'>'
        received_type_latitude=str(type(latitude))
        received_type_longitude=str(type(longitude))
        #Checks between received and expected type
        self.assertEquals(received_type_latitude,expected_type)
        self.assertEquals(received_type_longitude,expected_type)

if __name__ == '__main__':
    unittest.main()
