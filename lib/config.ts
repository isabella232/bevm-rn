import ByzCoinRPC from "@dedis/cothority/byzcoin/byzcoin-rpc";
import { Roster } from "@dedis/cothority/network";

import toml from "toml";

import { BevmRPC } from "./bevm";
import { StainlessRPC } from "./stainless";

const rosterToml = `
ByzCoinID = "9cc36071ccb902a1de7e0d21a2c176d73894b1cf88ae4cc2ba4c95cd76f474f3"

[[servers]]
  Address = "tls://conode.dedis.ch:7000"
  Suite = "Ed25519"
  Public = "ec5c65a3c922d1df32075640e3de606197be24af76059a2ef145501122884bd3"
  Description = "EPFL Cothority-server"
  Url = "https://conode.dedis.ch"
  [servers.Services]
    [servers.Services.ByzCoin]
      Public = "6f69dc10dbef8f4d80072aa9d1bee191b0f68b137a9d06d006c39fe6667738fa2d3439caf428a1dcb6f4a5bd2ce6ff6f1462ebb1b7374080d95310bc6e1115e105d7ae38f9fed1585094b0cb13dc3a0f3e74daeaa794ca10058e44ef339055510f4d12a7234779f8db2e093dd8a14a03440a7d5a8ef04cac8fd735f20440b589"
      Suite = "bn256.adapter"
    [servers.Services.Skipchain]
      Public = "32ba0cccec06ac4259b39102dcba13677eb385e0fdce99c93406542c5cbed3ec6ac71a81b01207451346402542923449ecf71fc0d69b1d019df34407b532fb2a09005c801e359afb377cc3255e918a096912bf6f7b7e4040532404996e05f78c408760b57fcf9e04c50eb7bc413438aca9d653dd0b6a8353d128370ebd4bdb10"
      Suite = "bn256.adapter"

[[servers]]
  Address = "tls://dedis.nella.org:7770"
  Suite = "Ed25519"
  Public = "ad91a87dd89d31e4fc77ee04f1fc684bb6697bcef96720b84422437ff00b79e3"
  Description = "dedis.nella.org"
  Url = "https://dedis.nella.org:7771"
  [servers.Services]
    [servers.Services.ByzCoin]
      Public = "7a989c19ef64ac45d4962fa0e60184c0adaf90082f5ea572de2d241d11ac8e6a53f968928d80a910ed7d883c05d74cf3e3c2c9096dd9fb5b64a03f9e552700388effcd3106e58f4bb99c384afb4b6b2530bfee6fdfb6b4f41a383b2ad31bf03c18d3f43a4a8bacbe5da16c3851c3c8be3607af1bb19b085861d71cd92c8b8406"
      Suite = "bn256.adapter"
    [servers.Services.Skipchain]
      Public = "78dd1cfd6e70ad9cf5afb8263811fabe95aedee835567cc5ca7773a6787a03736ee24accb8e00370768aab14dab949584054e255c626d0141182454f8c77794a4e8c69a4dc6082f30f1cf33de45daea63fc52c4a91ed79ca88e4f6d363a46d87017b038da5ca4656f610d77fd91e1aae320d7d399ca7fdf41f5348b63712310f"
      Suite = "bn256.adapter"

[[servers]]
  Address = "tls://fairywren.ch:7770"
  Suite = "Ed25519"
  Public = "0bcdaebde16f50fb65b717a0501e7ede020045286d6ece10fdea1bdd8f37af39"
  Description = "Gaylor's Conode"
  Url = "https://fairywren.ch:7771"
  [servers.Services]
    [servers.Services.ByzCoin]
      Public = "2754e502579e77f92322458022f6b97ff18471f2e7523028ea6dab720da11ab189f98ef9a0308c7aa656f3339baded992248def25e3e2e1428c1601809579b934bb2aaf66b3d8a68712f68d744661d270278ebcf434204af961c729db6db85a54930dfe6b75184647d0e81138db2a87ccaeccff3500be2bf409827eef5ec150d"
      Suite = "bn256.adapter"
    [servers.Services.Skipchain]
      Public = "69088f9df0396cfd296eeeb060bc84d807f3f2cf3b02b8eafd953f30e9e979a203fd11035e9f1fca2662383841c3c630ee3554150ec2b5fdb50819a22a2682dd341f0424fec4eafb8a17041b939ef18eabdd8c38e2f057619a541c506bbae5755265ae6b9156690b7a2907ca0ec6394d79363d5492aa2c9512e3fba882aad358"
      Suite = "bn256.adapter"

[[servers]]
  Address = "tls://conode.c4dt.org:7770"
  Suite = "Ed25519"
  Public = "67e30e168f83c4d4614e277cefba42dbc1fb5886b3945364ea5dae3f4e4fbc0d"
  Description = "C4DT Conode"
  Url = "https://conode.c4dt.org"
  [servers.Services]
    [servers.Services.ByzCoin]
      Public = "6bb65e6c3fb7cb9d84c81a21ce4cedf70539452e3e220c0383f087832bbd1d588590eb4fe777a360c3e12b8020a424db20fc00deafb1212bf8a4f70b978adbae093efc9aadff0a97cb0199372d5b55f135793393d94028cac0f432fb144b269f12162dbc163a80e32bea7219c2c51700ae8de5bd849d6d4001dfb2a3a8e2a161"
      Suite = "bn256.adapter"
    [servers.Services.Skipchain]
      Public = "70a1f68fee1a78e621e023ea9ab0eaa042c1fa72e5bc2abd8ed9c039ce9dbdce122306f8b9e3d423757084fc9b4043adcf7b91f04c6fb66577a98f24bcddc248636fe63a69f661cd7e668fc4fa63fc2b55316c9d108d864e6f5461e31b77e03b0bcd6fcfb60b60c8a19ff07e068c43e7b3abad35ffb297710680fb693f5eee72"
      Suite = "bn256.adapter"

[[servers]]
  Address = "tls://gasser.blue:7770"
  Suite = "Ed25519"
  Public = "0e4c620122daca9518cace2a6b11c5c0892fbde7b130d04e8a194fd02906ffc6"
  Description = "Ineiti's conode"
  Url = "https://gasser.blue:7771"
  [servers.Services]
    [servers.Services.ByzCoin]
      Public = "00fe956fe1b90332bd7c5182d9f125c0e2108f5178d71b42b5f02582f9f2814281d4f2e0c9bd25f711c7138f9c2fb5fb6578b65aeae8cff1c349df34c497882f86ba36037678275d086b57bd04a9a020a80a47242b08274c696c009f097d3e7a31d0a6fc2b2e01b9d005e8c2ea538f3c581baac918cacb0650f6b3c2082e549f"
      Suite = "bn256.adapter"
    [servers.Services.Skipchain]
      Public = "5878c63855bf0ad9a2575865b18a8e5856ed6c6b1cbfe1bacc0f4e889b9cd79f78b024fdcef448be2ffb292622927595047227f45a361e9094d5bb3ebcfd9bdb60bf179d5c6c3319d4c8bf2e1e149b78c1056814ac581b7c97decd9c58a570d6018712143844e5fd0a31ddb61e2d81bc1f35bfc47e8a884683d9692529119240"
      Suite = "bn256.adapter"

[[servers]]
  Address = "tls://188.166.35.173:7770"
  Suite = "Ed25519"
  Public = "a59fc58c0a445b70dcd57e01603a714a2ee99c1cc14ca71780383abada5d7143"
  Description = "Wookiee's Cothority"
  Url = "https://wookiee.ch/conode"
  [servers.Services]
    [servers.Services.ByzCoin]
      Public = "70c192537778a53abb9315979f48e170da9182b324c7974462cbdde90fc0c51d440e2de266a81fe7a3d9d2b6665ef07ba3bbe8df027af9b8a3b4ea6569d7f72a41f0dfe4dc222aa8fd4c99ced2212d7d1711267f66293732c88e8d43a2cf6b3e2e1cd0c57b8f222a73a393e70cf81e53a0ce8ed2a426e3b0fa6b0da30ff27b1a"
      Suite = "bn256.adapter"
    [servers.Services.Skipchain]
      Public = "63e2ed93333bd0888ed2b5e51b5e2544831b4d79dead571cf67604cdd96bc0212f68e582468267697403d7ed418e70ed9fcb01940e4c603373994ef00c04542c24091939bddca515381e0285ab805826cec457346be482e687475a973a20fca48f16c76e352076ccc0c866d7abb3ac50d02f9874d065f85404a0127efc1acf49"
      Suite = "bn256.adapter"

[[servers]]
  Address = "tls://conode.c4dt.org:7780"
  Suite = "Ed25519"
  Public = "8592a0dc194d1ba035693d922dd1e5076c89c28275143de80ea4e9640b4df6ea"
  Description = "2nd c4dt conode"
  Url = "https://conode.c4dt.org:7781"
  [servers.Services]
    [servers.Services.ByzCoin]
      Public = "7e133eaa68d4df3af42d07fe23cc2c96c25c5508f6cb1aafd5dfa5a4da4c2a420eff2942b2cf94368d3a8c92156dd5920ba0dcc0d41588db623f6d94874051e565449e7de3598ac93c3bb286e8b11154a46dc4ae67d359838c1a3b4a331b85c10353d56889506cff201f33d489d8ff635b9574f07e24ecb7d0ce8fd12135065b"
      Suite = "bn256.adapter"
    [servers.Services.Skipchain]
      Public = "2baeb3ff4824177e50f203337e6ef32907c0e61b3a6357351cc0a64ad1b38129891455bcdaeff16b10cf1179605b4cbc356adc05164a7ce9511edfc8b8b0ea5787098900ccd14f119f574da1a0f5c639706c3c780e9d985d4893088c33df1eb15a668207b2e6195cd26be21516fd43474a5e0dd087574e24bcbc1c8f4ee98f4b"
      Suite = "bn256.adapter"
`;

