"use strict";
// fetchRepos.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHTMLFile = exports.ensureFileExists = exports.getRepositories = void 0;
var core_1 = require("@octokit/core");
var fs_1 = require("fs");
var path_1 = require("path");
var templatesDir = (0, path_1.join)(__dirname, 'templates');
function getRepositories(username, token) {
    return __awaiter(this, void 0, void 0, function () {
        var octokit, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    octokit = new core_1.Octokit({ auth: token });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, octokit.request('GET /users/{username}/repos', {
                            username: username
                        })];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response.data.map(function (repo) { return repo.html_url; })];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching repositories:", error_1);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getRepositories = getRepositories;
function ensureFileExists(filePath, templateFileName) {
    if (!(0, fs_1.existsSync)(filePath)) {
        var templatePath = (0, path_1.join)(templatesDir, templateFileName);
        var content = (0, fs_1.readFileSync)(templatePath, { encoding: 'utf8' });
        (0, fs_1.writeFileSync)(filePath, content, { encoding: 'utf8' });
    }
}
exports.ensureFileExists = ensureFileExists;
function ensureListSectionExists(htmlContent, listSectionTemplateFileName) {
    var listStartTag = '<ul id="repo-list">';
    var listEndTag = '</ul>';
    var start = htmlContent.indexOf(listStartTag);
    var end = htmlContent.indexOf(listEndTag, start);
    if (start === -1 || end === -1) {
        var listSectionTemplatePath = (0, path_1.join)(templatesDir, listSectionTemplateFileName);
        var listSectionContent = (0, fs_1.readFileSync)(listSectionTemplatePath, { encoding: 'utf8' });
        return htmlContent + listSectionContent;
    }
    return htmlContent;
}
function updateHTMLFile(htmlFilePath, htmlLinks) {
    ensureFileExists(htmlFilePath, 'index.html');
    var htmlContent = (0, fs_1.readFileSync)(htmlFilePath, { encoding: 'utf8' });
    htmlContent = ensureListSectionExists(htmlContent, 'listSection.html');
    var listStartTag = '<ul id="repo-list">';
    var listEndTag = '</ul>';
    var start = htmlContent.indexOf(listStartTag) + listStartTag.length;
    var end = htmlContent.indexOf(listEndTag, start);
    htmlContent = htmlContent.substring(0, start) + "\n" + htmlLinks + htmlContent.substring(end);
    (0, fs_1.writeFileSync)(htmlFilePath, htmlContent, { encoding: 'utf8' });
}
exports.updateHTMLFile = updateHTMLFile;
//# sourceMappingURL=fetchRepos.js.map