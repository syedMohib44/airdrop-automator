const fs = require("fs");
const Web3 = require('web3');
require("dotenv").config();

const { default: axios } = require('axios');
require("dotenv").config({ path: '../.env' });

var web3 = new Web3(`https://arb-mainnet.g.alchemy.com/v2/${process.env.WEB3_ARB}`);


const data = [
    "0xcfe05a1814640510a1b120d5f115f8f3098f23ab",
    "0xcff4f735d18dacdb5ee9f32fc1e12c7cc01c8b7b",
    "0xd022ceb255574f5a05cfbbac0ee3e00bf23c293d",
    "0xd031db771d69216d4a0a4a172c04bb8f250b2f50",
    "0xd0431828a6abc1cc4eec70c72d2028d99d4f6358",
    "0xd06b85713ea27b0fa051ec1ad8b1cf8267ceac46",
    "0xd09c9bdb25273d25747122ecdbe36d56513e3ec5",
    "0xd0bf1a780fdcb600836cce48d8574d7082132439",
    "0xd0bf8b6d9108900cc61b523c53c2d17901c2e730",
    "0xd0c4f361236b5749fc6e27ff2d7d3c1dd47f38ab",
    "0xd0d0c58da21d60f2a87efd6e68894387a97a1dc5",
    "0xd0e515832e644c30f1797624ca953fe4d66c290d",
    "0xd0eef3e7b3c489ce89170d3c86fce2f1e0c63257",
    "0xd0f02cb782fba0f7dbca1eccfcb192b7cf007d91",
    "0xd0fec64a178821dae63d17f587fa4ecaeda624fb",
    "0xd1106d01e6c3cf0d158cbd78b581d2d8e1f23241",
    "0xd111886cb7eff60f390e8f4c4f7c288c21988d51",
    "0xd11901dae3ec7a38a18b200f39edaded543aeb60",
    "0xd11e5ec5dfcf9d9bf36bd6db274fe03147db9060",
    "0xd14f43435a5cec2e71c15a81a36fdf58ea98688a",
    "0xd185989c859b2fcb3e474cdef50cef92a73a35ee",
    "0xd18c66fd8019062f2af58c370cb55ff0b8af4dbc",
    "0xd1a2b69c89acec332f8ee72dc445da60f10e8c5a",
    "0xd1aa7b6ca4b057a82fcb2658f3cda7824f2fe689",
    "0xd1bc12e9bed1d3a3e6407e67d8ab33dfd88a0d98",
    "0xd1cc6afb59af566737d0f2cb4420097a100b9626",
    "0xd1d5e247f70ca6e70029d405b28379a3ba5febfa",
    "0xd1fda0d948ec6cb7a9690f6bb17ba552cd78e97b",
    "0xd20b243c15b6b86c070d378092799f4ed6ef3ccb",
    "0xd218333ba6c35abfa02280945295105e32064414",
    "0xd2183b775d30ece7863560f5ccf6487db86a9491",
    "0xd2204e1b310416e397346fe7c3462747808a5d47",
    "0xd221725c9da92bacef260c2283c5d1ba347af6a6",
    "0xd2792460cfaab43c648c2cd8b3a2766137ae437c",
    "0xd296258f46c3183b10d13582d686ba6989880977",
    "0xd2b9e923030bda167b91597157357d9e44d2a84d",
    "0xd2da39c8935475f44f73988b06090ca0c4fca153",
    "0xd2fcde09eb2d577a16de6fb51dc3c95a1b9e0fb2",
    "0xd3018dc82ee8e61e83102a9120328a49199df46b",
    "0xd30f41dd9e7c8ffb96aa769cd49b6bdd18101290",
    "0xd31c18617c032877ce4bd6629fe12e2071ce7fb7",
    "0xd31dd58a990ac73df79c980c9343fea965c2da2b",
    "0xd3344ac52afb6929674aee3de6a20d669e6ca989",
    "0xd33f5bbd9ebc994369644bd59b1da9ce3b0ce037",
    "0xd358503f7a023b32e18edf01a2384cda25f39d38",
    "0xd38b88816d6caf1d82be1a06648855b46f062dfd",
    "0xd3bbb31ad14fe2f7c8d184eac3e8af8ebf408a59",
    "0xd3c6f4e8276e31f82824171e3d87fea25faeaa12",
    "0xd3d42155cd99a66e254302f43b2bc427a366a740",
    "0xd3da3dd2f4a9b1650ed190c7de3c8be081348222",
    "0x33a4ecc65d081af1043bbee0e57d8eac154c8f4f",
    "0x33bbaf8c47a39c03917382b370a35fe87ee8b5ea",
    "0x33bd3a4c6c17be1cd577d540a4d288162f88c03d",
    "0x33e4c02ddcd40c64a6efe1c9370b098efcf026a1",
    "0x33eb04d6ea897944dcab0692d662aa656b88ccf2",
    "0x34141b6d61bf0bc4eb2d020a6aa8f31b21b22b80",
    "0x34191fb0925f866e40fbececf5bbbfd5e5186f0d",
    "0x341fb110cf24f89ad5d8ad7f36b8534193e6f631",
    "0x3445259b4ac22f299dfef1a805c1aa4be458c23e",
    "0x346666a891bb052225e244a0dc10996ba35eb51d",
    "0x34985c8caa99d9d5fa470bcf4cd6bfa05f653c1e",
    "0x34a131d86b1a9ef55339af5e18b9f84c27f5aab2",
    "0x34ce99f68afc9c2171ed843ec312f700b42f6d1f",
    "0x34f350c88b84a14d98cef6d060eddf936054c0a5",
    "0x350061d5b3b09fd44691f22fd9ded9a5693ed41f",
    "0x3504a7abf0085df70ebf5b5a6d73bface389adc7",
    "0x3512ce189c789a7e562a265f183e3d549831aac0",
    "0x3516c6949b1511e556015df3025438eaf5617706",
    "0x354da206ea25dadc8b969994212bcd40bf99c124",
    "0x3553d2ce311a477cb9d228e700939dae3c72d3e0",
    "0x355d051f48b7d3d35a73d162c61fdd1802572149",
    "0x3577cc0a19a853ac2cd7b918abf545e776731f73",
    "0x3579255354854f5d6017e2de8c8ca7d8439ec3c6",
    "0x35877c9087e1d4522edf567936d13a61ffa57fd0",
    "0x35a35695f3111733df39d99806c68d6be8bc3338",
    "0x35ae4a1d9c39d077f7a27293123ccf00519414b1",
    "0x35c4f9327bf20936f5d002e2e89974df7d00fe34",
    "0x35dba6048d9157ca8205e36d13b7deb6e4fa7547",
    "0x35e9492b2622e803a4d50fc7826cf6778e3f6e71",
    "0x35fd453e6e363431fcfc83c484ab1e6d984fddb3",
    "0x360a7ba727369a8f894045b6d017427ca305b4fe",
    "0x360c05b96c0916ba48e84d72d72f788bd5f1ec65",
    "0x360de5f15cccd4a861b86f0b9dc148edbaa66457",
    "0x36205b6d8004e948eb997fe2cb18a0104ad23b5e",
    "0x363255c104cdcf3b0e8fb11d64fee567fc5fe252",
    "0x3637eeca010d66827bbb8bc04f32e609e478bc73",
    "0x3646049b248de9262de3a47ec125da3e09e26959",
    "0x364e062b8d6919559301c9e1515119c374a4eac9",
    "0x368160238e8d14a3b22b920e2fd7cd44b09a3154",
    "0x36bcf19385125969dd83c8adec500005e0fbd7e3",
    "0x36d2ee08e1af64d9c68471f411898fb383b3d2a0",
    "0x36da3a84e75e4c37c4d70696606fc8722b7245d7",
    "0x370c7ce89f91987e87564f380c76497ca1621aea",
    "0x3710b4dd6aff9f59542117773adeeb249c2faa2a",
    "0x3736b66bbf66340fe4ec7ca1a2a2b5a276516dc7",
    "0x374cff039339d439ccbcbfbb5af20733075028bb",
    "0x3766fdbc27cb114b1066b82d13808428e3356172",
    "0x376d441b2c2e97277ea876fd2351053360d76898",
    "0x3771da199ab6d01d2d09ff77ac684bf3bc58f8da",
    "0x3787f328a1378e918f953e131a8eb22bf93f452a",
    "0xe0391aa1a705b2a9bf17fd85e7b6839bb9c2e817",
    "0xe040fbff9d04bd20a0c76fe44b046d170348e2e8",
    "0xe04163a9516b7668880bd784cf6410d3f500e5bb",
    "0xe04b75df16ccace7e42369afea6ba56440fd6fbb",
    "0xe052078d68747dd79eb3065b24ab433c28cbe762",
    "0xe05be4ec846f67ab40c2c2adfc1a87851c8cf7ed",
    "0xe05ca1b0dd10dab1c04bd14bf1a7013c9b455e1c",
    "0xe060c2f92a2d5347d59ea58055a2c96c5c45f4e4",
    "0xe07caa7881961b200d24cd50590f37dd69ec6f6a",
    "0xe07d4b722fba189cd2596eaf30e451a0bc6e2503",
    "0xe0809ceb8726e0eea0d42ad85fa82a9e587bd10f",
    "0xe0892003b381610cf7dd83bc3123010eab47350c",
    "0xe0924d595572d41bd1c107646bb2d943912444c3",
    "0xe09773bcde620f53b4ee0e392915a8827269e0a7",
    "0xe09a39147bee4f26596ee8419160dab49ed0d5e4",
    "0xe09b55b2064900a754b30ac326974378a1452ce9",
    "0xe0a29de8b5d7f110b7cbabacded7ef1ba67a65b4",
    "0xe0a5ce7935a669a42752818e05d8b57d40e596fd",
    "0xe0c2753f79a29283245e83e43fcc23191f338594",
    "0xe0d2c58aaed74fd928e7c82901854327cfbd4dbc",
    "0xe0d63e439fc1ba6f470092d0f2bf634d175445fe",
    "0xe0e1fa69954570a2f907e022432d9ef89fad3b0a",
    "0xe10359c91f8ce188619ba4dfc0174789a6baea55",
    "0xe10ccb5165686f21f832f623f2dbb57a4f08450f",
    "0xe11e89b9dad4079ee133e888d43fc72ed3e15ef5",
    "0xe1200cd1771f09c5d60cef9875023cc5566e0ebe",
    "0xe1292bebcf74650a85e46a4e6f2af6a9d2e3dec8",
    "0xe13b0d515fb97383d91ec1410f361e47335f3144",
    "0xe14394a5412f3812c7eba2e61690b3520162eba4",
    "0xe148e85f8280af271725343d5268a37ef8cb0444",
    "0xe150ad0b6579a6d55788f1da2092ee57182eae44",
    "0xe15497a16158c3f3a44d3fe8ec7024d9b4a50b5c",
    "0xe1762c04136a514b07a5acfaf6dae95680d931fe",
    "0xe17bf8e8c223acf232e652c3d933db9a53e2e749",
    "0xe17f75b72a1a22daf1207ae2aee71a106e92a760",
    "0xe185eba65ffbe68c8bef741c0103bda161207da3",
    "0xe18b13e132fc7f6e5e89b97295ceab8fe48c2b91",
    "0xe191fd642526080938ac53ba1966ffe196d238c0",
    "0xe1983f009f3717e2d8397b28378b695fb1672e9e",
    "0xe19898f242b712dd7f2fc6c18277a0c97a705265",
    "0xe19fe72c3a23d3ce3d441a5cde6b97aab27e12cb",
    "0xe1a27208e39a8acfe81e1ab230bed577c8460296",
    "0xe1aba557419fab3f87497bd241e7835dd73f2f32",
    "0xe1ad5b154c7759e3c399d3a31cb2e4eca2c811e6",
    "0xe1b7f28e0acf02abf33b0cb07eabd742a9f6fc02",
    "0xe1bbb6dd41331d675491cf9f8909bc3bb65d52af",
    "0xe1c4eed0f0704bd511eb9178aa5d55ab899214f8",
    "0xe1c8b20a2555f4dfc7daed105fada2a0f04f194f",
    "0xe1cf9e67fe7653ce8d58a211ef1a04493837fc8e",
    "0xe1e37b3b5fe833c2a56d204b9beccbd55e3d6236",
    "0xafd8d5347c3189a237d4697a49f1f8b65d07783b",
    "0xafd937818c704863aea7c0e871a05f3b9b16c569",
    "0xafeb2b0f90fd24e69e33393ba2645df712e02346",
    "0xaff17968fd266b1cbf69c19b8be90fc167d8d3ef",
    "0xaff461221e8d8df57172eef61b6c6e5b13a430ee",
    "0xaff5b7369ae852ac6ee4e7b5ffd103f8d07a0799",
    "0xaff8c16838960ea45114a8f9f818581fd026687e",
    "0xaffbff50718bdf171e8d8b5c518ca1bee258f3d0",
    "0xafff70cc129bb2b7ed12010b2b602a796cf29d6e",
    "0xb00833af58ed072fcc9f865692c23a23f25081de",
    "0xb009f6841195d5ecc7a03eda1659b95972966034",
    "0xb00ef424dbf389b9a1894490942139f9ce6f5cce",
    "0xb010879a15a62569e156170245397d81c2ba3e7d",
    "0xb017607d5083aa0396c9a9273839b62f5bac517f",
    "0xb01c828cc0badf5bde61d336a8dd6993578b48c2",
    "0xb01f4c5d4c404877e241f04f072ece5b933ccfd2",
    "0xb020562dc5fbebfd5481a473d392b12d98876453",
    "0xb0250d2266cc1fbe92737f042bf82277c64f28e6",
    "0xb026524c38786a5711c7884e41c211ab2f1b46a4",
    "0xb03579c84c09ca6daf78c14c98d40a994e750cd4",
    "0xb038c136a2f5a65f1678b65dac2e8726e0c521f6",
    "0xb03a2ce76d10416680c92cb9ada4859c4d1f619a",
    "0xb03e3a858e269525c7237d68ce2be8167d5d48c2",
    "0xb04074db6c85e7b9c9f602467cd3dd594dc2aecd",
    "0xb042c5752e036689b1dab41dcc45d36b49c94171",
    "0xb048bf4f0ebc0fb3408477f7fe37ccd90ad1abf6",
    "0xb05c78a12cd92ded3d8fca70881fdffeb8e4bb95",
    "0xb05f10156c9679a327bf420b4d0d848b48b0b419",
    "0xb06578a8a20b7e349338d26f16ad9cd09af160e8",
    "0xb06a97b88e7bf2d6b0e8ad1e49dad2ba8592e40b",
    "0xb06ad3368da3b8fb0dd17ff366b797899be86fd8",
    "0xb079cc9004430fc6b8f65ac952164733bb650315",
    "0xb08f7f5aa7c7bd215a55e6d65a23829b3678506b",
    "0xb09b536481c17001a79ffa9ca876d89cc6d1d5fa",
    "0xb0a4bb19ab319e00dd4a8ff864425cf6d942a515",
    "0xb0a9f1767a5cd5e220327d794cca8d58a2d654aa",
    "0xb0b5091ac17784bf1c65edcfa51f51e0edad9d47",
    "0xb0bb0bd0bf8b05fccc88bb7ed85a5fd837f8141d",
    "0xb0be8090567f44936d64ec5823b0d1d2942726ad",
    "0xb0e0f50d3f06f64c4340ecc8fb681d94fb5492a7",
    "0xb0e49d2eba46285b525b1e477759691bc0d5f091",
    "0xb0e6aa2e92efb17fd0150942ec88ca46b10cf89d",
    "0xb0edad0a09b9085463d4dbed3e0a52cc87ed6da6",
    "0xb0f7eafe4041223792a2a77ea50a995ef2fd100f",
    "0xb0fa11e4665e5b107a731f60328ac5f70749a27f",
    "0xb0fbedb7495e76a5f10469dc9edc0da202707f73",
    "0xb1030bc3050d7751f856668a354f39c0b7670098",
    "0xb10468fe9f342979208236b2c0851c5322d23068",
    "0xb106cd2a9ea901934e6c98f41376f1ae3c2df8cc",
    "0xb1162606bf5299a395fdb80349712c2409a35f2a",
    "0x75353213a8da4f7eee5cbec2cd0f66b3efbac1b2",
    "0x7537cb0aee6a3483a7601ebf1084ed4df73166ab",
    "0x753827e4e45b67476ceafe5f9208596b2c7e4a8a",
    "0x753a87e03556abd53a71cb235d901bea1cfe8d87",
    "0x753ad9da71889cbe04aed7c37fd4bf772ce26c58",
    "0x753faaa66a70d4c18d97567518c42290e6c3f491",
    "0x7543cd147f0d2de5d23f2edd084928d9ab6d6c50",
    "0x75473249c25e27b387ed4324a967cc36c6cf42d4",
    "0x7549e64e0e201fc4251914826933bcc7a83e87f6",
    "0x75527efd378115ad691b591a260d0b7cde44db27",
    "0x75545597c6b7162b67f6ce2c210fac8121310522",
    "0x756179e58583bda684eb814a8f06d9797267a262",
    "0x756248940d91e808a17d0319e5419781e44ce1c8",
    "0x7572cd5c3f92be6926b295fd09fb940c2e24f21b",
    "0x7575b7683ac8d556022a1836be1dd03a4681d304",
    "0x7578cc499264ea02ea3650f2239dc5343bcaadee",
    "0x757a9d479f15ecd09f18d06b6131306da4ed2def",
    "0x758d9a820f23ab1e83889ce66887e30b46a7dd47",
    "0x7592bdf3c1b2e7b54e3dae00389d46c2215e81e8",
    "0x75982cc3d6fc08c82f8d80b14a9dd419ff4267fa",
    "0x7598b0dece2f7ea41b57e10abf479290f172370b",
    "0x759bcb965096df8e53c117722442378aa48943cc",
    "0x75a5cdf485c97ed507e639b3cc6e1e969556b4e2",
    "0x75abb522cb5158f09d5120752e79f69894687ab8",
    "0x75ae8818031fc2995ee68e19cc96ffe5a280cd5e",
    "0x75ba50a15c94640d9141cc1d92bdc238c4e9ec70",
    "0x75bcb0c2d51c0d1c9141add95ba7baa0613c5b9e",
    "0x75c6aad50056a86e69ae5a6dc7e4913dc733fcdf",
    "0x75c983fb48d0eeade4ea54b1589a9192c67d5693",
    "0x75cf2f2db5e836257ff354972841f0d8f4b27813",
    "0x75d06ab0bf3f73daca4d4bfa474623cff16ff82d",
    "0x75d50440c91ad0109629edb507f270cfebfa68a8",
    "0x75dd1a992d9c6ee862c0c8aa98051a37a6f858fd",
    "0x75eb025106657bccf563f08031f01728ba7315c0",
    "0x75ecbcd035b11bc9080021c2fe654af8380b022a",
    "0x75ee8681b4c25009f98dc8be82183d4e3f234625",
    "0x75ef910d9c9b9fdc3c2b01d120b3f281622e34e3",
    "0x75efdd004f924d005e968118f2bd16f5a9e5e42c",
    "0x75f0eb3affcca1d5727a5b1f6758d87553d2cc73",
    "0x75f39a35d9a47fbe7c418bd2d5838a26670eb28e",
    "0x7611372442f7dbc3a62ccf280af8189093b27a5a",
    "0x76133a577978d36187cb3ea3f0d93b096149ed2b",
    "0x76190b1b3c0bf022343dbd77884ef13b02e15e4f",
    "0x7629fdaaa74a7be85dfeaf10ed2f6f8fad4c1e19",
    "0x762ede0c0dc4d29578cc95aeb181dd305b769060",
    "0x7635e2209c27ae2faf557c33947e2bb0005240a4",
    "0x7636b37eb7ccc41520ec18d3590442ac4b61c109",
    "0x7636c91c26f780e9680408c9e7a065743485b4ae",
    "0x7637e529e4f653bc5a2826d1e189c9c68701c83b",
    "0x763f7589c034e206175458b7400d9084292a6706",
    "0x3f0a201c23778143d42943823d175234a07d4178",
    "0x3f0fce44046f04a6d96e6138ca5f1888ea291275",
    "0x3f12ad87f0ae978b6931ce7060044d82af06b3cd",
    "0x3f154d31f401a8b631044fda7c7c686c3588a7a3",
    "0x3f1cc18590186dbb7e93a5cd70255366ca30993c",
    "0x3f277731f405464a70b902ed5ef115861f36b370",
    "0x3f3dd5faab6a82174cfb910a3bf15be667419c02",
    "0x3f483406eb8a982c4f8590bdc67753518fc25153",
    "0x3f55cbd5a283900c1029edfe36461dfa0d845599",
    "0x3f59ccbcf24ca48b643575dd28270c947eaf994e",
    "0x3f59e75c86e1774e1fab4b914a437d32f9afae14",
    "0x3f5a17cf2832d67d0a900df9a19245f6119baac5",
    "0x3f602a21254712443594a60313786b672fa63b66",
    "0x3f6174865fcc7de603a7468a0bf477a3af494513",
    "0x3f7ba7ee05a8c9f6a60f264298f5133a542556b3",
    "0x3f7f9d39967cc500f9b41768eff3cbda9da09f5f",
    "0x3f83baeb72e0c1b33caf472038c4728187d7d50d",
    "0x3f8afdcabf2d4d481f2aa5e724e08795c4cdfb9a",
    "0x3f9a5a0267ce4ff6d84c08fd5150acb593e4523c",
    "0x3f9dc5e420ebc1edf550c19483ec04c820d98786",
    "0x3fa3c853de3718de5313e7fffc84c293bcb10037",
    "0x3fa5557a6eb9bf33f3ff3767813981b19e63fec9",
    "0x3fb04abae5f5f81ce90e826d210edc70d08fba22",
    "0x3fb6b92b4517f41ed4f8addeac4fb4ba96a39799",
    "0x3fb71f3780f3cbe6bc1db925bfa5b487ec373f77",
    "0x3fc23e5fd2b3e383277ae32e9b08161382777872",
    "0x3fca805f5034d6ddf80d17d1d5edac33db65eeea",
    "0x3fd365f91fee6c79ff9f31b68d47a971d360e3b2",
    "0x3fe1692c3232b59f9a6e2669712bd5aa1539f2f2",
    "0x3ffae412c533d03004a473d08792941167917a12",
    "0x3ffd139e7f9a1401e43621f07e7118157cf65f3b",
    "0x4002567aa7423c76c28785c4d91d39b54fbb4a43",
    "0x4007af8d3628a191273e1c8d4c132d2ec03acaaa",
    "0x400bfc3a24bb5f24dfab5794e150c4f8da3e96f5",
    "0x40115d461a33ce848013f48b9e8f6fd436f5dffb",
    "0x401a6c04ba562bd0647eac71477fb1be9e4fc1a8",
    "0x402233a0044cb81bc36cdf703d78364909142b71",
    "0x4022b4d71592783c3ad5cc20685bee2cb802318a",
    "0x40252a143f46a98e883a193f6b430bedcf598486",
    "0x402611044b2f352eaa34f5cd61ecd3153240cb3c",
    "0x40291a67aa3854255a01238acd3451ecca2748d1",
    "0x4031295dff2d1ca99e44774e4e6946b0081bbbfa",
    "0x4041f3bdac940bf30200820d979cd002d8fe2074",
    "0x4047045179a6838572a990ea00e38508f4843d51",
    "0x404dda7fb9ed208d6c18405f95a88563b3cf0e66",
    "0x4070e81f23c3ac6af3c7110580e4777fee71fbd2",
    "0x407151ae2930f21b6459bca93efd48ef7d829ed4",
    "0x40797e5024ebb673c1a7f7ad89006bac482ae0d8",
    "0x408163aeb9ad76a3f0c2e26d4738b10669ec21e8",
    "0x408abc2efd51481a90fde017680bbd2f87e0a961"
]


