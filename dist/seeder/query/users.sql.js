"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSeederServiceSQL = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let UsersSeederServiceSQL = class UsersSeederServiceSQL {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async seed() {
        await this.dataSource.query(`DELETE FROM users`);
        await this.dataSource.query(`
INSERT INTO \`users\` (\`id\`, \`firstName\`, \`lastName\`, \`email\`, \`whatsapp\`, \`password\`, \`image\`, \`role\`, \`isVisible\`, \`createdAt\`, \`operatorId\`) VALUES
('03a1593a-c41d-4ad8-ab95-bde4b34aacfc', 'ANDRÉS MAURICIO', 'AMAYA QUINTERO', 'cotranal4@transpaservic.com.co', '3132916160', '$2b$10$BIRaSX1QQqstighidznHiu06S2KcxWUabypmd3z8R.zfi8MYF5bsy', 'uploads/user/2025-05/250509161640-logocotran.jpg', 'user', 1, '2025-05-09 12:16:40.747963', 13),
('03f4d903-d0aa-4c0b-b128-971d281c8bca', 'ANGELLY', 'CAÑAS PEREZ', 'cootransmor2@transpaservic.com.co', '3005442715', '$2b$10$Yj8BGyDUnjTelMJ3a3TnzOC1VqX/1/gruP3GLn9ae9rcI2SYg.17O', 'uploads/user/2025-05/250509170209-cootransmo.jpg', 'user', 1, '2025-05-09 13:02:09.866725', 7),
('07ac71ca-2a1b-4864-bd04-e727f73b9101', 'DORIS', 'RIVERA OVALLE', 'auxiliar4@transpaservic.com.co', '3174252617', '$2b$10$bUkEdrsd4YUfYxGws70mrusOnlK0RWE83xlrsn5NrGHCARvYasTMW', 'uploads/user/2025-05/250509170637-transpaser.jpg', 'collaborator', 1, '2025-05-09 13:06:37.508827', NULL),
('0ddf24f7-272c-4c6d-a425-91740456666d', 'ZULEMA', 'LEON OVALLOS', 'auxiliar5@transpaservic.com.co', '3143408059', '$2b$10$DmNeJ8KvK5FlV62xM8t5nOriJjgthvGg7KETB50JTvC98yb7KGPHW', 'uploads/user/2025-05/250509170702-transpaser.jpg', 'collaborator', 1, '2025-05-09 13:07:02.402007', NULL),
('10338eaa-115d-407a-9d2d-c0e23c1bb0b1', 'ELISA', 'QUITIAN', 'ricaurte7@transpaservic.com.co', '3103014783', '$2b$10$qenycU3uJm1qt3OB76HvVOdc.Z.Yqbp6aP1A05ihjDIBn6wGYuSJa', 'uploads/user/2025-05/250509163814-ricaurte.jpg', 'user', 1, '2025-05-09 12:38:14.530736', 21),
('13d165b8-780f-49f8-aba2-2440e27dfc2d', 'JEFERSON', 'NOVA', 'ricaurte2@transpaservic.com.co', '3106795357', '$2b$10$4mIW34.HbA3tts1rLmmav.YFWq32y0mdabl9aSvBoYJghfrp3/x9O', 'uploads/user/2025-05/250509163512-ricaurte.jpg', 'user', 1, '2025-05-09 12:35:12.218686', 21),
('1f861631-a0bd-4c1a-be2e-5329cd477ddf', 'BELÉN DEL PILAR', 'TRUJILLO SANCHEZ', 'cotranal2@transpaservic.com.co', '3132916160', '$2b$10$tPwCgC4BUb228HIBv2Mnae6iFyREki2erW4JPwR2X5R7iAfjwQFT.', 'uploads/user/2025-05/250509161303-logocotran.jpg', 'user', 1, '2025-05-09 12:13:03.707447', 13),
('2adc0485-04f1-4ec8-bed5-9e0212cdb6a1', 'ANA', 'GAMBOA', 'ricaurte8@transpaservic.com.co', '3133316271', '$2b$10$QG6AWnMS5DwSj3H1ef8ReulAN50/B7wgp8c4qKE.b7Z4jW28pH1FW', 'uploads/user/2025-05/250509163902-ricaurte.jpg', 'user', 1, '2025-05-09 12:39:03.036544', 21),
('2bcf7ed2-d11c-40a9-90e5-f16640638eaf', 'KATY ', 'CARBONERO CARPIO', 'cootransmor4@transpaservic.com.co', '3106540309', '$2b$10$Sp0ujh3UYrdcdySAZzVL8O2q3InbvQ71keFsTdG147lcJtXyLqIT2', 'uploads/user/2025-05/250509170339-cootransmo.jpg', 'user', 1, '2025-05-09 13:03:39.539185', 7),
('2e752896-e160-47cb-b03b-24887772c2a4', 'LILIETH YURANI', 'FONSECA CAPACHO', 'auxiliar2@transpaservic.com.co', '3152058994', '$2b$10$FykaoHOSgoFwYBWE0Ow5guIOI2FO0ySwGgVeefnnavH.TAz9PHn1K', 'uploads/user/2025-05/250509170545-transpaser.jpg', 'collaborator', 1, '2025-05-09 13:05:45.838727', NULL),
('3182bfa5-1f96-464b-a260-ebcd8101ddf5', 'KAREN JULIETH', 'CARO CACERES', 'auxiliar6@transpaservic.com.co', '3166974783', '$2b$10$ZEtI3ZJ0fENoRl7DFZ14ve1ky8Roi7tjFs57AoSFggZxoH95x6eW6', 'uploads/user/2025-05/250509170727-transpaser.jpg', 'collaborator', 1, '2025-05-09 13:07:28.080642', NULL),
('3385ac2a-79f3-4f80-99b0-ca99f153619b', 'TRANSPASERVIC', NULL, 'admin@transpaservic.com.co', NULL, '$2b$10$8PObAS9LXkga.WLJBJMBr.g7pyB//roYS4I0H328XZIYIG6lk3D8i', 'https://i.postimg.cc/05Kfp6bt/icono.webp', 'admin', 1, '2025-05-08 18:51:57.652515', NULL),
('39699ff9-33dc-4763-9f39-5e32b00bbb07', 'ZULMA', 'AGUIRRE', 'traescor2@transpaservic.com.co', '3103081831', '$2b$10$z.9PZO93HYu9rCgRhxPHEu4D3Tqw4hUpnHJLx/nRpiyi8/V05q0vG', 'uploads/user/2025-05/250509164835-traescor.jpg', 'user', 1, '2025-05-09 12:48:35.965608', 19),
('3a01bfcd-bb1a-43a8-b900-5f8a362d0d6c', 'FERNANDO', 'GONZALEZ DIAZ', 'ricaurte1@transpaservic.com.co', '3208366792', '$2b$10$oaB8R.HWHb8GqEzbiLk1YO2Cxsb6DkV.Zk33LU8NZIoZyMq52hZku', 'uploads/user/2025-05/250509163350-ricaurte.jpg', 'user', 1, '2025-05-09 12:33:50.325946', 21),
('3ae7487d-2c14-4722-bd18-eef76f2d0712', 'LUIS ALBERTO', 'RIVERA SUAREZ', 'cotranal8@transpaservic.com.co', '3219435990', '$2b$10$gwnYWB.EvyAZ9Mz4Ulxcheme7s7ByLpPG2l/mC4/uqIzKwc8nh3nS', 'uploads/user/2025-05/250509162020-logocotran.jpg', 'user', 1, '2025-05-09 12:20:20.915402', 13),
('3db64d9f-e162-4085-be0e-8085facbd152', 'DIEGO', 'VELASCO', 'ricaurte9@transpaservic.com.co', '3104863488', '$2b$10$5T5RbEHlQuhnKIN3qf3i2.AUBlXRZsxTLvvNQZcUrKUpnx9.am7nW', 'uploads/user/2025-05/250509163932-ricaurte.jpg', 'user', 1, '2025-05-09 12:39:33.075848', 21),
('40356ea8-c948-493b-bc75-4f0c1e79fdcf', 'IVED', 'CAMELO CHIRIVI', 'auxiliar10@transpaservic.com.co', '3123039766', '$2b$10$2VwJJKe2MsBA.SL8aN66mu1k.ytrzUH.YgPG7IeJuwiq4gDkNXMXO', 'uploads/user/2025-05/250509170910-transpaser.jpg', 'collaborator', 1, '2025-05-09 13:09:10.609899', NULL),
('434ed00d-0318-42f9-b7c3-b868cd669797', 'JOSE', 'TABORDA', 'traescor4@transpaservic.com.co', '3244103032', '$2b$10$A6iHkeE06AJJ1jUb3DfRYOLF6hdG7aOexZG78IkIG/ZUQzNSAvvge', 'uploads/user/2025-05/250509164932-traescor.jpg', 'user', 1, '2025-05-09 12:49:32.663930', 19),
('47bfbd0a-dcb7-4cd1-8fd7-757d635d0495', 'GILBERTO ', 'JEREZ', 'ricaurte4@transpaservic.com.co', '3124765051', '$2b$10$0tXpHoJNoFpIV9Lxa9RA.uXiLcJ9FV53A396moTdK7amy2e6DWbCW', 'uploads/user/2025-05/250509163627-ricaurte.jpg', 'user', 1, '2025-05-09 12:36:27.169602', 21),
('4a51db66-4034-46bd-adf1-cb7ab5104a39', 'JEIMAR', 'JERES', 'ricaurte3@transpaservic.com.co', '3106795357', '$2b$10$2bjAFi4BosTFcVHyyn.jAutmgNQvI1BFrdIMv9UtRsDq4kKkVAznq', 'uploads/user/2025-05/250509163553-ricaurte.jpg', 'user', 1, '2025-05-09 12:35:53.812656', 21),
('4f253466-6a1e-4ce5-b9ad-00b01658ca9e', 'HERNANDO', 'VANEGAS CUENCA', 'auxiliar9@transpaservic.com.co', '3182705862', '$2b$10$qKmwKORn6uIpE8Uskg2OSOOTetGM/3mN3ZNTCBJnuzGeyVrBARgre', 'uploads/user/2025-05/250509170847-transpaser.jpg', 'collaborator', 1, '2025-05-09 13:08:47.253256', NULL),
('520fccd6-531d-4608-8923-3c0456de25af', 'ROSSY ANDREA', 'VERA CHAPETA', 'auxiliar7@transpaservic.com.co', '3152315032', '$2b$10$jtc/E05XCocicJ9FSMreTeh1BxVVAp5fXttgaQN64IHX8c5baFjJ6', 'uploads/user/2025-05/250509170757-transpaser.jpg', 'collaborator', 1, '2025-05-09 13:07:57.807608', NULL),
('54695949-687c-45f5-b7df-4a08d810f0ee', 'SUPERADMIN', NULL, 'desarrollotranspaservic@gmail.com', NULL, '$2b$10$MwdET8FSt5dLUsVQMLkzPudYOh8rfY.PIYP3ga3yk8A9pIzsAwBbq', 'https://i.postimg.cc/Zn1WqNzG/Transpa-Servic-Logo.webp', 'superadmin', 0, '2025-05-08 18:51:56.245965', 9),
('55570fe2-b4db-4e82-9451-9957b820bb0c', 'AMANDA', 'DOMINGUEZ GARCIA ', 'ballegom1@transpaservic.com.co', '3164271498', '$2b$10$u2SgHYsxmTGsnJAX7Iv4DONzEQ7ShMk7gzzgOfpb4fRAbFSry7IX6', 'uploads/user/2025-05/250509165420-ballegom.jpg', 'user', 1, '2025-05-09 12:52:36.776000', 1),
('6094da45-e5b2-4243-b6ac-49ba37ef9fe3', 'MARIA', 'YEPES AGUAS', 'ballegom4@transpaservic.com.co', '3116867788', '$2b$10$EtzCYe/rVS7K/qHPCz0zdujn2tuURrU4HPb70IU8M4PeOluOtZUHW', 'uploads/user/2025-05/250509165518-ballegom.jpg', 'user', 1, '2025-05-09 12:55:18.210256', 1),
('6935ed85-b8e0-45c7-b3b1-6294d9a9284f', 'ELIAS', 'LOPEZ PEREZ', 'traescor6@transpaservic.com.co', '3116961287', '$2b$10$fSK3Z93mkGcaCeE3smxQe.MW.zut.Li7ngJxI4CtIM56Zy6MnVhjq', 'uploads/user/2025-05/250509165032-traescor.jpg', 'user', 1, '2025-05-09 12:50:32.207066', 19),
('800fbcd1-aedb-40e3-9103-bfa693bdd7a1', 'AMBAR CRISTAL', 'TORRES BUITRAGO', 'cotranal1@transpaservic.com.co', '3132916160', '$2b$10$VKF3imkBs0YeWGpHXzP28eShkflUDkUmdZO6bciJQhmbHysLu.gC.', 'uploads/user/2025-05/250508172212-logocotran.jpg', 'user', 1, '2025-05-08 13:22:12.693000', 13),
('895f5dec-d18a-4e78-8046-154d0bbb7c28', 'ELISABET', 'LOPEZ PEREZ', 'traescor5@transpaservic.com.co', '3107240555', '$2b$10$V20sf/fuMy.SEjE6XZggO.FwbA08.cDFBn/vbtvNpteruQf3Mp1au', 'uploads/user/2025-05/250509165003-traescor.jpg', 'user', 1, '2025-05-09 12:50:03.417668', 19),
('8db8046d-454b-475e-92ca-05d8272d90b9', 'DANIELA', 'MERCADO ERAZO', 'ballegom3@transpaservic.com.co', '3116867788', '$2b$10$h10sf.ASAOmZMRooUtiQP.2uBfA4Egq1fMVpfmRRUe8F6XWgWuXpG', 'uploads/user/2025-05/250509165340-ballegom.jpg', 'user', 1, '2025-05-09 12:53:40.824536', 1),
('8e4418a4-af8a-468c-a3f8-83d6c4c1234c', 'YAJAIRA', 'TORRES', 'cotranal7@transpaservic.com.co', '3106195574', '$2b$10$YmEz6sj8adjrrxoYk9t/m.IyfXqFtIqAHv6T1HUL4yin7LGZf6eL2', 'uploads/user/2025-05/250509161943-logocotran.jpg', 'user', 1, '2025-05-09 12:19:43.846833', 13),
('910d1f0f-88af-4d0f-a136-3b3e9d1d7066', 'KAREN ', 'ALVAREZ', 'ricaurte6@transpaservic.com.co', '3242898797', '$2b$10$D24sWPxNUoZfc0W0/8jOauP40NV7mr5pMdhm3xjNxuOvCCm6g3XZC', 'uploads/user/2025-05/250509163742-ricaurte.jpg', 'user', 1, '2025-05-09 12:37:42.970900', 21),
('a1953588-20fd-4c5c-93fb-0593764f29e7', 'ANA IRMIS', 'PARADA PARADA', 'cotranal10@transpaservic.com.co', '3107512254', '$2b$10$9Riq1Z02m3.W4YK0VYP1KeEms8oDFINfqB7XU.jILbc/2Qm95d.b.', 'uploads/user/2025-05/250509162123-logocotran.jpg', 'user', 1, '2025-05-09 12:21:24.041656', 13),
('a51f4618-05e3-4193-875c-bff43fc67b68', 'KATHERIN', 'RIOS PEREZ', 'cotranal3@transpaservic.com.co', '3132916160', '$2b$10$8.ANh2D1i3rcVkiI8wnc1u1Ptfs8XhGrDvTOPAJlOYFzdZO/EhFnG', 'uploads/user/2025-05/250509161601-logocotran.jpg', 'user', 1, '2025-05-09 12:16:01.749862', 13),
('a57ed808-d12a-4576-abba-0b500529d49d', 'JOSE MANUEL', 'MONTERO', 'cotranal6@transpaservic.com.co', '3125929751', '$2b$10$0fvODtQpkHuqsaEdpiYO0eVZEX69mB0YK6SFMMQWOQYQWLmIXxJ92', 'uploads/user/2025-05/250509161905-logocotran.jpg', 'user', 1, '2025-05-09 12:19:05.758858', 13),
('b423247d-66cd-4ccf-ac9a-302569b1ba60', 'WILFRE', 'DE LA ROSA QUINTERO', 'cootransmor1@transpaservic.com.co', '3105950268', '$2b$10$LXk8iKnBqfEzQkoK/.JoJuiYIZlLmXh5zaIm9xuRqsM1Ws9N67V1q', 'uploads/user/2025-05/250509165944-cootransmo.jpg', 'user', 1, '2025-05-09 12:59:44.795124', 7),
('b46da9c7-b4cf-4a43-9a1a-bc47e0432ced', 'YURANI', 'QUIROGA', 'ricaurte5@transpaservic.com.co', '3134087357', '$2b$10$fKz3bA/K2vmnSVny01cUkunMcaGPWGSchnohJ66IyyyJqQICv6gwC', 'uploads/user/2025-05/250509163709-ricaurte.jpg', 'user', 1, '2025-05-09 12:37:10.009520', 21),
('b7a59f8d-43dd-4d87-b1c7-7a2c52ab93f6', 'IVAN SANTIAGO', 'LOZANO SILVA', 'auxiliar8@transpaservic.com.co', '3214023520', '$2b$10$Pf/lwQV/yx9J5RRoCkRryetDhD3hFXGOYle4ZGZ67egcDSx4KRYIW', 'uploads/user/2025-05/250509170822-transpaser.jpg', 'collaborator', 1, '2025-05-09 13:08:22.802318', NULL),
('b925adaf-7356-4e64-925a-673b15a06fd2', 'DELLIS', 'MORALES BADILLO', 'cootransmor3@transpaservic.com.co', '3135691963', '$2b$10$w5eB/ZkB5oY.4EJC2GF85OhlcXpUm3d.HcmAluI2a3nUnMfUZnGRC', 'uploads/user/2025-05/250509170307-cootransmo.jpg', 'user', 1, '2025-05-09 13:03:07.957762', 7),
('ba1d19e9-33c1-4f54-bd64-371292ccc0fb', 'WILSON', 'MARTINEZ', 'traescor7@transpaservic.com.co', '3226248431', '$2b$10$tQ27xMZeadutVJekVh3vC.pmE9YrxjGpSPj7WqFZgK1ZLj40eii62', 'uploads/user/2025-05/250509165103-traescor.jpg', 'user', 1, '2025-05-09 12:51:03.264883', 19),
('c00cafb7-1f6f-4cc5-bf37-4c1acb5a8743', 'FLOR AMPARO', 'CARDENAS GUEVARA', 'cootracero1@transpaservic.com.co', '3134502322', '$2b$10$Wl6hoEnZnmIyTc5Q7wmFUel7/lMpWvSXnokZB4pglhU4pPLh4qTdq', 'uploads/user/2025-05/250509164441-cootracero.jpg', 'user', 1, '2025-05-09 12:44:41.557820', 23),
('cc5860b7-842b-4f60-ba15-b3baadac14ae', 'MADELEINE', 'CHOPERENA GREYS', 'traescor1@transpaservic.com.co', '3103078095', '$2b$10$lb6QL3yavQ4vayTl3m.xhuSxR9FxGqMYP.zZrZnkpkn9JDMqExrAm', 'uploads/user/2025-05/250509164759-traescor.jpg', 'user', 1, '2025-05-09 12:47:59.458883', 19),
('d18f6165-4551-4ce7-a313-4965868839ca', 'YEIMY LORENA', 'ANTELIZ CARDENAS', 'cotranal11@transpaservic.com.co', '3123610348', '$2b$10$myX0qPYFGOkwAnrz3eQt2OxZGFoFPSU.fOY8g4ZqNd4me5te3oxne', 'uploads/user/2025-05/250509162201-logocotran.jpg', 'user', 1, '2025-05-09 12:22:02.035783', 13),
('eb5574a8-bc46-4da9-b5c3-35973b383fc6', 'MARIA ROSARIO', 'GUTIERREZ CAMPILLO', 'traescor3@transpaservic.com.co', '3103077948', '$2b$10$vGH/Ug54SdUgVUikonSz3.5iz0RW7m2vZE.uDxPWYgAa0hFn4T7qa', 'uploads/user/2025-05/250509164905-traescor.jpg', 'user', 1, '2025-05-09 12:49:05.145125', 19),
('ec3e9213-aa53-4ec8-ad18-e3f9c5e29b84', 'AURA ALICIA', 'PEREZ CUADROS', 'cotranal9@transpaservic.com.co', '3202077553', '$2b$10$jGTN9WT1QE/vZS.EvhzDGuwhnMfyHYPNZfo/ilDb4mSLB8G1ZCVp.', 'uploads/user/2025-05/250509162051-logocotran.jpg', 'user', 1, '2025-05-09 12:20:51.923083', 13),
('ed792e17-9c9e-4bfe-b046-4b1fc4a0eadc', 'LUIS ALFREDO', 'BLANCO MOJICA', 'auxiliar3@transpaservic.com.co', '3168693564', '$2b$10$kuK7imOcEwV/73dHvQJoNu1YZ6aT86SdfrFZcBD2Co4mHTzRjsfMm', 'uploads/user/2025-05/250509170609-transpaser.jpg', 'collaborator', 1, '2025-05-09 13:06:09.950951', NULL),
('f171fe6f-37b8-4512-b9bf-98ecbd2f0d8a', 'MARILU', 'MURILLO', 'ricaurte10@transpaservic.com.co', '3223322015', '$2b$10$zLDCBLxKlcS/0oTwHxIErutajrMBkLy/N.cEuuFzp9P5uNy3cqeAq', 'uploads/user/2025-05/250509164012-ricaurte.jpg', 'user', 1, '2025-05-09 12:40:12.198025', 21),
('f71d8889-7eaa-41dc-b3bc-acf1d3626170', 'RICHARD ALFONSO', 'GARCIA CONTRERAS', 'cotranal5@transpaservic.com.co', '3132916160', '$2b$10$MuKZraL3yWCCFqxnTXl5deJ2ei8r591N6GGGpwM5pGRHBU6M5k3ZG', 'uploads/user/2025-05/250509161747-logocotran.jpg', 'user', 1, '2025-05-09 12:17:47.442712', 13),
('faf7fba8-b7bc-4cea-b261-2b96f4dbbde6', 'YAQUELIN ', 'DOMINGUEZ BENITEZ ', 'ballegom2@transpaservic.com.co', '3023907066', '$2b$10$zLreC/QT.Qsd0MEWJTyUj.UE9m/itXiYU/OEs6HrLKQXel1x8uYbe', 'uploads/user/2025-05/250509165303-ballegom.jpg', 'user', 1, '2025-05-09 12:53:04.058000', 1),
('fce38544-a0c1-4ff2-8dd3-8d7aeb449ce9', 'SARA SOFIA', 'HERNANDEZ FUENTES', 'auxiliar1@transpaservic.com.co', '3212948672', '$2b$10$qWT7qiQWDuWJVGorCwx0MebzYqpAn7z45FHLiKR6vVCNC9AqUav8q', 'uploads/user/2025-05/250509170519-transpaser.jpg', 'collaborator', 1, '2025-05-09 13:05:19.685047', NULL);
    `);
        console.log('UsersSeederServiceSQL: Datos insertados correctamente.');
    }
};
exports.UsersSeederServiceSQL = UsersSeederServiceSQL;
exports.UsersSeederServiceSQL = UsersSeederServiceSQL = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UsersSeederServiceSQL);
//# sourceMappingURL=users.sql.js.map