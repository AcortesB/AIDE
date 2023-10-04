
INSERT INTO user_aide (name, username, mail, password, type) VALUES ('John Doe', 'JD','JD@gmail.es','1234', 'tutor');
INSERT INTO user_aide (name, username, mail, password, type) VALUES ('Sarah Castello','SC','SC@gmail.es','1234','senior');
INSERT INTO user_aide (name, username, mail, password, type) VALUES ('Allan Poe','AP','AP@gmail.es','1234','senior');


INSERT INTO tutor (id) VALUES (1);


INSERT INTO senior (id, total_playing_time, hour_start_avg, hour_finish_avg, score_avg, tutor_id, sex, birth_year, birth_place, descendants_num, sons_num, daughters_num, siblings_num, brothers_num, sisters_num, partner_name, father_name, mother_name) VALUES (2,'02:30:00', '08:00:00', '10:00:00', 9, 1,'femenino', 1944,'Madrid', 4, 3, 1, 4, 2, 2,'Juan','José','Maria');
INSERT INTO senior (id, total_playing_time, hour_start_avg, hour_finish_avg, score_avg, tutor_id, sex, birth_year, birth_place, descendants_num, sons_num, daughters_num, siblings_num, brothers_num, sisters_num, partner_name, father_name, mother_name) VALUES (3,'03:10:00', '16:00:00', '18:00:00', 12, 1,'masculino', 1937,'Sevilla', 2, 2, 0, 9, 5, 4,'Carmen','Antonio','Camila');


INSERT INTO activity (name, description, demo_video, photo_file, num_answers) VALUES ('Relaciona las imágenes', 'actividad en la que se trabaja la memoria','ccc','memoria', 4);
INSERT INTO activity (name, description, demo_video, photo_file, num_answers) VALUES ('Qué símbolo era ese?', 'trabaja memoria retentiva','hhh','juegos-de-cartas', 8);
INSERT INTO activity (name, description, demo_video, photo_file, num_answers) VALUES ('Preguntas y respuestas', 'trabaja la coordinación y la atención, se trata de darle a las mariposas a medida que van volando por la pantalla del dispositivo','ppp','images', 12);
INSERT INTO activity (name, description, demo_video, photo_file, num_answers) VALUES ('¿Quien es quien?', 'esta actividad trabaja reminiscencia, coordinación y atención','ppp','arbol-genealógico', 6);
INSERT INTO activity (name, description, demo_video, photo_file, num_answers) VALUES ('UNO', 'juego de cartas de colores','ccc','images', 4);
INSERT INTO activity (name, description, demo_video, photo_file, num_answers) VALUES ('Sabes quien sale en la foto?', 'reminiscencia y wjdokqnñe','aaa','arbol-genealógico', 10);
INSERT INTO activity (name, description, demo_video, photo_file, num_answers) VALUES ('Cuenta animales', 'trabaja cálculo y atención','hhh','juegos-de-cartas', 8);
INSERT INTO activity (name, description, demo_video, photo_file, num_answers) VALUES ('Busca las diferencias', 'trabaja la atención','ppp','images', 12);


INSERT INTO customized_act (id) VALUES (3);
INSERT INTO customized_act (id) VALUES (4);


INSERT INTO generic_act (id) VALUES (1);
INSERT INTO generic_act (id) VALUES (2);
INSERT INTO generic_act (id) VALUES (5);
INSERT INTO generic_act (id) VALUES (6);
INSERT INTO generic_act (id) VALUES (7);
INSERT INTO generic_act (id) VALUES (8);


INSERT INTO report_activity (time_playing, number_of_tries, score, senior_id, activity_id, num_act_answers) VALUES ('00:30:00', 3, 6, 2, 1, 5);
INSERT INTO report_activity (time_playing, number_of_tries, score, senior_id, activity_id, num_act_answers) VALUES ('00:42:00', 5, 8, 3, 3, 5);


INSERT INTO photo (description, upload, photo_file, senior) VALUES ('Andrea y Jocabed en la piscina',1,'joca_y_yo.jpg',3);
INSERT INTO photo (description, upload, photo_file, senior) VALUES ('Maria y Andrea en Barcelona',1,'maria_y_yo.jpg',3);
INSERT INTO photo (description, upload, photo_file, senior) VALUES ('Marina, Dani y Andrea en la cocina haciendo tortitas',1,'mari_dani_y_yo.jpg',3);
INSERT INTO photo (description, upload, photo_file, senior) VALUES ('Kevin y Andrea posando en el ascensor',1,'kevin_y_yo.jpg',3);
INSERT INTO photo (description, upload, photo_file, senior) VALUES ('Dani, Marina y Andrea en Orense',1,'los_tres.jpg',3);
INSERT INTO photo (description, upload, photo_file, senior) VALUES ('Sergi y Andrea en Ribes del Freser',1,'sergi_y_yo.jpg',3);