const configRaw = `
ByzCoinID = "9cc36071ccb902a1de7e0d21a2c176d73894b1cf88ae4cc2ba4c95cd76f474f3"
AdminDarc = "26dc7ae0ae54bc42ae187e4b3f20a280c6f8264b9e49d84cab7efabc402783fd"
Ephemeral = "ec2dbf2f91f1dbb37f87dc23d8c86121beedab3ac3717f31eec72d3878388e09"
`;

const bevmConfigRaw = `
bevmInstanceID = "baac556f7b08cc06a9209a3a7e9d3d7bd9b6132082a695c590944cbe573010cc"
`;

const stainlessRosterToml = `
[[servers]]
Suite = "Ed25519"
Public = "5c42eafc130b67678edb17faaa3057277e22a994153483fc1fe51cbee20b59ea"
Address = "tls://demo.c4dt.org:9002"
Url = "https://demo.c4dt.org:9003"
Description = "conode-1"
[servers.Services]
[servers.Services.ByzCoin]
    Suite = "bn256.adapter"
    Public = "64ae2d1a0fc17808ed8a0f993b95f61b6c8737dd21b509ce95fee0604163af1845e4cf8065040a3e6990b7f81ec2ba09f8e975f2af101e9a85af47771ba8d2256f4b5a22f10f1474469f515c471c2872230192d91a4acb88b94914c6b0a07e987c630ae4c3aff2a17792d6a15c36b9563fffda1f71708756240a450ee7abf888"
[servers.Services.Skipchain]
    Suite = "bn256.adapter"
    Public = "7d1d81d620bbd093b196ccac56e07f35e334f446cad63d991c270b8af9f5cfc88a8d14108b9d97504f494107973635fcf6eae451a5f36b864780bb91cffc33e66d550ec5f01d7e9b0466582faf905671cb1ebacf0ddd7ce005a6252fdcdacf005ab41192bfd01ce2e4e45d0036e1674f1ac0199c5a4449364034f164a2283772"
`;

