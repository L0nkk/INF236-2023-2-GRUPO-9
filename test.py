import unittest
import requests
import json

class test(unittest.TestCase):
    datos_hora = None
    
    @classmethod
    def setUpClass(cls):
        cls.records = "http://localhost:5050/record"
        cls.pacientes = "http://localhost:5050/pacientes"
        cls.datos_hora_bien = {
            "rut":"12345678-G",
            "fecha":"2022-11-27",
            "hora":"[11:00]",
            "med":"Sanchez",
            "obs":"Esta mal",
            "name":"Franco brito",
            "tipo":"laboratorio"
        }
        cls.datos_hora_sin_fecha = {
            "rut":"12345678-M",
            "hora":"[11:00]",
            "med":"Sanchez",
            "obs":"Esta mal",
            "name":"Franco brito",
            "tipo":"laboratorio"
        }

    @classmethod
    def tearDownClass(cls):
        response = requests.get(cls.records + '/12345678-G')
        id = json.loads(response.content)["_id"]
        requests.delete(cls.records + '/' + id)
        
        response = requests.get(cls.records + '/12345678-M')
        id = json.loads(response.content)["_id"]
        requests.delete(cls.records + '/' + id)
        
        del cls.datos_hora_bien
        del cls.datos_hora_sin_fecha
    
    def test_registrar_hora_correcta(self):
        response = requests.post(self.records, json=self.datos_hora_bien)
        self.assertEqual(204, response.status_code)
    
    def test_registrar_hora_incorrecta(self):
        response = requests.post(self.records, json=self.datos_hora_sin_fecha)
        self.assertNotEqual(204, response.status_code)

if __name__ == '__main__':
    unittest.main()