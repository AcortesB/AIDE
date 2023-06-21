
INSERT INTO user_aide (name, username, password) VALUES ('John Doe', 'JD','$2b$12$wrZEdyBI4o5Tf1R9.gKrb.k1VfTmurtUEbgjAhOWCnlfiXTUzDE1O');
INSERT INTO user_aide (name, username, password) VALUES ('Sarah Castello','SC', '$2b$12$Itxz5DwBPiJ7Ypi65.YtkeRN2Bnk7vlMhLZZkdNFuiGJM.TdD/CK6');
INSERT INTO user_aide (name, username, password) VALUES ('Allan Poe','AP','$2b$12$mPcnbGWmbm7X3Tui7MLsoOrCemeK8K5WM85wl6Ri8ASqmrft985wm');


INSERT INTO tutor (id) VALUES (1);


INSERT INTO senior (id, total_playing_time, hour_start_avg, hour_finish_avg, score_avg, tutor_id) VALUES (2,'02:30:00', '08:00:00', '10:00:00', 9, 1);
INSERT INTO senior (id, total_playing_time, hour_start_avg, hour_finish_avg, score_avg, tutor_id) VALUES (3,'03:10:00', '16:00:00', '18:00:00', 12, 1);


INSERT INTO activity (name, description, demo_video, num_answers) VALUES ('match the image', 'an instructive activity where memory is worked','ccc', 4);
INSERT INTO activity (name, description, demo_video, num_answers) VALUES ('who is who?', 'an instructive activity about family members','aaa', 10);
INSERT INTO activity (name, description, demo_video, num_answers) VALUES ('which was that symbol?', 'an instructive activity where retain memory is worked','hhh', 8);


INSERT INTO customized_act (id,senior_id) VALUES (2,2);

INSERT INTO generic_act (id) VALUES (1);
INSERT INTO generic_act (id) VALUES (3);


INSERT INTO report_activity (time_playing, number_of_tries, score, senior_id, activity_id) VALUES ('00:30:00', 3, 6, 2, 1);
INSERT INTO report_activity (time_playing, number_of_tries, score, senior_id, activity_id) VALUES ('00:42:00', 5, 8, 3, 3);


INSERT INTO photo (description, upload) VALUES ('Christmas day',1);
INSERT INTO photo (description, upload) VALUES ('Beach holidays',1);
INSERT INTO photo (description, upload) VALUES ('Your birthday 74',1);


INSERT INTO person (name, surname, sex, skin_color, eyes_color, familiar_rank) VALUES ('Andrea','Talls','F', 'white', 'brown', 'granddaughter');
INSERT INTO person (name, surname, sex, skin_color, eyes_color, familiar_rank) VALUES ('Kevin','Talls','M', 'white', 'green', 'grandson');
INSERT INTO person (name, surname, sex, skin_color, eyes_color, familiar_rank) VALUES ('Toni','Talls','M', 'white', 'blue', 'brother');


INSERT INTO position (id_photo, id_person, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (2,1,0,0,1,2,'red','iwbsb',true,false,'blue');
INSERT INTO position (id_photo, id_person, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (1,2,0,0,1,2,'brown','iwbsb',false,true,'red');
INSERT INTO position (id_photo, id_person, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color) VALUES (1,3,0,0,1,2,'blond','iwbsb',false,false,'green');


INSERT INTO photo_customized (id_photo, id_activity) VALUES (2,2);


INSERT INTO senior_activity (id_senior, id_activity) VALUES (2,1);
INSERT INTO senior_activity (id_senior, id_activity) VALUES (2,2);