export class Config {
    static async init(): Promise<Config> {
        const roster = Roster.fromTOML(rosterToml);
        const stainlessRoster = Roster.fromTOML(stainlessRosterToml);
        const stainlessConode = stainlessRoster.list[0];

        const serverConfig = await Config.getServerConfig();

        const byzcoinRPC = await ByzCoinRPC.fromByzcoin(roster, serverConfig.byzCoinID,
            undefined, undefined, undefined, undefined, false);
        const bevmRPC = await BevmRPC.fromByzcoin(byzcoinRPC, serverConfig.bevmInstanceID);

        const stainlessRPC = new StainlessRPC(stainlessConode);
        bevmRPC.setStainlessRPC(stainlessRPC);

        const cfg = new Config(
            byzcoinRPC,
            rosterToml,
            bevmRPC,
        );

        return cfg;
    }

    private static async getServerConfig(): Promise<any> {
        const configParsed = toml.parse(configRaw);
        const bevmConfigParsed = toml.parse(bevmConfigRaw);

        return {
            adminDarc: Buffer.from(configParsed.AdminDarc, "hex"),
            bevmInstanceID: Buffer.from(bevmConfigParsed.bevmInstanceID, "hex"),
            bevmUserID: bevmConfigParsed.bevmUserID ? Buffer.from(bevmConfigParsed.bevmUserID, "hex") : null,
            byzCoinID: Buffer.from(configParsed.ByzCoinID, "hex"),
            ephemeral: Buffer.from(configParsed.Ephemeral, "hex"),
        };
    }

    protected constructor(
        readonly byzcoinRPC: ByzCoinRPC,
        readonly rosterToml: string,
        readonly bevmRPC: BevmRPC,
    ) {}
}