const amount = []


const disperseABI = [
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "recipients",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "values",
                "type": "uint256[]"
            }
        ],
        "name": "disperseOAS",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address[]",
                "name": "recipients",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "values",
                "type": "uint256[]"
            }
        ],
        "name": "disperseToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address[]",
                "name": "recipients",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "values",
                "type": "uint256[]"
            }
        ],
        "name": "disperseTokenSimple",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const disperseContract = '0x559ba735168c4b138a6aba300c24f23acf70e219';



function parse(data) {
    return web3.utils.toWei(Math.ceil(data).toString(), 'Gwei');
}


async function calcGas(gasEstimated) {
    let gas = {
        gasLimit: gasEstimated, //.mul(110).div(100)
        maxFeePerGas: web3.utils.toBN(40000000000), //40000000000
        maxPriorityFeePerGas: web3.utils.toBN(40000000000) //40000000000
    };
    try {
        const { data } = await axios({
            method: 'get',
            url: `https://api.etherscan.io/v2/api?chainid=42170&module=gastracker&action=gasoracle&apikey=${process.env.ARB_KEY}`
        });
        console.log(data);
        // let maxFee = web3.utils.toBN(web3.utils.toWei(data.result.FastGasPrice, 'gwei'));
        // let priorityFee = web3.utils.toBN(web3.utils.toWei(data.result.ProposeGasPrice, 'gwei'));
        // gas.maxFeePerGas = maxFee;
        // gas.maxPriorityFeePerGas = priorityFee;
    } catch (error) {
        console.log(error);
    }
    return gas;
};

