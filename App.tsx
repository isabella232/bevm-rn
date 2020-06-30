import {StatusBar} from 'expo-status-bar';
import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Config} from "./lib/config";
import {EvmAccount, EvmContract} from "./lib/bevm";

async function init(): Promise<string> {
    const config = await Config.init();

    const account = EvmAccount.deserialize({
        name: "test",
        nonce: 13,
        privateKey:
            "c007f02a9cb5d34ac4c4cffe1db396e1b0ae0e1f1d2bc59a2a18d1e1b20da548"
    });

    const contract = EvmContract.deserialize({
        abi:
            '[{"constant":false,"inputs":[{"name":"candies","type":"uint256"}],"name":"eatCandy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRemainingCandies","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_candies","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]',
        addresses: [
            "336d456aada38ab67ba4c21830fdf8bc62cfbacd",
            "96a648050e0e98fd710e073ecd99f7483587eede"
        ],
        bytecode:
            "608060405234801561001057600080fd5b506040516101c03803806101c08339818101604052602081101561003357600080fd5b810190808051906020019092919050505080600281905550806000819055506000600181905550506101568061006a6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063a1ff2f521461003b578063ea319f2814610069575b600080fd5b6100676004803603602081101561005157600080fd5b8101908080359060200190929190505050610087565b005b610071610118565b6040518082815260200191505060405180910390f35b6000548111156100ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260058152602001807f6572726f7200000000000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b8060005403600081905550806001540160018190555050565b6000805490509056fea265627a7a72305820898e18179551d21e54e9eec212065e348ae08b6900e2dc57a2fbc6f7dc69662864736f6c634300050a0032",
        name: "Candy"
    });

    const response = await config.bevmRPC.call(
        config.byzcoinRPC.genesisID,
        config.rosterToml,
        config.bevmRPC.id,
        account,
        contract,
        "getRemainingCandies",
        [],
    );

    return response;
}

class App extends Component {
    state = {
        log: ""
    }

    updateLog(str: string) {
        this.setState({
            log: this.state.log + '\n' + str
        })
    }

    async sendRequest(){
        this.updateLog("Sending request");
        try {
            this.updateLog("Response: " + await init());
        } catch (e) {
            this.updateLog("Got error: " + e);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Simple demo-app to contact the Bevm of ByzCoin.</Text>
                <Button
                    onPress={() => this.sendRequest()}
                    title="Send request"
                />
                <Text>Log is:{this.state.log}</Text>
                <StatusBar style="auto"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
