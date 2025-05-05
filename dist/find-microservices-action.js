"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMicroserviceChildren = findMicroserviceChildren;
const fs_1 = require("fs");
const path_1 = require("path");
function after(subject, search) {
    const index = subject.indexOf(search);
    if (index < 0)
        return subject;
    return subject.substring(search.length);
}
function findMicroserviceChildren(grandparent = '.', exceptions = []) {
    const found = [];
    const parent = (0, path_1.join)(grandparent, 'microservices');
    const entries = (0, fs_1.readdirSync)(parent, { recursive: false, withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory() && entry.name.startsWith('service-')) {
            const service = after(entry.name, 'service-');
            if (!exceptions.includes(service) && !found.includes(service))
                found.push(service);
        }
    }
    return found.sort();
}
