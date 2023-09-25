
-- Ejemplos de las preguntas --
* Toca con el dedo a todas las personas de la foto que sean chicos, niños u hombres (coge de la foto a todos los masculinos y mira sus posiciones, si le da a algunas ya va bien)
* Toca con el dedo a todas las personas de la foto que sean chicas, niñas o mujeres (coge de la foto a todos los femeninos y mira sus posiciones, si le da a algunas ya va bien)
* Toca con el dedo a (tu hijo Carlos, tu sobrina Marina, tu nieto Juan, tu nuera Sabrina, etc)


Se tendrán 2 arrays.
Uno tendrá los indices etiquetados y guardará en cada uno una base de pregunta para responder algo, por ejemplo el 0 será nombre, el 1 será ropa, el 2 será gafas de sol, etc.

El otro array tendrá info de la persona y su posición en la foto, tendrá las mismas etiquetas en los índices que el anterior.


Ejemplo de los índices: 
0 = nombre
1 = ropa
2 = ojos
3 = pelo
...

Ejemplo de los 2 arrays y sus diferentes contenidos:
modelo pregunta etiquetado          informacion de persona y posición
0 = pregunta nombre                 0 = Valeria
1 = pregunta ropa                   1 = blanco
2 = pregunta ojos                   2 = marron
etc.

De este modo tendrá siempre 'num. de personas en la foto + 1' arrays y no crecerá más porque tendrá el array con las preguntas y uno por cada persona con su información.

Cogerá un número random del array que tenga la info de la persona y su posición en la foto y obtendrá un atributo, por ejemplo 'marrón', sabiendo que esa posición del array el marrón corresponde a color de ojos (indice ojos). 
Mirará la pregunta que corresponde a ojos en el array de modelos de preguntas de tal forma que concatenará las 2 de esta manera:

'Toca con el dedo a las personas de la foto que tengan los ojos de color' + 'marrón'

Lo hará una vez con cada persona y así tendremos preguntas aleatorias de cada persona para cada foto y las fotos tendrán tantas preguntas como personas en la foto.

Si saca preguntas sobre ojos no repetirá preguntas sobre ojos en la misma foto. Si pregunta sobre un campo no repetirá en la misma foto preguntas sobre ese mismo campo (tal vez con un campo de True o False en el array de las preguntas, para saber si ya se ha tocado ese campo en la foto o no).
Cuando formulamos una pregunta nos guardamos las coordenadas de la posición de esta persona (para ver si el senior toca en el lugar correcto de la pantalla para responderla).



Setngo que hacer el set del indice de people y el set del indice de person.
Entonces haré que al hacer click no pasará a la siguiente foto sin que el indice de person sea igual que people[lo que sea]