INSERT INTO person (name, surname, sex, skin_color, eyes_color, familiar_rank, id_senior) VALUES ('Andrea','Cortés','femenino', 'blanco', 'marrón', 'nieta',3);
INSERT INTO person (name, surname, sex, skin_color, eyes_color, familiar_rank, id_senior) VALUES ('Kevin','Cortés','masculino', 'blanco', 'marrón', 'nieto',3);
INSERT INTO person (name, surname, sex, skin_color, eyes_color, familiar_rank, id_senior) VALUES ('Jocabed','García','femenino', 'blanco', 'verde', 'sobrina',3);
INSERT INTO person (name, surname, sex, skin_color, eyes_color, familiar_rank, id_senior) VALUES ('Maria','Estévez','femenino', 'blanco', 'marrón', 'sobrina',3);
INSERT INTO person (name, surname, sex, skin_color, eyes_color, familiar_rank, id_senior) VALUES ('Daniel','Cañadas','masculino', 'blanco', 'verde', 'sobrino',3);
INSERT INTO person (name, surname, sex, skin_color, eyes_color, familiar_rank, id_senior) VALUES ('Marina','Franco','femenino', 'blanco', 'marrón', 'sobrina',3);
INSERT INTO person (name, surname, sex, skin_color, eyes_color, familiar_rank, id_senior) VALUES ('Sergi','García','masculino', 'blanco', 'marrón', 'amigo',3);



INSERT INTO position (id_photo, id_person, clue, w, h, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (1,1,'Mira a la izquierda de la foto',363,363,0,362,199,0,'marrón','---',false,false,'verde y negro');
INSERT INTO position (id_photo, id_person, clue, w, h, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (1,3,'Mira a la derecha de la foto',363,363,145,362,362,0,'rubio','---',false,false,'lila y rosa');

INSERT INTO position (id_photo, id_person, clue, w, h, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (2,4,'Mira a la izquierda de la foto',363,363,0,362,232,0,'pelirrojo','---',false,false,'amarillo');
INSERT INTO position (id_photo, id_person, clue, w, h, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (2,1,'Mira a la derecha de la foto',363,363,167,362,362,0,'marrón','---',false,false,'lila');

INSERT INTO position (id_photo, id_person, clue, w, h, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (3,1,'Mira a la derecha, al fondo de la foto',363,363,202,239,362,0,'moreno','---',false,false,'lila');
INSERT INTO position (id_photo, id_person, clue, w, h, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (3,5,'Mira a la izquierda, el que está delante de todo',363,363,0,362,191,0,'moreno','---',false,false,'blanco');
INSERT INTO position (id_photo, id_person, clue, w, h, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (3,6,'Está en medio de la foto, sentada',363,363,129,311,303,0,'negro','---',false,false,'rosa');

INSERT INTO position (id_photo, id_person, clue, w, h, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (4,1,'Mira a la izquierda de la foto',363,363,0,362,232,0,'rojo','---',false,false,'verde');
INSERT INTO position (id_photo, id_person, clue, w, h, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (4,2,'Mira a la derecha de la foto',363,363,127,362,362,0,'castaño','---',false,true,'negro');

INSERT INTO position (id_photo, id_person, clue, w, h, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (5,1,'Está en medio de la foto, entre el chico y la chica',363,363,113,362,273,0,'moreno','---',false,false,'negro');
INSERT INTO position (id_photo, id_person, clue, w, h, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (5,5,'Mira a la izquierda de la foto',363,363,0,362,172,0,'moreno','---',false,false,'lila');
INSERT INTO position (id_photo, id_person, clue, w, h, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (5,6,'Mira a la derecha de la foto',363,363,198,362,362,0,'moreno','---',false,false,'blanco');

INSERT INTO position (id_photo, id_person, clue, w, h, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (6,1,'Mira a la izquierda de la foto',363,363,0,362,200,0,'castaño','---',false,false,'negro');
INSERT INTO position (id_photo, id_person, clue, w, h, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (6,7,'Mira a la derecha de la foto',363,363,147,362,362,0,'negro','---',false,true,'azul');

+++++++   en verdad no sé de qué me sirve esta tabla, sinceramente   +++++++++++
INSERT INTO photo_customized (id_photo, id_activity) VALUES (1,3);
INSERT INTO photo_customized (id_photo, id_activity) VALUES (2,3);
INSERT INTO photo_customized (id_photo, id_activity) VALUES (3,3);
INSERT INTO photo_customized (id_photo, id_activity) VALUES (4,4);
INSERT INTO photo_customized (id_photo, id_activity) VALUES (5,4);
INSERT INTO photo_customized (id_photo, id_activity) VALUES (6,4);


INSERT INTO senior_activity (id_senior, id_activity) VALUES (2,3);
INSERT INTO senior_activity (id_senior, id_activity) VALUES (2,4);
INSERT INTO senior_activity (id_senior, id_activity) VALUES (2,6);
INSERT INTO senior_activity (id_senior, id_activity) VALUES (3,4);
INSERT INTO senior_activity (id_senior, id_activity) VALUES (3,3);