
INSERT INTO user_aide (name, username, mail, password, type) VALUES ('John Doe', 'JD','JD@gmail.es','1234', 'tutor');
INSERT INTO user_aide (name, username, mail, password, type) VALUES ('Sarah Castello','SC','SC@gmail.es','$2b$12$Itxz5DwBPiJ7Ypi65.YtkeRN2Bnk7vlMhLZZkdNFuiGJM.TdD/CK6','senior');
INSERT INTO user_aide (name, username, mail, password, type) VALUES ('Allan Poe','AP','AP@gmail.es','$2b$12$mPcnbGWmbm7X3Tui7MLsoOrCemeK8K5WM85wl6Ri8ASqmrft985wm','senior');


INSERT INTO tutor (id) VALUES (1);


INSERT INTO senior (id, total_playing_time, hour_start_avg, hour_finish_avg, score_avg, tutor_id, sex, birth_year, birth_place, descendants_num, sons_num, daughters_num, siblings_num, brothers_num, sisters_num, partner_name, father_name, mother_name) VALUES (2,'02:30:00', '08:00:00', '10:00:00', 9, 1,'femenino', 1944,'Madrid', 4, 3, 1, 4, 2, 2,'Juan','José','Maria');
INSERT INTO senior (id, total_playing_time, hour_start_avg, hour_finish_avg, score_avg, tutor_id, sex, birth_year, birth_place, descendants_num, sons_num, daughters_num, siblings_num, brothers_num, sisters_num, partner_name, father_name, mother_name) VALUES (3,'03:10:00', '16:00:00', '18:00:00', 12, 1,'masculino', 1937,'Sevilla', 2, 2, 0, 9, 5, 4,'Carmen','Antonio','Camila');


INSERT INTO activity (name, description, demo_video, photo_file, num_answers) VALUES ('Relaciona las imágenes', 'actividad en la que se trabaja la memoria','ccc','memoria', 4);
INSERT INTO activity (name, description, demo_video, photo_file, num_answers) VALUES ('Preguntas y respuestas?', 'actividad sobre miembros de la familia','aaa','images', 10);
INSERT INTO activity (name, description, demo_video, photo_file, num_answers) VALUES ('Qué símbolo era ese?', 'trabaja memoria retentiva','hhh','juegos-de-cartas', 8);
INSERT INTO activity (name, description, demo_video, photo_file, num_answers) VALUES ('Preguntas y respuestas', 'trabaja la coordinación y la atención, se trata de darle a las mariposas a medida que van volando por la pantalla del dispositivo','ppp','images', 12);
INSERT INTO activity (name, description, demo_video, photo_file, num_answers) VALUES ('¿Quien es quien?', 'esta actividad trabaja reminiscencia, coordinación y atención','ppp','arbol-genealógico', 6);
INSERT INTO activity (name, description, demo_video, photo_file, num_answers) VALUES ('UNO', 'juego de cartas de colores','ccc','images', 4);
INSERT INTO activity (name, description, demo_video, photo_file, num_answers) VALUES ('Sabes quien sale en la foto?', 'reminiscencia y wjdokqnñe','aaa','arbol-genealógico', 10);
INSERT INTO activity (name, description, demo_video, photo_file, num_answers) VALUES ('Cuenta animales', 'trabaja cálculo y atención','hhh','juegos-de-cartas', 8);
INSERT INTO activity (name, description, demo_video, photo_file, num_answers) VALUES ('Busca las diferencias', 'trabaja la atención','ppp','images', 12);


INSERT INTO customized_act (id,senior_id) VALUES (2,2);
INSERT INTO customized_act (id,senior_id) VALUES (5,3);
INSERT INTO customized_act (id,senior_id) VALUES (4,3);
INSERT INTO customized_act (id,senior_id) VALUES (1,2);
INSERT INTO customized_act (id,senior_id) VALUES (3,2);
INSERT INTO customized_act (id,senior_id) VALUES (6,2);


INSERT INTO generic_act (id) VALUES (1);
INSERT INTO generic_act (id) VALUES (3);
INSERT INTO generic_act (id) VALUES (6);
INSERT INTO generic_act (id) VALUES (7);
INSERT INTO generic_act (id) VALUES (8);
INSERT INTO generic_act (id) VALUES (9);



INSERT INTO report_activity (time_playing, number_of_tries, score, senior_id, activity_id) VALUES ('00:30:00', 3, 6, 2, 1);
INSERT INTO report_activity (time_playing, number_of_tries, score, senior_id, activity_id) VALUES ('00:42:00', 5, 8, 3, 3);


INSERT INTO photo (description, upload, photo_file) VALUES ('Día de Navidad 2015',1,'bbb');
INSERT INTO photo (description, upload, photo_file) VALUES ('En el pueblo haciendo un asado de carnita',1,'ddd');
INSERT INTO photo (description, upload, photo_file) VALUES ('Maldita Italia, como odié Roma',1,'eee');
INSERT INTO photo (description, upload, photo_file) VALUES ('No sé qué más poner aqui',1,'ccc');
INSERT INTO photo (description, upload, photo_file) VALUES ('Vacaciones de verano',1,'bbb');
INSERT INTO photo (description, upload, photo_file) VALUES ('Tu cumpleaños número 74',1,'ccc');


INSERT INTO person (name, surname, sex, skin_color, eyes_color, familiar_rank) VALUES ('Andrea','Talls','femenino', 'blanco', 'marrón', 'nieta');
INSERT INTO person (name, surname, sex, skin_color, eyes_color, familiar_rank) VALUES ('Kevin','Talls','masculino', 'blanco', 'verde', 'nieto');
INSERT INTO person (name, surname, sex, skin_color, eyes_color, familiar_rank) VALUES ('Toni','Talls','masculino', 'moreno', 'azul', 'hermano');


INSERT INTO position (id_photo, id_person, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (1,2,0,0,1,2,'marrón','iwbsb',false,true,'rojo');
INSERT INTO position (id_photo, id_person, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (1,3,0,0,1,2,'rubio','iwbsb',false,false,'verde');

INSERT INTO position (id_photo, id_person, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (2,1,0,0,1,2,'moreno','iwbsb',true,false,'azul');
INSERT INTO position (id_photo, id_person, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (2,2,0,0,1,2,'negro','iwbsb',true,false,'blanco');
INSERT INTO position (id_photo, id_person, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (2,3,0,0,1,2,'rubio','iwbsb',true,false,'naranja');

INSERT INTO position (id_photo, id_person, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (3,1,0,0,1,2,'moreno','iwbsb',true,false,'rosa');
INSERT INTO position (id_photo, id_person, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (3,3,0,0,1,2,'rubio','iwbsb',true,false,'azul');

INSERT INTO position (id_photo, id_person, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (4,1,0,0,1,2,'pelirrojo','iwbsb',true,false,'negro');


INSERT INTO photo_customized (id_photo, id_activity) VALUES (2,2);
INSERT INTO photo_customized (id_photo, id_activity) VALUES (3,3);
INSERT INTO photo_customized (id_photo, id_activity) VALUES (4,3);
INSERT INTO photo_customized (id_photo, id_activity) VALUES (1,2);
INSERT INTO photo_customized (id_photo, id_activity) VALUES (2,5);
INSERT INTO photo_customized (id_photo, id_activity) VALUES (3,5);
INSERT INTO photo_customized (id_photo, id_activity) VALUES (4,5);
INSERT INTO photo_customized (id_photo, id_activity) VALUES (1,6);


INSERT INTO senior_activity (id_senior, id_activity) VALUES (2,1);
INSERT INTO senior_activity (id_senior, id_activity) VALUES (2,2);



