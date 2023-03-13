import * as vscode from "vscode";
import { ReadFile } from "./readfile";
import { Search } from "./search";
import { StyleControl } from "./stylecontrol";
import { TextInsert } from "./textinsert";

export function activate(context: vscode.ExtensionContext) {
  function registerCommandNice(
    commandId: string,
    run: (...args: any[]) => void
  ): void {
    context.subscriptions.push(vscode.commands.registerCommand(commandId, run));
  }

  const fastPaste = new FastPaste();

  registerCommandNice("test", async function (args) {});

  registerCommandNice("getFiles", async function (args) {
    await fastPaste.getFileList();
  });

  registerCommandNice("fast-paste.normalMode", function (args) {
    fastPaste.switchToNormalMode();
  });

  registerCommandNice("fast-paste.insertMode", function (args) {
    fastPaste.switchToInsertMode();
  });

  registerCommandNice("fast-paste.insertTag", function (args) {
    fastPaste.insertTag();
  });
  vscode.commands.executeCommand("getFiles");
  vscode.commands.executeCommand("test");
}

export function deactivate() {}

class FastPaste {
  private _styleControl: StyleControl;
  private _inNormalMode: ContextKey;
  private _search: Search;
  private _fileReader: ReadFile;
  private _textInserter: TextInsert;
  constructor() {
    this._styleControl = new StyleControl();
    this._inNormalMode = new ContextKey("fast-paste.inNormalMode", true);
    this._search = new Search();
    this._fileReader = new ReadFile();
    this._textInserter = new TextInsert();
  }

  public checkIsNormalMode() {
    return this._inNormalMode.getValue();
  }
  public switchToNormalMode() {
    this._inNormalMode.set(true);
    this.setCursorStyle(this.checkIsNormalMode());
  }
  public async switchToInsertMode() {
    this._inNormalMode.set(false);
    this.setCursorStyle(this.checkIsNormalMode());
    await this._search.showFiles();
    const fp = this._search.getFilePath();
    this._fileReader.readFile(fp);
    vscode.commands.executeCommand("fast-paste.normalMode");
  }
  public setCursorStyle(isNormalMode: boolean) {
    this._styleControl.setCursorStyle(isNormalMode);
  }
  public async getFileList() {
    await this._search.getFiles();
  }
  public insertText(text: string) {
    this._textInserter.insertText(text);
  }
  public insertTag() {
    this._textInserter.insertTag();
  }
  //Not used after this point

  public fileQuickPick() {
    this._search.showFiles();
  }
  public readFile() {
    this._fileReader.readFile(this._search.getFilePath());
  }
  public updateFileName() {
    const mode = this.checkIsNormalMode();
    // this._search.updateFileName(mode);
  }
  public removeEditorListener() {
    this._search.removeListener();
  }
}

class ContextKey {
  private _name: string;
  private _value: boolean;
  constructor(name: string, value: boolean) {
    this._name = name;
    this._value = value;
    this.set(value);
  }
  public getValue() {
    return this._value;
  }
  public set(value: boolean): void {
    this._value = value;
    vscode.commands.executeCommand("setContext", this._name, this._value);
  }
}
