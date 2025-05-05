"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const find_microservices_action_1 = require("./find-microservices-action");
async function run() {
    try {
        const microservicesPath = core.getInput('microservices_path', { required: false }) || '.';
        const sExceptions = core.getInput('exceptions', { required: false });
        try {
            if (!sExceptions) {
                core.info('No exceptions inputted. Not even `default`?');
            }
            const aExceptions = sExceptions.trim().split(/\s+/);
            const discovered = (0, find_microservices_action_1.findMicroserviceChildren)(microservicesPath, aExceptions);
            const microservices = JSON.stringify(discovered);
            core.info('Microservices discovered: ' + microservices);
            core.setOutput('microservices', microservices);
        }
        catch (error) {
            core.setFailed(`Microservices could not be discovered under [${microservicesPath}]`);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        }
        else {
            core.setFailed('An unknown error occurred.');
        }
    }
}
run();
