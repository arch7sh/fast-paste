import * as vscode from "vscode";
import { Search } from "./search";
import { StyleControl } from "./stylecontrol";

export function activate(context: vscode.ExtensionContext) {
  function registerCommandNice(
    commandId: string,
    run: (...args: any[]) => void
  ): void {
    context.subscriptions.push(vscode.commands.registerCommand(commandId, run));
  }

  const fastPaste = new FastPaste();

  registerCommandNice("getFiles", async function (args) {
    await fastPaste.getFileList();
  });

  registerCommandNice("fast-paste.normalMode", function (args) {
    fastPaste.switchToNormalMode();
    fastPaste.removeEditorListener();
  });

  registerCommandNice("fast-paste.insertMode", function (args) {
    fastPaste.switchToInsertMode();
    fastPaste.updateFileName();
  });

  vscode.commands.executeCommand("getFiles");
}

export function deactivate() {}

class FastPaste {
  private _styleControl: StyleControl;
  private _inNormalMode: ContextKey;
  private _search: Search;

  constructor() {
    this._styleControl = new StyleControl();
    this._inNormalMode = new ContextKey("fast-paste.inNormalMode", true);
    this._search = new Search();
  }

  public checkIsNormalMode() {
    return this._inNormalMode.getValue();
  }
  public switchToNormalMode() {
    this._inNormalMode.set(true);
    this.setCursorStyle(this.checkIsNormalMode());
  }
  public switchToInsertMode() {
    this._inNormalMode.set(false);
    this.setCursorStyle(this.checkIsNormalMode());
  }
  public setCursorStyle(isNormalMode: boolean) {
    this._styleControl.setCursorStyle(isNormalMode);
  }
  public async getFileList() {
    await this._search.getFiles();
  }
  public fileQuickPick() {
    this._search.showFiles();
  }
  public updateFileName() {
    const mode = this.checkIsNormalMode();
    this._search.updateFileName(mode);
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
