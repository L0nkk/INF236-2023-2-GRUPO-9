import unittest
import requests
import json

class test(unittest.TestCase):
    datos_hora_bien = None
    datos_hora_sin_fecha = None
    
    @classmethod
    def setUpClass(cls):
        #Se setean las urls de ambos endpoints a testear
        cls.records = "http://localhost:5050/record"
        cls.pacientes = "http://localhost:5050/pacientes"
        #y los datos que se van a utilizar
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

    #metodos TearDown para cada caso
    @classmethod
    def tearDownClass(cls):
        response = requests.get(cls.records + '/12345678-G')
        id = json.loads(response.content)["_id"]
        requests.delete(cls.records + '/' + id)
        
        response = requests.get(cls.records + '/12345678-M')
        id = json.loads(response.content)["_id"]
        requests.delete(cls.records + '/' + id)

        response = requests.get(cls.pacientes + '/12345678-G')
        id = json.loads(response.content)["_id"]
        requests.delete(cls.pacientes + '/' + id)

        response = requests.get(cls.pacientes + '/12345678-M')
        id = json.loads(response.content)["_id"]
        requests.delete(cls.pacientes + '/' + id)

        del cls.datos_hora_bien
        del cls.datos_hora_sin_fecha
    
    #prueba de registrar la hora correcta. Pasa la prueba si se logra registrar la hora bien instanciada
    def test_registrar_hora_correcta(self):
        response = requests.post(self.records, json=self.datos_hora_bien)
        self.assertEqual(204, response.status_code)
    
    #prueba de registrar la hora incorrecta. Pasa la prueba si NO se logra registrar la hora mal instanciada
    def test_registrar_hora_incorrecta(self):
        response = requests.post(self.records, json=self.datos_hora_sin_fecha)
        self.assertNotEqual(204, response.status_code)

    #prueba de registrar el paciente correcto. Pasa la prueba si se logra registrar el paciente de la hora bien instanciada
    def test_buscar_paciente_correcto(self):
        response = requests.get(self.pacientes + '/' + '12345678-G')
        self.assertNotEqual(response.content, b'Not found')

    #prueba de registrar el paciente incorrecto. Pasa la prueba si NO se logra registrar el paciente de la hora mal instanciada
    def test_buscar_paciente_incorrecto(self):
        response = requests.get(self.pacientes + '/' + '12345678-M')
        self.assertEqual(response.content, b'Not found')

if __name__ == '__main__':
    unittest.main()