const privateKey = process.env.PRIVATE_KEY;


let startNonce = web3.eth.getTransactionCount('0x718F6d86CEE92DC171e6143052f681BEd90B6c93', 'pending');
let failedData = [];
let failedAmount = [];

let startIndex = 0;
let chunckSize = 500;

let usedNonce = {};
let livedTill = 0;



async function run(index, initialNonce, maxChunck) {
    const start = new Date();

    const token = '0xc65341eb819d7d681c4a34d56b10a92224f22533';
    let outputRes;

    const { address } = web3.eth.accounts.privateKeyToAccount(privateKey);

    console.log(address);

    if (data.length !== amount.length) {
        console.error(`Length of array mismatch ${data.length} !== ${amount.length}`);
        return;
    }

    let txURL;

    const disperse = new web3.eth.Contract(disperseABI, disperseContract);
    // const initialNonce = await web3.eth.getTransactionCount(address, 'pending');
    let mynonce = await initialNonce; // Start with the fetched nonce
    if (usedNonce[mynonce]) {
        console.error(`nonce already used: ${mynonce} = ${usedNonce[mynonce]}`)
        return;
    }

    try {
        for (let i = index; i < data.length; i += maxChunck) {
            startIndex = i;
            usedNonce[mynonce] = false;

            const addresses = data.slice(i, i + maxChunck);

            for (let j = 0; j < addresses.length; j++) {
                addresses[j] = web3.utils.toChecksumAddress(addresses[j]);
            }

            const tokens = amount.slice(i, i + maxChunck);
            // let totalAmount = 0;
            // for (let j = 0; j < tokens.length; j++) {
            //     // totalAmount += amount[i][j];
            //     tokens[j] = web3.utils.toWei(tokens[j].toString(), 'ether');
            // }

            // console.log(addresses, data[0], maxChunck)

            console.log(`first address: ${addresses[0]} - last adddress: ${addresses[addresses.length - 1]}, ' === \n', fist amount: ${tokens[0]} - last amount: ${tokens[tokens.length - 1]}`);
            console.log(`chunk size: ${maxChunck} -- index: ${index} -- nonce: ${initialNonce}`);

            failedData = addresses;
            failedAmount = tokens;

            const gasEstimated = await disperse.methods.disperseTokenSimple(token, addresses, tokens).estimateGas({ from: address });
            const block = await web3.eth.getBlock("latest"); // Fetch latest block details
            const baseFee = web3.utils.toBN(block.baseFeePerGas); // Get the base fee per gas
            const priorityFee = web3.utils.toBN(web3.utils.toWei("2", "gwei")); // Set priority fee
            const maxFeePerGas = baseFee.add(priorityFee); // maxFeePerGas = baseFee + priorityFee

            const dataJoin = `"${addresses.join(', ')}"`;
            const amountJoin = `"${tokens.join(', ')}"`;

            const tx = {
                to: disperseContract,
                gas: gasEstimated,
                data: disperse.methods.disperseTokenSimple(token, addresses, tokens).encodeABI(),
                maxFeePerGas: maxFeePerGas.toString(),
                nonce: mynonce,
                maxPriorityFeePerGas: priorityFee.toString()
            };
            const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

            const receipt = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
            txURL = `https://arbiscan.io/tx/${signedTx.transactionHash}`;

            outputRes = `ARB, ${mynonce}, ${dataJoin}, ${amountJoin}, "INPUT ARB, ${mynonce} >> OUTPUT ${txURL}"\n`
            console.log(txURL);

            fs.appendFileSync(`../output/outputlog.csv`, outputRes);

            usedNonce[mynonce] = true;

            mynonce++;
            livedTill++;
            if (livedTill >= 5) {
                if (maxChunck < 500) {
                    maxChunck += 50;
                } else {
                    maxChunck = 500;
                }
                livedTill = 0;
            }

            console.log(livedTill, ' ++++ ', chunckSize)
        }
    } catch (err) {
        console.log(err);
        livedTill = 0;
        console.log(startIndex, mynonce, chunckSize);

        console.error(`first address: ${failedData[0]} - last adddress: ${failedData[failedData.length - 1]}, ' === \n', fist amount: ${failedAmount[0]} - last amount: ${failedAmount[failedAmount.length - 1]}`);
        console.error(`chunk size: ${maxChunck} -- index: ${startIndex} -- nonce: ${mynonce}`);

        outputRes = `ARB, ${mynonce}, ${failedData[0]} - ${failedData[failedData.length - 1]}, ${failedAmount[0]} - ${failedData[failedAmount.length - 1]}, "INPUT ARB, ${mynonce} >> OUTPUT ${txURL}"\n`
        fs.appendFileSync(`../error/errorlog.csv`, outputRes);
        if (maxChunck > 50)
            maxChunck -= 50;
        run(startIndex, mynonce, maxChunck);
        // console.log(`Broke at nonce: ${mynonce} \n data: ${failedData} \n anount: ${failedAmount}`)
    }
    const end = new Date();
    const durationInMinutes = (end - start) / (1000 * 60);
    console.log(`Execution time: ${durationInMinutes.toFixed(2)} minutes`);
}

run(startIndex, startNonce, chunckSize);