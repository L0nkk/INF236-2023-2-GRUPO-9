import unittest
import requests
import json
import datetime

class test(unittest.TestCase):
    datos_hora_bien = None
    datos_hora_sin_fecha = None
    
    @classmethod
    def setUpClass(cls):
        #Se setean las urls de ambos endpoints a testear
        cls.pacientes = "http://localhost:5050/pacientes"
        #y los datos que se van a utilizar para caso creacion
        cls.datos_paciente_bien = {
            "rut":"12345678-G",
            "name":"pepe",
            "createdAt": str(datetime.datetime.now())
        }
        cls.datos_paciente_sin_nombre = {
            "rut": "12345678-M",
            "createdAt":str(datetime.datetime.now())
        }

        #datos para caso busqueda
        paciente_a_buscar = {
            "rut":"12345678-B",
            "name":"Buscao",
            "createdAt": str(datetime.datetime.now())
        }
        requests.post("http://localhost:5050/pacientes", json=paciente_a_buscar)

    #metodos TearDown para cada caso
    @classmethod
    def tearDownClass(cls):

        requests.delete(cls.pacientes+"/"+cls.datos_paciente_bien["rut"])
        requests.delete(cls.pacientes+"/"+cls.datos_paciente_sin_nombre["rut"])
        requests.delete(cls.pacientes+"/12345678-B")

        del cls.datos_paciente_bien
        del cls.datos_paciente_sin_nombre
    
    def test_crear_paciente_correcto(self):
        response = requests.post(self.pacientes, json=self.datos_paciente_bien)
        self.assertEqual(204, response.status_code)

    def test_crear_pacientes_incorrecta(self):
        response = requests.post(self.pacientes, json=self.datos_paciente_sin_nombre)
        self.assertNotEqual(204, response.status_code)


    #prueba de registrar el paciente correcto. Pasa la prueba si se logra registrar el paciente de la hora bien instanciada
    def test_buscar_paciente_correcto(self):
        response = requests.get(self.pacientes + '/' + '12345678-B')
        self.assertNotEqual(response.content, b'Not found')

    #prueba de registrar el paciente incorrecto. Pasa la prueba si NO se logra registrar el paciente de la hora mal instanciada
    def test_buscar_paciente_incorrecto(self):
        response = requests.get(self.pacientes + '/' + '12345678-NOEXISTO')
        self.assertEqual(response.content, b'Not found')

if __name__ == '__main__':
    unittest.main()