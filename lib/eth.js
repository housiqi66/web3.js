/*
    This file is part of ethereum.js.

    ethereum.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ethereum.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with ethereum.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/** @file eth.js
 * @authors:
 *   Marek Kotewicz <marek@ethdev.com>
 * @date 2015
 */

var formatters = require('./formatters');
// var utils = require('./utils');


var blockCall = function (args) {
    return typeof args[0] === "string" ? "eth_blockByHash" : "eth_blockByNumber";
};

var transactionCall = function (args) {
    return typeof args[0] === "string" ? 'eth_transactionByHash' : 'eth_transactionByNumber';
};

var uncleCall = function (args) {
    return typeof args[0] === "string" ? 'eth_uncleByHash' : 'eth_uncleByNumber';
};

var transactionCountCall = function (args) {
    return typeof args[0] === "string" ? 'eth_transactionCountByHash' : 'eth_transactionCountByNumber';
};

var uncleCountCall = function (args) {
    return typeof args[0] === "string" ? 'eth_uncleCountByHash' : 'eth_uncleCountByNumber';
};

/// @returns an array of objects describing web3.eth api methods
var methods = [
    { name: 'getBalance', call: 'eth_balanceAt', addDefaultblock: 2, outputFormatter: formatters.convertToBigNumber},
    { name: 'getStorage', call: 'eth_storageAt', addDefaultblock: 2},
    { name: 'getStorageAt', call: 'eth_stateAt', addDefaultblock: 3},
    { name: 'getData', call: 'eth_codeAt', addDefaultblock: 2},
    { name: 'getBlock', call: blockCall, outputFormatter: formatters.outputBlockFormatter},
    { name: 'getUncle', call: uncleCall, outputFormatter: formatters.outputBlockFormatter},
    { name: 'getCompilers', call: 'eth_compilers' },
    { name: 'getBlockTransactionCount', call: transactionCountCall },
    { name: 'getBlockUncleCount', call: uncleCountCall },
    { name: 'getTransaction', call: transactionCall, outputFormatter: formatters.outputTransactionFormatter },
    { name: 'getTransactionCount', call: 'eth_countAt', addDefaultblock: 2},
    { name: 'sendTransaction', call: 'eth_transact', inputFormatter: formatters.inputTransactionFormatter },
    { name: 'call', call: 'eth_call', addDefaultblock: 2},
    { name: 'compile.solidity', call: 'eth_solidity' },
    { name: 'compile.lll', call: 'eth_lll' },
    { name: 'compile.serpent', call: 'eth_serpent' },
    { name: 'flush', call: 'eth_flush' },

    // deprecated methods
    { name: 'balanceAt', call: 'eth_balanceAt', newMethod: 'eth.getBalance' },
    { name: 'stateAt', call: 'eth_stateAt', newMethod: 'eth.getStorageAt' },
    { name: 'storageAt', call: 'eth_storageAt', newMethod: 'eth.getStorage' },
    { name: 'countAt', call: 'eth_countAt', newMethod: 'eth.getTransactionCount' },
    { name: 'codeAt', call: 'eth_codeAt', newMethod: 'eth.getData' },
    { name: 'transact', call: 'eth_transact', newMethod: 'eth.sendTransaction' },
    { name: 'block', call: blockCall, newMethod: 'eth.getBlock' },
    { name: 'transaction', call: transactionCall, newMethod: 'eth.getTransaction' },
    { name: 'uncle', call: uncleCall, newMethod: 'eth.getUncle' },
    { name: 'compilers', call: 'eth_compilers', newMethod: 'eth.getCompilers' },
    { name: 'solidity', call: 'eth_solidity', newMethod: 'eth.compile.solidity' },
    { name: 'lll', call: 'eth_lll', newMethod: 'eth.compile.lll' },
    { name: 'serpent', call: 'eth_serpent', newMethod: 'eth.compile.serpent' },
    { name: 'transactionCount', call: transactionCountCall, newMethod: 'eth.getBlockTransactionCount' },
    { name: 'uncleCount', call: uncleCountCall, newMethod: 'eth.getBlockUncleCount' },
    { name: 'logs', call: 'eth_logs' }
];

/// @returns an array of objects describing web3.eth api properties
var properties = [
    { name: 'coinbase', getter: 'eth_coinbase'},
    { name: 'mining', getter: 'eth_mining'},
    { name: 'gasPrice', getter: 'eth_gasPrice', outputFormatter: formatters.convertToBigNumber},
    { name: 'accounts', getter: 'eth_accounts' },
    { name: 'blockNumber', getter: 'eth_number'},

    // deprecated properties
    { name: 'listening', getter: 'net_listening', setter: 'eth_setListening', newProperty: 'net.listening'},
    { name: 'peerCount', getter: 'net_peerCount', newProperty: 'net.peerCount'},
    { name: 'number', getter: 'eth_number', newProperty: 'eth.blockNumber'}
];


module.exports = {
    methods: methods,
    properties: properties
};
